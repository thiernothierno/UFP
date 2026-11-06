import { useState } from "react";
import { Link } from "react-router-dom";
import "./loginForm.css";
const LoginForm = () => {
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
    <form className="login-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={inputs.username}
        onChange={handleChange}
        placeholder="Username or Email"
        required
      />

      <input
        type="text"
        name="password"
        value={inputs.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />

      <div className="login-buttons">
        <Link to="/user-login" className="login-form-buttons">
          Login
        </Link>
        <Link to="/user-login" className="login-form-buttons">
          Reset Password
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
