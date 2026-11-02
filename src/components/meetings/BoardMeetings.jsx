import { useState } from "react";
import initialMeetings from "../../data/meetings";
import MeetingForm from "./MeetingForm";
import "./meetings.css";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function BoardMeetings() {
  const [meetings, setMeetings] = useState(initialMeetings);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState(null);

  const now = new Date();
  const currentYear = now.getFullYear();

  const selectedMeeting = meetings.find(
    (meeting) =>
      meeting.year === selectedYear && meeting.month === selectedMonth,
  );

  const handleSave = (updatedMeeting) => {
    if (editingMeeting) {
      setMeetings((prevMeetings) =>
        prevMeetings.map((meeting) =>
          meeting.id === updatedMeeting.id ? updatedMeeting : meeting,
        ),
      );
    } else {
      setMeetings((prevMeetings) => [...prevMeetings, updatedMeeting]);
    }

    setShowForm(false);
    setEditingMeeting(null);
  };

  const handleEdit = () => {
    setEditingMeeting(selectedMeeting);
    setShowForm(true);
  };

  //   const handleDelete = () => {
  //     const confirmed = window.confirm(
  //       "Are you sure you want to delete this meeting?",
  //     );

  //     if (confirmed) {
  //       setMeetings((prevMeetings) =>
  //         prevMeetings.filter((meeting) => meeting.id !== selectedMeeting.id),
  //       );
  //     }
  //   };

  return (
    <div className="meetings-container">
      <h2 className="meetings-title">Board Meeting Details</h2>

      <div className="meetings-year">
        <label>Select Year:</label>

        <select
          value={selectedYear}
          onChange={(e) => {
            setSelectedYear(Number(e.target.value));
            setSelectedMonth(null);
            setShowForm(false);
          }}
        >
          {[
            currentYear,
            currentYear + 1,
            currentYear + 2,
            currentYear + 3,
            currentYear + 4,
          ].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="months-grid">
        {months.map((month, index) => (
          <button
            key={month}
            className={
              selectedMonth === index + 1
                ? "month-button active"
                : "month-button"
            }
            onClick={() => {
              setSelectedMonth(index + 1);
              setShowForm(false);
            }}
          >
            {month}
          </button>
        ))}
      </div>

      {selectedMonth !== null && (
        <div className="meeting-details">
          <h3>
            {months[selectedMonth - 1]} {selectedYear} Meeting
          </h3>

          {selectedMeeting ? (
            <div className="meeting-card">
              <p>
                <strong>Date:</strong> {selectedMeeting.meetingDate}
              </p>

              <p>
                <strong>Time:</strong> {selectedMeeting.startTime}
              </p>

              <p>
                <strong>Location:</strong> {selectedMeeting.location}
              </p>

              <h4>Meeting Details:</h4>

              <ul className="meeting-bullet-list">
                {selectedMeeting.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>

              <div className="meeting-actions">
                <button onClick={handleEdit}>Edit</button>
                {/* <button onClick={handleDelete}>Delete</button> */}
              </div>
            </div>
          ) : (
            <p>No meeting details have been posted for this month.</p>
          )}

          {!selectedMeeting && !showForm && (
            <button
              onClick={() => {
                setEditingMeeting(null);
                setShowForm(true);
              }}
            >
              + Add Meeting Details
            </button>
          )}

          {showForm && (
            <MeetingForm
              year={selectedYear}
              month={selectedMonth}
              meeting={editingMeeting}
              onSave={handleSave}
              onCancel={() => {
                setShowForm(false);
                setEditingMeeting(null);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default BoardMeetings;
