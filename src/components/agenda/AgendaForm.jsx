import { useState } from "react";

const AgendaForm = ({ post, onSave, onCancel, isSaving = false }) => {
  const [title, setTitle] = useState(post?.title || "");
  const [description, setDescription] = useState(post?.description || "");

  const handleSubmit = (event) => {
    event.preventDefault();

    onSave({
      title,
      description,
    });
  };

  return (
    <form className="agenda-form" onSubmit={handleSubmit}>
      <h3>{post ? "Edit agenda post" : "Create agenda post"}</h3>

      <label>Agenda Proposal</label>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Enter agenda title"
        required
      />

      <label>Description</label>
      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Describe the agenda needed"
        rows="5"
        required
      />

      <div className="agenda-form-buttons">
        <button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : post ? "Save Changes" : "Submit Post"}
        </button>

        <button type="button" onClick={onCancel} disabled={isSaving}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AgendaForm;
