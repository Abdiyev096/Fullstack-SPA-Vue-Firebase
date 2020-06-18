import firebas from 'firebase/app'

export default {
    actions: {
        async createRecord({commit, dispatch}, newRecord) {
            try {
                const uid = await dispatch('getUserID')
                return await firebas.database().ref(`/users/${uid}/records`).push(newRecord)
            } catch(e) {
                commit('setError', e)
                throw(e)
            }
        },

        async fetchRecords({dispatch, commit}) {
            try {
                const uid = await dispatch('getUserID')
                const records = (await firebas.database().ref(`/users/${uid}/records`).once('value')).val() || {}
                return Object.keys(records).map(key => ({...records[key], id: key}))

            } catch(e) {
                commit('setError', e)
                throw e
            }
        },

        async fetchRecordById({dispatch, commit}, id) {
            try {
                const uid = await dispatch('getUserID')
                const record = (await firebas.database().ref(`/users/${uid}/records`).child(id).once('value')).val() || {}
                return {...record, id}

            } catch(e) {
                commit('setError', e)
                throw e
            }
        }
    }
}



// // 1 задание :
// let count = 0;

// let num = 4;

// if (num > 0 && Number.isInteger(num)) {
//     while (num !== 0) {
//         num % 2 == 0 ? num = num / 2 : num = num - 1
//         count++
//     }
// }

// console.log(count)
// //



// // 2 задание:

// const J = 'z'
// const S = 'SS'

// let num = 0
// const arr = S.split('')

// const arr2 = J.split('')

// arr2.forEach(str => {
//     arr.forEach(str2 => {
//         if(str === str2) {
//             num++
            
//         }
//     })
// })

// //


// //3 задание:

// const arr = [
//     {
//         id: 1000,
//         name: 'Like',
//         parent_id: '',
//         parent_name: ''
//     },
//     {
//         id: 1001,
//         name: 'Count',
//         parent_id: 1000,
//         parent_name: 'Like'
//     },
//     {
//         id: 1002,
//         name: 'Subscribe',
//         parent_id: '',
//         parent_name: ''
//     }
// ]

// const pathObj = {}

// arr.forEach(el => {
//     if(el.parent_id && el.parent_name) {
//         pathObj[el.id] = pathObj[el.parent_id] + ` > ${el.name}`
//     } else {
//         pathObj[el.id] = `/ > ${el.name}`
//     }
// })

// console.log(pathObj)