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

  //services
  getServicesAPI: "/services",
  createEditDeleteServicesAPI: "/admin/services",
  restoreServicesAPI: "/admin/services/restore",
  forceDeleteServicesAPI: "/admin/services/force_delete",

  //packages
  getPackagesAPI: "/packages",
  createEditDeletePackagesAPI: "/admin/packages",
  restorePackagesAPI: "/admin/packages/restore",
  forceDeletePackagesAPI: "/admin/packages/force_delete",

  // teeth
  getTeethAPI: "/teeths",
  createEditDeleteTeethManagmentAPI: "/admin/teeths",
  restoreTeethManagmentAPI: "/admin/teeths/restore",
  forceDeleteTeethManagmentAPI: "/admin/teeths/force_delete",

  //doctors
  getDoctorsAPI: "/doctors",
  createEditDeleteDoctorsAPI: "/admin/doctors",
  restoreDoctorsAPI: "/admin/doctors/restore",
  forceDeleteDoctorsAPI: "/admin/doctors/force_delete",
};
