import {
	DefaultTheme as NavigationLightTheme,
	DarkTheme as NavigationDarkTheme
} from '@react-navigation/native'
import {
	adaptNavigationTheme,
	configureFonts,
	MD3DarkTheme,
	MD3LightTheme,
} from 'react-native-paper'

import colors from './colors'
import defaultFontConfigs from './fonts'

const { LightTheme, DarkTheme } = adaptNavigationTheme({
	reactNavigationLight: NavigationLightTheme,
	reactNavigationDark: NavigationDarkTheme
})

const fontConfig = {
	...defaultFontConfigs
} as const as any

const paperThemeDark = {
	...MD3DarkTheme,
	myOwnProperty: true,
	fonts: configureFonts({ config: fontConfig }),
	colors: {
		...MD3DarkTheme.colors,
		...colors.darkTheme
	}
}

const paperThemeLight = {
	...MD3LightTheme,
	myOwnProperty: true,
	fonts: configureFonts({ config: fontConfig }),
	colors: {
		...MD3LightTheme.colors,
		...colors.lightTheme
	}
}

const navigationThemeDark = {
	...DarkTheme,
	myOwnProperty: true,
	fonts: configureFonts({ config: fontConfig }),
	colors: {
		...DarkTheme.colors,
		...colors.darkTheme
	}
}

const navigationThemeLight = {
	...LightTheme,
	myOwnProperty: true,
	fonts: configureFonts({ config: fontConfig }),
	colors: {
		...LightTheme.colors,
		...colors.lightTheme
	}
}

const themeConstant = {
	paperThemeDark,
	paperThemeLight,
	navigationThemeDark,
	navigationThemeLight
}

export const mergeTheme = ({
	...paperThemeLight,
	...navigationThemeLight
})

export const colorsTheme  = {
	...mergeTheme.colors
}

export default themeConstant