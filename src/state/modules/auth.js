import axios from 'axios'
import querystring from 'querystring'

export const state = {
    currentUser: getSavedState('auth.currentUser'),
}

export const mutations = {
    SET_CURRENT_USER(state, newValue) {
        state.currentUser = newValue
        saveState('auth.currentUser', newValue)
        setDefaultAuthHeaders(state)
    },
}

export const getters = {
    // Whether the user is currently logged in.
    loggedIn(state) {
        return !!state.currentUser
    },
}

export const actions = {
    // This is automatically run in `src/state/store.js` when the app
    // starts, along with any other actions named `init` in other modules.
    init({state, dispatch}) {
        setDefaultAuthHeaders(state)
        // dispatch('validate')
    },

    // Logs in the current user.
    logIn({commit, dispatch, getters}, {username, password} = {}) {

        // if (getters.loggedIn) return dispatch('validate')
        // return axios
        //
        //     .post('http://localhost:8081/user/login', {username, password})
        //     .then((response) => {
        //
        //         const user = response.data
        //         commit('SET_CURRENT_USER', user)
        //         return user
        //     })
        return axios({
            method: "post",
            url: "http://localhost:8081/user/login",
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: querystring.stringify(
                {username, password}
            )
        }).then((response) => {
                const user = response.data
                user["flag"] = true;
                commit('SET_CURRENT_USER', user)
                return user
            })
    },

    // Logs out the current user.
    logOut({commit}) {
        commit('SET_CURRENT_USER', null)
    },

    // register the user
    // register({commit, dispatch, getters}, {fullname, email, password} = {}) {
    //     if (getters.loggedIn) return dispatch('validate')
    //
    //     return axios
    //         .post('/api/register', {fullname, email, password})
    //         .then((response) => {
    //             const user = response.data
    //             return user
    //         })
    // },

    // register the user
    // resetPassword({commit, dispatch, getters}, {email} = {}) {
    //     if (getters.loggedIn) return dispatch('validate')
    //
    //     return axios.post('/api/reset', {email}).then((response) => {
    //         const message = response.data
    //         return message
    //     })
    // },

    // Validates the current user's token and refreshes it
    // with new data from the API.
    validate({commit, state}) {
        console.log(state)
        if(state.currentUser.flag != undefined) {
            return state;
        }

        // TODO: 以下为拦截逻辑
        return false;
        // if (!state.currentUser) return Promise.resolve(null)
        //
        // return axios
        //     .get('/api/session')
        //     .then((response) => {
        //         const user = response.data
        //         commit('SET_CURRENT_USER', user)
        //         console.log("=================");
        //         console.log(user);
        //         return user
        //     })
        //     .catch((error) => {
        //         if (error.response && error.response.status === 401) {
        //             console.log(error)
        //             commit('SET_CURRENT_USER', null)
        //         }
        //         return null
        //     })
    },
}

// ===
// Private helpers
// ===

function getSavedState(key) {
    return JSON.parse(window.localStorage.getItem(key))
}

function saveState(key, state) {
    window.localStorage.setItem(key, JSON.stringify(state))
}

function setDefaultAuthHeaders(state) {
    axios.defaults.headers.common.Authorization = state.currentUser
        ? state.currentUser.token
        : ''
}
