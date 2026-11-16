import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./eventsDropdown.css";

const EventsDropdown = ({ memberNavState }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const menuId = useId();

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    const handlePointerDown = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <li
      className="dropdown"
      ref={dropdownRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          closeMenu();
        }
      }}
    >
      <button
        ref={triggerRef}
        className="dropbtn"
        type="button"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((open) => !open)}
      >
        EVENTS
      </button>
      <div
        className={`dropdown-content${isOpen ? " dropdown-content-open" : ""}`}
        id={menuId}
      >
        <Link to="/past-event" state={memberNavState} onClick={closeMenu}>
          Past
        </Link>
        <Link to="/upcoming-event" state={memberNavState} onClick={closeMenu}>
          Upcoming
        </Link>
      </div>
    </li>
  );
};

export default EventsDropdown;
