import { Link, useLocation } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import EventsDropdown from "../navigation/EventsDropdown";
import { useTheme } from "../../themeContext";
import "./header.css";

const Header = ({ isMemberView = false }) => {
  const { pathname } = useLocation();
  const memberNavState = isMemberView ? { memberView: true } : undefined;
  const { theme, toggleTheme } = useTheme();
  const isHomePage = isMemberView
    ? pathname === "/user-login"
    : pathname === "/";

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
            <Link
              to={isMemberView ? "/user-login" : "/"}
              aria-current={isHomePage ? "page" : undefined}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              state={memberNavState}
              aria-current={pathname === "/about" ? "page" : undefined}
            >
              About
            </Link>
          </li>

          <EventsDropdown memberNavState={memberNavState} />

          <li>
            <Link
              to="/contact"
              state={memberNavState}
              aria-current={pathname === "/contact" ? "page" : undefined}
            >
              Contact
            </Link>
          </li>
          <li className="search-bar-item">
            <form
              className="header-search-bar"
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
            <select name="" id="">
              <option value="1">English</option>
              <option value="2">French</option>
            </select>
          </li>
          <li>
            <button
              className="theme-switch"
              type="button"
              role="switch"
              aria-checked={theme === "dark"}
              onClick={toggleTheme}
            >
              <span className="theme-switch-label">
                {theme === "dark" ? "Dark mode" : "Light mode"}
              </span>
              <span className="theme-switch-track" aria-hidden="true">
                <span className="theme-switch-thumb" />
              </span>
            </button>
          </li>
          <li>
            <Link
              to="/donate"
              className="donate"
              state={memberNavState}
              aria-current={pathname === "/donate" ? "page" : undefined}
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
