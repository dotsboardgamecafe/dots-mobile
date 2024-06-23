import { type LinkingOptions } from '@react-navigation/native'

const navigationConstant = {
	screenName: {
		main: 'main',
		home: 'home',
		discover: 'discover',
		play: 'play',
		champion: 'champion',
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
		tier: 'tier',
		mvp: 'mvp',
		unique: 'unique',
		hallOfFame: 'hallOfFame',
		gameBoardCollection: 'gameBoardCollection',
		awards: 'awards',
		accountInformation: 'accountInformation',
		editPassword: 'editPassword',
		tnc: 'tnc',
		privacyPolicy: 'privacyPolicy',
		notifications: 'notifications',
		transactions: 'transactions',
		editProfile: 'editProfile'
	}
}

export const linking: LinkingOptions<any> = {
	config: {
		screens: {
			[navigationConstant.screenName.login]: {
				path: '/verify/auths/verify-token-email',
			},
			[navigationConstant.screenName.register]: {
				path: '/verify-token',
			},
			[navigationConstant.screenName.register]: {
				path: '/verify/verify-token',
			},
			[navigationConstant.screenName.register]: {
				path: '/verify/auths/verify-token',
			},
			[navigationConstant.screenName.updatePassword]: {
				path: '/verify/forgot-password',
			},
			[navigationConstant.screenName.updatePassword]: {
				path: '/verify/auths/forgot-password',
			},
			[navigationConstant.screenName.gameDetail]: {
				path: 'game-detail/:id?'
			}
		}
	},
	prefixes: ['dots.app://', 'https://dots.app', 'https://dots-cms.vercel.app', 'https://dots-web-three.vercel.app']
}

export default navigationConstant