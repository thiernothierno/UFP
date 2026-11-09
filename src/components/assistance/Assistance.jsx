import { useState } from "react";
import initialPosts from "../../data/assistance";
import AssistanceForm from "./AssistanceForm";
import { can } from "../../data/userPermission";
import { useMember } from "../member-home-page/MemberContext";
import "./assistance.css";

const Assistance = () => {
  const member = useMember();
  const canAdd = can(member.role, "add", "assistance");
  const [posts, setPosts] = useState(initialPosts);

  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  // Add or update an assistance post
  const handleSave = (postData) => {
    if (editingPost) {
      if (
        !can(member.role, "edit", "assistance", {
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
      !can(member.role, "edit", "assistance", {
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
      !can(member.role, "delete", "assistance", {
        userId: member.id,
        ownerId: post.ownerId,
      })
    ) {
      return;
    }

    // if (
    //   window.confirm("Are you sure you want to delete this assistance post?")
    // ) {
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
    <div className="assistance-container">
    <header className="assistance-header">
      <h2>Member Assistance</h2>
      <p>View and post assistance requests.</p>

      {canAdd && !showForm && (
        <button
          className="add-assistance-button"
          onClick={() => setShowForm(true)}
        >
          Post Your Inquiry
        </button>
      )}
      </header>
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

                {/* Owners alone get edit and delete controls for their posts. */}
                {can(member.role, "edit", "assistance", {
                  userId: member.id,
                  ownerId: post.ownerId,
                }) && (
                  <div className="assistance-actions">
                    <button onClick={() => handleEdit(post)}>Edit</button>
                    {can(member.role, "delete", "assistance", {
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

export default Assistance;
