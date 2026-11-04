import { useState } from "react";
import PaymentStatus from "./layout/PaymentStatus";

import "./App.css";
import Rules from "./components/rules-and-regulations/Rules";
import Assistance from "./components/assistance/Assistance";
import BoardMeetings from "./components/meetings/BoardMeetings";
import AgendaSuggestion from "./components/agenda/AgendaSuggestion";
import Schedule from "./components/ruling-schedule/schedule";
import Home from "./components/main-home/Home";
import MemberHome from "./components/member-home-page/MemberHome";

const App = () => {
  return (
    <div>
      {/* <Home /> */}
      <MemberHome />
      {/* <PaymentStatus />
      <AgendaSuggestion />
      <Schedule />
      <BoardMeetings />
      <Assistance />
      <Rules /> */}
    </div>
  );
};

export default App;
