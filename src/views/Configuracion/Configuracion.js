import { useI18n } from 'vue-i18n'
// const { locale } = useI18n()
import { ref } from 'vue'
export default {
    data() {
        return {
            languages: [
                'español',
                'english',
                
            ],
            selectedLanguage: null,
            loading: false,
            // snackbar: {
            //     visible: false,
            //     message: '',
            //     color: 'green',
            //     timeout: 4000
            // },

            // snackbar_error: {
            //     visible: false,
            //     message: '',
            //     color: 'error',
            //     timeout: 4000
            // },
        }
    },

    setup() {
        const { locale, t } = useI18n()

        const selectedLanguage = ref(null)
        const loading = ref(false)
        const languages = ['español', 'english']

        const changeLanguage = (lang) => {
            loading.value = true
            setTimeout(() => {
                locale.value = lang
                localStorage.setItem('lang', lang)
                loading.value = false
            }, 3000)
        }

        return {
            t,
            locale,
            selectedLanguage,
            languages,
            loading,
            changeLanguage
        }
    }

    // setup() {
    //     const { locale, t } = useI18n()

    //     // const selectedLanguage = ref(locale.value)
    //     // const languages = [
    //     //     { text: 'Español', value: 'es' },
    //     //     { text: 'Inglés', value: 'en' }
    //     // ]

    //     function changeLanguage(lang) {
    //         locale.value = lang
    //         localStorage.setItem('lang', lang)
    //     }

    //     return {
    //         locale,
    //         changeLanguage,
    //         // selectedLanguage,
    //         // languages,
    //         t
    //     }
    // }

    // methods: {
    //     changeLanguage(lang) {
    //         locale.value = lang
    //     }
    // },
}