import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import SideBar from "./SideBar";
import EventsDropdown from "../navigation/EventsDropdown";
import { FiSearch } from "react-icons/fi";

const MemberHome = ({ member }) => {
  const { pathname } = useLocation();
  const wideTablePage =
    pathname === "/user-login/records" ||
    pathname === "/user-login/ruling-schedule";
  const [sidebarOverride, setSidebarOverride] = useState(null);
  const sidebarVisible =
    sidebarOverride?.pathname === pathname
      ? sidebarOverride.visible
      : !wideTablePage;
  const now = new Date();
  const year = now.getFullYear();

  return (
    <div className="page-container member-page-container">
      {/* Header */}
      <div className="site-header member-site-header">
        <div className="brand">
          <img src="/ufp-logo.jpg" alt="logo" width="50" height="50" />
          <h1>UNION FOR PROGRESS</h1>
        </div>

        <nav className="home-nav-bar">
          <ul className="nav-center">
            <li>
              <Link to="/user-login">Home</Link>
            </li>
            <li>
              <Link to="/about" state={{ memberView: true }}>
                About
              </Link>
            </li>

            <EventsDropdown memberNavState={{ memberView: true }} />

            <li>
              <Link to="/contact" state={{ memberView: true }}>
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
                state={{ memberView: true }}
              >
                DONATE
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <main
        className={`main-content member-main ${sidebarVisible ? "" : "member-main--wide"}`}
      >
        <div className={sidebarVisible ? "" : "member-sidebar--hidden"}>
          {/* Profile details are loaded and validated by RequireActiveMember. */}
          <SideBar member={member} />
        </div>
        <section className="member-content">
          <button
            className="member-sidebar-toggle"
            type="button"
            aria-expanded={sidebarVisible}
            aria-controls="member-sidebar"
            onClick={() =>
              setSidebarOverride({
                pathname,
                visible: !sidebarVisible,
              })
            }
          >
            {sidebarVisible ? "Hide member menu" : "Show member menu"}
          </button>
          <Outlet />
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© {year} UFP. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MemberHome;
