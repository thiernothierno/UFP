import { Link, useLocation } from "react-router-dom";
import ContactForm from "./ContactForm";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import "./contact.css";
import EventsDropdown from "../navigation/EventsDropdown";
const Contact = () => {
  const { state } = useLocation();
  const isMemberView = state?.memberView === true;
  const memberNavState = isMemberView ? { memberView: true } : undefined;
  const now = new Date();
  const year = now.getFullYear();

  return (
    <div className="page-container">
      {/* Header */}
      <div
        className={
          isMemberView ? "site-header member-site-header" : "site-header"
        }
      >
        <div className="brand">
          <img src="/ufp-logo.jpg" alt="logo" width="100" height="100" />
          {isMemberView ? (
            <h1>Union For Progress</h1>
          ) : (
            <span className="brand-name">UNION FOR PROGRESS</span>
          )}
        </div>

        <nav className="home-nav-bar">
          <ul className="nav-center">
            <li>
              <Link to={isMemberView ? "/user-login" : "/"}>HOME</Link>
            </li>
            <li>
              <Link to="/about" state={memberNavState}>
                ABOUT
              </Link>
            </li>

            <EventsDropdown memberNavState={memberNavState} />

            <li>
              <Link to="/contact" state={memberNavState}>
                CONTACT
              </Link>
            </li>
          </ul>

          <ul className="nav-right">
            <li>
              <Link to="/donate" className="donate" state={memberNavState}>
                DONATE
              </Link>
            </li>
          </ul>
        </nav>
      </div>

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

      {/* Footer */}
      <footer className="footer">
        <p>© {year} UFP. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Contact;
