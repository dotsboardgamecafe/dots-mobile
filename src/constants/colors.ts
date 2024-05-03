const customColor = {
	gray500: '#667085',
	lightWhite: '#fafafa',
	black: '#000000',
	neutralLink: '#232526'
}

const lightTheme = {
	textColor: '#000000',
	yellowAccent: '#F8EA0E',
	yellowTransparent: '#F8EA0E1F',
	redAccent: '#FB1515',
	blueAccent: '#2F3190',
	blueTransparent: '#2F31901F',
	gray: '#98A2B3',
	gray100: '#F2F4F7',
	gray200: '#EAECF0',
	background: '#FFFFFF',
	surface: '#F7F7F7',
	// surface: '#EAECF0'
	...customColor
}

const darkTheme = {
	textColor: '#FFFFFF',
	yellowAccent: '#F8EA0E',
	yellowTransparent: '#F8EA0E1F',
	redAccent: '#FB1515',
	blueAccent: '#2F3190',
	blueTransparent: '#F82F3190',
	gray: '#98A2B3',
	gray100: '#F2F4F7',
	gray200: '#EAECF0',
	background: '#000000',
	surface: '#090909',
	...customColor
}

const colors = {
	lightTheme,
	darkTheme
}

export default colors