import { useLocation } from "react-router-dom";
import "./pastEvents.css";
import Header from "../navigation/Header";
import Footer from "../navigation/Footer";

const UpcomingEvents = () => {
  const { state } = useLocation();
  const isMemberView = state?.memberView === true;

  return (
    <div className="page-container">
      <Header isMemberView={isMemberView} />

      {/* Main content */}
      <main className="main-content">
        {/* Your website content goes here */}
        <div class="about-grid">
          <h2>No Upcomming Event Posted</h2>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UpcomingEvents;
