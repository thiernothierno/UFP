import { useEffect, useState } from "react";
import SocialRules from "./SocialRules";
import RegulationRules from "./RegulationRules";
import { can } from "../../data/userPermission";
import { useMember } from "../member-home-page/MemberContext";
import supabase from "../../lib/supabase";
import "./rules.css";

const normalizeRule = (rule) => ({
  ...rule,
  ruleNumber: rule.rule_number,
  dateAdopted: rule.date_adopted,
});

const Rules = () => {
  const member = useMember();
  const canAddRules = can(member.role, "add", "rules");
  const canEditRules = can(member.role, "edit", "rules");
  const canDeleteRules = can(member.role, "delete", "rules");
  const [activeCategory, setActiveCategory] = useState("home");
  const [rules, setRules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [deletingRuleId, setDeletingRuleId] = useState(null);

  useEffect(() => {
    let isCurrent = true;

    const loadRules = async () => {
      try {
        const { data, error } = await supabase
          .from("rules")
          .select("id, rule_number, title, description, category, date_adopted")
          .order("rule_number", { ascending: true });

        if (error) {
          if (isCurrent) setLoadError(error.message);
          return;
        }

        if (isCurrent) setRules(data.map(normalizeRule));
      } catch (error) {
        if (isCurrent) {
          setLoadError(
            error instanceof Error
              ? error.message
              : "An unexpected error occurred while loading rules.",
          );
        }
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    };

    loadRules();

    return () => {
      isCurrent = false;
    };
  }, []);

  const saveRule = async (ruleData, existingRule = null) => {
    if (existingRule ? !canEditRules : !canAddRules) return false;

    setSaveError("");
    setIsSaving(true);

    try {
      let query;

      if (existingRule) {
        query = supabase
          .from("rules")
          .update({
            title: ruleData.title,
            description: ruleData.description,
            date_adopted: ruleData.dateAdopted,
          })
          .eq("id", existingRule.id);
      } else {
        const prefix = ruleData.category === "Social" ? "SOC" : "REG";
        const highestNumber = rules
          .filter((rule) => rule.category === ruleData.category)
          .reduce((highest, rule) => {
            const number = Number(rule.ruleNumber.split("-")[1]);
            return Number.isFinite(number) ? Math.max(highest, number) : highest;
          }, 0);
        const ruleNumber = `${prefix}-${String(highestNumber + 1).padStart(3, "0")}`;

        query = supabase.from("rules").insert({
          rule_number: ruleNumber,
          title: ruleData.title,
          description: ruleData.description,
          category: ruleData.category,
          date_adopted: ruleData.dateAdopted,
        });
      }

      const { data, error } = await query
        .select("id, rule_number, title, description, category, date_adopted")
        .single();

      if (error) {
        setSaveError(error.message);
        return false;
      }

      const savedRule = normalizeRule(data);
      setRules((previousRules) =>
        existingRule
          ? previousRules.map((rule) =>
              rule.id === savedRule.id ? savedRule : rule,
            )
          : [...previousRules, savedRule],
      );
      return true;
    } catch (error) {
      setSaveError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while saving the rule.",
      );
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const deleteRule = async (id) => {
    if (!canDeleteRules) return false;

    setDeleteError("");
    setDeletingRuleId(id);

    try {
      const { error } = await supabase
        .from("rules")
        .delete()
        .eq("id", id)
        .select("id")
        .single();

      if (error) {
        setDeleteError(error.message);
        return false;
      }

      setRules((previousRules) => previousRules.filter((rule) => rule.id !== id));
      return true;
    } catch (error) {
      setDeleteError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while deleting the rule.",
      );
      return false;
    } finally {
      setDeletingRuleId(null);
    }
  };

  const socialRules = rules.filter((rule) => rule.category === "Social");
  const regulationRules = rules.filter(
    (rule) => rule.category === "Regulation",
  );
  const sharedProps = {
    onBack: () => setActiveCategory("home"),
    onAdd: (ruleData) => saveRule(ruleData),
    onEdit: (id, ruleData) => {
      const rule = rules.find((item) => item.id === id);
      return rule ? saveRule(ruleData, rule) : false;
    },
    onDelete: deleteRule,
    canAdd: canAddRules,
    canEdit: canEditRules,
    canDelete: canDeleteRules,
    isLoading,
    isSaving,
    deletingRuleId,
    loadError,
    saveError,
    deleteError,
  };

  if (activeCategory === "social") {
    return <SocialRules {...sharedProps} rules={socialRules} />;
  }

  if (activeCategory === "regulation") {
    return <RegulationRules {...sharedProps} rules={regulationRules} />;
  }

  return (
    <div className="rules-container">
      <h2>Rules &amp; Regulations</h2>
      <p>Select a category to view its rules.</p>
      {isLoading && <p role="status">Loading rules...</p>}
      {loadError && <p role="alert">Could not load rules: {loadError}</p>}

      <div className="rules-categories">
        <button
          className="rules-category"
          onClick={() => setActiveCategory("social")}
        >
          Social Rules
        </button>

        <button
          className="rules-category"
          onClick={() => setActiveCategory("regulation")}
        >
          Regulations
        </button>
      </div>
    </div>
  );
};

export default Rules;
