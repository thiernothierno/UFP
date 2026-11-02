import { useState } from "react";
import initialPosts from "../../data/agenda";
import AgendaForm from "./AgendaForm";
import "./agenda.css";
const AgendaSuggestion = () => {
  const [posts, setPosts] = useState(initialPosts);

  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  // Add or update an agenda post
  const handleSave = (postData) => {
    if (editingPost) {
      // Update existing post
      setPosts((previousPosts) =>
        previousPosts.map((post) =>
          post.id === editingPost.id
            ? { ...post, ...postData, id: post.id }
            : post,
        ),
      );
    } else {
      // Add new post
      const newPost = {
        id: Date.now(),
        ...postData,
      };

      setPosts((previousPosts) => [...previousPosts, newPost]);
    }

    setShowForm(false);
    setEditingPost(null);
  };

  // Open form to edit a post
  const handleEdit = (post) => {
    setEditingPost(post);
    setShowForm(true);
  };

  // Delete a post
  const handleDelete = (id) => {
    // if (window.confirm("Are you sure you want to delete this agenda post?")) {
      setPosts((previousPosts) =>
        previousPosts.filter((post) => post.id !== id),
      );
    // }
  };

  // Cancel form
  const handleCancel = () => {
    setShowForm(false);
    setEditingPost(null);
  };

  return (
    <div className="agenda-container"> 

      <header className="agenda-header">
          <h2>Any topic you want to share?</h2>

          {!showForm && (
            <button className="add-agenda-button" onClick={() => setShowForm(true)}>
              Post Your Topic
            </button>
          )}
      </header>
      {showForm && (
        <AgendaForm
          post={editingPost}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      <div className="agenda-posts">
        <h3>Agenda Suggestion</h3>

        {posts.length === 0 ? (
          <p>No suggestion shared.</p>
        ) : (
          <div className="agenda-grid">
            {posts.map((post) => (
              <div className="agenda-card" key={post.id}>
                <h3>{post.title}</h3>

                <p>{post.description}</p>

                <small>Posted by: {post.name}</small>

                <small>Date posted: {post.datePosted}</small>

                <div className="agenda-actions">
                  <button onClick={() => handleEdit(post)}>Edit</button>

                  <button onClick={() => handleDelete(post.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AgendaSuggestion;
