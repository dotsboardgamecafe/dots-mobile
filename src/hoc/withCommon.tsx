import React from 'react'

import { useTheme } from 'react-native-paper'

import { type ThemeType } from '../models/theme'
import { useTranslation } from 'react-i18next'

const withCommon = <P extends object>(Component: React.ComponentType):any  => {
  
	const WithComponent: React.FC<Omit<P, any>> = props => {
		const theme = useTheme<ThemeType>()
		const { t } = useTranslation()

		return <Component { ...props as any } theme={ theme } t={ t } />
	}

	return WithComponent

}

export default withCommon