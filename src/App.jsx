import { useState } from "react";
import Parent from "./layout/Parent";

import "./App.css";
import Rules from "./components/rules/Rules";
import "./components/infractions/infractions.css";
import "./components/payments/payment.css";
import "./components/summary/summary.css";
import Assistance from "./components/assistance/Assistance";

const App = () => {
  return (
    <div>
      {/* <Parent /> */}
      {/* <Rules /> */}
      <Assistance />
    </div>
  );
};

export default App;
