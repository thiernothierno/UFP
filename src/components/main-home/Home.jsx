import "./home.css";

const Home = () => {
  return (
    <div>
      <ul>
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li class="dropdown">
          <a href="javascript:void(0)" class="dropbtn">
            Events
          </a>
          <div class="dropdown-content">
            <a href="#">Past Events</a>
            <a href="#">Upcoming Event</a>
          </div>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
        <li>
          <a href="#donation">Donation</a>
        </li>
      </ul>
    </div>
  );
};

export default Home;
