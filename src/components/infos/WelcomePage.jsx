// import { Link, useLocation } from "react-router-dom";
// import "./about.css";

// const WelcomePage = () => {
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
//           <h1>Union For Progress</h1>
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

//             <li className="dropdown">
//               <Link to="" className="dropbtn">
//                 EVENTS
//               </Link>
//               <div className="dropdown-content">
//                 <Link to="/past-event" state={memberNavState}>
//                   Past
//                 </Link>
//                 <Link to="/upcoming-event" state={memberNavState}>
//                   Upcoming
//                 </Link>
//               </div>
//             </li>

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
//       </main>

//       {/* Footer */}
//       <footer className="footer">
//         <p>© {year} UFP. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default WelcomePage;
