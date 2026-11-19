import { useEffect, useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import Header from "../navigation/Header";
import Footer from "../navigation/Footer";

const workImages = [
  {
    src: "/member-photo.jpeg",
    alt: "Community members gathered for a meeting",
  },
  {
    src: "/member-photo1.jpeg",
    alt: "Community members at a gathering",
  },
  {
    src: "/barbecue-place.jpeg",
    alt: "Outdoor community gathering space",
  },
];

const Home = () => {
  const [imageIndex, setImageIndex] = useState(() =>
    Math.floor(Math.random() * workImages.length),
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setImageIndex((currentIndex) => {
        const nextOffset =
          Math.floor(Math.random() * (workImages.length - 1)) + 1;
        return (currentIndex + nextOffset) % workImages.length;
      });
    }, 30_000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="page-container home-page-container">
      {/* Main header  */}
      <Header />
      {/* Main content */}
      <main className="main-content">
        <div className="content-row">
          <section className="home-copy" aria-labelledby="home-headline">
            <div>
              <h2 id="home-headline">
                Building a stronger
                <br />
                community, together.
              </h2>
              <p>
                Explore events open to members and visitors, learn about Union
                for Progress, and find member resources and support.
              </p>
            </div>
            <div className="home-actions">
              <Link
                to="/member-login"
                className="home-button home-button--member"
              >
                Member Login
              </Link>
              <Link to="/contact" className="home-button home-button--join">
                Join Us
              </Link>
            </div>
          </section>
          <div className="home-image">
            <img
              src={workImages[imageIndex].src}
              alt={workImages[imageIndex].alt}
            />
          </div>
        </div>

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
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
