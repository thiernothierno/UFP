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
  isLoading = false,
  savingCell = null,
  onSavePayment,
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
      String(row.member_number ?? row.id)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
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

      {isLoading ? (
        <p role="status">Loading payment records...</p>
      ) : (
        <div className="payment-table-wrapper table-scroll-wrapper">
          <table className="payment-table">
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
                  <td>{row.member_number ?? row.id}</td>
                  <td>{row.First_Name}</td>
                  <td>{row.Last_Name}</td>

                  {months.map((month) => (
                    <td key={month}>
                      {readOnly ? (
                        row[month] === "" || row[month] == null
                          ? "-"
                          : row[month]
                      ) : (
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={row[month]}
                          className="custom-input"
                          disabled={savingCell !== null}
                          onChange={(e) =>
                            handleMonthlyFee(row.id, month, e.target.value)
                          }
                          onFocus={(event) => {
                            event.currentTarget.dataset.originalValue =
                              event.currentTarget.value;
                          }}
                          onBlur={(event) => {
                            if (
                              event.currentTarget.value !==
                              event.currentTarget.dataset.originalValue
                            ) {
                              onSavePayment?.({
                                memberId: row.member_id,
                                month,
                                value: event.currentTarget.value,
                              });
                            }
                          }}
                          aria-label={`${month} payment for ${row.First_Name} ${row.Last_Name}`}
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
      )}
    </div>
  );
};

export default MonthlyPaymentTracking;
