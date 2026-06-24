export const roleDashboard = {
  user: "/user",
  creator: "/creator",
  admin: "/admin",
};

export function getDashboardPath(role) {
  return roleDashboard[role] || "/user";
}
