import React, { useState } from "react";
import "./withdrawal.css";

const Withdrawal = ({
  records,
  onEdit,
  onDelete,
  canEdit,
  canDelete,
  canAdd,
  isDeleting,
  isLoading,
  loadError,
}) => {
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

  return (
    <section
      className="withdraw-records"
      aria-labelledby="withdraw-records-title"
    >
      <div className="withdraw-records-header">
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
      </div>

      <div className="withdraw-summary" aria-label="Withdrawal totals">
        <div>
          <span>Withdrawals</span>
          <strong>{filteredRecords.length}</strong>
        </div>
        <div>
          <span>Total amount</span>
          <strong>${totalAmount.toFixed(2)}</strong>
        </div>
      </div>

      {isLoading ? null : loadError ? null : records.length === 0 ? (
        <div className="withdraw-empty">
          <strong>No withdrawals submitted</strong>
          <p>
            {canAdd
              ? "Use the form above to add the first withdrawal."
              : "Withdrawals will appear here when the board posts them."}
          </p>
        </div>
      ) : filteredRecords.length === 0 ? (
        <div className="withdraw-empty">
          <strong>No withdrawals found</strong>
          <p>Choose another year or add a new withdrawal.</p>
        </div>
      ) : (
        <div
          className={`withdraw-records-grid${canEdit || canDelete ? "" : " withdraw-records-grid--view-only"}`}
          role="table"
          aria-label="Withdrawals"
        >
          <div className="withdraw-record-heading" role="row">
            <span role="columnheader">Date</span>
            <span role="columnheader">Receiver</span>
            <span role="columnheader">Reason</span>
            <span role="columnheader">Amount</span>
            {(canEdit || canDelete) && (
              <span role="columnheader">Actions</span>
            )}
          </div>
          {filteredRecords.map((record) => (
            <div className="withdraw-record-row" role="row" key={record.id}>
              <span role="cell" data-label="Date">{record.date}</span>
              <span role="cell" data-label="Receiver">{record.receiver}</span>
              <span role="cell" data-label="Reason">{record.reason}</span>
              <span role="cell" data-label="Amount">${Number(record.amount).toFixed(2)}</span>
              {(canEdit || canDelete) && (
                <div role="cell" data-label="Actions" className="withdraw-record-actions">
                  {canEdit && (
                    <button
                      className="withdraw-edit-button"
                      type="button"
                      onClick={() => onEdit(record)}
                      aria-label={`Edit withdrawal for ${record.receiver}`}
                      title="Edit withdrawal"
                      disabled={isDeleting}
                    >
                      Edit
                    </button>
                  )}
                  {canDelete && (
                    <button
                      className="withdraw-delete-button"
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Delete the withdrawal for ${record.receiver}?`)) {
                          onDelete(record.id);
                        }
                      }}
                      aria-label={`Delete withdrawal for ${record.receiver}`}
                      title="Delete withdrawal"
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Withdrawal;
