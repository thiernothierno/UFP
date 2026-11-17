import React, { useState } from "react";
import "./withdrawal.css";

const Withdrawal = ({ records, onEdit, onDelete }) => {
  const [selectedYear, setSelectedYear] = useState("all");
  const years = [...new Set(records.map((record) => record.date.slice(0, 4)))]
    .filter(Boolean)
    .sort((firstYear, secondYear) => secondYear.localeCompare(firstYear));
  // Keep the table total in sync with the selected year.
  const activeYear =
    selectedYear !== "all" && !years.includes(selectedYear)
      ? "all"
      : selectedYear;
  const filteredRecords =
    activeYear === "all"
      ? records
      : records.filter((record) => record.date.startsWith(`${activeYear}-`));
  const totalAmount = filteredRecords.reduce(
    (total, record) => total + Number(record.amount),
    0,
  );

  if (records.length === 0) {
    return null;
  }

  return (
    <section
      className="withdraw-records"
      aria-labelledby="withdraw-records-title"
    >
      <h2 id="withdraw-records-title">Submitted withdrawals</h2>
      <div className="withdraw-year-filter">
        <label htmlFor="withdraw-year">Year</label>
        <select
          id="withdraw-year"
          value={activeYear}
          onChange={(event) => setSelectedYear(event.target.value)}
        >
          <option value="all">All years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="withdraw-records-table">
        <table>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Receiver</th>
              <th scope="col">Reason</th>
              <th scope="col">Amount</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <tr key={record.id}>
                <td data-label="Date">{record.date}</td>
                <td data-label="Receiver">{record.receiver}</td>
                <td data-label="Reason">{record.reason}</td>
                <td data-label="Amount">${Number(record.amount).toFixed(2)}</td>
                <td data-label="Actions" className="withdraw-record-actions">
                  <button
                    className="withdraw-edit-button"
                    type="button"
                    onClick={() => onEdit(record)}
                    aria-label={`Edit withdrawal for ${record.receiver}`}
                  >
                    Edit
                  </button>
                  <button
                    className="withdraw-delete-button"
                    type="button"
                    onClick={() => onDelete(record.id)}
                    aria-label={`Delete withdrawal for ${record.receiver}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row" colSpan="3">
                Total amount
              </th>
              <td data-label="Total">${totalAmount.toFixed(2)}</td>
              <td aria-hidden="true"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
};

export default Withdrawal;
