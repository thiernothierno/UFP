import { useState } from "react";
import RuleForm from "./RuleForm";

const RegulationRules = ({
  rules,
  onBack,
  onAdd,
  onEdit,
  onDelete,
  canAdd,
  canEdit,
  canDelete,
  isLoading,
  isSaving,
  deletingRuleId,
  loadError,
  saveError,
  deleteError,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingRule, setEditingRule] = useState(null);

  const handleSave = async (ruleData) => {
    const saved = editingRule
      ? await onEdit(editingRule.id, ruleData)
      : await onAdd(ruleData);

    if (!saved) return;

    setShowForm(false);
    setEditingRule(null);
  };

  const handleEdit = (rule) => {
    setEditingRule(rule);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingRule(null);
  };

  const handleDelete = async (rule) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${rule.ruleNumber} - ${rule.title}?`,
      )
    ) {
      await onDelete(rule.id);
    }
  };

  return (
    <div className="regulation-rules-container">
      <div className="rules-toolbar">
        <button onClick={onBack} className="back-to-rules">
          Back to Rules
        </button>
        {canAdd && !showForm && (
          <button onClick={() => setShowForm(true)} className="add-rules">
            Add Rule
          </button>
        )}
      </div>

      <h2>Regulations</h2>
      {loadError && <p role="alert">Could not load rules: {loadError}</p>}
      {saveError && <p role="alert">Could not save rule: {saveError}</p>}
      {deleteError && <p role="alert">Could not delete rule: {deleteError}</p>}

      {showForm && (
        <RuleForm
          category="Regulation"
          rule={editingRule}
          onSave={handleSave}
          onCancel={handleCancel}
          isSaving={isSaving}
        />
      )}

      {isLoading ? (
        <p role="status">Loading rules...</p>
      ) : loadError ? null : rules.length === 0 ? (
        <p>No regulations have been added yet.</p>
      ) : (
        <div className="rules-grid">
          {rules.map((rule) => (
            <div className="rule-card" key={rule.id}>
              <h3>
                {rule.ruleNumber} - {rule.title}
              </h3>
              <p>{rule.description}</p>
              <small>Date adopted: {rule.dateAdopted}</small>

              {(canEdit || canDelete) && (
                <div className="rule-actions">
                  {canEdit && (
                    <button
                      onClick={() => handleEdit(rule)}
                      disabled={isSaving || deletingRuleId !== null}
                    >
                      Edit
                    </button>
                  )}
                  {canDelete && (
                    <button
                      onClick={() => handleDelete(rule)}
                      disabled={deletingRuleId !== null || isSaving}
                    >
                      {deletingRuleId === rule.id ? "Deleting..." : "Delete"}
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RegulationRules;
