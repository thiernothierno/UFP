import { useLocation } from "react-router-dom";
import "./donate.css";
import Header from "../navigation/Header";
import Footer from "../navigation/Footer";

const Donate = () => {
  const { state } = useLocation();
  const isMemberView = state?.memberView === true;

  return (
    <div className="page-container">
      <Header isMemberView={isMemberView} />

      {/* Main content */}
      <main className="main-content">
        {/* Your website content goes here */}
        <div class="about-grid">
          <div class="about-item">
            <h2>Who We Are</h2>
            <p>donation page</p>
          </div>

          <div class="about-item">
            <h2>What We Do</h2>
            <p></p>
          </div>

          <div class="about-item">
            <h2>Our Mission</h2>
            <p></p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Donate;
