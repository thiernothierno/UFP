import { useState } from "react";
import RuleForm from "./RuleForm";


const SocialRules = ({ rules, onBack, onAdd, onEdit, onDelete }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingRule, setEditingRule] = useState(null);

  const handleSave = (ruleData) => {
    if (editingRule) {
      onEdit(editingRule.id, ruleData);
    } else {
      onAdd(ruleData);
    }

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

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this rule?")) {
      onDelete(id);
    }
  };

  return (
    <div className="social-rules-container">
      <div className="rules-toolbar">
        <button onClick={onBack} className="back-to-rules">
          Back to Rules
        </button>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="add-rules">
            Add Rule
          </button>
        )}
      </div>

      <h2 className="rules-title">Social Rules</h2>

      {showForm && (
        <RuleForm
          category="Social"
          rule={editingRule}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      {rules.length === 0 ? (
        <p>No social rules have been added yet.</p>
      ) : (
        <div className="rules-grid">
          {rules.map((rule) => (
            <div className="rule-card" key={rule.id}>
              <h3>
                {rule.ruleNumber} - {rule.title}
              </h3>
              <p>{rule.description}</p>
              <small>Date adopted: {rule.dateAdopted}</small>

              <div className="rule-actions">
                <button onClick={() => handleEdit(rule)}>Edit</button>

                <button onClick={() => handleDelete(rule.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SocialRules;
