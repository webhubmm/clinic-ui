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

  // teeth
  getTeethAPI:'/teeths',
  createEditDeleteTeethManagmentAPI: "/admin/teeths",
  restoreTeethManagmentAPI: "/admin/teeths/restore",
  forceDeleteTeethManagmentAPI: "/admin/teeths/force_delete",

  // holiday
 getHolidayAPI:'/holiday_management',
  createEditDeleteHolidayManagmentAPI: "/admin/holiday_management",
  restoreHolidayManagmentAPI: "/admin/holiday_management/restore",
  forceDeleteHolidayManagmentAPI: "/admin/holiday_management/force_delete",
};
