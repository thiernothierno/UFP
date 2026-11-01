import { useState } from "react";

const RuleForm = ({ category, rule, onSave, onCancel }) => {
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

      <label>Rule Title</label>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />

      <label>Description</label>
      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        required
        rows="5"
      />

      <label>Date Adopted</label>
      <input
        type="date"
        value={dateAdopted}
        onChange={(event) => setDateAdopted(event.target.value)}
        required
      />

      <div className="rule-form-buttons">
        <button type="submit">{rule ? "Save Changes" : "Add Rule"}</button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default RuleForm;
