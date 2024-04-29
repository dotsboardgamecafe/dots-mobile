import { type LinkingOptions } from '@react-navigation/native'

const navigationConstant = {
	screenName: {
		main: 'main',
		profile: 'profile',
		login: 'login',
		forgotPassword: 'forgotPassword',
		updatePassword: 'updatePassword',
		bottomNav: 'bottomNav',
		register: 'register',
		gameDetail: 'gameDetail',
		roomDetail: 'roomDetail',
		paymentSuccess: 'paymentSuccess',
		webview: 'webview',
		mvp: 'mvp',
		unique: 'unique',
		hallOfFame: 'hallOfFame'
	}
}

export const linking: LinkingOptions<any> = {
	config: {
		screens: {
			// [navigationConstant.screenName.login]: {
			// 	path: 'login/:email/:verify_token?',
			// },
			[navigationConstant.screenName.register]: {
				path: '/verify-token',
			},
			[navigationConstant.screenName.updatePassword]: {
				path: '/forgot-password',
			},
			[navigationConstant.screenName.gameDetail]: {
				path: 'game-detail/:id?'
			}
		}
	},
	prefixes: ['dots.app://', 'https://dots.app']
}

export default navigationConstant