import firebase from 'firebase/app'

export default {
    actions: {
        async createCategory({commit, dispatch}, {categoryTitle, categoryLimit}) {
            try {
                const uid = await dispatch('getUserID')
                const category = await firebase.database().ref(`/users/${uid}/categories`)
                                    .push({categoryTitle, categoryLimit})
                return {categoryTitle, categoryLimit, id: category.key}
            } catch(e) {
                commit('setError', e)
                throw(e)
            }
        },

        async updateCategory({commit, dispatch}, {categoryTitle, categoryLimit, id}) {
            try {
                const uid = await dispatch('getUserID')
                await firebase.database().ref(`/users/${uid}/categories`)
                                    .child(id).update({
                                        categoryTitle,
                                        categoryLimit
                                    })
                
            } catch(e) {
                commit('setError', e)
                throw(e)
            }
        },

        async fetchCategories({commit, dispatch}) {
            try {
                const uid = await dispatch('getUserID')
                const categories = (await firebase.database()
                                    .ref(`/users/${uid}/categories`)
                                    .once('value')).val() || {}
                
                return Object.keys(categories).map(key => ({...categories[key], id: key}))
            } catch(e) {
                commit('setError', e)
                throw(e)
            }
        },

        async fetchCategoryById({commit, dispatch}, id) {
            try {
                const uid = await dispatch('getUserID')
                const category = (await firebase.database()
                                    .ref(`/users/${uid}/categories`)
                                    .child(id)
                                    .once('value')).val() || {}
                
                return {...category, id}
            } catch(e) {
                commit('setError', e)
                throw(e)
            }
        }
    }
}
