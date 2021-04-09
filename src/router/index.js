import Vue from "vue";
import VueRouter from "vue-router";
import store from '@/store'
import {API_URL} from "@/utils/constains";

Vue.use(VueRouter);

const routes = [
    {path: '/', redirect: {name: 'Login'}},
    {
        path: "/appoint",
        name: "Appoint",
        component: () => import("../views/Appoint.vue"),
        meta: {guest: true, isUser: true}
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("../views/auth/Login.vue"),
        meta: {guest: true}
    },
    {
        path: "/register",
        name: "Register",
        component: () => import("../views/auth/Register.vue"),
        meta: {guest: true}
    },
    {
        path: "/admin",
        name: "Admin",
        component: () => import("../layouts/AdminLayout.vue"),
        meta: {requiresAuth: true, isAdmin: true},
        children: [
            {
                path: "calendar",
                name: "Calendar",
                component: () => import("../views/admin/Calendar.vue")
            },
            {
                path: "user/:id",
                name: "UserItem",
                component: () => import("../views/admin/UserItem.vue")
            },
            {
                path: "setting",
                component: () => import("../layouts/SettingLayout.vue"),
                children: [
                    {
                        path: "service",
                        name: "Service",
                        component: () => import("../views/admin/Service.vue"),
                        children: [
                            {
                                path: "add",
                                name: "AddService",
                                component: () => import("../views/admin/AddService.vue")
                            },
                            {
                                path: "edit/:slug",
                                name: "EditService",
                                component: () => import("../views/admin/EditService.vue")
                            },
                            {
                                path: ":slug",
                                name: "Services",
                                component: () => import("../views/admin/Services.vue")
                            }
                        ]
                    },
                    {
                        path: "staff",
                        name: "Staff",
                        component: () => import("../views/admin/Staff.vue"),
                        children: [

                            {
                                path: ":id",
                                name: "StaffItem",
                                component: () => import("../views/admin/StaffItem.vue")
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        path: "/staff",
        component: () => import("../layouts/StaffLayout.vue"),
        meta: {requiresAuth: true, isStaff: true},
        children: [
            {
                path: "dashboard",
                name: "StaffDashboard",
                component: () => import("../views/staff/Dashboard")
            },
            {
                path: "attendance",
                name: "StaffAttendance",
                component: () => import("../views/staff/Attendance")
            },
            // {
            //     path: "details",
            //     name: "StaffDetails",
            //     component: () => import("../views/staff/Details")
            // },
            // {
            //     path: "working-hour",
            //     name: "StaffWorkingHour",
            //     component: () => import("../views/staff/WorkingHour")
            // },
            // {
            //     path: "time-off",
            //     name: "StaffTimeoff",
            //     component: () => import("../views/staff/Timeoff")
            // },
            // {
            //     path: "break-hour",
            //     name: "StaffBreakHour",
            //     component: () => import("../views/staff/BreakHour")
            // },
            // {
            //     path: "services",
            //     name: "StaffServices",
            //     component: () => import("../views/staff/Services")
            // }
        ]
    },
    {
        path: "/user",
        component: () => import("../layouts/UserLayout.vue"),
        meta: {requiresAuth: true, isUser: true},
        children: [
            {
                path: "dashboard",
                name: "UserDashboard",
                component: () => import("../views/user/Dashboard")
            },
            {
                path: "appoints",
                name: "UserAppoints",
                component: () => import("../views/user/Appoints")
            },
        ]
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    linkExactActiveClass: "active",
    routes
});


router.beforeEach(async (to, from, next) => {
    const token = localStorage.getItem('token')
    let isAuthenticate = store.state.isAuthenticate || false
    let currentUser = store.state.currentUser || null

    if (token && !currentUser) {
        await fetch(API_URL + 'profile', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': token
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 'done') {
                    store.state.authToken = token
                    store.state.isAuthenticate = true
                    store.state.currentUser = res.user
                    isAuthenticate = true
                    currentUser = res.user
                }

            })
            .catch(err => console.log(err))
    }

    const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
    const isGuest = to.matched.some((x) => x.meta.guest);
    const isAdmin = to.matched.some((x) => x.meta.isAdmin);
    const isStaff = to.matched.some((x) => x.meta.isStaff);
    const isUser = to.matched.some((x) => x.meta.isUser);

    const adminRoleId = 1
    const staffRoleId = 2
    const userRoleId = 3

    if (requiresAuth && isAdmin) {
        if (isAuthenticate && currentUser && parseInt(currentUser.role_id) === adminRoleId) {
            next()
        } else if (isAuthenticate && currentUser && parseInt(currentUser.role_id) === staffRoleId) {
            next({name: 'StaffDashboard'})
        } else if (isAuthenticate && currentUser && parseInt(currentUser.role_id) === userRoleId) {
            next({name: 'UserDashboard'})
        } else {
            next({name: 'Login'})
        }
    } else if (requiresAuth && isStaff) {
        if (isAuthenticate && currentUser && parseInt(currentUser.role_id) === staffRoleId) {
            next()
        } else if (isAuthenticate && currentUser && parseInt(currentUser.role_id) === adminRoleId) {
            next({name: 'Calendar'})
        } else if (isAuthenticate && currentUser && parseInt(currentUser.role_id) === userRoleId) {
            next({name: 'UserDashboard'})
        } else {
            next({name: 'Login'})
        }
    } else if (requiresAuth && isUser) {
        if (isAuthenticate && currentUser && parseInt(currentUser.role_id) === userRoleId) {
            next()
        } else if (isAuthenticate && currentUser && parseInt(currentUser.role_id) === adminRoleId) {
            next({name: 'Calendar'})
        } else if (isAuthenticate && currentUser && parseInt(currentUser.role_id) === staffRoleId) {
            next({name: 'StaffDashboard'})
        } else {
            next({name: 'Login'})
        }
    } else if (isGuest && isUser) {
        if (isAuthenticate && currentUser && parseInt(currentUser.role_id) === adminRoleId) {
            next({name: 'Calendar'})
        } else if (isAuthenticate && currentUser && parseInt(currentUser.role_id) === staffRoleId) {
            next({name: 'StaffDashboard'})
        } else {
            next()
        }
    } else if (isGuest) {
        if (isAuthenticate && currentUser && parseInt(currentUser.role_id) === adminRoleId) {
            next({name: 'Calendar'})
        } else if (isAuthenticate && currentUser && parseInt(currentUser.role_id) === staffRoleId) {
            next({name: 'StaffDashboard'})
        } else if (isAuthenticate && currentUser && parseInt(currentUser.role_id) === userRoleId) {
            next({name: 'UserDashboard'})
        } else {
            next()
        }
    }
});

export default router;
