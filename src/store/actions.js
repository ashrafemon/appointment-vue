/**********************************************************************************
 * auth functionality
 * login, register, logout, currentUser, updateUser
 **********************************************************************************/
export const login = ({commit}, payload) => {
    commit("LOGIN", payload);
};
export const register = ({commit}, payload) => {
    commit("REGISTER", payload);
};
export const forgetPassword = ({commit}, payload) => {
    commit("FORGET_PASSWORD", payload);
};
export const logout = ({commit}) => {
    commit("LOGOUT");
};
export const currentUser = ({commit}) => {
    commit("CURRENT_USER");
};
export const updateUser = ({commit}, payload) => {
    commit("UPDATE_USER", payload);
};

/**********************************************************************************
 * Category functionality
 * index, create, show, delete
 **********************************************************************************/
export const fetchCategories = ({commit}) => {
    commit("FETCH_CATEGORIES");
};
export const createCategory = ({commit}, payload) => {
    commit("CREATE_CATEGORY", payload);
};
export const fetchCategory = ({commit}, payload) => {
    commit("FETCH_CATEGORY", payload);
};
export const deleteCategory = ({commit}, payload) => {
    commit("DELETE_CATEGORY", payload);
};

/**********************************************************************************
 * Service functionality
 * index, create, show, update, delete
 **********************************************************************************/
export const fetchServices = ({commit}) => {
    commit("FETCH_SERVICES");
};
export const createService = ({commit}, payload) => {
    commit("CREATE_SERVICE", payload);
};
export const fetchService = ({commit}, payload) => {
    commit("FETCH_SERVICE", payload);
};
export const updateService = ({commit}, payload) => {
    commit("UPDATE_SERVICE", payload);
};
export const deleteService = ({commit}, payload) => {
    commit("DELETE_SERVICE", payload);
};

/**********************************************************************************
 * staff functionality
 * index, create, show, delete
 **********************************************************************************/
export const fetchStaffs = ({commit}) => {
    commit("FETCH_STAFFS");
};
export const createStaff = ({commit}, payload) => {
    commit("CREATE_STAFF", payload);
};
export const fetchStaff = ({commit}, payload) => {
    commit("FETCH_STAFF", payload);
};
export const deleteStaff = ({commit}, payload) => {
    commit("DELETE_STAFF", payload);
};

/**********************************************************************************
 * Single staff Details functionality
 * updateDetails, uploadAvatar
 **********************************************************************************/
export const updateStaffDetails = ({commit}, payload) => {
    commit("UPDATE_STAFF_DETAILS", payload);
};
export const uploadStaffAvatar = ({commit}, payload) => {
    commit("UPLOAD_STAFF_AVATAR", payload);
};

/**********************************************************************************
 * Single staff Service functionality
 * index, create
 **********************************************************************************/
export const fetchStaffServices = ({commit}, payload) => {
    commit("FETCH_STAFF_SERVICES", payload);
};
export const createStaffService = ({commit}, payload) => {
    commit("CREATE_STAFF_SERVICE", payload);
};

/**********************************************************************************
 * Single staff WorkingHour functionality
 * index, update
 **********************************************************************************/
export const fetchStaffWorkingHours = ({commit}, payload) => {
    commit("FETCH_STAFF_WORKING_HOURS", payload);
};
export const updateStaffWorkingHour = ({commit}, payload) => {
    commit("UPDATE_STAFF_WORKING_HOUR", payload);
};

/**********************************************************************************
 * Single staff BreakHour functionality
 * index, create, update, delete
 **********************************************************************************/
export const fetchStaffBreakTimes = ({commit}, payload) => {
    commit("FETCH_STAFF_BREAK_TIMES", payload);
};
export const createStaffBreakTime = ({commit}, payload) => {
    commit("CREATE_STAFF_BREAK_TIME", payload);
};
export const updateStaffBreakTime = ({commit}, payload) => {
    commit("UPDATE_STAFF_BREAK_TIME", payload);
};
export const deleteStaffBreakTime = ({commit}, payload) => {
    commit("DELETE_STAFF_BREAK_TIME", payload);
};

/**********************************************************************************
 * Single staff Timeoff functionality
 * index, create, statusChange, timeChange
 **********************************************************************************/
export const fetchStaffTimeOffs = ({commit}, payload) => {
    commit("FETCH_STAFF_TIME_OFFS", payload);
};
export const createStaffTimeOff = ({commit}, payload) => {
    commit("CREATE_STAFF_TIME_OFF", payload);
};
export const updateStaffTimeOff = ({commit}, payload) => {
    commit("UPDATE_STAFF_TIME_OFF", payload);
};
export const deleteStaffTimeOff = ({commit}, payload) => {
    commit("DELETE_STAFF_TIME_OFF", payload);
};

/**********************************************************************************
 * Appoint functionality
 * create
 **********************************************************************************/
export const fetchAppoints = ({commit}) => {
    commit("FETCH_APPOINTS");
}
export const fetchUserAppoints = ({commit}) => {
    commit("FETCH_USER_APPOINTS");
}
export const createAppoint = ({commit}, payload) => {
    commit("CREATE_APPOINT", payload);
}

/**********************************************************************************
 * staff functionality
 * details, services, workingHours, breakTimes, timeOffs, workingStatus
 **********************************************************************************/
export const fetchSelfStaff = ({commit}) => {
    commit("FETCH_SELF_STAFF");
}
export const updateSelfStaffDetails = ({commit}, payload) => {
    commit("UPDATE_SELF_STAFF_DETAILS", payload);
};
export const uploadSelfStaffAvatar = ({commit}, payload) => {
    commit("UPLOAD_SELF_STAFF_AVATAR", payload);
};
export const createSelfStaffService = ({commit}, payload) => {
    commit("CREATE_SELF_STAFF_SERVICE", payload);
};
export const updateSelfStaffWorkingHour = ({commit}) => {
    commit("UPDATE_SELF_STAFF_WORKING_HOUR");
};
export const createSelfStaffBreakTime = ({commit}, payload) => {
    commit("CREATE_SELF_STAFF_BREAK_TIME", payload);
};
export const updateSelfStaffBreakTime = ({commit}, payload) => {
    commit("UPDATE_SELF_STAFF_BREAK_TIME", payload);
};
export const deleteSelfStaffBreakTime = ({commit}, payload) => {
    commit("DELETE_SELF_STAFF_BREAK_TIME", payload);
};
export const createSelfStaffTimeoff = ({commit}, payload) => {
    commit("CREATE_SELF_STAFF_TIME_OFF", payload);
};
export const updateSelfStaffTimeoff = ({commit}, payload) => {
    commit("UPDATE_SELF_STAFF_TIME_OFF", payload);
};
export const deleteSelfStaffTimeoff = ({commit}, payload) => {
    commit("DELETE_SELF_STAFF_TIME_OFF", payload);
};
export const fetchSelfStaffLatestWorkingStatus = ({commit}) => {
    commit("FETCH_SELF_STAFF_LATEST_WORKING_STATUS");
}
export const createSelfStaffWorkingStatus = ({commit}, payload) => {
    commit("CREATE_SELF_STAFF_WORKING_STATUS", payload);
}
export const updateSelfStaffWorkingStatus = ({commit}, payload) => {
    commit("UPDATE_SELF_STAFF_WORKING_STATUS", payload);
}