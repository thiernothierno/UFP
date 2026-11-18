import React, { useEffect, useState } from "react";
import "./withdrawal.css";

const fields = [
  { name: "date", label: "Date", type: "date" },
  { name: "receiver", label: "Receiver", type: "text" },
  { name: "reason", label: "Reason", type: "text" },
  { name: "amount", label: "Amount", type: "number" },
];

const emptyValues = {
  date: "",
  receiver: "",
  reason: "",
  amount: "",
};

const WithdrawalForm = ({
  onSubmit,
  onUpdate,
  editingRecord,
  onCancelEdit,
  isSaving = false,
  saveError = "",
}) => {
  const [isAdding, setIsAdding] = useState(true);
  const [values, setValues] = useState({ ...emptyValues });
  const [errors, setErrors] = useState({});
  const isFormVisible = isAdding || Boolean(editingRecord);

  useEffect(() => {
    if (editingRecord) {
      setIsAdding(true);
      setValues({
        date: editingRecord.date,
        receiver: editingRecord.receiver,
        reason: editingRecord.reason,
        amount: String(editingRecord.amount),
      });
      setErrors({});
    } else {
      setIsAdding(true);
      setValues({ ...emptyValues });
      setErrors({});
    }
  }, [editingRecord]);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((currentValues) => ({ ...currentValues, [name]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [name]: "" }));
  }

  // Validate explicitly so each field can show a helpful inline message.
  function validateValues() {
    const nextErrors = {};
    const amount = Number(values.amount);

    if (!values.date) {
      nextErrors.date = "Choose a date.";
    }
    if (!values.receiver.trim()) {
      nextErrors.receiver = "Enter a receiver.";
    }
    if (!values.reason.trim()) {
      nextErrors.reason = "Enter a reason.";
    }
    if (!values.amount.trim()) {
      nextErrors.amount = "Enter an amount.";
    } else if (!Number.isFinite(amount) || amount <= 0) {
      nextErrors.amount = "Amount must be greater than $0.";
    }

    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateValues();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const submittedRecord = {
      date: values.date,
      receiver: values.receiver.trim(),
      reason: values.reason.trim(),
      amount: Number(values.amount),
    };

    if (editingRecord) {
      onUpdate(editingRecord.id, submittedRecord);
      setIsAdding(true);
    } else {
      onSubmit(submittedRecord);
    }

    setValues({ ...emptyValues });
    setErrors({});
  }

  function handleCancelEdit() {
    setIsAdding(true);
    setValues({ ...emptyValues });
    setErrors({});
    onCancelEdit();
  }

  return (
    <section className="withdraw">
      <header className="withdraw-header">
        <h1>Withdrawals</h1>
        <p>Add a withdrawal or review the submitted records below.</p>
      </header>
      <form noValidate onSubmit={handleSubmit}>
        {isFormVisible && (
          <div className="withdraw-table">
            {fields.map(({ name, label, type }) => {
              const errorId = `withdraw-${name}-error`;

              return (
                <div className="withdraw-field" key={name}>
                  <label htmlFor={`withdraw-${name}`}>{label}</label>
                  {name === "amount" ? (
                    <div className="withdraw-amount-input">
                      <span aria-hidden="true">$</span>
                      <input
                        id={`withdraw-${name}`}
                        name={name}
                        type={type}
                        value={values[name]}
                        onChange={handleChange}
                        min="0.01"
                        step="0.01"
                        disabled={isSaving}
                        aria-invalid={Boolean(errors[name])}
                        aria-describedby={errors[name] ? errorId : undefined}
                      />
                    </div>
                  ) : (
                    <input
                      id={`withdraw-${name}`}
                      name={name}
                      type={type}
                      value={values[name]}
                      onChange={handleChange}
                      disabled={isSaving}
                      aria-invalid={Boolean(errors[name])}
                      aria-describedby={errors[name] ? errorId : undefined}
                    />
                  )}
                  {errors[name] && (
                    <span className="withdraw-error" id={errorId}>
                      {errors[name]}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {saveError && (
          <p role="alert" className="withdraw-save-error">
            Could not save withdrawal: {saveError}
          </p>
        )}

        <div className="withdraw-actions">
          {isFormVisible && (
            <button type="submit" disabled={isSaving}>
              {isSaving
                ? "Saving..."
                : editingRecord
                  ? "Save changes"
                  : "Add withdrawal"}
            </button>
          )}
          {editingRecord ? (
            <button
              className="withdraw-secondary-button"
              type="button"
              onClick={handleCancelEdit}
              disabled={isSaving}
            >
              Cancel
            </button>
          ) : null}
        </div>
      </form>
    </section>
  );
};

export default WithdrawalForm;
