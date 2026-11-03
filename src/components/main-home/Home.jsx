import "./home.css";

const Home = () => {
  const now = new Date();
  const year = now.getFullYear();
  return (
    <div className="site-header">
      {/* Logo on the left */}
      <div className="brand">
        <img src="/logo.jpg" alt="logo" width="100" height="100" />
        <h1>Union For Progress</h1>
      </div>

      {/* Navigation in the middle */}
      <nav className="home-nav-bar">
        <ul className="nav-center">
          <li>
            <a href="#">HOME</a>
          </li>
          <li>
            <a href="#about">ABOUT</a>
          </li>

          <li className="dropdown">
            <a href="#" className="dropbtn">
              EVENTS
            </a>
            <div className="dropdown-content">
              <a href="#past-event">Past Events</a>
              <a href="#upcoming-event">Upcoming Event</a>
            </div>
          </li>
          <li>
            <a href="#contact">CONTACT</a>
          </li>
        </ul>

        {/* Navigation on the right */}
        <ul className="nav-right">
          <li>
            <a href="#" className="donate">
              DONATE
            </a>
          </li>
        </ul>
      </nav>
      <div class="footer">
        <footer>
          <p>© {year} UFP. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
