import { useState } from "react";

const ContactForm = () => {
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
    <form className="assistance-form" onSubmit={handleSubmit}>
      <label>First Name</label>
      <input
        type="text"
        name="firstname"
        value={inputs.firstname}
        onChange={handleChange}
        placeholder="first name"
        required
      />
      <label>Last Name</label>

      <input
        type="text"
        name="lastname"
        value={inputs.lastname}
        onChange={handleChange}
        placeholder="last name"
        required
      />
      <label>Email</label>
      <input
        type="text"
        name="email"
        value={inputs.email}
        onChange={handleChange}
        placeholder="email"
        required
      />
      <label>Message</label>
      <textarea
        type="text"
        name="message"
        value={inputs.message}
        onChange={handleChange}
        placeholder="message"
        required
      />

      <div className="assistance-form-buttons">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default ContactForm;
