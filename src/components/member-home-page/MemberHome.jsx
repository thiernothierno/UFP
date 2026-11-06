import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import SideBar from "./SideBar";
const MemberHome = () => {
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
      <main
        className={`main-content member-main ${sidebarVisible ? "" : "member-main--wide"}`}
      >
        <div className={sidebarVisible ? "" : "member-sidebar--hidden"}>
          <SideBar />
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
