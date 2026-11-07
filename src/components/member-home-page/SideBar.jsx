import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sideBar.css";

const navigationItems = [
  {
    label: "Payments",
    links: [
      { label: "Monthly Payment", to: "/user-login/records?view=payments" },
      { label: "Summary", to: "/user-login/records?view=summary" },
      { label: "Infraction", to: "/user-login/records?view=infractions" },
    ],
  },
  {
    label: "Rules",
    links: [
      { label: "Rules and Regulation", to: "/user-login/rules" },
      { label: "Ruling Schedule", to: "/user-login/ruling-schedule" },
    ],
  },
  {
    label: "Meetings & Assistance",
    links: [
      { label: "Meetings", to: "/user-login/meetings" },
      { label: "Agenda", to: "/user-login/agenda" },
      { label: "Assistance", to: "/user-login/assistance" },
    ],
  },
  {
    label: "Meeting Summary",
    links: [{ label: "Meeting-Summary", to: "/user-login/meeting-summary" }],
  },
  {
    label: "Account",
    links: [{ label: "Profile" }, { label: "Settings" }, { label: "Sign out" }],
  },
];

const SideBar = () => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState(() => new Set());

  function toggleItem(label) {
    setExpandedItems((currentItems) => {
      const nextItems = new Set(currentItems);
      if (nextItems.has(label)) {
        nextItems.delete(label);
      } else {
        nextItems.add(label);
      }
      return nextItems;
    });
  }

  return (
    <nav
      className="member-sidebar"
      id="member-sidebar"
      aria-label="Member navigation"
    >
      <h2 className="sidebar-heading">Member Menu</h2>
      <ul className="member-navigation">
        {navigationItems.map(({ label, links }, index) => {
          const hasActiveLink = links.some(({ to }) => {
            if (!to) return false;
            const [path, query = ""] = to.split("?");
            return (
              location.pathname === path &&
              location.search === (query ? `?${query}` : "")
            );
          });
          const isExpanded = expandedItems.has(label) || hasActiveLink;
          const submenuId = `submenu-${index}`;

          return (
            <li className="navigation-item" key={label}>
              <button
                className={`navigation-toggle${hasActiveLink ? " has-active-link" : ""}`}
                type="button"
                aria-expanded={isExpanded}
                aria-controls={submenuId}
                onClick={() => toggleItem(label)}
              >
                {label}
              </button>
              <ul
                className="member-submenu"
                id={submenuId}
                hidden={!isExpanded}
              >
                {links.map(({ label: linkLabel, to }) => {
                  const [path, query = ""] = (to ?? "").split("?");
                  const isActive =
                    Boolean(to) &&
                    location.pathname === path &&
                    location.search === (query ? `?${query}` : "");

                  return (
                    <li key={linkLabel}>
                      {to ? (
                        <Link
                          to={to}
                          className={isActive ? "is-active" : undefined}
                          aria-current={isActive ? "page" : undefined}
                        >
                          {linkLabel}
                        </Link>
                      ) : (
                        <span className="unavailable-link" aria-disabled="true">
                          {linkLabel}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SideBar;
