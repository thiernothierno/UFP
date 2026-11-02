import { useState } from "react";
import "./schedule.css";

// List of board members
const board_member = ["amad", "bebe", "cantona", "david"];

// List of regular members
const regular_member_NY = [
  "emanuel",
  "frank",
  "geoge",
  "hamidou",
  "ismael",
  "junior",
  "tom",
  "frey",
  "cam",
  "bob",
  "Mo",
  "Tati",
  "Ousman",
  "Amir",
  "Robby",
  "Gonzalez",
  "Messi",
  "Ronaldo",
  "Petit",
  "Tara",
  "Cris",
  "Ben",
];

// Randomly select a name and remove it from the original list
function random_name(data) {
  const index = Math.floor(Math.random() * data.length);
  return data.splice(index, 1)[0];
}

// Create group

function create_groups() {
  const boardMembers = [...board_member];
  const regularMembers = [...regular_member_NY];

  const groups = [];

  // Create four groups with one Board member each
  for (let i = 0; i < boardMembers.length; i++) {
    groups.push([random_name(boardMembers)]);
  }

  // Distribute regular members until none remain
  while (regularMembers.length > 0) {
    for (const group of groups) {
      if (regularMembers.length === 0) {
        break;
      }

      group.push(random_name(regularMembers));
    }
  }

  return groups;
}

const Schedule = () => {
  const [groups] = useState(() => create_groups());
  const [activeGroup, setActiveGroup] = useState(null);

  return (
    <div className="schedule-container">
      <h2>Active Member Groups</h2>

      {/* We will add the five-column table here in Step 2 */}

      <div className="groups-grid">
        {groups.map((group, index) => (
          <div
            className={`group-column ${activeGroup === index ? "active" : ""}`}
            key={index}
          >
            <div className="group-header">
              <h3>Group {index + 1}</h3>

              <input
                type="checkbox"
                checked={activeGroup === index}
                onChange={() =>
                  setActiveGroup(activeGroup === index ? null : index)
                }
              />
            </div>

            <div className="group-members">
              {group.map((member, memberIndex) => (
                <div className="group-member" key={memberIndex}>
                  <span>{member}</span>

                  {memberIndex === 0 && (
                    <span className="board-label">Board</span>
                  )}
                </div>
              ))}
            </div>

            <div className="group-footer">Total members: {group.length}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
