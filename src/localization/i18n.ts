/* eslint-disable @typescript-eslint/no-floating-promises */
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import id from './id.json'
import en from './en.json'

const resources = {
	id,
	en
}

i18n.use(initReactI18next)
	.init({
		compatibilityJSON: 'v3',
		resources,
		lng: 'en',
		react: { useSuspense: false }
	})
  
export default i18n