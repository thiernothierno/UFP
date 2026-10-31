import { useState } from "react";

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

const currency = (amount) =>
  amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

const PaymentSummary = ({ paymentRows, infractionRows }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Calculate payment total for each member
  const calculatePaymentTotal = (row) => {
    return paymentMonths.reduce(
      (total, month) => total + (Number(row[month]) || 0),
      0,
    );
  };

  // Calculate infraction total for each member
  const calculateInfractionTotal = (row) => {
    return infractionMonths.reduce((total, month) => {
      return (
        total +
        categories.reduce(
          (monthTotal, category) =>
            monthTotal + (Number(row[`${month}_${category}`]) || 0),
          0,
        )
      );
    }, 0);
  };

  // Match members and calculate their combined totals
  const summaryRows = paymentRows.map((paymentRow) => {
    const infractionRow = infractionRows.find(
      (row) => row.id === paymentRow.id,
    );

    const paymentTotal = calculatePaymentTotal(paymentRow);

    const infractionTotal = infractionRow
      ? calculateInfractionTotal(infractionRow)
      : 0;
    return {
      ...paymentRow,
      paymentTotal,
      infractionTotal,
      combinedTotal: paymentTotal + infractionTotal,
    };
  });

  // Filter result by id or first name
  const filteredRows = summaryRows.filter(
    (row) =>
      row.id.toString().includes(searchTerm.trim()) ||
      row.First_Name.toLowerCase().includes(searchTerm.trim().toLowerCase()),
  );
  // Calculate grand totals
  const grandPaymentTotal = filteredRows.reduce(
    (total, row) => total + row.paymentTotal,
    0,
  );

  const grandInfractionTotal = filteredRows.reduce(
    (total, row) => total + row.infractionTotal,
    0,
  );

  const grandCombinedTotal = grandPaymentTotal + grandInfractionTotal;

  return (
    <div>
      <h2>Annual Member Summary</h2>
      <input
        type="text"
        placeholder="Search by ID or First Name..."
        value={searchTerm}
        className="search-bar"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div style={{ overflowX: "auto" }}>
        <table border="1" cellPadding="8" className="summary-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Missing Payment</th>
              <th>Infraction Total</th>
              <th>Combined Total</th>
            </tr>
          </thead>

          <tbody>
            {filteredRows.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.First_Name}</td>
                <td>{row.Last_Name}</td>

                <td>{currency(row.paymentTotal)}</td>

                <td>{currency(row.infractionTotal)}</td>

                <td>
                  <strong>{currency(row.combinedTotal)}</strong>
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <th colSpan="3">Grand Total</th>

              <th>{currency(grandPaymentTotal)}</th>

              <th>{currency(grandInfractionTotal)}</th>

              <th>{currency(grandCombinedTotal)}</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default PaymentSummary;
