import {API_URL} from "@/utils/constains";
import router from "../router";
import state from './state'
import {formDataBuilder, messageSetter, validateErrorPusher} from '@/utils/helpers'

let bodyHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

let token = state.authToken || localStorage.getItem('token')

/**********************************************************************************
 * utility functionality
 * TOGGLE_BUSY_BOX, CLEAR_MESSAGE, CLEAR_VALIDATE_ERRORS
 **********************************************************************************/
export const TOGGLE_BUSY_BOX = (state, data) => {
    state.busyBox = data
}
export const CLEAR_MESSAGE = (state) => {
    state.message = {}
}
export const CLEAR_VALIDATE_ERRORS = (state) => {
    state.validateErrors = []
}

/**********************************************************************************
 * auth functionality
 * login, register, logout, currentUser, updateUser
 **********************************************************************************/
export const LOGIN = (state, data) => {
    TOGGLE_BUSY_BOX(state, true)
    fetch(API_URL + 'auth/login', {
        method: 'POST',
        headers: bodyHeaders,
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            if (res.status === 'done') {
                state.message = messageSetter(res.status, res.message)
                state.isAuthenticate = true
                state.authToken = res.token
                state.currentUser = res.user
                token = res.token
                localStorage.setItem('token', res.token)


                if (res.user && parseInt(res.user.role_id) === 1) {
                    router.replace({name: 'Calendar'})
                    // window.location.reload()
                } else if (res.user && parseInt(res.user.role_id) === 2) {
                    router.replace({name: 'StaffDashboard'})
                    // window.location.reload()
                } else if (res.user && parseInt(res.user.role_id) === 3) {
                    if (router.history.current.name === 'Login') {
                        router.replace({name: 'UserDashboard'})
                        // window.location.reload()
                    }
                }
            } else if (res.status === 'validation_error') {
                state.validateErrors = validateErrorPusher(res.errors)
            } else if (res.status === 'error') {
                state.message = messageSetter(res.status, res.message)
            }
            TOGGLE_BUSY_BOX(state, false)
        })
        .catch(err => console.log(err))
}
export const REGISTER = (state, data) => {
    TOGGLE_BUSY_BOX(state, true)
    fetch(API_URL + 'auth/register', {
        method: 'POST',
        headers: bodyHeaders,
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            if (res.status === 'done') {
                state.message = messageSetter(res.status, res.message)
            } else if (res.status === 'validation_error') {
                state.validateErrors = validateErrorPusher(res.errors)
            } else if (res.status === 'error') {
                state.message = messageSetter(res.status, res.message)
            }
            TOGGLE_BUSY_BOX(state, false)
        })
        .catch(err => console.log(err))
}
export const FORGET_PASSWORD = (state, data) => {
    TOGGLE_BUSY_BOX(state, true)
    fetch(API_URL + 'auth/forget', {
        method: 'POST',
        headers: bodyHeaders,
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            if (res.status === 'done') {
                state.message = messageSetter(res.status, res.message)
            } else if (res.status === 'validation_error') {
                state.validateErrors = validateErrorPusher(res.errors)
            }
            TOGGLE_BUSY_BOX(state, false)
        })
        .catch(err => console.log(err))
}
export const LOGOUT = (state) => {
    if (token) {
        TOGGLE_BUSY_BOX(state, true)
        fetch(API_URL + 'auth/logout', {
            method: 'POST',
            headers: {
                ...bodyHeaders,
                'Authorization': token
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 'done') {
                    state.message = messageSetter(res.status, res.message)
                    localStorage.removeItem('token')
                    state.isAuthenticate = false
                    state.currentUser = null
                    token = null
                    router.replace({name: 'Login'})
                }
                TOGGLE_BUSY_BOX(state, false)
            })
            .catch(err => console.log(err))
    }
}
export const CURRENT_USER = (state) => {
    if (token) {
        TOGGLE_BUSY_BOX(state, true)
        fetch(API_URL + 'profile', {
            method: 'GET',
            headers: {
                ...bodyHeaders,
                'Authorization': token
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 'done') {
                    state.authToken = token
                    state.isAuthenticate = true
                    state.currentUser = res.user
                }
                TOGGLE_BUSY_BOX(state, false)
            })
            .catch(err => console.log(err))
    }
}
export const UPDATE_USER = (state, data) => {
    if (token) {
        TOGGLE_BUSY_BOX(state, true)
        fetch(API_URL + 'profile', {
            method: 'PATCH',
            headers: {
                ...bodyHeaders,
                'Authorization': token
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 'done') {
                    state.message = messageSetter(res.status, res.message)
                    state.currentUser = res.user
                }
                TOGGLE_BUSY_BOX(state, false)
            })
            .catch(err => console.log(err))
    }
}

