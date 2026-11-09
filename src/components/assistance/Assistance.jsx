import { useEffect, useState } from "react";
import AssistanceForm from "./AssistanceForm";
import { can } from "../../data/userPermission";
import { useMember } from "../member-home-page/MemberContext";
import supabase from "../../lib/supabase";
import "./assistance.css";

const Assistance = () => {
  const member = useMember();
  const canAdd = can(member.role, "add", "assistance");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [saveError, setSaveError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [deletingPostId, setDeletingPostId] = useState(null);

  useEffect(() => {
    let isCurrent = true;

    const loadPosts = async () => {
      try {
        const { data, error } = await supabase
          .from("assistance_posts")
          .select("id, owner_id, assistance_title, description, created_at")
          .order("created_at", { ascending: false });

        if (error) {
          if (isCurrent) setLoadError(error.message);
          return;
        }

        const ownerIds = [...new Set(data.map((post) => post.owner_id))];
        let authors = [];

        if (ownerIds.length > 0) {
          const { data: authorData, error: authorsError } = await supabase
            .from("assistance_post_authors")
            .select("owner_id, first_name, last_name")
            .in("owner_id", ownerIds);

          if (authorsError) {
            if (isCurrent) setLoadError(authorsError.message);
            return;
          }

          authors = authorData;
        }

        const ownerNames = new Map(
          authors.map((author) => [
            author.owner_id,
            [author.first_name, author.last_name].filter(Boolean).join(" "),
          ]),
        );

        if (isCurrent) {
          setPosts(
            data.map((post) => ({
              ...post,
              ownerId: post.owner_id,
              ownerName: ownerNames.get(post.owner_id),
              title: post.assistance_title,
              datePosted: post.created_at,
            })),
          );
        }
      } catch (error) {
        if (isCurrent) {
          setLoadError(
            error instanceof Error
              ? error.message
              : "An unexpected error occurred while loading assistance posts.",
          );
        }
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    };

    loadPosts();

    return () => {
      isCurrent = false;
    };
  }, []);

  const handleSave = async (postData) => {
    setSaveError("");
    setIsSaving(true);

    try {
      if (editingPost) {
        if (
          !can(member.role, "edit", "assistance", {
            userId: member.id,
            ownerId: editingPost.ownerId,
          })
        ) {
          return;
        }

        const { data: updatedPost, error } = await supabase
          .from("assistance_posts")
          .update({
            assistance_title: postData.title,
            description: postData.description,
          })
          .eq("id", editingPost.id)
          .eq("owner_id", member.id)
          .select("id, owner_id, assistance_title, description, created_at")
          .single();

        if (error) {
          setSaveError(error.message);
          return;
        }

        setPosts((previousPosts) =>
          previousPosts.map((post) =>
            post.id === updatedPost.id
              ? {
                  ...post,
                  ...updatedPost,
                  ownerId: updatedPost.owner_id,
                  title: updatedPost.assistance_title,
                  datePosted: updatedPost.created_at,
                }
              : post,
          ),
        );
      } else {
        if (!canAdd) return;

        const { data: insertedPost, error } = await supabase
          .from("assistance_posts")
          .insert({
            owner_id: member.id,
            assistance_title: postData.title,
            description: postData.description,
          })
          .select("id, owner_id, assistance_title, description, created_at")
          .single();

        if (error) {
          setSaveError(error.message);
          return;
        }

        setPosts((previousPosts) => [
          {
            ...insertedPost,
            ownerId: insertedPost.owner_id,
            ownerName: [member.firstName, member.lastName]
              .filter(Boolean)
              .join(" "),
            title: insertedPost.assistance_title,
            datePosted: insertedPost.created_at,
          },
          ...previousPosts,
        ]);
      }

      setShowForm(false);
      setEditingPost(null);
    } catch (error) {
      setSaveError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while saving the assistance post.",
      );
    } finally {
      setIsSaving(false);
    }
  };

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

  const handleDelete = async (post) => {
    if (
      !can(member.role, "delete", "assistance", {
        userId: member.id,
        ownerId: post.ownerId,
      })
    ) {
      return;
    }

    setDeleteError("");
    setDeletingPostId(post.id);

    try {
      const { error } = await supabase
        .from("assistance_posts")
        .delete()
        .eq("id", post.id)
        .eq("owner_id", member.id)
        .select("id")
        .single();

      if (error) {
        setDeleteError(error.message);
        return;
      }

      setPosts((previousPosts) =>
        previousPosts.filter((existingPost) => existingPost.id !== post.id),
      );
    } catch (error) {
      setDeleteError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while deleting the assistance post.",
      );
    } finally {
      setDeletingPostId(null);
    }
  };

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
        <>
          {saveError && <p role="alert">Could not save post: {saveError}</p>}
          <AssistanceForm
            post={editingPost}
            onSave={handleSave}
            onCancel={handleCancel}
            isSaving={isSaving}
          />
        </>
      )}

      <div className="assistance-posts">
        <h3>Assistance Requests</h3>
        {deleteError && (
          <p role="alert">Could not delete post: {deleteError}</p>
        )}

        {isLoading ? (
          <p role="status">Loading assistance posts...</p>
        ) : loadError ? (
          <p role="alert">Could not load assistance posts: {loadError}</p>
        ) : posts.length === 0 ? (
          <p>No assistance requests have been posted yet.</p>
        ) : (
          <div className="assistance-grid">
            {posts.map((post) => (
              <div className="assistance-card" key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <small>
                  Posted by: {post.ownerName || "Unknown member"}
                </small>
                <small>
                  Date posted:{" "}
                  {post.datePosted
                    ? new Date(post.datePosted).toLocaleDateString()
                    : "Unknown"}
                </small>

                {can(member.role, "edit", "assistance", {
                  userId: member.id,
                  ownerId: post.ownerId,
                }) && (
                  <div className="assistance-actions">
                    <button
                      onClick={() => handleEdit(post)}
                      disabled={deletingPostId === post.id}
                    >
                      Edit
                    </button>
                    {can(member.role, "delete", "assistance", {
                      userId: member.id,
                      ownerId: post.ownerId,
                    }) && (
                      <button
                        onClick={() => handleDelete(post)}
                        disabled={deletingPostId === post.id}
                      >
                        {deletingPostId === post.id ? "Deleting..." : "Delete"}
                      </button>
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
