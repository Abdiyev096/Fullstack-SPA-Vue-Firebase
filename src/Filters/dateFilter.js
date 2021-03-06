import store from '../store'

export default function dateFilter(value, format = 'date') {
    const options = {}

    if(format.includes('date')) {
        options.day = '2-digit',
        options.month = 'long',
        options.year = 'numeric'
    }

    if (format.includes('time')) {
        options.hour = '2-digit',
        options.minute = '2-digit',
        options.second = '2-digit'
    }

    const locale = store.getters.getUserInfo.locale || 'ru-RU'
    return new Intl.DateTimeFormat(locale, options).format(value)
}


// let d = new Date()



// console.log(new Intl.DateTimeFormat('kz-KZ', {
//     day: '2-digit',
//     month: 'long',
//     year: 'numeric'
// }).format(d))