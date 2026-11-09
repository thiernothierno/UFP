import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./setPassword.css";
import supabase from "../../lib/supabase";

const SetPasswordForm = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInputs((currentInputs) => ({
      ...currentInputs,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (inputs.password !== inputs.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        setError(`Could not verify your session: ${sessionError.message}`);
        return;
      }

      if (!session) {
        setError(
          "This password link is invalid or has expired. Please request a new link.",
        );
        return;
      }

      // The recovery/invitation session identifies which Auth user's password to update.
      const { error: updateError } = await supabase.auth.updateUser({
        password: inputs.password,
      });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      // End the temporary recovery session only after the password update succeeds.
      const { error: signOutError } = await supabase.auth.signOut();

      if (signOutError) {
        setError(
          `Your password was updated, but sign-out failed: ${signOutError.message}`,
        );
        return;
      }

      navigate("/member-login", {
        replace: true,
        state: { message: "Password updated. Please sign in with your new password." },
      });
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "An unexpected error occurred while updating your password.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="reset-form" onSubmit={handleSubmit}>
      <input
        type="password"
        name="password"
        value={inputs.password}
        onChange={handleChange}
        placeholder="Create a password"
        autoComplete="new-password"
        required
      />
      <input
        type="password"
        name="confirmPassword"
        value={inputs.confirmPassword}
        onChange={handleChange}
        placeholder="Re-enter Password"
        autoComplete="new-password"
        required
      />

      {error && <p role="alert">{error}</p>}

      <div className="reset-form-button">
        <button
          type="submit"
          className="reset-form-buttons"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default SetPasswordForm;
