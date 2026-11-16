import { Link } from "react-router-dom";
import ResetForm from "./ResetForm";
import EventsDropdown from "../navigation/EventsDropdown";

const ResetPassword = () => {
  const now = new Date();
  const year = now.getFullYear();

  return (
    <div className="page-container">
      {/* Header */}
      <div className="site-header">
        <div className="brand">
          <img src="/ufp-logo.jpg" alt="logo" width="100" height="100" />
          <h1>Union For Progress</h1>
        </div>

        <nav className="home-nav-bar">
          <ul className="nav-center">
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/about">ABOUT</Link>
            </li>

            <EventsDropdown />

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
      <main className="main-content reset-main-content">
        {/* Your website content goes here */}
        <ResetForm />
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© {year} UFP. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ResetPassword;
