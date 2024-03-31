/* eslint-disable @typescript-eslint/ban-types */
import React from 'react'

import { useTheme } from 'react-native-paper'

import { type ThemeType } from '../models/theme'
import { useTranslation } from 'react-i18next'

const withCommon = <P extends object>(
	Component: React.ComponentType<P>,
): any => {
  
	const WithComponent = (props: P): React.ReactNode => {
		const theme = useTheme<ThemeType>()
		const { t } = useTranslation()

		return <Component { ...props } theme={ theme } t={ t } />
	}

	return WithComponent

}

export default withCommon