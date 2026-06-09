// User Role IDs (values stored in database/state)
export const UserRoleId = {
  Admin: 'admin',
  User: 'user',
  Manager: 'manager',
  Editor: 'editor',
} as const;

export type UserRole = (typeof UserRoleId)[keyof typeof UserRoleId];

// User Role Labels (display names)
export const UserRoleLabel = {
  Admin: 'Admin',
  User: 'User',
  Manager: 'Manager',
  Editor: 'Editor',
} as const;

// Mapping from ID to Label
export const USER_ROLE_LABELS: Record<UserRole, string> = {
  [UserRoleId.Admin]: UserRoleLabel.Admin,
  [UserRoleId.User]: UserRoleLabel.User,
  [UserRoleId.Manager]: UserRoleLabel.Manager,
  [UserRoleId.Editor]: UserRoleLabel.Editor,
};

// Array of role IDs for iteration
export const USER_ROLE_OPTIONS = Object.values(UserRoleId);

// Helper function to get label from ID
export const getUserRoleLabel = (role: UserRole): string => {
  return USER_ROLE_LABELS[role] || role;
};
