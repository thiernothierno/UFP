import { useState } from "react";

function MeetingSummaryForm({ meeting, onSave, onCancel, isSaving = false }) {
  const [details, setDetails] = useState(meeting?.details || [""]);
  const [validationError, setValidationError] = useState("");

  const handleAddDetail = () => {
    setDetails((previousDetails) => [...previousDetails, ""]);
  };

  const handleDetailChange = (index, value) => {
    setDetails((previousDetails) =>
      previousDetails.map((detail, detailIndex) =>
        detailIndex === index ? value : detail,
      ),
    );
  };

  const handleRemoveDetail = (index) => {
    setDetails((previousDetails) =>
      previousDetails.filter((_, detailIndex) => detailIndex !== index),
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleanDetails = details.map((detail) => detail.trim()).filter(Boolean);

    if (cleanDetails.length === 0) {
      setValidationError("Enter at least one summary detail.");
      return;
    }

    setValidationError("");
    onSave({ details: cleanDetails });
  };

  return (
    <form className="meeting-form" onSubmit={handleSubmit}>
      <h3>{meeting ? "Edit Meeting Summary" : "Add Meeting Summary"}</h3>
      <h4>Summary Details</h4>

      {details.map((detail, index) => (
        <div className="detail-input" key={index}>
          <span className="detail-bullet">•</span>

          <input
            type="text"
            value={detail}
            placeholder={`Summary detail ${index + 1}`}
            onChange={(event) => handleDetailChange(index, event.target.value)}
            disabled={isSaving}
          />

          {details.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveDetail(index)}
              disabled={isSaving}
            >
              Remove
            </button>
          )}
        </div>
      ))}

      {validationError && <p role="alert">{validationError}</p>}

      <button type="button" onClick={handleAddDetail} disabled={isSaving}>
        + Add Bullet Point
      </button>

      <div className="meeting-form-actions">
        <button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : meeting ? "Update Summary" : "Save Summary"}
        </button>

        <button type="button" onClick={onCancel} disabled={isSaving}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default MeetingSummaryForm;
