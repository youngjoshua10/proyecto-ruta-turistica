import { createI18n } from 'vue-i18n'
import english from '../locales/en.json'
import español from '../locales/es.json'
import deutsch from '../locales/de.json'
import fr from '../locales/fr.json'
import it from '../locales/it.json'

const messages = { english, español, deutsch, fr, it }
const savedLocale = localStorage.getItem('lang') || 'english'

export const i18n = createI18n({
    legacy: false,
    locale: savedLocale,
    fallbackLocale: 'english',
    messages
})