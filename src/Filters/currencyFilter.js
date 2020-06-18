export default function currencyFilter(value, currency) {
    return new Intl.NumberFormat('kz-KZ', {
        style: 'currency',
        currency
    }).format(value)
}