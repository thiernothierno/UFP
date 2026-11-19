import "./home.css";
import { Link } from "react-router-dom";
import Header from "../navigation/Header";
import Footer from "../navigation/Footer";

const Home = () => {
  return (
    <div className="page-container">
      {/* Main header  */}
      <Header />
      {/* Main content */}
      <main className="main-content">
        <section className="home-hero" aria-labelledby="home-headline">
          <h2 id="home-headline">Building a stronger community, together.</h2>
          <p>
            Explore events open to members and visitors, learn about Union for
            Progress, and find member resources and support.
          </p>
        </section>

        {/* <div className="image-marquee">
          <div className="image-track">
            <img src="/member-photo.jpeg" alt="" />
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
            <img src="/barbecue-place.jpeg" alt="" />
          </div>
        </div> */}

        <div className="member-section">
          <Link to="/member-login" className="member-login">
            Member Login
          </Link>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
