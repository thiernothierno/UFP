import { useLocation } from "react-router-dom";
import "./about.css";
import Header from "../navigation/Header";
import Footer from "../navigation/Footer";

const About = () => {
  const { state } = useLocation();
  const isMemberView = state?.memberView === true;

  return (
    <div className="page-container">
      <Header isMemberView={isMemberView} />

      {/* Main content */}
      <main className="main-content">
        {/* website content goes here */}
        <div className="about-grid">
          <div className="about-item">
            <h2>The Story</h2>
            <div className="about-item-content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Pariatur velit laboriosam eum temporibus, autem, excepturi animi
                dolor quibusdam culpa molestias, impedit natus suscipit
                consectetur iure assumenda! Aperiam dolorem quidem corporis.
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Inventore deserunt aperiam asperiores. Eius in accusantium omnis
                nobis deleniti? Alias neque illum ut libero nostrum illo
                suscipit fugiat aut dolor nulla?
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Pariatur velit laboriosam eum temporibus, autem, excepturi animi
                dolor quibusdam culpa molestias, impedit natus suscipit
                consectetur iure assumenda! Aperiam dolorem quidem corporis.
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Inventore deserunt aperiam asperiores. Eius in accusantium omnis
                nobis deleniti? Alias neque illum ut libero nostrum illo
                suscipit fugiat aut dolor nulla? Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Pariatur velit laboriosam eum
                temporibus, autem, excepturi animi dolor quibusdam culpa
                molestias, impedit natus suscipit consectetur iure
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Pariatur velit laboriosam eum temporibus, autem, excepturi animi
                dolor quibusdam culpa molestias, impedit natus suscipit
                consectetur iure assumenda! Aperiam dolorem quidem corporis.
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Inventore deserunt aperiam asperiores. Eius in accusantium omnis
                nobis deleniti? Alias neque illum ut libero nostrum illo
                suscipit fugiat aut dolor nulla? Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Pariatur velit laboriosam eum
                temporibus, autem, excepturi animi dolor quibusdam culpa
                molestias, impedit natus suscipit consectetur iure
              </p>
            </div>
          </div>
          <div className="about-item">
            <h2>Who We Are</h2>
            <div className="about-item-content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Pariatur velit laboriosam eum temporibus, autem, excepturi animi
                dolor quibusdam culpa molestias, impedit natus suscipit
                consectetur iure assumenda! Aperiam dolorem quidem corporis.
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Inventore deserunt aperiam asperiores. Eius in accusantium omnis
                nobis deleniti? Alias neque illum ut libero nostrum illo
                suscipit fugiat aut dolor nulla? Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Pariatur velit laboriosam eum
                temporibus, autem, excepturi animi dolor quibusdam culpa
                molestias, impedit natus suscipit consectetur iure
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Pariatur velit laboriosam eum temporibus, autem, excepturi animi
                dolor quibusdam culpa molestias, impedit natus suscipit
                consectetur iure assumenda! Aperiam dolorem quidem corporis.
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Inventore deserunt aperiam asperiores. Eius in accusantium omnis
                nobis deleniti? Alias neque illum ut libero nostrum illo
                suscipit fugiat aut dolor nulla? Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Pariatur velit laboriosam eum
                temporibus, autem, excepturi animi dolor quibusdam culpa
                molestias, impedit natus suscipit consectetur iure
              </p>
            </div>
          </div>

          <div className="about-item">
            <h2>What We Do</h2>
            <div className="about-item-content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Pariatur velit laboriosam eum temporibus, autem, excepturi animi
                dolor quibusdam culpa molestias, impedit natus suscipit
                consectetur iure assumenda! Aperiam dolorem quidem corporis.
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Inventore deserunt aperiam asperiores. Eius in accusantium omnis
                nobis deleniti? Alias neque illum ut libero nostrum illo
                suscipit fugiat aut dolor nulla?
              </p>
            </div>
          </div>

          <div className="about-item">
            <h2>Our Mission</h2>
            <div className="about-item-content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Pariatur velit laboriosam eum temporibus, autem, excepturi animi
                dolor quibusdam culpa molestias, impedit natus suscipit
                consectetur iure assumenda! Aperiam dolorem quidem corporis.
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Inventore deserunt aperiam asperiores. Eius in accusantium omnis
                nobis deleniti? Alias neque illum ut libero nostrum illo
                suscipit fugiat aut dolor nulla?
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
