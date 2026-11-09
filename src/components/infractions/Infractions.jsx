import { useState } from "react";
import "./infractions.css";
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
];

const categories = ["MSG", "Late", "Absence"];
const formatCurrency = (amount) =>
  Number(amount || 0).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

const Infractions = ({
  rows,
  setRows,
  readOnly = false,
  isLoading = false,
  savingCell = null,
  onSaveInfraction,
}) => {
  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // Update an individual infraction
  const handleChange = (id, month, category, value) => {
    if (readOnly) return;

    const field = `${month}_${category}`;

    setRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    );
  };

  // Calculate annual total for each member
  const calculateTotal = (row) => {
    return months.reduce((total, month) => {
      return (
        total +
        categories.reduce((monthTotal, category) => {
          return monthTotal + (Number(row[`${month}_${category}`]) || 0);
        }, 0)
      );
    }, 0);
  };

  // Calculate monthly totals across all members
  const calculateMonthlyTotal = (month, category) => {
    return rows.reduce((total, row) => {
      return total + (Number(row[`${month}_${category}`]) || 0);
    }, 0);
  };

  // Calculate grand total
  const grandTotal = rows.reduce(
    (total, row) => total + calculateTotal(row),
    0,
  );

  // Search by ID or First Name
  const filteredRows = rows.filter(
    (row) =>
      String(row.member_number ?? row.id)
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase()) ||
      row.First_Name.toLowerCase().includes(searchTerm.trim().toLowerCase()),
  );

  return (
    <div>
      <h2>Member Infraction Tracking</h2>
      <p>Infraction amounts are recorded in USD.</p>

      {/* Search */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search by member number or first name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {isLoading ? (
        <p role="status">Loading infraction records...</p>
      ) : (
      <>
        {savingCell !== null && <p role="status">Saving infraction amount...</p>}
        <div className="table-scroll-wrapper" style={{ marginTop: "15px" }}>
        <table
          border="1"
          cellPadding="8"
          style={{ borderCollapse: "collapse" }}
        >
          {/* TABLE HEADER */}
          <thead>
            <tr>
              <th rowSpan="2">ID</th>
              <th rowSpan="2">First Name</th>
              <th rowSpan="2">Last Name</th>

              {months.map((month) => (
                <th key={month} colSpan="3">
                  {month}
                </th>
              ))}

              <th rowSpan="2">Total</th>
            </tr>

            <tr>
              {months.map((month) =>
                categories.map((category) => (
                  <th key={`${month}_${category}`}>{category}</th>
                )),
              )}
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody>
            {filteredRows.map((row) => (
              <tr key={row.id}>
                <td>{row.member_number ?? row.id}</td>
                <td>{row.First_Name}</td>
                <td>{row.Last_Name}</td>

                {months.map((month) =>
                  categories.map((category) => {
                    const field = `${month}_${category}`;

                    return (
                      <td key={field}>
                        {readOnly ? (
                        row[field] === "" || row[field] == null
                          ? "-"
                          : formatCurrency(row[field])
                        ) : (
                        <input
                          type="number"
                          className="custom-input"
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                          value={row[field]}
                          style={{ width: "88px" }}
                          disabled={savingCell !== null}
                          onChange={(e) =>
                            handleChange(
                              row.id,
                                month,
                                category,
                                e.target.value,
                              )
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
                                onSaveInfraction?.({
                                  memberId: row.member_id,
                                  field,
                                  value: event.currentTarget.value,
                                });
                              }
                            }}
                            aria-label={`${month} ${category} dollar amount for ${row.First_Name} ${row.Last_Name}`}
                          />
                        )}
                      </td>
                    );
                  }),
                )}

                {/* MEMBER TOTAL */}
                <td>
                  <strong>{formatCurrency(calculateTotal(row))}</strong>
                </td>
              </tr>
            ))}

            {filteredRows.length === 0 && (
              <tr>
                <td colSpan="41">No members found.</td>
              </tr>
            )}
          </tbody>

          {/* TABLE FOOTER */}
          <tfoot>
            <tr>
              <th colSpan="3">All Members - Monthly Totals</th>

              {months.map((month) =>
                categories.map((category) => (
                  <th key={`${month}_${category}`}>
                    {formatCurrency(calculateMonthlyTotal(month, category))}
                  </th>
                )),
              )}

              <th>{formatCurrency(grandTotal)}</th>
            </tr>
          </tfoot>
        </table>
        </div>
      </>
      )}
    </div>
  );
};

export default Infractions;
