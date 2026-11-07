import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaymentStatus from "./layout/PaymentStatus";
import "./App.css";
import Rules from "./components/rules-and-regulations/Rules";
import Assistance from "./components/assistance/Assistance";
import BoardMeetings from "./components/meetings/BoardMeetings";
import AgendaSuggestion from "./components/agenda/AgendaSuggestion";
import Schedule from "./components/ruling-schedule/schedule";
import Home from "./components/main-home/Home";
import About from "./components/infos/About";
import PastEvents from "./components/infos/PastEvents";
import UpcomingEvents from "./components/infos/UpcomingEvents";
import Contact from "./components/infos/Contact";
import Donate from "./components/infos/Donate";
import MemberLoginPage from "./components/member-home-page/MemberLoginPage";
import MemberHome from "./components/member-home-page/MemberHome";
import ResetPassword from "./components/member-home-page/ResetPassword";
import MeetingSummary from "./components/meeting-summary/MeetingSummary";
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
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/user-login" element={<MemberHome />}>
          <Route index element={<h2>Member Home</h2>} />
          <Route path="records" element={<PaymentStatus />} />
          <Route path="rules" element={<Rules />} />
          <Route path="ruling-schedule" element={<Schedule />} />
          <Route path="meetings" element={<BoardMeetings />} />
          <Route path="agenda" element={<AgendaSuggestion />} />
          <Route path="assistance" element={<Assistance />} />
          <Route path="meeting-summary" element={<MeetingSummary />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
