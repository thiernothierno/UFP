import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "../navigation/Header";
import Footer from "../navigation/Footer";

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
  return (
    <div className="page-container member-page-container">
      <Header isMemberView />

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

      <Footer />
    </div>
  );
};

export default MemberHome;
