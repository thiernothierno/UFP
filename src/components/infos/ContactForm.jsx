import { useState } from "react";
import supabase from "../../lib/supabase";

const initialInputs = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  message: "",
};

const ContactForm = () => {
  const [inputs, setInputs] = useState(initialInputs);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    setIsSubmitted(false);

    try {
      const { error } = await supabase.from("contact_messages").insert({
        first_name: inputs.first_name.trim(),
        last_name: inputs.last_name.trim(),
        email: inputs.email.trim(),
        phone: inputs.phone.trim(),
        message: inputs.message.trim(),
      });

      if (error) {
        setSubmitError(error.message);
        return;
      }

      setInputs(initialInputs);
      setIsSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while sending your message.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="assistance-form" onSubmit={handleSubmit}>
      <label htmlFor="contact-first-name">First Name</label>
      <input
        id="contact-first-name"
        type="text"
        name="first_name"
        value={inputs.first_name}
        onChange={handleChange}
        placeholder="First name"
        maxLength="100"
        required
      />
      <label htmlFor="contact-last-name">Last Name</label>
      <input
        id="contact-last-name"
        type="text"
        name="last_name"
        value={inputs.last_name}
        onChange={handleChange}
        placeholder="Last name"
        maxLength="100"
        required
      />
      <label htmlFor="contact-email">Email</label>
      <input
        id="contact-email"
        type="email"
        name="email"
        value={inputs.email}
        onChange={handleChange}
        placeholder="Email"
        maxLength="320"
        required
      />
      <label htmlFor="contact-phone">Phone</label>
      <input
        id="contact-phone"
        type="tel"
        name="phone"
        value={inputs.phone}
        onChange={handleChange}
        placeholder="Phone number"
        maxLength="30"
        required
      />
      <label htmlFor="contact-message">Message</label>
      <textarea
        id="contact-message"
        name="message"
        value={inputs.message}
        onChange={handleChange}
        placeholder="Message"
        maxLength="5000"
        required
      />

      {submitError && (
        <p role="alert">Could not send your message: {submitError}</p>
      )}
      {isSubmitted && (
        <p role="status">Your message has been sent. Thank you for contacting us.</p>
      )}

      <div className="assistance-form-buttons">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
