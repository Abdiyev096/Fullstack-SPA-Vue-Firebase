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
    return new Intl.DateTimeFormat('kz-KZ', options).format(value)
}


// let d = new Date()



// console.log(new Intl.DateTimeFormat('kz-KZ', {
//     day: '2-digit',
//     month: 'long',
//     year: 'numeric'
// }).format(d))