import { useState } from "react";
import { Link } from "react-router-dom";
import "./reset.css";

const ResetForm = () => {
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="reset-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="email"
        value={inputs.email}
        onChange={handleChange}
        placeholder="Enter your email"
        required
      />

      <div className="reset-form-button">
        <Link to="/reset-password" className="reset-form-buttons">
          Reset Password
        </Link>
      </div>
    </form>
  );
};

export default ResetForm;
