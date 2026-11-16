import { Link, useLocation } from "react-router-dom";
// import "./pastEvents.css";
import EventsDropdown from "../navigation/EventsDropdown";
const PastEvents = () => {
  const { state } = useLocation();
  const isMemberView = state?.memberView === true;
  const memberNavState = isMemberView ? { memberView: true } : undefined;
  const now = new Date();
  const year = now.getFullYear();

  return (
    <div className="page-container">
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
      <main className="main-content">
        {/* Your website content goes here */}
        <div class="about-grid">
          <h2>No Event Posted Yet</h2>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© {year} UFP. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PastEvents;

// import { useEffect, useId, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import EventsDropdown from "../navigation/EventsDropdown";
// import "./pastEvents.css";
// // import pastEvents from "../../data/pastEvents";

// const pastEvents = [
//   {
//     id: "summer-community-gathering-2025",
//     date: "2026-08-16",
//     title: "Summer Community Gathering",
//     description:
//       "Neighbors came together for an afternoon of conversation, food, and community connection.Neighbors came together for an afternoon of conversation, food, and community connection.Neighbors came together for an afternoon of conversation, food, and community connection.Neighbors came together for an afternoon of conversation, food, and community connection.Neighbors came together for an afternoon of conversation, food, and community connection.Neighbors came together for an afternoon of conversation, food, and community connection.Neighbors came together for an afternoon of conversation, food, and community connection.Neighbors came together for an afternoon of conversation, food, and community connection.Neighbors came together for an afternoon of conversation, food, and community connection.Neighbors came together for an afternoon of conversation, food, and community connection.Neighbors came together for an afternoon of conversation, food, and community connection.Neighbors came together for an afternoon of conversation, food, and community connection.Neighbors came together for an afternoon of conversation, food, and community connection.Neighbors came together for an afternoon of conversation, food, and community connection.Neighbors came together for an afternoon of conversation, food, and community connection.Neighbors came together for an afternoon of conversation, food, and community connection.Neighbors came together for an afternoon of conversation, food, and community connection.Neighbors came together for an afternoon of conversation, food, and community connection.Neighbors came together for an afternoon of conversation, food, and community connection.Neighbors came together for an afternoon of conversation, food, and community connection.Neighbors came together for an afternoon of conversation, food, and community connection.Neighbors came together for an afternoon of conversation, food, and community connection.Neighbors came together for an afternoon of conversation, food, and community connection.Neighbors came together for an afternoon of conversation, food, and community connection.Neighbors came together for an afternoon of conversation, food, and community connection.Neighbors came together for an afternoon of conversation, food, and community connection.Neighbors came together for an afternoon of conversation, food, and community connection.",
//     image: "/member-photo.jpeg",
//     imageAlt: "Community members gathered together indoors",
//   },
//   {
//     id: "summer-community-gathering-2025",
//     date: "2026-08-16",
//     title: "Summer Community Gathering",
//     description:
//       "Neighbors came together for an afternoon of conversation, food, and community connection.",
//     image: "/member-photo.jpeg",
//     imageAlt: "Community members gathered together indoors",
//   },
//   {
//     id: "summer-community-gathering-2025",
//     date: "2025-08-16",
//     title: "Summer Community Gathering",
//     description:
//       "Neighbors came together for an afternoon of conversation, food, and community connection.",
//     image: "/member-photo.jpeg",
//     imageAlt: "Community members gathered together indoors",
//   },
//   {
//     id: "summer-community-gathering-2025",
//     date: "2025-08-16",
//     title: "Summer Community Gathering",
//     description:
//       "Neighbors came together for an afternoon of conversation, food, and community connection.",
//     image: "/member-photo.jpeg",
//     imageAlt: "Community members gathered together indoors",
//   },
//   {
//     id: "summer-community-gathering-2025",
//     date: "2025-08-16",
//     title: "Summer Community Gathering",
//     description:
//       "Neighbors came together for an afternoon of conversation, food, and community connection.",
//     image: "/member-photo.jpeg",
//     imageAlt: "Community members gathered together indoors",
//   },
//   {
//     id: "summer-community-gathering-2025",
//     date: "2025-08-16",
//     title: "Summer Community Gathering",
//     description:
//       "Neighbors came together for an afternoon of conversation, food, and community connection.",
//     image: "/member-photo.jpeg",
//     imageAlt: "Community members gathered together indoors",
//   },
//   {
//     id: "community-planning-meeting-2025",
//     date: "2025-03-22",
//     title: "Community Planning Meeting",
//     description:
//       "Members shared ideas and priorities for strengthening our community and planning future activities.",
//     image: "/member-photo1.jpeg",
//     imageAlt: "Community members taking part in a group discussion",
//   },
//   {
//     id: "neighborhood-barbecue-2024",
//     date: "2024-07-13",
//     title: "Neighborhood Barbecue",
//     description:
//       "Families and neighbors enjoyed a summer get-together and made time to connect with one another.",
//     image: "/barbecue-place.jpeg",
//     imageAlt: "Outdoor gathering space by the water",
//   },
// ];

// const formatEventDate = (date) =>
//   new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
//     month: "long",
//     day: "numeric",
//     year: "numeric",
//   });

// const splitSentences = (description) =>
//   description
//     .match(/[^.!?]+[.!?]+|[^.!?]+$/g)
//     ?.map((sentence) => sentence.trim()) || [description];

// const currentYear = new Date().getFullYear();

// const PastEventCard = ({ event }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const descriptionId = useId();
//   const sentences = splitSentences(event.description);
//   const hasMoreSentences = sentences.length > 1;
//   const completeDescription = sentences.join(" ");

//   return (
//     <article className="past-event-card">
//       <img
//         className="past-event-image"
//         src={event.image}
//         alt={event.imageAlt}
//         loading="lazy"
//       />
//       <div className="past-event-content">
//         <time dateTime={event.date}>{formatEventDate(event.date)}</time>
//         <h4>{event.title}</h4>
//         <p id={descriptionId}>
//           {isExpanded ? completeDescription : sentences[0]}
//         </p>
//         {hasMoreSentences && (
//           <button
//             className="past-event-read-more"
//             type="button"
//             aria-expanded={isExpanded}
//             aria-controls={descriptionId}
//             onClick={() => setIsExpanded((expanded) => !expanded)}
//           >
//             {isExpanded ? "Read less" : "Read more"}
//           </button>
//         )}
//       </div>
//     </article>
//   );
// };

// const PastEventsYear = ({ year, events }) => {
//   return (
//     <section
//       className="past-events-year"
//       id={`events-${year}`}
//       aria-labelledby={`year-title-${year}`}
//     >
//       <div className="past-events-year-heading">
//         <h3 id={`year-title-${year}`}>{year}</h3>
//         <span>
//           {events.length} {events.length === 1 ? "event" : "events"}
//         </span>
//       </div>

//       <div className="past-events-grid" id={`event-grid-${year}`}>
//         {events.map((event, index) => (
//           <PastEventCard key={`${event.id}-${index}`} event={event} />
//         ))}
//       </div>
//     </section>
//   );
// };

// const PastEvents = () => {
//   const { state } = useLocation();
//   const isMemberView = state?.memberView === true;
//   const [isHeaderCompact, setIsHeaderCompact] = useState(false);
//   const memberNavState = isMemberView ? { memberView: true } : undefined;

//   useEffect(() => {
//     if (!isMemberView) return undefined;

//     const updateHeaderSize = () => {
//       setIsHeaderCompact(window.scrollY > 24);
//     };

//     updateHeaderSize();
//     window.addEventListener("scroll", updateHeaderSize, { passive: true });

//     return () => window.removeEventListener("scroll", updateHeaderSize);
//   }, [isMemberView]);

//   const eventsByYear = pastEvents.reduce((groups, event) => {
//     const eventYear = event.date.slice(0, 4);
//     groups[eventYear] = [...(groups[eventYear] || []), event];
//     return groups;
//   }, {});
//   const years = Object.keys(eventsByYear).sort((a, b) => Number(b) - Number(a));

//   return (
//     <div
//       className={
//         isMemberView
//           ? `page-container past-events-member-view${
//               isHeaderCompact ? " past-events-header-compact" : ""
//             }`
//           : "page-container"
//       }
//     >
//       {/* Header */}
//       <div
//         className={
//           isMemberView ? "site-header member-site-header" : "site-header"
//         }
//       >
//         <div className="brand">
//           <img src="/ufp-logo.jpg" alt="logo" width="100" height="100" />
//           <h1>UNION FOR PROGRESS</h1>
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
//       <main className="past-events-main">
//         <section
//           className="past-events-intro"
//           aria-labelledby="past-events-title"
//         >
//           <p className="past-events-eyebrow">MEMORIES THAT MOVE US FORWARD</p>
//           {/* <h2 id="past-events-title">Past Events</h2> */}
//           {/* <p>
//             Explore the gatherings, conversations, and moments that have brought
//             our community together.
//           </p> */}
//         </section>

//         {years.length > 0 ? (
//           <>
//             <nav
//               className="past-events-years"
//               aria-label="Browse events by year"
//             >
//               <span>Jump to a year</span>
//               {years.map((eventYear) => (
//                 <a key={eventYear} href={`#events-${eventYear}`}>
//                   {eventYear}
//                 </a>
//               ))}
//             </nav>

//             {years.map((eventYear) => (
//               <PastEventsYear
//                 key={eventYear}
//                 year={eventYear}
//                 events={eventsByYear[eventYear]}
//               />
//             ))}
//           </>
//         ) : (
//           <p className="past-events-empty">
//             No past events have been added yet.
//           </p>
//         )}
//       </main>

//       {/* Footer */}
//       <footer className="footer">
//         <p>© {currentYear} UFP. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default PastEvents;
