import React, { useEffect, useState } from "react";
import "./withdraw.css";

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
}) => {
  const [isAdding, setIsAdding] = useState(false);
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
      setIsAdding(false);
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
      setIsAdding(false);
    } else {
      onSubmit(submittedRecord);
    }

    setValues({ ...emptyValues });
    setErrors({});
  }

  function handleCancelEdit() {
    setIsAdding(false);
    setValues({ ...emptyValues });
    setErrors({});
    onCancelEdit();
  }

  return (
    <section className="withdraw">
      <form noValidate onSubmit={handleSubmit}>
        {isFormVisible && (
          <div className="withdraw-table">
            <table>
              <tbody>
                <tr>
                  {fields.map(({ name, label, type }) => {
                    const errorId = `withdraw-${name}-error`;

                    return (
                      <td key={name}>
                        <label htmlFor={`withdraw-${name}`}>{label}</label>
                        <input
                          id={`withdraw-${name}`}
                          name={name}
                          type={type}
                          value={values[name]}
                          onChange={handleChange}
                          min={type === "number" ? "0.01" : undefined}
                          step={type === "number" ? "0.01" : undefined}
                          aria-invalid={Boolean(errors[name])}
                          aria-describedby={errors[name] ? errorId : undefined}
                        />
                        {errors[name] && (
                          <span className="withdraw-error" id={errorId}>
                            {errors[name]}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <div className="withdraw-actions">
          {isFormVisible && (
            <button type="submit">
              {editingRecord ? "Save changes" : "Submit"}
            </button>
          )}
          {editingRecord ? (
            <button
              className="withdraw-secondary-button"
              type="button"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setIsAdding(true);
                setErrors({});
              }}
            >
              Add
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default WithdrawalForm;
