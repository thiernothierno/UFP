import "./home.css";
import { Link } from "react-router-dom";
const Home = () => {
  const now = new Date();
  const year = now.getFullYear();

  return (
    <div className="page-container">
      {/* Header */}
      <div className="site-header">
        <div className="brand">
          <img src="/logo.jpg" alt="logo" width="100" height="100" />
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
      <main className="main-content">
        {/* Your website content goes here */}
        <div className="image-marquee">
          <div className="image-track">
            <img src="/org1" alt="" />
            <img src="/org1" alt="" />
            <img src="/org1" alt="" />
            <img src="/org1" alt="" />
            <img src="/org1" alt="" />
            <img src="/org1" alt="" />
            <img src="/org1" alt="" />
            <img src="/org1" alt="" />
            <img src="/org1" alt="" />
            <img src="/org1" alt="" />
          </div>
        </div>

        <div className="member-section">
          <button className="member-login">Member Login</button>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© {year} UFP. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
