import {
	DefaultTheme as NavigationLightTheme,
	DarkTheme as NavigationDarkTheme
} from '@react-navigation/native'
import {
	adaptNavigationTheme,
	MD3DarkTheme,
	MD3LightTheme,
} from 'react-native-paper'
import colors from './colors'

const { LightTheme, DarkTheme } = adaptNavigationTheme({
	reactNavigationLight: NavigationLightTheme,
	reactNavigationDark: NavigationDarkTheme
})

const paperThemeDark = {
	...MD3DarkTheme,
	myOwnProperty: true,
	colors: {
		...MD3DarkTheme.colors,
		...colors.darkTheme
	}
}

const paperThemeLight = {
	...MD3LightTheme,
	myOwnProperty: true,
	colors: {
		...MD3LightTheme.colors,
		...colors.lightTheme
	}
}

const navigationThemeDark = {
	...DarkTheme,
	myOwnProperty: true,
	colors: {
		...DarkTheme.colors,
		...colors.darkTheme
	}
}

const navigationThemeLight =  {
	...LightTheme,
	myOwnProperty: true,
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