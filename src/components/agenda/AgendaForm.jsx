import { useState } from "react";

const AgendaForm = ({ post, onSave, onCancel }) => {
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
    <form className="agenda-form" onSubmit={handleSubmit}>
      <h3>{post ? "Edit agenda Post" : ""}</h3>

      <label>Member Name</label>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Enter member name"
        required
      />

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

      <label>Date Posted</label>
      <input
        type="date"
        value={datePosted}
        onChange={(event) => setDatePosted(event.target.value)}
        required
      />

      <div className="agenda-form-buttons">
        <button type="submit">{post ? "Save Changes" : "Submit Post"}</button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AgendaForm;
