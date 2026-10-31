import { useState } from "react";
import Parent from "./components/Parent";
import MonthlyPaymentTracking from "./components/MonthlyPaymentTracking";
import Infractions from "./components/Infractions";
import PaymentSummary from "./components/PaymentSummary";
import "./App.css";

const App = () => {
  return (
    <div>
      {/* <MonthlyPaymentTracking /> */}
      {/* <Infractions /> */}
      <Parent />
      {/* <PaymentSummary /> */}
    </div>
  );
};

export default App;
