import { useEffect, useState } from "react";
import MeetingForm from "./MeetingForm";
import { can } from "../../data/userPermission";
import { useMember } from "../member-home-page/MemberContext";
import supabase from "../../lib/supabase";
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
  const member = useMember();
  const canAdd = can(member.role, "add", "meetings");
  const canEdit = can(member.role, "edit", "meetings");
  const canDelete = can(member.role, "delete", "meetings");
  const [currentYear] = useState(() => new Date().getFullYear());
  const [currentMonth] = useState(() => new Date().getMonth() + 1);
  const [meetings, setMeetings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState(null);
  const [formError, setFormError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let isCurrent = true;

    const loadMeetings = async () => {
      try {
        const { data, error } = await supabase
          .from("meetings")
          .select("id, meeting_date, start_time, location, details, created_at")
          .order("meeting_date", { ascending: true });

        if (error) {
          if (isCurrent) setLoadError(error.message);
          return;
        }

        if (isCurrent) {
          setMeetings(
            data.map((meeting) => {
              const [year, month] = meeting.meeting_date
                .split("-")
                .map(Number);

              return {
                ...meeting,
                year,
                month,
                meetingDate: meeting.meeting_date,
                startTime: meeting.start_time.slice(0, 5),
              };
            }),
          );
        }
      } catch (error) {
        if (isCurrent) {
          setLoadError(
            error instanceof Error
              ? error.message
              : "An unexpected error occurred while loading meetings.",
          );
        }
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    };

    loadMeetings();

    return () => {
      isCurrent = false;
    };
  }, []);

  const selectedMeeting = meetings.find(
    (meeting) =>
      meeting.year === selectedYear && meeting.month === selectedMonth,
  );

  const handleSave = async (meetingData) => {
    if (editingMeeting ? !canEdit : !canAdd) return;
    setFormError("");
    setIsSaving(true);

    try {
      const values = {
        meeting_date: meetingData.meetingDate,
        start_time: meetingData.startTime,
        location: meetingData.location,
        details: meetingData.details,
      };
      const query = editingMeeting
        ? supabase
            .from("meetings")
            .update(values)
            .eq("id", editingMeeting.id)
        : supabase.from("meetings").insert(values);
      const { data: savedMeeting, error } = await query
        .select("id, meeting_date, start_time, location, details, created_at")
        .single();

      if (error) {
        setFormError(error.message);
        return;
      }

      const [year, month] = savedMeeting.meeting_date.split("-").map(Number);
      const normalizedMeeting = {
        ...savedMeeting,
        year,
        month,
        meetingDate: savedMeeting.meeting_date,
        startTime: savedMeeting.start_time.slice(0, 5),
      };

      setMeetings((previousMeetings) =>
        editingMeeting
          ? previousMeetings.map((meeting) =>
              meeting.id === normalizedMeeting.id
                ? normalizedMeeting
                : meeting,
            )
          : [...previousMeetings, normalizedMeeting],
      );
      setSelectedYear(year);
      setSelectedMonth(month);
      setShowForm(false);
      setEditingMeeting(null);
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while saving the meeting.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = () => {
    if (!canEdit || !selectedMeeting) return;

    setEditingMeeting(selectedMeeting);
    setShowForm(true);
  };

  const handleDelete = async () => {
    if (!canDelete || !selectedMeeting) return;

    if (window.confirm("Are you sure you want to delete this meeting?")) {
      setDeleteError("");
      setIsDeleting(true);

      try {
        const { error } = await supabase
          .from("meetings")
          .delete()
          .eq("id", selectedMeeting.id)
          .select("id")
          .single();

        if (error) {
          setDeleteError(error.message);
          return;
        }

        setMeetings((previousMeetings) =>
          previousMeetings.filter(
            (meeting) => meeting.id !== selectedMeeting.id,
          ),
        );
      } catch (error) {
        setDeleteError(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while deleting the meeting.",
        );
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="meetings-container">
      <h2 className="meetings-title">Board Meeting Details</h2>
      {loadError && <p role="alert">Could not load meetings: {loadError}</p>}

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
            className={[
              "month-button",
              selectedMonth === index + 1 && "active",
              selectedYear === currentYear && currentMonth === index + 1 &&
                "current-month",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => {
              setSelectedMonth(index + 1);
              setShowForm(false);
            }}
            aria-current={
              selectedYear === currentYear && currentMonth === index + 1
                ? "date"
                : undefined
            }
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

          {isLoading ? (
            <p role="status">Loading meetings...</p>
          ) : loadError ? null : selectedMeeting ? (
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

              {(canEdit || canDelete) && (
                <div className="meeting-actions">
                  {canEdit && <button onClick={handleEdit}>Edit</button>}
                  {canDelete && (
                    <button onClick={handleDelete} disabled={isDeleting}>
                      {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <p>No meeting details have been posted for this month.</p>
          )}

          {deleteError && (
            <p role="alert">Could not delete meeting: {deleteError}</p>
          )}
          {formError && (
            <p role="alert">Could not save meeting: {formError}</p>
          )}

          {canAdd && !selectedMeeting && !showForm && (
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
              isSaving={isSaving}
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
