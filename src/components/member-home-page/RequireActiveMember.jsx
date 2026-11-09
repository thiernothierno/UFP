import { useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import supabase from "../../lib/supabase";
import { MemberProvider } from "./MemberContext";
import { can } from "../../data/userPermission";

const RequireActiveMember = ({ render }) => {
  const location = useLocation();
  const [access, setAccess] = useState({ pathname: null, status: "loading" });

  useEffect(() => {
    let isCurrent = true;
    const updateAccess = (nextAccess) => {
      if (isCurrent) {
        setAccess({ pathname: location.pathname, ...nextAccess });
      }
    };

    const checkAccess = async () => {
      try {
        // A missing session means visitor access; member routes require an authenticated user.
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          updateAccess({ status: "error", message: sessionError.message });
          return;
        }

        if (!session) {
          updateAccess({ status: "unauthenticated" });
          return;
        }

        const { data, error: userError } = await supabase.auth.getUser();

        if (userError) {
          updateAccess({ status: "error", message: userError.message });
          return;
        }

        if (!data.user) {
          updateAccess({ status: "unauthenticated" });
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from("members")
          .select("status, role, first_name, last_name, member_number")
          .eq("id", data.user.id)
          .maybeSingle();

        if (profileError) {
          updateAccess({ status: "error", message: profileError.message });
          return;
        }

        if (
          profile?.status !== "active" ||
          !["member", "board"].includes(profile.role)
        ) {
          updateAccess({ status: "inactive" });
          return;
        }

        const member = {
          id: data.user.id,
          role: profile.role,
          firstName: profile.first_name,
          lastName: profile.last_name,
          memberNumber: profile.member_number,
          email: data.user.email ?? "",
        };

        if (!can(member.role, "view", "member-pages")) {
          updateAccess({ status: "inactive" });
          return;
        }

        updateAccess({
          status: "authorized",
          // Pass profile details and the Auth email to the member account sidebar.
          member,
        });
      } catch (accessError) {
        updateAccess({
          status: "error",
          message:
            accessError instanceof Error
              ? accessError.message
              : "An unexpected error occurred while checking access.",
        });
      }
    };

    checkAccess();

    return () => {
      isCurrent = false;
    };
  }, [location.pathname]);

  const accessStatus =
    access.pathname === location.pathname ? access.status : "loading";

  if (accessStatus === "loading") {
    return <p role="status">Checking member access...</p>;
  }

  if (accessStatus === "unauthenticated") {
    return <Navigate to="/member-login" replace state={{ from: location }} />;
  }

  if (accessStatus === "inactive") {
    return (
      <main>
        <p role="alert">
          Your member profile is not active. Please contact a board member.
        </p>
        <Link to="/">Return to the public home page</Link>
      </main>
    );
  }

  if (accessStatus === "error") {
    return (
      <main>
        <p role="alert">Could not verify member access: {access.message}</p>
      </main>
    );
  }

  return (
    <MemberProvider value={access.member}>
      {render(access.member)}
    </MemberProvider>
  );
};

export default RequireActiveMember;
