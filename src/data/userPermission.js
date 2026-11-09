// Shared UI policy: map each resource/action pair to the roles allowed to use it.
const permissionRules = {
  "public-pages": {
    view: ["visitor", "member", "board"],
  },
  "member-pages": {
    view: ["member", "board"],
  },
  "contact-messages": {
    submit: ["visitor", "member", "board"],
  },
  "monthly-payments": {
    view: ["member", "board"],
    add: ["board"],
    edit: ["board"],
    delete: ["board"],
  },
  "summary": {
    view: ["member", "board"],
  },
  "infractions": {
    view: ["member", "board"],
    add: ["board"],
    edit: ["board"],
    delete: ["board"],
  },
  "rules": {
    view: ["member", "board"],
    add: ["board"],
    edit: ["board"],
  },
  "ruling-schedule": {
    view: ["member", "board"],
    "update-active-duty": ["board"],
  },
  "meetings": {
    view: ["member", "board"],
    add: ["board"],
    edit: ["board"],
    delete: ["board"],
  },
  "agenda": {
    view: ["member", "board"],
    add: ["member", "board"],
    edit: ["member", "board"],
    delete: ["member", "board"],
  },
  "assistance": {
    view: ["member", "board"],
    add: ["member", "board"],
    edit: ["member", "board"],
    delete: ["member", "board"],
  },
  "meeting-summary":{
    view: ["member", "board"],
    add: ["board"],
    edit: ["board"],

  }
};

export function can(role, action, resource, { userId, ownerId } = {}) {
  const allowedRoles = permissionRules[resource]?.[action];

  if (!allowedRoles?.includes(role)) {
    return false;
  }

  const ownershipRequired =
    ["agenda", "assistance"].includes(resource) &&
    ["edit", "delete"].includes(action);

  if (ownershipRequired) {
    // Post-management permissions also require the signed-in user to own the post.
    return userId != null && ownerId != null && userId === ownerId;
  }

  return true;
}
