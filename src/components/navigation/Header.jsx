import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import EventsDropdown from "../navigation/EventsDropdown";
import "./header.css";

const Header = ({ isMemberView = false }) => {
  const memberNavState = isMemberView ? { memberView: true } : undefined;

  return (
    <div
      className={
        isMemberView ? "site-header member-site-header" : "site-header"
      }
    >
      <div className="brand">
        <img src="/ufp-logo.jpg" alt="logo" />
        <span className="brand-name">UNION FOR PROGRESS</span>
      </div>

      <nav className="home-nav-bar">
        <ul className="nav-center">
          <li>
            <Link to={isMemberView ? "/user-login" : "/"}>
              Home
            </Link>
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
            <Link
              to="/donate"
              className="donate"
              state={memberNavState}
            >
              DONATE
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
