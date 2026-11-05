import React, { useState } from "react";
import "./sideBar.css";

const navigationItems = [
  {
    label: "Payments",
    links: ["Monthly Payment", "Summary", "Infraction"],
  },
  {
    label: "Rules",
    links: ["Rules and Regulation", "Ruling Schedule"],
  },
  {
    label: "Meetings & Assistance",
    links: ["Meetings", "Agenda", "Assistance"],
  },
  {
    label: "Account",
    links: ["Profile", "Settings", "Sign out"],
  },
];

const SideBar = () => {
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
    <nav className="member-sidebar" aria-label="Member navigation">
        <h2 className="sidebar-heading">Member Menu</h2>
        <ul className="member-navigation">
          {navigationItems.map(({ label, links }, index) => {
            const isExpanded = expandedItems.has(label);
            const submenuId = `submenu-${index}`;

            return (
              <li className="navigation-item" key={label}>
                <button
                  className="navigation-toggle"
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={submenuId}
                  onClick={() => toggleItem(label)}
                >
                  {label}
                </button>
                <ul className="member-submenu" id={submenuId} hidden={!isExpanded}>
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#">{link}</a>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
    </nav>
  );
};

export default SideBar;