/**********************************************************************************
 * Category functionality
 * index, create, show, delete, currentCategory
 **********************************************************************************/
export const FETCH_CATEGORIES = (state) => {
    TOGGLE_BUSY_BOX(state, true)
    fetch(API_URL + 'category', {
        method: 'GET',
        headers: {
            ...bodyHeaders,
        }
    })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            if (res.status === 'done') {
                state.categories = res.categories
            }
            TOGGLE_BUSY_BOX(state, false)
        })
        .catch(err => console.log(err))
}
export const CREATE_CATEGORY = (state, data) => {
    if (token) {
        TOGGLE_BUSY_BOX(state, true)
        fetch(API_URL + 'category', {
            method: 'POST',
            headers: {
                ...bodyHeaders,
                'Authorization': token
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 'done') {
                    state.messages = messageSetter(res.status, res.message)
                    state.categories = [...state.categories, res.category]
                } else if (res.status === 'validation_error') {
                    state.validateErrors = validateErrorPusher(res.errors)
                } else if (res.status === 'error') {
                    state.messages = messageSetter(res.status, res.message)
                }
                TOGGLE_BUSY_BOX(state, false)
            })
            .catch(err => console.log(err))
    }
}
export const FETCH_CATEGORY = (state, data) => {
    TOGGLE_BUSY_BOX(state, true)
    fetch(API_URL + `category/${data}`, {
        method: 'GET',
        headers: {
            ...bodyHeaders,
        }
    })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            if (res.status === 'done') {
                state.currentCategory = res.category
            } else {
                state.messages = messageSetter(res.status, res.message)
            }
            TOGGLE_BUSY_BOX(state, false)
        })
        .catch(err => console.log(err))
}
export const DELETE_CATEGORY = (state, data) => {
    if (token) {
        TOGGLE_BUSY_BOX(state, true)
        fetch(API_URL + `category/${data}`, {
            method: 'DELETE',
            headers: {
                ...bodyHeaders,
                'Authorization': token
            },
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 'done') {
                    state.messages = messageSetter(res.status, res.message)
                    state.categories = state.categories.filter(item => item.slug !== data)
                } else if (res.status === 'error') {
                    state.messages = messageSetter(res.status, res.message)
                }
                TOGGLE_BUSY_BOX(state, false)
            })
            .catch(err => console.log(err))
    }
}
export const SET_CURRENT_CATEGORY = (state, data) => {
    state.currentCategory = data
}
/**********************************************************************************
 * Service functionality
 * index, create, show, update, delete, currentService
 **********************************************************************************/
