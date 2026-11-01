import { useState } from "react";

const AssistanceForm = ({ post, onSave, onCancel }) => {
  const [name, setName] = useState(post?.name || "");
  const [title, setTitle] = useState(post?.title || "");
  const [description, setDescription] = useState(post?.description || "");
  const [datePosted, setDatePosted] = useState(
    post?.datePosted || new Date().toLocaleDateString("en-CA"),
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    onSave({
      name,
      title,
      description,
      datePosted,
    });
  };

  return (
    <form className="assistance-form" onSubmit={handleSubmit}>
      <h3>{post ? "Edit Assistance Post" : ""}</h3>

      <label>Member Name</label>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Enter member name"
        required
      />

      <label>Assistance Title</label>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Enter assistance title"
        required
      />

      <label>Description</label>
      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Describe the assistance needed"
        rows="5"
        required
      />

      <label>Date Posted</label>
      <input
        type="date"
        value={datePosted}
        onChange={(event) => setDatePosted(event.target.value)}
        required
      />

      <div className="assistance-form-buttons">
        <button type="submit">{post ? "Save Changes" : "Submit Post"}</button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AssistanceForm;
