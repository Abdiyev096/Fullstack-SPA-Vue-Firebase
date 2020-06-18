import store from '../store'
import ru from '../locales/ru.json'
import eng from '../locales/eng.json'

const locales = {
    'ru-RU': ru,
    'en-US': eng
}

export default function localizeFilter(key) {
    const locale = store.getters.getUserInfo.locale || 'ru-RU'
    return locales[locale][key] || `[Localize error]: key is not found`
}