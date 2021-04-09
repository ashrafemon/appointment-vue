export const isAuthenticate = state => {
    return state.isAuthenticate;
};
export const authToken = state => {
    return state.authToken;
};
export const currentUser = state => {
    return state.currentUser;
};

export const busyBox = state => {
    return state.busyBox;
};
export const message = state => {
    return state.message;
};
export const validateErrors = state => {
    return state.validateErrors
}

export const categories = state => {
    return state.categories;
};
export const currentCategory = state => {
    return state.currentCategory;
};

export const services = state => {
    return state.services;
};
export const currentService = state => {
    return state.currentService;
};

export const staffs = state => {
    return state.staffs;
};
export const currentStaff = state => {
    return state.currentStaff;
};
export const latestWorkingStatus = state => {
    return state.latestWorkingStatus
}

export const bookingTab = state => {
    return state.bookingTab;
};
export const bookingEvent = state => {
    return state.bookingEvent;
};
export const bookingConfirm = state => {
    return state.bookingConfirm;
}
export const confirmAppoint = state => {
    return state.confirmAppoint;
}

export const appoints = state => {
    return state.appoints;
}
export const appointedUserAppoints = state => {
    return state.appointedUserAppoints
}