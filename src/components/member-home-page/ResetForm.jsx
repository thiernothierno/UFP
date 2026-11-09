import { useState } from "react";
import supabase from "../../lib/supabase";
import "./reset.css";

const ResetForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);

    try {
      // Supabase emails a recovery link that returns to the password form.
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        {
          redirectTo: `${window.location.origin}/set-password`,
        },
      );

      if (resetError) {
        setError(resetError.message);
        return;
      }

      setMessage(
        // Use the same response whether or not the email matches an account.
        "If an account exists for that email, a password reset link has been sent.",
      );
    } catch (resetError) {
      setError(
        resetError instanceof Error
          ? resetError.message
          : "An unexpected error occurred while requesting a reset link.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="reset-form" onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
          setError("");
          setMessage("");
        }}
        placeholder="Enter your email"
        autoComplete="email"
        required
      />

      {error && <p role="alert">{error}</p>}
      {message && <p role="status">{message}</p>}

      <div className="reset-form-button">
        <button
          type="submit"
          className="reset-form-buttons"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send reset link"}
        </button>
      </div>
    </form>
  );
};

export default ResetForm;
