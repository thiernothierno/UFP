import { useState } from "react";
import initialPosts from "../../data/agenda";
import AgendaForm from "./AgendaForm";
import { can } from "../../data/userPermission";
import { useMember } from "../member-home-page/MemberContext";
import "./agenda.css";
const AgendaSuggestion = () => {
  const member = useMember();
  const canAdd = can(member.role, "add", "agenda");
  const [posts, setPosts] = useState(initialPosts);

  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  // Add or update an agenda post
  const handleSave = (postData) => {
    if (editingPost) {
      if (
        !can(member.role, "edit", "agenda", {
          userId: member.id,
          ownerId: editingPost.ownerId,
        })
      ) {
        return;
      }

      // Update existing post
      setPosts((previousPosts) =>
        previousPosts.map((post) =>
          post.id === editingPost.id
            ? { ...post, ...postData, id: post.id }
            : post,
        ),
      );
    } else {
      if (!canAdd) return;

      // Add new post
      const newPost = {
        ...postData,
        id: Date.now(),
        ownerId: member.id,
      };

      setPosts((previousPosts) => [...previousPosts, newPost]);
    }

    setShowForm(false);
    setEditingPost(null);
  };

  // Open form to edit a post
  const handleEdit = (post) => {
    if (
      !can(member.role, "edit", "agenda", {
        userId: member.id,
        ownerId: post.ownerId,
      })
    ) {
      return;
    }

    setEditingPost(post);
    setShowForm(true);
  };

  // Delete a post
  const handleDelete = (post) => {
    if (
      !can(member.role, "delete", "agenda", {
        userId: member.id,
        ownerId: post.ownerId,
      })
    ) {
      return;
    }

    // if (window.confirm("Are you sure you want to delete this agenda post?")) {
      setPosts((previousPosts) =>
        previousPosts.filter((existingPost) => existingPost.id !== post.id),
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

          {canAdd && !showForm && (
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

                {/* Owners alone get edit and delete controls for their posts. */}
                {can(member.role, "edit", "agenda", {
                  userId: member.id,
                  ownerId: post.ownerId,
                }) && (
                  <div className="agenda-actions">
                    <button onClick={() => handleEdit(post)}>Edit</button>
                    {can(member.role, "delete", "agenda", {
                      userId: member.id,
                      ownerId: post.ownerId,
                    }) && (
                      <button onClick={() => handleDelete(post)}>Delete</button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AgendaSuggestion;
