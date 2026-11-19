import { useLocation } from "react-router-dom";
import ContactForm from "./ContactForm";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import "./contact.css";
import Header from "../navigation/Header";
import Footer from "../navigation/Footer";
const Contact = () => {
  const { state } = useLocation();
  const isMemberView = state?.memberView === true;

  return (
    <div className="page-container">
      <Header isMemberView={isMemberView} />

      {/* Main content */}
      <main className="main-content">
        {/* Your website content goes here */}
        <div className="contact-layout">
          <div className="contact-info">
            <div className="contact-item">
              <h2>Contact Us</h2>
              <p>Feel free to use the form or send us an email</p>
              <p>
                <PhoneIcon />
                888-888-8888
              </p>
              <p>
                <EmailIcon />
                ufp@gmail.com
              </p>
            </div>
            <div className="contact-item">
              <h2>Other Way To Contact Us</h2>
              <p>
                <FacebookIcon />
                facebook
              </p>
            </div>
          </div>
          <ContactForm />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
