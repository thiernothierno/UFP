import { useEffect, useState } from "react";
import AgendaForm from "./AgendaForm";
import { can } from "../../data/userPermission";
import { useMember } from "../member-home-page/MemberContext";
import supabase from "../../lib/supabase";
import "./agenda.css";

const AgendaSuggestion = () => {
  const member = useMember();
  const canAdd = can(member.role, "add", "agenda");
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
        // RLS decides which agenda rows this signed-in member may read.
        const { data, error } = await supabase
          .from("agenda_posts")
          .select("id, owner_id, title, description, created_at")
          .order("created_at", { ascending: false });

        if (error) {
          if (isCurrent) setLoadError(error.message);
          return;
        }

        const ownerIds = [...new Set(data.map((post) => post.owner_id))];
        let authors = [];

        if (ownerIds.length > 0) {
          const { data: authorData, error: authorsError } = await supabase
            .from("agenda_post_authors")
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
              datePosted: post.created_at,
            })),
          );
        }
      } catch (error) {
        if (isCurrent) {
          setLoadError(
            error instanceof Error
              ? error.message
              : "An unexpected error occurred while loading agenda posts.",
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

  // Add or update an agenda post
  const handleSave = async (postData) => {
    setSaveError("");
    setIsSaving(true);

    try {
      if (editingPost) {
        if (
          !can(member.role, "edit", "agenda", {
            userId: member.id,
            ownerId: editingPost.ownerId,
          })
        ) {
          return;
        }

        const { data: updatedPost, error } = await supabase
          .from("agenda_posts")
          .update({
            title: postData.title,
            description: postData.description,
          })
          .eq("id", editingPost.id)
          .eq("owner_id", member.id)
          .select("id, owner_id, title, description, created_at")
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
                  datePosted: updatedPost.created_at,
                }
              : post,
          ),
        );
      } else {
        if (!canAdd) return;

        // The owner comes from the signed-in session; the database supplies ID and timestamp.
        const { data: insertedPost, error } = await supabase
          .from("agenda_posts")
          .insert({
            owner_id: member.id,
            title: postData.title,
            description: postData.description,
          })
          .select("id, owner_id, title, description, created_at")
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
          : "An unexpected error occurred while saving the agenda post.",
      );
    } finally {
      setIsSaving(false);
    }
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
  const handleDelete = async (post) => {
    if (
      !can(member.role, "delete", "agenda", {
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
        .from("agenda_posts")
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
          : "An unexpected error occurred while deleting the agenda post.",
      );
    } finally {
      setDeletingPostId(null);
    }
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
          <button
            className="add-agenda-button"
            onClick={() => setShowForm(true)}
          >
            Post Your Topic
          </button>
        )}
      </header>
      {showForm && (
        <>
          {saveError && <p role="alert">Could not save post: {saveError}</p>}
          <AgendaForm
            post={editingPost}
            onSave={handleSave}
            onCancel={handleCancel}
            isSaving={isSaving}
          />
        </>
      )}

      <div className="agenda-posts">
        <h3>Agenda Suggestion</h3>
        {deleteError && (
          <p role="alert">Could not delete agenda post: {deleteError}</p>
        )}

        {isLoading ? (
          <p role="status">Loading agenda posts...</p>
        ) : loadError ? (
          <p role="alert">Could not load agenda posts: {loadError}</p>
        ) : posts.length === 0 ? (
          <p>No suggestion shared.</p>
        ) : (
          <div className="agenda-grid">
            {posts.map((post) => (
              <div className="agenda-card" key={post.id}>
                <h3>{post.title}</h3>

                <p>{post.description}</p>

                <small>Posted by: {post.ownerName || "Unknown member"}</small>

                <small>
                  Date posted:{" "}
                  {post.datePosted
                    ? new Date(post.datePosted).toLocaleDateString()
                    : "Unknown"}
                </small>

                {/* Owners alone get edit and delete controls for their posts. */}
                {can(member.role, "edit", "agenda", {
                  userId: member.id,
                  ownerId: post.ownerId,
                }) && (
                  <div className="agenda-actions">
                    <button
                      onClick={() => handleEdit(post)}
                      disabled={deletingPostId === post.id}
                    >
                      Edit
                    </button>
                    {can(member.role, "delete", "agenda", {
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

export default AgendaSuggestion;
