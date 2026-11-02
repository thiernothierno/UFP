import { useState } from "react";

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

const Infractions = ({ rows, setRows }) => {
  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // Update an individual infraction
  const handleChange = (id, month, category, value) => {
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
      row.id.toString().includes(searchTerm.trim()) ||
      row.First_Name.toLowerCase().includes(searchTerm.trim().toLowerCase()),
  );

  return (
    <div>
      <h2>Member Infraction Tracking</h2>

      {/* Search */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search by ID or First Name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div style={{ overflowX: "auto", marginTop: "15px" }}>
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
                <td>{row.id}</td>
                <td>{row.First_Name}</td>
                <td>{row.Last_Name}</td>

                {months.map((month) =>
                  categories.map((category) => {
                    const field = `${month}_${category}`;

                    return (
                      <td key={field}>
                        <input
                          type="text"
                          className="custom-input"
                          min="0"
                          step="1"
                          value={row[field]}
                          style={{ width: "65px" }}
                          onChange={(e) =>
                            handleChange(
                              row.id,
                              month,
                              category,
                              e.target.value,
                            )
                          }
                        />
                      </td>
                    );
                  }),
                )}

                {/* MEMBER TOTAL */}
                <td>
                  <strong>{calculateTotal(row)}</strong>
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
                    {calculateMonthlyTotal(month, category)}
                  </th>
                )),
              )}

              <th>{grandTotal}</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Infractions;
