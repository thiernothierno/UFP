import { useState } from "react";

function MeetingForm({
  year,
  month,
  meeting,
  onSave,
  onCancel,
  isSaving = false,
}) {
  const [meetingDate, setMeetingDate] = useState(meeting?.meetingDate || "");
  const [startTime, setStartTime] = useState(meeting?.startTime || "");
  const [location, setLocation] = useState(meeting?.location || "");
  const [details, setDetails] = useState(meeting?.details || [""]);
  const monthString = String(month).padStart(2, "0");
  const lastDay = new Date(year, month, 0).getDate();
  const minDate = `${year}-${monthString}-01`;
  const maxDate = `${year}-${monthString}-${String(lastDay).padStart(2, "0")}`;

  const handleAddDetail = () => {
    setDetails([...details, ""]);
  };

  const handleDetailChange = (index, value) => {
    const updatedDetails = [...details];
    updatedDetails[index] = value;
    setDetails(updatedDetails);
  };

  const handleRemoveDetail = (index) => {
    setDetails(details.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanDetails = details
      .map((detail) => detail.trim())
      .filter((detail) => detail !== "");

    if (cleanDetails.length === 0) {
      alert("Please enter at least one meeting detail.");
      return;
    }

    const updatedMeeting = {
      meetingDate,
      startTime,
      location,
      details: cleanDetails,
    };

    onSave(updatedMeeting);
  };

  return (
    <form className="meeting-form" onSubmit={handleSubmit}>
      <h3>{meeting ? "Edit Meeting Details" : "Add Meeting Details"}</h3>

      <label>Meeting Date:</label>
      <input
        type="date"
        value={meetingDate}
        onChange={(e) => setMeetingDate(e.target.value)}
        min={minDate}
        max={maxDate}
        required
        disabled={isSaving}
      />

      <label>Start Time:</label>
      <input
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        required
        disabled={isSaving}
      />

      <label>Location:</label>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
        disabled={isSaving}
      />

      <h4>Meeting Details</h4>

      {details.map((detail, index) => (
        <div className="detail-input" key={index}>
          <span className="detail-bullet">•</span>

          <input
            type="text"
            value={detail}
            placeholder={`Meeting detail ${index + 1}`}
            onChange={(e) => handleDetailChange(index, e.target.value)}
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

      <button type="button" onClick={handleAddDetail} disabled={isSaving}>
        + Add Bullet Point
      </button>

      <div className="meeting-form-actions">
        <button type="submit" disabled={isSaving}>
          {isSaving
            ? "Saving..."
            : meeting
              ? "Update Meeting"
              : "Save Meeting"}
        </button>

        <button type="button" onClick={onCancel} disabled={isSaving}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default MeetingForm;
