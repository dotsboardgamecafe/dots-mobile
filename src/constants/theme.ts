import { Platform } from 'react-native'
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
import { type MD3Type } from 'react-native-paper/lib/typescript/types'

import colors from './colors'
import { scaleFont } from '../utils/pixel.ratio'

const { LightTheme, DarkTheme } = adaptNavigationTheme({
	reactNavigationLight: NavigationLightTheme,
	reactNavigationDark: NavigationDarkTheme
})

const fontConfig: MD3Type = {
	fontFamily: Platform.select({
		default: 'FuturaPTBook',
	}),
	fontWeight: '400',
	letterSpacing: 0,
	lineHeight: scaleFont(18),
	fontSize: scaleFont(14),
}

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

export default themeConstant