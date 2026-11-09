import { useState } from "react";

const AssistanceForm = ({
  post,
  onSave,
  onCancel,
  isSaving = false,
}) => {
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
    <form className="assistance-form" onSubmit={handleSubmit}>
      <h3>{post ? "Edit Assistance Post" : "Create Assistance Post"}</h3>

      <label htmlFor="assistance-title">Assistance Title</label>
      <input
        id="assistance-title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Enter assistance title"
        required
      />

      <label htmlFor="assistance-description">Description</label>
      <textarea
        id="assistance-description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Describe the assistance needed"
        rows="5"
        required
      />

      <div className="assistance-form-buttons">
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

export default AssistanceForm;
