import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import members from "../data/List-of-Members";
import InfractionsPage from "../components/infractions/InfractionsPage";
import PaymentSummaryPage from "../components/summary/PaymentSummaryPage";
import PaymentTrackingPage from "../components/payments/PaymentTrackingPage";
import { can } from "../data/userPermission";
import { useMember } from "../components/member-home-page/MemberContext";
import "./paymentStatus.css";

//- Managing the selected year.
// - Holding payment and infraction data for each year.
// - Managing which page is currently displayed.
// - Passing the correct data to each page.
// In other words, Parent.jsx coordinates the application, while the individual components handle their own tables and calculations.

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
const validPages = ["payments", "infractions", "summary"];

// Creates empty payment and infraction records for a year
const createYearData = () => ({
  payments: members.map((member) => ({
    ...member,
    ...Object.fromEntries(paymentMonths.map((month) => [month, ""])),
  })),

  infractions: members.map((member) => ({
    ...member,
    ...Object.fromEntries(
      infractionMonths.flatMap((month) =>
        categories.map((category) => [`${month}_${category}`, ""]),
      ),
    ),
  })),
});

const PaymentStatus = () => {
  const member = useMember();
  // Members see records read-only; only board-role permissions enable edits.
  const canEditPayments = can(member.role, "edit", "monthly-payments");
  const canEditInfractions = can(member.role, "edit", "infractions");
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedPage = searchParams.get("view");
  const activePage = validPages.includes(requestedPage)
    ? requestedPage
    : "payments";
  const date = new Date();
  const year = date.getFullYear();
  // Selected year
  const [selectedYear, setSelectedYear] = useState(year);

  // Data belonging to each year
  const [yearlyData, setYearlyData] = useState(() => ({
    2026: createYearData(),
    2027: createYearData(),
  }));

  const setActivePage = (page) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("view", page);
    setSearchParams(nextParams);
  };

  // Get the records for the selected year
  const currentYearData = yearlyData[selectedYear];

  // Update payments for the selected year
  const updatePayments = (updater) => {
    setYearlyData((prev) => ({
      ...prev,
      [selectedYear]: {
        ...prev[selectedYear],
        payments:
          typeof updater === "function"
            ? updater(prev[selectedYear].payments)
            : updater,
      },
    }));
  };

  // Update infractions for the selected year
  const updateInfractions = (updater) => {
    setYearlyData((prev) => ({
      ...prev,
      [selectedYear]: {
        ...prev[selectedYear],
        infractions:
          typeof updater === "function"
            ? updater(prev[selectedYear].infractions)
            : updater,
      },
    }));
  };

  // Change year and create its records if they don't exist yet
  const handleYearChange = (event) => {
    const year = Number(event.target.value);

    setYearlyData((prev) => ({
      ...prev,
      [year]: prev[year] ?? createYearData(),
    }));

    setSelectedYear(year);
  };

  return (
    <div className="payment-status-container"> 
      <h2 className="payment-title">Member Records</h2>

      {/* Year selector */}
      <label htmlFor="year">Select Year: </label>

      <select id="year" value={selectedYear} onChange={handleYearChange}>
        {[year, year + 1, year + 2, year + 3, year + 4].map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <hr />

      {/* Page navigation */}
      <button onClick={() => setActivePage("payments")}>Payments</button>

      <button onClick={() => setActivePage("infractions")}>Infractions</button>

      <button onClick={() => setActivePage("summary")}>Summary</button>

      <hr />

      {/* Display one page at a time */}
      {activePage === "payments" && (
        <PaymentTrackingPage
          monthlyValues={currentYearData.payments}
          setMonthlyValues={updatePayments}
          readOnly={!canEditPayments}
        />
      )}

      {activePage === "infractions" && (
        <InfractionsPage
          infractionRows={currentYearData.infractions}
          setInfractionRows={updateInfractions}
          readOnly={!canEditInfractions}
        />
      )}

      {activePage === "summary" && (
        <PaymentSummaryPage
          paymentRows={currentYearData.payments}
          infractionRows={currentYearData.infractions}
        />
      )}
    </div>
  );
};

export default PaymentStatus;
