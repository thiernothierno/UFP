import { useState } from "react";
import initialRules from "../../data/List-of-Rules";

import SocialRules from "./SocialRules";
import RegulationRules from "./RegulationRules";
import "./rules.css";

// Find the highest existing rule number in each category.
const getNextNumber = (category, rules) => {
  const prefix = category === "Social" ? "SOC" : "REG";

  const highestNumber = rules
    .filter((rule) => rule.category === category)
    .reduce((highest, rule) => {
      const number = Number(rule.ruleNumber.split("-")[1]);
      return Math.max(highest, number);
    }, 0);

  return highestNumber + 1;
};

const Rules = () => {
  const [activeCategory, setActiveCategory] = useState("home");
  const [rules, setRules] = useState(initialRules);

  // Keep track of the next numbers so deleted numbers are not reused.
  const [nextSocialNumber, setNextSocialNumber] = useState(() =>
    getNextNumber("Social", initialRules),
  );

  const [nextRegulationNumber, setNextRegulationNumber] = useState(() =>
    getNextNumber("Regulation", initialRules),
  );

  const [nextId, setNextId] = useState(
    () => Math.max(0, ...initialRules.map((rule) => rule.id)) + 1,
  );

  const addRule = (newRule) => {
    const category = newRule.category;
    const number =
      category === "Social" ? nextSocialNumber : nextRegulationNumber;

    const prefix = category === "Social" ? "SOC" : "REG";

    const ruleToAdd = {
      ...newRule,
      id: nextId,
      ruleNumber: `${prefix}-${String(number).padStart(3, "0")}`,
    };

    setRules((previousRules) => [...previousRules, ruleToAdd]);
    setNextId((previousId) => previousId + 1);

    if (category === "Social") {
      setNextSocialNumber((previous) => previous + 1);
    } else {
      setNextRegulationNumber((previous) => previous + 1);
    }
  };

  const editRule = (id, updatedFields) => {
    setRules((previousRules) =>
      previousRules.map((rule) =>
        rule.id === id
          ? {
              ...rule,
              ...updatedFields,
              id: rule.id,
              ruleNumber: rule.ruleNumber,
              category: rule.category,
            }
          : rule,
      ),
    );
  };

  const deleteRule = (id) => {
    setRules((previousRules) => previousRules.filter((rule) => rule.id !== id));
  };

  const socialRules = rules.filter((rule) => rule.category === "Social");

  const regulationRules = rules.filter(
    (rule) => rule.category === "Regulation",
  );

  if (activeCategory === "social") {
    return (
      <SocialRules
        rules={socialRules}
        onBack={() => setActiveCategory("home")}
        onAdd={addRule}
        onEdit={editRule}
        onDelete={deleteRule}
      />
    );
  }

  if (activeCategory === "regulation") {
    return (
      <RegulationRules
        rules={regulationRules}
        onBack={() => setActiveCategory("home")}
        onAdd={addRule}
        onEdit={editRule}
        onDelete={deleteRule}
      />
    );
  }

  return (
    <div className="rules-container">
      <h2>Rules & Regulations</h2>
      <p>Select a category to view its rules.</p>

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
