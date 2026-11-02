import { useState } from "react";
import PaymentStatus from "./layout/PaymentStatus";

import "./App.css";
import Rules from "./components/rules-and-regulations/Rules";
import "./components/infractions/infractions.css";
import "./components/payments/payment.css";
import "./components/summary/summary.css";
import Assistance from "./components/assistance/Assistance";
import BoardMeetings from "./components/meetings/BoardMeetings";
import AgendaSuggestion from "./components/agenda/AgendaSuggestion";
import Schedule from "./components/ruling-schedule/schedule";

const App = () => {
  return (
    <div>
      {/* <PaymentStatus /> */}
      {/* <Rules /> */}
      {/* <Assistance /> */}
      {/* <BoardMeetings /> */}
      {/* <AgendaSuggestion /> */}
      <Schedule />
    </div>
  );
};

export default App;
