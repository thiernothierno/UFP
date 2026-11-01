import { useState } from "react";
import initialPosts from "../../data/assistance";
import AssistanceForm from "./AssistanceForm";
import "./assistance.css";

const Assistance = () => {
  const [posts, setPosts] = useState(initialPosts);

  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  // Add or update an assistance post
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
    if (
      window.confirm("Are you sure you want to delete this assistance post?")
    ) {
      setPosts((previousPosts) =>
        previousPosts.filter((post) => post.id !== id),
      );
    }
  };

  // Cancel form
  const handleCancel = () => {
    setShowForm(false);
    setEditingPost(null);
  };

  return (
    <div className="assistance-container">
      <h2>Member Assistance</h2>
      <p>View and post assistance requests.</p>

      {!showForm && (
        <button
          className="add-assistance-button"
          onClick={() => setShowForm(true)}
        >
          Post Your Inquiry
        </button>
      )}

      {showForm && (
        <AssistanceForm
          post={editingPost}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      <div className="assistance-posts">
        <h3>Assistance Requests</h3>

        {posts.length === 0 ? (
          <p>No assistance requests have been posted yet.</p>
        ) : (
          <div className="assistance-grid">
            {posts.map((post) => (
              <div className="assistance-card" key={post.id}>
                <h3>{post.title}</h3>

                <p>{post.description}</p>

                <small>Posted by: {post.name}</small>

                <small>Date posted: {post.datePosted}</small>

                <div className="assistance-actions">
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

export default Assistance;
