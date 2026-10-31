import { useState } from "react";
import members from "../../List-of-Members";

import InfractionsPage from "./InfractionsPage";
import PaymentSummaryPage from "./PaymentSummaryPage";
import PaymentTrackingPage from "./PaymentTrackingPage";

const paymentMonths = [
  "Jan",
  "Fev",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Y_fee",
];

const infractionMonths = [
  "Jan",
  "Fev",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const categories = ["MSG", "Late", "Absence"];

const Parent = () => {
  // Select which page to display
  const [activePage, setActivePage] = useState("payments");

  // Shared payment data
  const [monthlyValues, setMonthlyValues] = useState(() =>
    members.map((member) => ({
      ...member,
      ...Object.fromEntries(paymentMonths.map((month) => [month, ""])),
    })),
  );

  // Shared infraction data
  const [infractionRows, setInfractionRows] = useState(() =>
    members.map((member) => ({
      ...member,
      ...Object.fromEntries(
        infractionMonths.flatMap((month) =>
          categories.map((category) => [`${month}_${category}`, ""]),
        ),
      ),
    })),
  );

  return (
    <div>
      {/* Page selection */}
      <nav style={{ marginBottom: "20px" }}>
        <button onClick={() => setActivePage("payments")}>Payments</button>

        <button onClick={() => setActivePage("infractions")}>
          Infractions
        </button>

        <button onClick={() => setActivePage("summary")}>Summary</button>
      </nav>

      {/* Display selected page */}
      {activePage === "payments" && (
        <PaymentTrackingPage
          monthlyValues={monthlyValues}
          setMonthlyValues={setMonthlyValues}
        />
      )}

      {activePage === "infractions" && (
        <InfractionsPage
          infractionRows={infractionRows}
          setInfractionRows={setInfractionRows}
        />
      )}

      {activePage === "summary" && (
        <PaymentSummaryPage
          paymentRows={monthlyValues}
          infractionRows={infractionRows}
        />
      )}
    </div>
  );
};

export default Parent;
