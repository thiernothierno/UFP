import "./home.css";

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
                <a href="#upcoming-event">Upcoming Events</a>
              </div>
            </li>

            <li>
              <a href="#contact">CONTACT</a>
            </li>
          </ul>

          <ul className="nav-right">
            <li>
              <a href="#" className="donate">
                DONATE
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <main className="main-content">
        {/* Your website content goes here */}

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
