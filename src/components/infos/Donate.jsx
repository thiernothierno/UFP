import { Link, useLocation } from "react-router-dom";
import "./donate.css";
import EventsDropdown from "../navigation/EventsDropdown";
import { FiSearch } from "react-icons/fi";

const Donate = () => {
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
          <img src="/ufp-logo.jpg" alt="logo" width="50" height="50" />
          {isMemberView ? (
            <span className="brand-name">UNION FOR PROGRESS</span>
          ) : (
            <span className="brand-name">UNION FOR PROGRESS</span>
          )}
        </div>

        <nav className="home-nav-bar">
          <ul className="nav-center">
            <li>
              <Link to={isMemberView ? "/user-login" : "/"}>Home</Link>
            </li>
            <li>
              <Link to="/about" state={memberNavState}>
                About
              </Link>
            </li>

            <EventsDropdown memberNavState={memberNavState} />

            <li>
              <Link to="/contact" state={memberNavState}>
                Contact
              </Link>
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
        <div class="about-grid">
          <div class="about-item">
            <h2>Who We Are</h2>
            <p>donation page</p>
          </div>

          <div class="about-item">
            <h2>What We Do</h2>
            <p></p>
          </div>

          <div class="about-item">
            <h2>Our Mission</h2>
            <p></p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© {year} UFP. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Donate;
