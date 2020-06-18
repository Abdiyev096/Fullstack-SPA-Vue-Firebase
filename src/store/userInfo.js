import firebase from 'firebase/app'

export default {
    state: {
        userInfo: {}
    },
    mutations: {
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo
            console.log(state.userInfo)
        },
        clearUserInfo(state) {
            state.userInfo = {}
        }
    },
    actions: {
        async fetchUserInfo({commit, dispatch}) {
            try {
                const uid = await dispatch('getUserID')
                const userInfo = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
                commit('setUserInfo', userInfo)
            } catch(e) {
                commit('setError', e)
                throw e
            }
        },

        async updateInfo({commit, dispatch, getters}, toUpdate) {
            try {
                const uid = await dispatch('getUserID')
                const data = {...getters.getUserInfo, ...toUpdate}
                await firebase.database().ref(`/users/${uid}/info`).update(data)
                commit('setUserInfo', data)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
    },
    getters: {
        getUserInfo(state) {
            return state.userInfo
        }
    }
}