export const FETCH_SERVICES = (state) => {
    TOGGLE_BUSY_BOX(state, true)
    fetch(API_URL + `service`, {
        method: 'GET',
        headers: {
            ...bodyHeaders,
        },
    })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            if (res.status === 'done') {
                state.services = res.services
            }
            TOGGLE_BUSY_BOX(state, false)
        })
        .catch(err => console.log(err))
}
export const CREATE_SERVICE = (state, data) => {
    if (token) {
        TOGGLE_BUSY_BOX(state, true)
        let formData = formDataBuilder(data)
        fetch(API_URL + `service`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': token
            },
            body: formData
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 'done') {
                    state.message = messageSetter(res.status, res.message)
                    state.currentCategory.services = [...state.currentCategory.services, res.service]
                    router.push({name: 'Services', params: {slug: localStorage.getItem('currentCategory')}})
                    localStorage.removeItem('currentCategory')
                } else if (res.status === 'validation_error') {
                    state.validateErrors = validateErrorPusher(res.errors)
                } else if (res.status === 'error') {
                    state.message = messageSetter(res.status, res.message)
                }
                TOGGLE_BUSY_BOX(state, false)
            })
            .catch(err => console.log(err))
    }
}
export const FETCH_SERVICE = (state, data) => {
    TOGGLE_BUSY_BOX(state, true)
    fetch(API_URL + `service/${data}`, {
        method: 'GET',
        headers: {
            ...bodyHeaders,
            'Authorization': token
        },
    })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            if (res.status === 'done') {
                state.currentService = res.service
            } else {
                state.message = messageSetter(res.status, res.message)
            }
            TOGGLE_BUSY_BOX(state, false)
        })
        .catch(err => console.log(err))
}
export const UPDATE_SERVICE = (state, data) => {
    if (token) {
        let {form, slug} = data
        TOGGLE_BUSY_BOX(state, true)
        let formData = formDataBuilder(form)
        fetch(API_URL + `service/${slug}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': token
            },
            body: formData
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 'done') {
                    state.message = messageSetter(res.status, res.message)
                    if (res.service.category_id === state.currentCategory.id) {
                        state.currentCategory.services.map(item => {
                            if (item.id === res.service.id) {
                                item = [...item, res.service]
                            }
                        })
                    } else {
                        if (state.currentCategory.services.length > 0) {
                            state.currentCategory.services = state.currentCategory.services.filter(item => item.id !== res.service.id)
                        }
                        state.categories.map(item => {
                            if (item.id === res.service.category_id) {
                                item.services = [...item.services, res.service]
                            }
                        })
                    }
                    router.push({name: 'Services', params: {slug: localStorage.getItem('currentCategory')}})
                    localStorage.removeItem('currentCategory')
                } else if (res.status === 'validation_error') {
                    state.validateErrors = validateErrorPusher(res.errors)
                } else if (res.status === 'error') {
                    state.message = messageSetter(res.status, res.message)
                }
                TOGGLE_BUSY_BOX(state, false)
            })
            .catch(err => console.log(err))
    }
}
export const DELETE_SERVICE = (state, data) => {
    if (token) {
        TOGGLE_BUSY_BOX(state, true)
        fetch(API_URL + `service/${data}`, {
            method: 'DELETE',
            headers: {
                ...bodyHeaders,
                'Authorization': token
            },
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 'done') {
                    state.message = messageSetter(res.status, res.message)
                    state.currentCategory.services = state.currentCategory.services.filter(item => item.slug !== data)
                } else if (res.status === 'error') {
                    state.message = messageSetter(res.status, res.message)
                }
                TOGGLE_BUSY_BOX(state, false)
            })
            .catch(err => console.log(err))
    }
}
export const SET_CURRENT_SERVICE = (state, data) => {
    state.currentService = data
}

/**********************************************************************************
 * staff functionality
 * index, create, show, delete, currentStaff
 **********************************************************************************/
export const FETCH_STAFFS = (state) => {
    TOGGLE_BUSY_BOX(state, true)
    fetch(API_URL + 'staff', {
        method: 'GET',
        headers: {
            ...bodyHeaders
        },
    })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            if (res.status === 'done') {
                state.staffs = res.staffs
            }
            TOGGLE_BUSY_BOX(state, false)
        })
        .catch(err => console.log(err))
}
export const CREATE_STAFF = (state, data) => {
    if (token) {
        TOGGLE_BUSY_BOX(state, true)
        fetch(API_URL + 'staff', {
            method: 'POST',
            headers: {
                ...bodyHeaders,
                'Authorization': token
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 'done') {
                    state.message = messageSetter(res.status, res.message)
                    state.staffs = [...state.staffs, res.staff]
                } else if (res.status === 'validation_error') {
                    state.validateErrors = validateErrorPusher(res.errors)
                } else if (res.status === 'error') {
                    state.message = messageSetter(res.status, res.message)
                }
                TOGGLE_BUSY_BOX(state, false)
            })
            .catch(err => console.log(err))
    }
}
export const FETCH_STAFF = (state, data) => {
    TOGGLE_BUSY_BOX(state, true)
    fetch(API_URL + `staff/${data}`, {
        method: 'GET',
        headers: {
            ...bodyHeaders
        },
    })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            if (res.status === 'done') {
                state.currentStaff = res.staff
            }
            TOGGLE_BUSY_BOX(state, false)
        })
        .catch(err => console.log(err))
}
export const DELETE_STAFF = (state, data) => {
    if (token) {
        TOGGLE_BUSY_BOX(state, true)
        fetch(API_URL + `staff/${data}`, {
            method: 'DELETE',
            headers: {
                ...bodyHeaders,
                'Authorization': token
            },
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 'done') {
                    state.message = messageSetter(res.status, res.message)
                    state.staffs = state.staffs.filter(item => item.id !== data)
                    router.push({name: 'Staff'})
                } else if (res.status === 'error') {
                    state.message = messageSetter(res.status, res.message)
                }
                TOGGLE_BUSY_BOX(state, false)
            })
            .catch(err => console.log(err))
    }
}
export const SET_CURRENT_STAFF = (state, data) => {
    state.currentStaff = data
}

/**********************************************************************************
 * Single staff Details functionality
 * updateDetails, uploadAvatar
 **********************************************************************************/
export const UPDATE_STAFF_DETAILS = (state, data) => {
    if (token) {
        let {user, form} = data
        TOGGLE_BUSY_BOX(state, true)
        fetch(API_URL + `staff/${user}`, {
            method: 'PATCH',
            headers: {
                ...bodyHeaders,
                'Authorization': token
            },
            body: JSON.stringify(form)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 'done') {
                    state.message = messageSetter(res.status, res.message)
                    Object.keys(res.staff).map(key => {
                        state.currentStaff[key] = res.staff[key]
                    })
                }
                TOGGLE_BUSY_BOX(state, false)
            })
            .catch(err => console.log(err))
    }
}
export const UPLOAD_STAFF_AVATAR = (state, data) => {
    if (token) {
        let {user, avatar} = data
        TOGGLE_BUSY_BOX(state, true)
        let formData = new FormData()
        formData.append('avatar', avatar)
        fetch(API_URL + `staff/${user}/avatar/upload`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': token
            },
            body: formData
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 'done') {
                    state.message = messageSetter(res.status, res.message)
                    state.currentStaff.avatar = res.avatar
                }
                TOGGLE_BUSY_BOX(state, false)
            })
            .catch(err => console.log(err))
    }
}

/**********************************************************************************
 * Single staff Service functionality
 * index, create
 **********************************************************************************/
export const FETCH_STAFF_SERVICES = (state, data) => {
    TOGGLE_BUSY_BOX(state, true)
    fetch(API_URL + `staff/${data}/service`, {
        method: 'GET',
        headers: {
            ...bodyHeaders,
            'Authorization': token
        },
    })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            if (res.status === 'done') {
                state.currentStaff.userservices = [...state.currentStaff.userservices, res.services.services]
            }
            TOGGLE_BUSY_BOX(state, true)
        })
        .catch(err => console.log(err))
}
export const CREATE_STAFF_SERVICE = (state, data) => {
    if (token) {
        TOGGLE_BUSY_BOX(state, true)
        fetch(API_URL + `staff/${data.user}/service`, {
            method: 'POST',
            headers: {
                ...bodyHeaders,
                'Authorization': token
            },
            body: JSON.stringify(data.services)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 'done') {
                    state.message = messageSetter(res.status, res.message)
                    state.currentStaff.userservices.services = res.services.services
                }
                TOGGLE_BUSY_BOX(state, false)
            })
            .catch(err => console.log(err))
    }
}

/**********************************************************************************
 * Single staff WorkingHour functionality
 * index, update, statusChange, timeChange
 **********************************************************************************/
export const FETCH_STAFF_WORKING_HOURS = (state, data) => {
    TOGGLE_BUSY_BOX(state, true)
    fetch(API_URL + `staff/${data}/working-hours`, {
        method: 'GET',
        headers: {
            ...bodyHeaders,
            'Authorization': token
        },
    })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            if (res.status === 'done') {
                state.currentStaff.workinghours = res.workingHours
            }
            TOGGLE_BUSY_BOX(state, false)
        })
        .catch(err => console.log(err))
}
export const UPDATE_STAFF_WORKING_HOUR = (state, data) => {
    if (token) {
        TOGGLE_BUSY_BOX(state, true)

        state.currentStaff.workinghours.map(item => {
            fetch(API_URL + `staff/${data.user}/working-hour/${item.id}`, {
                method: 'PATCH',
                headers: {
                    ...bodyHeaders,
                    'Authorization': token
                },
                body: JSON.stringify(item)
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    if (res.status === 'done') {
                        item = res.workingHour
                    }
                })
                .catch(err => console.log(err))
        })
        state.message = messageSetter('done', 'Successfully updated...')
        TOGGLE_BUSY_BOX(state, false)
    }
}
export const SET_STAFF_WORKING_HOUR_STATUS = (state, data) => {
    let {id, value} = data
    state.currentStaff.workinghours.map(item => {
        if (item.id === id) item.status = value === false ? 'inactive' : 'active'
    })
}
export const SET_STAFF_WORKING_HOUR_TIME = (state, data) => {
    let {id, field, value} = data
    state.currentStaff.workinghours.map(item => {
        if (item.id === id) item[field] = value
    })
}

/**********************************************************************************
 * Single staff BreakHour functionality
 * index, create, update, delete
 **********************************************************************************/
export const FETCH_STAFF_BREAK_TIMES = (state, data) => {
    TOGGLE_BUSY_BOX(state, true)
    fetch(API_URL + `staff/${data}/break-time`, {
        method: 'GET',
        headers: {
            ...bodyHeaders,
            'Authorization': token
        },
    })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            if (res.status === 'done') {
                state.currentStaff.breakhours = res.breakHours
            }
            TOGGLE_BUSY_BOX(state, false)
        })
        .catch(err => console.log(err))
}
export const CREATE_STAFF_BREAK_TIME = (state, data) => {
    if (token) {
        let {user, form} = data
        TOGGLE_BUSY_BOX(state, true)
        fetch(API_URL + `staff/${user}/break-time`, {
            method: 'POST',
            headers: {
                ...bodyHeaders,
                'Authorization': token
            },
            body: JSON.stringify(form)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 'done') {
                    state.message = messageSetter(res.status, res.message)
                    state.currentStaff.breakhours = [...state.currentStaff.breakhours, res.breakHour]
                }
                TOGGLE_BUSY_BOX(state, false)
            })
            .catch(err => console.log(err))
    }
}
export const UPDATE_STAFF_BREAK_TIME = (state, data) => {
    if (token) {
        let {user, id, form} = data
        TOGGLE_BUSY_BOX(state, true)
        fetch(API_URL + `staff/${user}/break-time/${id}`, {
            method: 'PATCH',
            headers: {
                ...bodyHeaders,
                'Authorization': token
            },
            body: JSON.stringify(form)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 'done') {
                    state.message = messageSetter(res.status, res.message)
                    state.currentStaff.breakhours.map(item => {
                        if (item.id === res.breakHour.id) {
                            Object.keys(item).map(key => {
                                item[key] = res.breakHour[key]
                            })
                        }
                    })
                }
                TOGGLE_BUSY_BOX(state, false)
            })
            .catch(err => console.log(err))
    }
}
export const DELETE_STAFF_BREAK_TIME = (state, data) => {
    if (token) {
        let {user, id} = data
        TOGGLE_BUSY_BOX(state, true)
        fetch(API_URL + `staff/${user}/break-time/${id}`, {
            method: 'DELETE',
            headers: {
                ...bodyHeaders,
                'Authorization': token
            },
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 'done') {
                    state.message = messageSetter(res.status, res.message)
                    state.currentStaff.breakhours = state.currentStaff.breakhours.filter(item => item.id !== id)
                }
                TOGGLE_BUSY_BOX(state, false)
            })
            .catch(err => console.log(err))
    }
}

/**********************************************************************************
 * Single staff Timeoff functionality
 * index, create, statusChange, timeChange
 **********************************************************************************/
export const FETCH_STAFF_TIME_OFFS = (state, data) => {
    TOGGLE_BUSY_BOX(state, true)
    fetch(API_URL + `staff/${data}/time-off`, {
        method: 'GET',
        headers: {
            ...bodyHeaders,
        },
    })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            if (res.status === 'done') {
                state.currentStaff.timeoffs = [...state.currentStaff.timeoffs, res.timeOffs]
            }
            TOGGLE_BUSY_BOX(state, false)
        })
        .catch(err => console.log(err))
}
export const CREATE_STAFF_TIME_OFF = (state, data) => {
    if (token) {
        let {user, form} = data
        TOGGLE_BUSY_BOX(state, true)
        fetch(API_URL + `staff/${user}/time-off`, {
            method: 'POST',
            headers: {
                ...bodyHeaders,
                'Authorization': token
            },
            body: JSON.stringify(form)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 'done') {
                    state.message = messageSetter(res.status, res.message)
                    state.currentStaff.timeoffs = [...state.currentStaff.timeoffs, res.timeOff]
                }
                TOGGLE_BUSY_BOX(state, false)
            })
            .catch(err => console.log(err))
    }
}
export const UPDATE_STAFF_TIME_OFF = (state, data) => {
    if (token) {
        let {user, id, form} = data
        TOGGLE_BUSY_BOX(state, true)
        fetch(API_URL + `staff/${user}/time-off/${id}`, {
            method: 'PATCH',
            headers: {
                ...bodyHeaders,
                'Authorization': token
            },
            body: JSON.stringify(form)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 'done') {
                    state.message = messageSetter(res.status, res.message)
                    state.currentStaff.timeoffs.map(item => {
                        if (item.id === res.timeOff.id) {
                            Object.keys(item).map(key => {
                                item[key] = res.timeOff[key]
                            })
                        }
                    })
                }
                TOGGLE_BUSY_BOX(state, false)
            })
            .catch(err => console.log(err))
    }
}
export const DELETE_STAFF_TIME_OFF = (state, data) => {
    if (token) {
        let {user, id} = data
        TOGGLE_BUSY_BOX(state, true)
        fetch(API_URL + `staff/${user}/time-off/${id}`, {
            method: 'DELETE',
            headers: {
                ...bodyHeaders,
                'Authorization': token
            },
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 'done') {
                    state.message = messageSetter(res.status, res.message)
                    state.currentStaff.timeoffs = state.currentStaff.timeoffs.filter(item => item.id !== id)
                }
                TOGGLE_BUSY_BOX(state, false)
            })
            .catch(err => console.log(err))
    }
}

/**********************************************************************************
 * Appoint functionality
 * create, setTab, setService, setStaff, setDate, setUser, setReminder, resetSystem
 **********************************************************************************/
export const FETCH_APPOINTS = (state) => {
    if (token) {
        TOGGLE_BUSY_BOX(state, true)
        fetch(API_URL + `appoint`, {
            method: 'GET',
            headers: {
                ...bodyHeaders,
                'Authorization': token
            },
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 'done') {
                    state.appoints = res.appoints
                } else if (res.status === 'error') {
                    state.message = messageSetter(res.status, res.message)
                }
                TOGGLE_BUSY_BOX(state, false)
            })
            .catch(err => console.log(err))
    }
}
export const FETCH_USER_APPOINTS = (state) => {
    if (token) {
        TOGGLE_BUSY_BOX(state, true)
        fetch(API_URL + `appoint/self`, {
            method: 'GET',
            headers: {
                ...bodyHeaders,
                'Authorization': token
            },
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 'done') {
                    state.appoints = res.appoints
                } else if (res.status === 'error') {
                    state.message = messageSetter(res.status, res.message)
                }
                TOGGLE_BUSY_BOX(state, false)
            })
            .catch(err => console.log(err))
    }
}
export const CREATE_APPOINT = (state, data) => {
    console.log(data)
    TOGGLE_BUSY_BOX(state, true)
    fetch(API_URL + `appoint`, {
        method: 'POST',
        headers: {
            ...bodyHeaders,
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            if (res.status === 'done') {
                state.bookingTab = 'Done'
                state.bookingConfirm = true
                state.confirmAppoint = res.appoint
                state.message = messageSetter(res.status, res.message)
            }
            TOGGLE_BUSY_BOX(state, false)
        })
        .catch(err => console.log(err))
}
export const SELECT_BOOKING_TAB = (state, data) => {
    state.bookingTab = data
}
export const SELECT_BOOKING_SERVICE = (state, data) => {
    state.bookingEvent.service = data
    state.bookingTab = 'staff'
}
export const SELECT_BOOKING_STAFF = (state, data) => {
    state.bookingEvent.staff = data
    state.bookingTab = 'Date'
}
export const SELECT_BOOKING_DATE = (state, data) => {
    state.bookingEvent.timing = data
    state.bookingTab = 'Your Info'
}
export const SELECT_BOOKING_USER = (state, data) => {
    state.bookingEvent.user = data
    state.bookingTab = 'Confirm'
}
export const SELECT_BOOKING_REMINDER = (state, data) => {
    state.bookingEvent.reminder = data
}
export const RESET_BOOKING_SYSTEM = (state) => {
    state.bookingTab = 'Services'
    state.bookingEvent = {}
    state.bookingConfirm = false
}
export const FETCH_APPOINTED_USER_APPOINTS = (state, data) => {
    let appoints = state.appoints.filter(item => item.user.id === data)
    state.appointedUserAppoints = appoints
}
/**********************************************************************************
 * Auth staff functionality
 * index, updateDetails, uploadAvatar
 * createService
 * updateWorkingHour
 * createBreakTime, updateBreakTime, deleteBreakTime
 * createTimeoff, updateTimeoff, deleteTimeoff
 **********************************************************************************/
export const FETCH_SELF_STAFF = (state) => {
    if (token) {
        TOGGLE_BUSY_BOX(state, true)
        fetch(API_URL + `self/staff`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': token
            },
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 'done') {
                    state.currentStaff = res.staff
                }
                TOGGLE_BUSY_BOX(state, false)
            })
            .catch(err => console.log(err))
    }
}
export const UPDATE_SELF_STAFF_DETAILS = (state, data) => {
    if (token) {
        TOGGLE_BUSY_BOX(state, true)
        fetch(API_URL + `self/staff`, {
            method: 'PATCH',
            headers: {
                ...bodyHeaders,
                'Authorization': token
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 'done') {
                    state.message = messageSetter(res.status, res.message)
                    Object.keys(res.staff).map(key => {
                        state.currentStaff[key] = res.staff[key]
                    })
                }
                TOGGLE_BUSY_BOX(state, false)
            })
            .catch(err => console.log(err))
    }
}
export const UPLOAD_SELF_STAFF_AVATAR = (state, data) => {
    if (token) {
        TOGGLE_BUSY_BOX(state, true)
        let formData = new FormData()
        formData.append('avatar', data)

        fetch(API_URL + `self/staff/avatar/upload`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': token
            },
            body: formData
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 'done') {
                    state.message = messageSetter(res.status, res.message)
                    state.currentStaff.avatar = res.avatar
                }
                TOGGLE_BUSY_BOX(state, false)
            })
            .catch(err => console.log(err))
    }
}
export const CREATE_SELF_STAFF_SERVICE = (state, data) => {
    if (token) {
        TOGGLE_BUSY_BOX(state, true)
        fetch(API_URL + `self/staff/service`, {
            method: 'POST',
            headers: {
                ...bodyHeaders,
                'Authorization': token
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 'done') {
                    state.message = messageSetter(res.status, res.message)
                    state.currentStaff.userservices.services = res.services.services
                }
                TOGGLE_BUSY_BOX(state, false)
            })
            .catch(err => console.log(err))
    }
}
export const UPDATE_SELF_STAFF_WORKING_HOUR = (state) => {
    if (token) {
        TOGGLE_BUSY_BOX(state, true)
        state.currentStaff.workinghours.map(item => {
            fetch(API_URL + `self/staff/working-hour/${item.id}`, {
                method: 'PATCH',
                headers: {
                    ...bodyHeaders,
                    'Authorization': token
                },
                body: JSON.stringify(item)
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    if (res.status === 'done') {
                        item = res.workingHour
                    }
                })
                .catch(err => console.log(err))
        })
        state.message = messageSetter('done', 'Successfully updated working hours...')
        TOGGLE_BUSY_BOX(state, false)

    }
}
export const CREATE_SELF_STAFF_BREAK_TIME = (state, data) => {
    if (token) {
        TOGGLE_BUSY_BOX(state, true)
        fetch(API_URL + `self/staff/break-time`, {
            method: 'POST',
            headers: {
                ...bodyHeaders,
                'Authorization': token
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 'done') {
                    state.message = messageSetter(res.status, res.message)
                    state.currentStaff.breakhours = [...state.currentStaff.breakhours, res.breakHour]
                }
                TOGGLE_BUSY_BOX(state, false)
            })
            .catch(err => console.log(err))
    }
}
export const UPDATE_SELF_STAFF_BREAK_TIME = (state, data) => {
    if (token) {
        let {id, form} = data
        TOGGLE_BUSY_BOX(state, true)
        fetch(API_URL + `self/staff/break-time/${id}`, {
            method: 'PATCH',
            headers: {
                ...bodyHeaders,
                'Authorization': token
            },
            body: JSON.stringify(form)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 'done') {
                    state.message = messageSetter(res.status, res.message)
                    state.currentStaff.breakhours.map(item => {
                        if (item.id === res.breakHour.id) {
                            Object.keys(item).map(key => {
                                item[key] = res.breakHour[key]
                            })
                        }
                    })
                }
                TOGGLE_BUSY_BOX(state, false)
            })
            .catch(err => console.log(err))
    }
}
export const DELETE_SELF_STAFF_BREAK_TIME = (state, data) => {
    if (token) {
        TOGGLE_BUSY_BOX(state, true)
        fetch(API_URL + `self/staff/break-time/${data}`, {
            method: 'DELETE',
            headers: {
                ...bodyHeaders,
                'Authorization': token
            },
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 'done') {
                    state.message = messageSetter(res.status, res.message)
                    state.currentStaff.breakhours = state.currentStaff.breakhours.filter(item => item.id !== data)
                }
                TOGGLE_BUSY_BOX(state, false)
            })
            .catch(err => console.log(err))
    }
}
export const CREATE_SELF_STAFF_TIME_OFF = (state, data) => {
    if (token) {
        TOGGLE_BUSY_BOX(state, true)
        fetch(API_URL + `self/staff/time-off`, {
            method: 'POST',
            headers: {
                ...bodyHeaders,
                'Authorization': token
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 'done') {
                    state.message = messageSetter(res.status, res.message)
                    state.currentStaff.timeoffs = [...state.currentStaff.timeoffs, res.timeOff]
                }
                TOGGLE_BUSY_BOX(state, false)
            })
            .catch(err => console.log(err))
    }
}
export const UPDATE_SELF_STAFF_TIME_OFF = (state, data) => {
    if (token) {
        let {id, form} = data
        TOGGLE_BUSY_BOX(state, true)
        fetch(API_URL + `self/staff/time-off/${id}`, {
            method: 'PATCH',
            headers: {
                ...bodyHeaders,
                'Authorization': token
            },
            body: JSON.stringify(form)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 'done') {
                    state.message = messageSetter(res.status, res.message)
                    state.currentStaff.timeoffs.map(item => {
                        if (item.id === res.timeOff.id) {
                            Object.keys(item).map(key => {
                                item[key] = res.timeOff[key]
                            })
                        }
                    })
                }
                TOGGLE_BUSY_BOX(state, false)
            })
            .catch(err => console.log(err))
    }
}
export const DELETE_SELF_STAFF_TIME_OFF = (state, data) => {
    if (token) {
        TOGGLE_BUSY_BOX(state, true)
        fetch(API_URL + `self/staff/time-off/${data}`, {
            method: 'DELETE',
            headers: {
                ...bodyHeaders,
                'Authorization': token
            },
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 'done') {
                    state.message = messageSetter(res.status, res.message)
                    state.currentStaff.timeoffs = state.currentStaff.timeoffs.filter(item => item.id !== data)
                }
                TOGGLE_BUSY_BOX(state, false)
            })
            .catch(err => console.log(err))
    }
}
export const FETCH_SELF_STAFF_LATEST_WORKING_STATUS = (state) => {
    if (token) {
        TOGGLE_BUSY_BOX(state, true)
        fetch(API_URL + `self/staff/working-status/latest`, {
            method: 'GET',
            headers: {
                ...bodyHeaders,
                'Authorization': token
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 'done') {
                    // state.message = messageSetter(res.status, res.message)
                    state.latestWorkingStatus = res.workingStatus
                }
                // else if (res.status === 'error') {
                //     state.message = messageSetter(res.status, res.message)
                // }
                TOGGLE_BUSY_BOX(state, false)
            })
            .catch(err => console.log(err))
    }
}
export const CREATE_SELF_STAFF_WORKING_STATUS = (state, data) => {
    if (token) {
        TOGGLE_BUSY_BOX(state, true)
        fetch(API_URL + `self/staff/working-status`, {
            method: 'POST',
            headers: {
                ...bodyHeaders,
                'Authorization': token
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 'done') {
                    state.message = messageSetter(res.status, res.message)
                    state.latestWorkingStatus = res.workingStatus
                }
                TOGGLE_BUSY_BOX(state, false)
            })
            .catch(err => console.log(err))
    }
}
export const UPDATE_SELF_STAFF_WORKING_STATUS = (state, data) => {
    let {id, form} = data
    if (token) {
        TOGGLE_BUSY_BOX(state, true)
        fetch(API_URL + `self/staff/working-status/${id}`, {
            method: 'PATCH',
            headers: {
                ...bodyHeaders,
                'Authorization': token
            },
            body: JSON.stringify(form)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 'done') {
                    state.message = messageSetter(res.status, res.message)
                    state.latestWorkingStatus = {}
                }
                TOGGLE_BUSY_BOX(state, false)
            })
            .catch(err => console.log(err))
    }
}