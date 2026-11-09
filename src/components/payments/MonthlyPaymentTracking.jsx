import { useState } from "react";
import "./payment.css";
const months = [
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

const MonthlyPaymentTracking = ({
  monthlyValues,
  setMonthlyValues,
  readOnly = false,
}) => {
  // state variable to hold specific user
  const [searchTerm, setSearchTerm] = useState("");

  // function that handle individual cell without affect others.
  const handleMonthlyFee = (id, month, value) => {
    if (readOnly) return;

    setMonthlyValues((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [month]: value } : row)),
    );
  };

  // function that calculate the total amount paid by each member
  const calculateTotal = (row) => {
    return months.reduce((total, month) => {
      return total + (Number(row[month]) || 0);
    }, 0);
  };

  // Grand total for all members per month
  const grandTotal = monthlyValues.reduce((sum, row) => {
    return sum + calculateTotal(row);
  }, 0);

  // Function that filter user by id or first name
  const filteredRows = monthlyValues.filter(
    (row) =>
      row.id.toString().includes(searchTerm) ||
      row.First_Name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
    <h2>Monthly Payment Tracking</h2>
      {/* Input search bar */}
      <input
        type="text"
        placeholder="Search by ID or First Name..."
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Table that contain members payment */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First_Name</th>
            <th>Last_Name</th>
            {months.map((month) => (
              <th key={month}>{month}</th>
            ))}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {filteredRows.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.First_Name}</td>
              <td>{row.Last_Name}</td>

              {months.map((month) => (
                <td key={month}>
                  {readOnly ? (
                    row[month] || "-"
                  ) : (
                    <input
                      type="text"
                      value={row[month]}
                      className="custom-input"
                      onChange={(e) =>
                        handleMonthlyFee(row.id, month, e.target.value)
                      }
                    />
                  )}
                </td>
              ))}
              <td>
                <strong>{calculateTotal(row)}</strong>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="3">Grand Total</td>

            {months.map((month) => (
              <td key={month}>
                {monthlyValues.reduce(
                  (sum, row) => sum + (Number(row[month]) || 0),
                  0,
                )}
              </td>
            ))}

            <td>
              <strong>{grandTotal}</strong>
            </td>
          </tr>
          {filteredRows.length === 0 && (
            <tr>
              <td colSpan="16">No members found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MonthlyPaymentTracking;
