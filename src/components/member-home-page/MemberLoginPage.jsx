import { Link, useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";

const MemberLoginPage = () => {
  const { state } = useLocation();

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
      <main className="main-content login-main-content">
        {/* Show the confirmation passed from the successful password-reset flow. */}
        {state?.message && <p role="status">{state.message}</p>}
        <LoginForm />
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© {year} UFP. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MemberLoginPage;
