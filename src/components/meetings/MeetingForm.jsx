import { useState } from "react";

function MeetingForm({ year, month, meeting, onSave, onCancel }) {
  const [meetingDate, setMeetingDate] = useState(meeting?.meetingDate || "");
  const [startTime, setStartTime] = useState(meeting?.startTime || "");
  const [location, setLocation] = useState(meeting?.location || "");
  const [details, setDetails] = useState(meeting?.details || [""]);

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
      id: meeting?.id || Date.now(),
      year,
      month,
      meetingDate,
      startTime,
      location,
      details: cleanDetails,
      datePosted: meeting?.datePosted || new Date().toISOString().slice(0, 10),
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
        required
      />

      <label>Start Time:</label>
      <input
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        required
      />

      <label>Location:</label>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
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
          />

          {details.length > 1 && (
            <button type="button" onClick={() => handleRemoveDetail(index)}>
              Remove
            </button>
          )}
        </div>
      ))}

      <button type="button" onClick={handleAddDetail}>
        + Add Bullet Point
      </button>

      <div className="meeting-form-actions">
        <button type="submit">
          {meeting ? "Update Meeting" : "Save Meeting"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default MeetingForm;
