import { useState } from "react";

const RuleForm = ({
  category,
  rule,
  onSave,
  onCancel,
  isSaving = false,
}) => {
  const [title, setTitle] = useState(rule?.title || "");
  const [description, setDescription] = useState(rule?.description || "");
  const [dateAdopted, setDateAdopted] = useState(rule?.dateAdopted || "");

  const handleSubmit = (event) => {
    event.preventDefault();

    onSave({
      title,
      description,
      category,
      dateAdopted,
    });
  };

  return (
    <form className="rule-form" onSubmit={handleSubmit}>
      <h3>{rule ? "Edit Rule" : "Add New Rule"}</h3>

      <label htmlFor="rule-title">Rule Title</label>
      <input
        id="rule-title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Enter rule title"
        required
        disabled={isSaving}
      />

      <label htmlFor="rule-description">Description</label>
      <textarea
        id="rule-description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Describe the rule"
        required
        rows="5"
        disabled={isSaving}
      />

      <label htmlFor="rule-date-adopted">Date Adopted</label>
      <input
        id="rule-date-adopted"
        type="date"
        value={dateAdopted}
        onChange={(event) => setDateAdopted(event.target.value)}
        required
        disabled={isSaving}
      />

      <div className="rule-form-buttons">
        <button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : rule ? "Save Changes" : "Add Rule"}
        </button>

        <button type="button" onClick={onCancel} disabled={isSaving}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default RuleForm;
