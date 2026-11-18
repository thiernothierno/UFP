import { Link, useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";
import EventsDropdown from "../navigation/EventsDropdown";
import { FiSearch } from "react-icons/fi";

const MemberLoginPage = () => {
  const { state } = useLocation();

  const now = new Date();
  const year = now.getFullYear();

  return (
    <div className="page-container">
      {/* Header */}
      <div className="site-header">
        <div className="brand">
          <img src="/ufp-logo.jpg" alt="logo" width="50" height="50" />
          <span className="brand-name">UNION FOR PROGRESS</span>
        </div>

        <nav className="home-nav-bar">
          <ul className="nav-center">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>

            <EventsDropdown />

            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li className="search-bar-item">
              <form
                className="search-bar"
                role="search"
                onSubmit={(event) => event.preventDefault()}
              >
                <input
                  type="text"
                  placeholder="Ask us anything about UFP"
                  aria-label="Search UFP"
                />
                <button type="submit" aria-label="Search" title="Search">
                  <FiSearch aria-hidden="true" />
                </button>
              </form>
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
