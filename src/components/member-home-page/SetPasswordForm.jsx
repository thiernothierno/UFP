import { useState } from "react";

import "./setPassword.css";

const SetPasswordForm = () => {
  const [inputs, setInputs] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInputs((currentInputs) => ({
      ...currentInputs,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputs.password !== inputs.confirmPassword) {
      setError("Password do not match.");
      return;
    }
    setError("");

    // Passwords match. Add the Supabase password update here.
  };

  return (
    <form className="reset-form" onSubmit={handleSubmit}>
      <input
        type="password"
        name="password"
        value={inputs.password}
        onChange={handleChange}
        placeholder="Create a password"
        required
      />
      <input
        type="password"
        name="confirmPassword"
        value={inputs.confirmPassword}
        onChange={handleChange}
        placeholder="Re-enter Password"
        required
      />

      {error && <p role="alert">{error}</p>}

      <div className="reset-form-button">
        <button className="reset-form-buttons">Submit</button>
      </div>
    </form>
  );
};

export default SetPasswordForm;
