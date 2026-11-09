import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import supabase from "../../lib/supabase";
import Home from "../main-home/Home";

const PublicHomeRoute = () => {
  const [destination, setDestination] = useState({
    status: "loading",
  });

  useEffect(() => {
    let isCurrent = true;

    const resolveHome = async () => {
      try {
        // Keep the public page available to visitors; route active members to their dashboard.
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          if (isCurrent) {
            setDestination({ status: "error", message: sessionError.message });
          }
          return;
        }

        if (!session) {
          if (isCurrent) setDestination({ status: "public" });
          return;
        }

        const { data, error: userError } = await supabase.auth.getUser();

        if (userError) {
          if (isCurrent) {
            setDestination({ status: "error", message: userError.message });
          }
          return;
        }

        if (!data.user) {
          if (isCurrent) setDestination({ status: "public" });
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from("members")
          .select("status")
          .eq("id", data.user.id)
          .maybeSingle();

        if (profileError) {
          if (isCurrent) {
            setDestination({ status: "error", message: profileError.message });
          }
          return;
        }

        if (isCurrent) {
          setDestination({
            status: profile?.status === "active" ? "member" : "public",
          });
        }
      } catch (error) {
        if (isCurrent) {
          setDestination({
            status: "error",
            message:
              error instanceof Error
                ? error.message
                : "An unexpected error occurred while checking your session.",
          });
        }
      }
    };

    resolveHome();

    return () => {
      isCurrent = false;
    };
  }, []);

  if (destination.status === "loading") {
    return <p role="status">Loading...</p>;
  }

  if (destination.status === "member") {
    return <Navigate to="/user-login" replace />;
  }

  if (destination.status === "error") {
    return (
      <main>
        <p role="alert">Could not verify your session: {destination.message}</p>
      </main>
    );
  }

  return <Home />;
};

export default PublicHomeRoute;
