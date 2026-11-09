import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../lib/supabase";
import "./loginForm.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Authenticate first, then require an active member profile before entering the member area.
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: inputs.email.trim(),
          password: inputs.password,
        });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("members")
        .select("status, role")
        .eq("id", data.user.id)
        .maybeSingle();

      if (profileError) {
        // Clear the new session if the app cannot confirm the member's access.
        const { error: signOutError } = await supabase.auth.signOut();
        setError(
          signOutError
            ? `Unable to verify your member profile (${profileError.message}) and sign-out failed (${signOutError.message}).`
            : `Unable to verify your member profile: ${profileError.message}`,
        );
        return;
      }

      if (
        !profile ||
        profile.status !== "active" ||
        !["member", "board"].includes(profile.role)
      ) {
        // Inactive or unprovisioned accounts must not keep an app session.
        const { error: signOutError } = await supabase.auth.signOut();

        setError(
          signOutError
            ? `Your profile is inactive, and sign-out failed: ${signOutError.message}`
            : "Your member account is not active yet. Please contact a board member.",
        );
        return;
      }

      navigate("/user-login", { replace: true });
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "An unexpected error occurred while signing in.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={inputs.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />

      <input
        type="password"
        name="password"
        value={inputs.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />

      {error && <p role="alert">{error}</p>}

      <div className="login-buttons">
        <button
          type="submit"
          className="login-form-buttons"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing in..." : "Login"}
        </button>
        <Link to="/reset-password" className="login-form-buttons">
          Reset Password
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
