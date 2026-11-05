import { Link } from "react-router-dom";
import ContactForm from "./ContactForm";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import "./contact.css";
const Contact = () => {
  const now = new Date();
  const year = now.getFullYear();

  return (
    <div className="page-container">
      {/* Header */}
      <div className="site-header">
        <div className="brand">
          <img src="/ufp-logo.jpg" alt="logo" width="100" height="100" />
          <h1>UNION FOR PROGRESS</h1>
        </div>

        <nav className="home-nav-bar">
          <ul className="nav-center">
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/about">ABOUT</Link>
            </li>

            <li className="dropdown">
              <Link to="#" className="dropbtn">
                EVENTS
              </Link>
              <div className="dropdown-content">
                <Link to="/past-event">Past</Link>
                <Link to="/upcoming-event">Upcoming</Link>
              </div>
            </li>

            <li>
              <Link to="/contact">CONTACT</Link>
            </li>
          </ul>

          <ul className="nav-right">
            <li>
              <Link to="/donate" className="donate">
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
