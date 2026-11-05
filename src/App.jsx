import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaymentStatus from "./layout/PaymentStatus";
import "./App.css";
import Rules from "./components/rules-and-regulations/Rules";
import Assistance from "./components/assistance/Assistance";
import BoardMeetings from "./components/meetings/BoardMeetings";
import AgendaSuggestion from "./components/agenda/AgendaSuggestion";
import Schedule from "./components/ruling-schedule/schedule";
import Home from "./components/main-home/Home";
import WelcomePage from "./components/infos/WelcomePage";
import About from "./components/infos/About";
import PastEvents from "./components/infos/PastEvents";
import UpcomingEvents from "./components/infos/UpcomingEvents";
import Contact from "./components/infos/Contact";
import Donate from "./components/infos/Donate";
import MemberLoginPage from "./components/member-home-page/MemberLoginPage";
import MemberHome from "./components/member-home-page/MemberHome";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/past-event" element={<PastEvents />} />
        <Route path="/upcoming-event" element={<UpcomingEvents />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/member-login" element={<MemberLoginPage />} />
        <Route path="/user-login" element={<MemberHome />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
