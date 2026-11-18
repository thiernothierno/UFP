import "./home.css";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import EventsDropdown from "../navigation/EventsDropdown";

const Home = () => {
  const now = new Date();
  const year = now.getFullYear();

  return (
    <div className="page-container">
      {/* Header */}
      <div className="site-header">
        <div className="brand">
          <img src="/ufp-logo.jpg" alt="logo" width="50" height="50" />
          <span className="brand-name">UNION FOR PROGRESS</span>
        </div>

        <nav className="home-nav-bar">
          <ul className="nav-center">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>

            <EventsDropdown />

            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li className="search-bar-item">
              <form
                className="search-bar"
                role="search"
                onSubmit={(event) => event.preventDefault()}
              >
                <input
                  type="text"
                  placeholder="Ask us anything about UFP"
                  aria-label="Search UFP"
                />
                <button type="submit" aria-label="Search" title="Search">
                  <FiSearch aria-hidden="true" />
                </button>
              </form>
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
        <section className="home-hero" aria-labelledby="home-headline">
          <h2 id="home-headline">Building a stronger community, together.</h2>
          <p>
            Explore events open to members and visitors, learn about Union for
            Progress, and find member resources and support.
          </p>
        </section>

        <div className="image-marquee">
          <div className="image-track">
            {/* <img src="/member-photo.jpeg" alt="" />
            <img src="/member-photo1.jpeg" alt="" />
            <img src="/barbecue-place.jpeg" alt="" />
            <img src="/member-photo1.jpeg" alt="" />
            <img src="/member-photo.jpeg" alt="" />
            <img src="/barbecue-place.jpeg" alt="" />
            <img src="/member-photo.jpeg" alt="" />
            <img src="/member-photo1.jpeg" alt="" />
            <img src="/barbecue-place.jpeg" alt="" />
            <img src="/member-photo1.jpeg" alt="" />
            <img src="/member-photo.jpeg" alt="" />
            <img src="/barbecue-place.jpeg" alt="" /> */}
          </div>
        </div>

        <div className="member-section">
          <Link to="/member-login" className="member-login">
            Member Login
          </Link>
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
