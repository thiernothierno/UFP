// import { Link, useLocation } from "react-router-dom";
// // import "./pastEvents.css";
// import EventsDropdown from "../navigation/EventsDropdown";
// const PastEvents = () => {
//   const { state } = useLocation();
//   const isMemberView = state?.memberView === true;
//   const memberNavState = isMemberView ? { memberView: true } : undefined;
//   const now = new Date();
//   const year = now.getFullYear();

//   return (
//     <div className="page-container">
//       {/* Header */}
//       <div
//         className={
//           isMemberView ? "site-header member-site-header" : "site-header"
//         }
//       >
//         <div className="brand">
//           <img src="/ufp-logo.jpg" alt="logo" width="100" height="100" />
//           {isMemberView ? (
//             <h1>Union For Progress</h1>
//           ) : (
//             <span className="brand-name">UNION FOR PROGRESS</span>
//           )}
//         </div>

//         <nav className="home-nav-bar">
//           <ul className="nav-center">
//             <li>
//               <Link to={isMemberView ? "/user-login" : "/"}>HOME</Link>
//             </li>
//             <li>
//               <Link to="/about" state={memberNavState}>
//                 ABOUT
//               </Link>
//             </li>

//             <EventsDropdown memberNavState={memberNavState} />

//             <li>
//               <Link to="/contact" state={memberNavState}>
//                 CONTACT
//               </Link>
//             </li>
//           </ul>

//           <ul className="nav-right">
//             <li>
//               <Link to="/donate" className="donate" state={memberNavState}>
//                 DONATE
//               </Link>
//             </li>
//           </ul>
//         </nav>
//       </div>

//       {/* Main content */}
//       <main className="main-content">
//         {/* Your website content goes here */}
//         <div class="about-grid">
//           <h2>No Event Posted Yet</h2>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="footer">
//         <p>© {year} UFP. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default PastEvents;

import { useEffect, useId, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import EventsDropdown from "../navigation/EventsDropdown";
import "./pastEvents.css";
import pastEvents from "../../data/pastEvents";

const formatEventDate = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const splitSentences = (description) =>
  description
    .match(/[^.!?]+[.!?]+|[^.!?]+$/g)
    ?.map((sentence) => sentence.trim()) || [description];

const currentYear = new Date().getFullYear();

const PastEventCard = ({ event }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const descriptionId = useId();
  const sentences = splitSentences(event.description);
  const hasMoreSentences = sentences.length > 1;
  const completeDescription = sentences.join(" ");

  return (
    <article className="past-event-card">
      <img
        className="past-event-image"
        src={event.image}
        alt={event.imageAlt}
        loading="lazy"
      />
      <div className="past-event-content">
        <time dateTime={event.date}>{formatEventDate(event.date)}</time>
        <h4>{event.title}</h4>
        <p id={descriptionId}>
          {isExpanded ? completeDescription : sentences[0]}
        </p>
        {hasMoreSentences && (
          <button
            className="past-event-read-more"
            type="button"
            aria-expanded={isExpanded}
            aria-controls={descriptionId}
            onClick={() => setIsExpanded((expanded) => !expanded)}
          >
            {isExpanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>
    </article>
  );
};

const PastEventsYear = ({ year, events }) => {
  return (
    <section
      className="past-events-year"
      id={`events-${year}`}
      aria-labelledby={`year-title-${year}`}
    >
      <div className="past-events-year-heading">
        <h3 id={`year-title-${year}`}>{year}</h3>
        <span>
          {events.length} {events.length === 1 ? "event" : "events"}
        </span>
      </div>

      <div className="past-events-grid" id={`event-grid-${year}`}>
        {events.map((event, index) => (
          <PastEventCard key={`${event.id}-${index}`} event={event} />
        ))}
      </div>
    </section>
  );
};

const PastEvents = () => {
  const { state } = useLocation();
  const isMemberView = state?.memberView === true;
  const [isHeaderCompact, setIsHeaderCompact] = useState(false);
  const memberNavState = isMemberView ? { memberView: true } : undefined;

  useEffect(() => {
    if (!isMemberView) return undefined;

    const updateHeaderSize = () => {
      setIsHeaderCompact(window.scrollY > 24);
    };

    updateHeaderSize();
    window.addEventListener("scroll", updateHeaderSize, { passive: true });

    return () => window.removeEventListener("scroll", updateHeaderSize);
  }, [isMemberView]);

  const eventsByYear = pastEvents.reduce((groups, event) => {
    const eventYear = event.date.slice(0, 4);
    groups[eventYear] = [...(groups[eventYear] || []), event];
    return groups;
  }, {});
  const years = Object.keys(eventsByYear).sort((a, b) => Number(b) - Number(a));
  const [selectedYear, setSelectedYear] = useState(() => {
    const thisYear = String(currentYear);
    return years.includes(thisYear) ? thisYear : years[0] || "";
  });

  return (
    <div
      className={
        isMemberView
          ? `page-container past-events-member-view${
              isHeaderCompact ? " past-events-header-compact" : ""
            }`
          : "page-container"
      }
    >
      {/* Header */}
      <div
        className={
          isMemberView ? "site-header member-site-header" : "site-header"
        }
      >
        <div className="brand">
          <img src="/ufp-logo.jpg" alt="logo" width="100" height="100" />
          {isMemberView ? (
            <h1>Union For Progress</h1>
          ) : (
            <span className="brand-name">UNION FOR PROGRESS</span>
          )}
        </div>

        <nav className="home-nav-bar">
          <ul className="nav-center">
            <li>
              <Link to={isMemberView ? "/user-login" : "/"}>HOME</Link>
            </li>
            <li>
              <Link to="/about" state={memberNavState}>
                ABOUT
              </Link>
            </li>

            <EventsDropdown memberNavState={memberNavState} />

            <li>
              <Link to="/contact" state={memberNavState}>
                CONTACT
              </Link>
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
      <main className="past-events-main">
        <section
          className="past-events-intro"
          aria-label="Past events introduction"
        >
          {/* <p className="past-events-eyebrow">MEMORIES THAT MOVE US FORWARD</p> */}
          {/* <h2 id="past-events-title">Past Events</h2> */}
          <h3 className="past-events-text">
            Explore Events, Gatherings, Conversations, And Moments That Have
            Brought Our Community Together.
          </h3>
        </section>
        <p>Select a year to see events</p>
        {years.length > 0 ? (
          <div className="past-events-layout">
            <aside className="past-events-year-panel">
              <div
                className="past-events-year-selector"
                role="group"
                aria-label="Select a year of past events"
              >
                {years.map((eventYear) => (
                  <button
                    key={eventYear}
                    type="button"
                    aria-pressed={selectedYear === eventYear}
                    onClick={() => setSelectedYear(eventYear)}
                  >
                    {eventYear}
                  </button>
                ))}
              </div>
            </aside>

            <section
              className="past-events-results-card"
              aria-label={`Events from ${selectedYear}`}
            >
              <PastEventsYear
                year={selectedYear}
                events={eventsByYear[selectedYear] || []}
              />
            </section>
          </div>
        ) : (
          <p className="past-events-empty">
            No past events have been added yet.
          </p>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© {currentYear} UFP. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PastEvents;
