//auth
export const api = {
  registerAPI: "/register",
  loginAPI: "/login",
  logoutAPI: "/logout",

  //user_Management
  crudUserManagementAPI: "/admin/user_management",
  restoreUserManagementAPI: "/admin/user_management/restore",
  forceDeleteUserManagementAPI: "/admin/user_management/force_delete",

  //branches
  getBranchesAPI: "/branches",
  createEditDeleteBranchesAPI: "/admin/branches",
  restoreBranchesAPI: "/admin/branches/restore",
  forceDeleteBranchesAPI: "/admin/branches/force_delete",
};
