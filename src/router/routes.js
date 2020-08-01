import store from '@state/store'

// auth related routes
const authRoutes = [
    {
        path: '/',
        name: 'login',
        component: () => lazyLoadView(import('@views/pages/account/login')),
       // props: (route) => ({user: store.state.auth.currentUser || {}}),
    },
    {
        path: '/logout',
        name: 'logout',
        meta: {
            authRequired: true,
            beforeResolve(routeTo, routeFrom, next) {
                store.dispatch('auth/logOut')
                const authRequiredOnPreviousRoute = routeFrom.matched.some(
                    (route) => route.meta.authRequired
                )
                // Navigate back to previous page, or home as a fallback
                next(
                    authRequiredOnPreviousRoute ? {name: 'dashboard'} : {...routeFrom}
                )
            },
        },
    },
]

// error pages
const errorPagesRoutes = [
    {
        path: '/404',
        name: '404',
        component: require('@views/pages/secondary/error-404').default,
        // Allows props to be passed to the 404 page through route
        // params, such as `resource` to define what wasn't found.
        props: true,
    },
    {
        path: '/500',
        name: '500',
        component: require('@views/pages/secondary/error-500').default,
        props: true,
    },
    // Redirect any unmatched routes to the 404 page. This may
    // require some server configuration to work in production:
    // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
    {
        path: '*',
        redirect: '404',
    },
];
// 修改头像
const headPortraitAppsRoutes = [
    {
        path: '/setting/headPortrait',
        header: '',
        component: () => lazyLoadView(import('@views/pages/apps/setting/headPortrait')),
        meta: {authRequired: true},
        props: (route) => ({user: store.state.auth.currentUser || {}}),
    }
];
// 修改密码
const passwordAppsRoutes = [
    {
        path: '/setting/password',
        header: '',
        component: () => lazyLoadView(import('@views/pages/apps/setting/password')),
        meta: {authRequired: true},
        props: (route) => ({user: store.state.auth.currentUser || {}}),
    }
];



// 公告/作业
const noticeAppsRoutes = [
    {
        path: '/notice',
        name: '公告',
        icon: 'calendar',
        meta: {authRequired: true},
        component: {
            render(c) {
                return c('router-view')
            },
        },
        props: (route) => ({user: store.state.auth.currentUser || {}}),
        children: [
            {
                name: '查看公告',
                path: 'notice-index',
                meta: { authRequired: true },
                component: () => lazyLoadView(import('@views/pages/apps/notice/index')),
            },
            {
                name: '发表公告',
                path: 'notice-publish',
                meta: { authRequired: true },
                component: () => lazyLoadView(import('@views/pages/apps/notice/noticePublish')),
            }
        ]
    }
];
// 资料
const dataAppsRoutes = [
    {
        path: '/data',
        name: '资料 ',
        icon: 'inbox',
        meta: {authRequired: true},
        component: {
            render(c) {
                return c('router-view')
            },
        },
        props: (route) => ({user: store.state.auth.currentUser || {}}),
        children: [
            {
                name: '查看资料',
                path: 'data-index',
                meta: { authRequired: true },
                component: () => lazyLoadView(import('@views/pages/apps/data/index')),
            },
            {
                name: '分享资料',
                path: 'data-share',
                meta: { authRequired: true },
                component: () => lazyLoadView(import('@views/pages/apps/data/dataShare')),
            },
            {
                name: '我的分享',
                path: 'my-data',
                meta: { authRequired: true },
                component: () => lazyLoadView(import('@views/pages/apps/data/myData')),
            }
        ]
    }
];

// 博客
const blogAppsRoutes = [
    {
        path: '/apps/blog/allBlog',
        name: '博客',
        icon: 'briefcase',
        meta: {authRequired: true},
        component: () => lazyLoadView(import('@views/pages/apps/blog/allBlog')),
        props: (route) => ({user: store.state.auth.currentUser || {}}),
    }
];

// 管理员签到记录
const aSigninAppsRoutes = [
    {
        path: '/apps/aRecords',
        name: '管理员签到记录',
        icon: 'file-text',
        component: () => lazyLoadView(import('@views/pages/apps/signin/a_records')),
        meta: {authRequired: true},
        props: (route) => ({user: store.state.auth.currentUser || {}}),
    }
];

// 普通用户签到记录
const uSigninAppsRoutes = [
    {
        path: '/apps/uRecords',
        name: '签到记录',
        icon: 'file-text',
        component: () => lazyLoadView(import('@views/pages/apps/signin/u_records')),
        meta: {authRequired: true},
        props: (route) => ({user: store.state.auth.currentUser || {}}),
    }
];

// 我的团队
const myTeamRoutes = [
    {
        path: '/apps/myTeam/myTeam',
        name: '我的团队',
        icon: 'package',
        component: () => lazyLoadView(import('@views/pages/apps/myTeam/myTeam')),
        meta: {authRequired: true},
        props: (route) => ({user: store.state.auth.currentUser || {}}),
    }
];


const appsRoutes = [
    ...noticeAppsRoutes,
    ...dataAppsRoutes,
    ...blogAppsRoutes,
    ...aSigninAppsRoutes,
    ...myTeamRoutes,
    ...uSigninAppsRoutes,
]

const authProtectedRoutes = [
    ...appsRoutes,
]

const settingRoutes = [
    ...headPortraitAppsRoutes,
    ...passwordAppsRoutes
]
const allRoutes = [ ...authRoutes,...authProtectedRoutes, ...errorPagesRoutes, ...headPortraitAppsRoutes, ...passwordAppsRoutes]

export {allRoutes, authProtectedRoutes, settingRoutes}

// Lazy-loads view components, but with better UX. A loading view
// will be used if the component takes a while to load, falling
// back to a timeout view in case the page fails to load. You can
// use this component to lazy-load a route with:
//
// component: () => lazyLoadView(import('@views/my-view'))
//
// NOTE: Components loaded with this strategy DO NOT have access
// to in-component guards, such as beforeRouteEnter,
// beforeRouteUpdate, and beforeRouteLeave. You must either use
// route-level guards instead or lazy-load the component directly:
//
// component: () => import('@views/my-view')
//
function lazyLoadView(AsyncView) {
    const AsyncHandler = () => ({
        component: AsyncView,
        // A component to use while the component is loading.
        loading: require('@components/_loading').default,
        // Delay before showing the loading component.
        // Default: 200 (milliseconds).
        delay: 400,
        // A fallback component in case the timeout is exceeded
        // when loading the component.
        // error: require('@views/_timeout').default,
        // Time before giving up trying to load the component.
        // Default: Infinity (milliseconds).
        timeout: 10000,
    })

    return Promise.resolve({
        functional: true,
        render(h, {data, children}) {
            // Transparently pass any props or children
            // to the view component.
            return h(AsyncHandler, data, children)
        },
    })
}
