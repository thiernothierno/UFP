import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import supabase from "../../lib/supabase";
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
    links: [],
  },
];

const SideBar = ({ member }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState(() => new Set());
  const [signOutError, setSignOutError] = useState("");
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    setIsSigningOut(true);
    setSignOutError("");

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        setSignOutError(`Unable to sign out: ${error.message}`);
        return;
      }

      navigate("/", { replace: true });
    } catch (error) {
      setSignOutError(
        error instanceof Error
          ? `Unable to sign out: ${error.message}`
          : "An unexpected error occurred while signing out.",
      );
    } finally {
      setIsSigningOut(false);
    }
  }

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
              <ul className="member-submenu" id={submenuId} hidden={!isExpanded}>
                {label === "Account" ? (
                  <>
                    {/* These details come from the authenticated user's active member profile. */}
                    <li className="member-profile" aria-label="Member profile">
                      <p>
                        <strong>Name</strong>
                        <span>
                          {[member.firstName, member.lastName]
                            .filter(Boolean)
                            .join(" ") || "Not provided"}
                        </span>
                      </p>
                      <p>
                        <strong>Email</strong>
                        <span>{member.email || "Not provided"}</span>
                      </p>
                      <p>
                        <strong>Member number</strong>
                        <span>{member.memberNumber || "Not provided"}</span>
                      </p>
                    </li>
                    <li>
                      {/* Only an explicit sign-out action ends the session. */}
                      <button
                        className="sidebar-sign-out"
                        type="button"
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                      >
                        {isSigningOut ? "Signing out..." : "Sign out"}
                      </button>
                    </li>
                  </>
                ) : (
                  links.map(({ label: linkLabel, to }) => {
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
                      ) : linkLabel === "Sign out" ? (
                        <button
                          className="sidebar-sign-out"
                          type="button"
                          onClick={handleSignOut}
                          disabled={isSigningOut}
                        >
                          {isSigningOut ? "Signing out..." : linkLabel}
                        </button>
                      ) : (
                        <span className="unavailable-link" aria-disabled="true">
                          {linkLabel}
                        </span>
                      )}
                    </li>
                  );
                  })
                )}
              </ul>
            </li>
          );
        })}
      </ul>
      {signOutError && <p role="alert">{signOutError}</p>}
    </nav>
  );
};

export default SideBar;
