import { useState } from "react";
import { can } from "../../data/userPermission";
import { useMember } from "../member-home-page/MemberContext";
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
];

// Randomly select a name and remove it from the original list
function random_name(data) {
  const index = Math.floor(Math.random() * data.length);
  return data.splice(index, 1)[0];
}

// Create group

function create_groups() {
  const boardMembers = [...board_member];
  console.log("board members", boardMembers);

  const regularMembers = [...regular_member_NY];

  const groups = [];
  const totalGroupsNeeded = boardMembers.length;

  // Create four groups with one Board member each
  for (let i = 0; i < totalGroupsNeeded; i++) {
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
  const member = useMember();
  const canUpdateActiveDuty = can(
    member.role,
    "update-active-duty",
    "ruling-schedule",
  );
  const [groups] = useState(() => create_groups());

  const [activeGroup, setActiveGroup] = useState(null);

  return (
    <div className="schedule-container">
      <h2 className="schedule-title">Active Member Groups</h2>

      {/* We will add the five-column table here in Step 2 */}

      <div className="groups-grid">
        {groups.map((group, index) => (
          <div
            className={`group-column ${activeGroup === index ? "active" : ""}`}
            key={index}
          >
            <div className="group-header">
              <h3>Group {index + 1}</h3>

              {/* Only board members may change the active-duty selection. */}
              <input
                type="checkbox"
                checked={activeGroup === index}
                disabled={!canUpdateActiveDuty}
                aria-label={`Set group ${index + 1} as active duty`}
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

            {/*<div className="group-footer">Total members: {group.length}</div>*/}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
