import { useEffect, useState } from "react";
import MeetingSummaryForm from "./MeetingSummaryForm";
import { can } from "../../data/userPermission";
import { useMember } from "../member-home-page/MemberContext";
import supabase from "../../lib/supabase";
import "./meetingSummary.css";

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

function MeetingSummary() {
  const member = useMember();
  const canAdd = can(member.role, "add", "meeting-summary");
  const canEdit = can(member.role, "edit", "meeting-summary");
  const [currentYear] = useState(() => new Date().getFullYear());
  const [currentMonth] = useState(() => new Date().getMonth() + 1);
  const [summaries, setSummaries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingSummary, setEditingSummary] = useState(null);
  const [saveError, setSaveError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let isCurrent = true;

    const loadSummaries = async () => {
      try {
        const { data, error } = await supabase
          .from("meeting_summaries")
          .select("id, summary_year, summary_month, details, created_at")
          .order("summary_year", { ascending: false })
          .order("summary_month", { ascending: false });

        if (error) {
          if (isCurrent) setLoadError(error.message);
          return;
        }

        if (isCurrent) {
          setSummaries(
            data.map((summary) => ({
              ...summary,
              year: summary.summary_year,
              month: summary.summary_month,
            })),
          );
        }
      } catch (error) {
        if (isCurrent) {
          setLoadError(
            error instanceof Error
              ? error.message
              : "An unexpected error occurred while loading meeting summaries.",
          );
        }
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    };

    loadSummaries();

    return () => {
      isCurrent = false;
    };
  }, []);

  const selectedSummary = summaries.find(
    (summary) =>
      summary.year === selectedYear && summary.month === selectedMonth,
  );

  const handleSave = async (summaryData) => {
    if (editingSummary ? !canEdit : !canAdd) return;

    setSaveError("");
    setIsSaving(true);

    try {
      const values = {
        summary_year: selectedYear,
        summary_month: selectedMonth,
        details: summaryData.details,
      };
      const query = editingSummary
        ? supabase
            .from("meeting_summaries")
            .update(values)
            .eq("id", editingSummary.id)
        : supabase.from("meeting_summaries").insert(values);
      const { data: savedSummary, error } = await query
        .select("id, summary_year, summary_month, details, created_at")
        .single();

      if (error) {
        setSaveError(error.message);
        return;
      }

      const normalizedSummary = {
        ...savedSummary,
        year: savedSummary.summary_year,
        month: savedSummary.summary_month,
      };

      setSummaries((previousSummaries) =>
        editingSummary
          ? previousSummaries.map((summary) =>
              summary.id === normalizedSummary.id ? normalizedSummary : summary,
            )
          : [...previousSummaries, normalizedSummary],
      );
      setShowForm(false);
      setEditingSummary(null);
    } catch (error) {
      setSaveError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while saving the meeting summary.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = () => {
    if (!canEdit || !selectedSummary) return;

    setSaveError("");
    setEditingSummary(selectedSummary);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingSummary(null);
    setSaveError("");
  };

  return (
    <div className="meetings-container">
      <h2 className="meetings-title">Meeting Summary</h2>
      {loadError && (
        <p role="alert">Could not load meeting summaries: {loadError}</p>
      )}

      <div className="meetings-year">
        <label htmlFor="summary-year">Select Year:</label>
        <select
          id="summary-year"
          value={selectedYear}
          onChange={(event) => {
            setSelectedYear(Number(event.target.value));
            setSelectedMonth(null);
            setShowForm(false);
            setEditingSummary(null);
            setSaveError("");
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
              setEditingSummary(null);
              setSaveError("");
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
            {months[selectedMonth - 1]} {selectedYear} Meeting Summary
          </h3>

          {isLoading ? (
            <p role="status">Loading meeting summaries...</p>
          ) : loadError ? null : selectedSummary ? (
            <div className="meeting-card">
              <ul className="meeting-bullet-list">
                {selectedSummary.details.map((detail, index) => (
                  <li key={`${selectedSummary.id}-${index}`}>{detail}</li>
                ))}
              </ul>

              {canEdit && (
                <div className="meeting-actions">
                  <button onClick={handleEdit}>Edit</button>
                </div>
              )}
            </div>
          ) : (
            <p>No summary has been posted for this month.</p>
          )}

          {saveError && (
            <p role="alert">Could not save meeting summary: {saveError}</p>
          )}

          {canAdd &&
            !selectedSummary &&
            !showForm &&
            !isLoading &&
            !loadError && (
              <button
                onClick={() => {
                  setEditingSummary(null);
                  setSaveError("");
                  setShowForm(true);
                }}
              >
                + Add Summary
              </button>
            )}

          {showForm && (
            <MeetingSummaryForm
              key={editingSummary?.id ?? `${selectedYear}-${selectedMonth}`}
              meeting={editingSummary}
              onSave={handleSave}
              onCancel={handleCancel}
              isSaving={isSaving}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default MeetingSummary;
