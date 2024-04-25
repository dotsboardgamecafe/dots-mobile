import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { View, Image, TouchableOpacity, Alert } from 'react-native'
import {
	Eye, EyeSlash, type IconProps, Lock, Sms
} from 'iconsax-react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { scaleWidth } from '../../utils/pixel.ratio'
import Container from '../../components/container'
import { LOGO } from '../../assets/images'
import TextInput from '../../components/text-input'
import useStorage from '../../hooks/useStorage'
import ActionButton from '../../components/action-button'
import styles from './styles'
import navigationConstant from '../../constants/navigation'
import Text from '../../components/text'
import { type NavigationProps } from '../../models/navigation'
import withCommon from '../../hoc/with-common'
import { usePostLoginMutation } from '../../store/access'

type Props = NavigationProps<'login'>

const Login = ({ theme, t, navigation }: Props): React.ReactNode => {
	const { onSetLogin, onSetToken } = useStorage()
	const { screenName } = navigationConstant
	const [showPass, setShowPass] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [
		postLogin,
		{
			isSuccess,
			isError,
			isLoading,
			data,
			error
		}
	] = usePostLoginMutation()

	const passSuffix = useMemo(() => {
		const props: IconProps = {
			variant: 'Bold',
			size: scaleWidth(16),
			color: theme.colors.gray,
			onPress: () => { setShowPass(!showPass) }
		}

		if (showPass) return <Eye { ...props } />

		return <EyeSlash { ...props } />
	}, [showPass])

	const navigateToRegister = useCallback(() => {
		navigation.navigate(screenName.register as never)
	}, [])

	const navigateToForgotPass = useCallback(() => {
		navigation.navigate(screenName.forgotPassword as never)
	}, [])

	const doLogin = useCallback(() => {
		postLogin({ email, password })
	}, [email, password])

	useEffect(() => {
		if (isSuccess) {
			onSetToken(data.token)
			onSetLogin()
		}

		if (isError) {
			Alert.alert((error as {data:string}).data)
		}
	}, [data, error, isError, isSuccess])

	return (
		<Container>
			<KeyboardAwareScrollView
				contentContainerStyle={ styles.scrollView }
				showsVerticalScrollIndicator={ false }
				bounces={ false }
				keyboardShouldPersistTaps='handled'
				enableOnAndroid
			>
				<Image source={ LOGO } style={ styles.headerImage } />
				<Text variant='headingMedium' style={ styles.headerTitle }>{ t('login-page.title') }</Text>
				<Text variant='bodyMiddleRegular' style={ styles.emailLabel }>{ t('login-page.email-label') }</Text>
				<TextInput
					containerStyle={ styles.input }
					borderFocusColor={ theme.colors.blueAccent }
					prefix={ <Sms
						variant='Bold'
						size={ scaleWidth(16) }
						color={ theme.colors.gray }
					/> }
					inputProps={ {
						placeholder: t('login-page.email-hint'),
						placeholderTextColor: theme.colors.gray,
						keyboardType: 'email-address',
						value: email,
						onChangeText: setEmail
					} }
				/>
				<Text variant='bodyMiddleRegular' style={ styles.passwordLabel }>{ t('login-page.password-label') }</Text>
				<TextInput
					containerStyle={ styles.input }
					borderFocusColor={ theme.colors.blueAccent }
					prefix={ <Lock
						variant='Bold'
						size={ scaleWidth(16) }
						color={ theme.colors.gray }
					/> }
					suffix={ passSuffix }
					inputProps={ {
						placeholder: t('login-page.password-hint'),
						placeholderTextColor: theme.colors.gray,
						keyboardType: 'default',
						secureTextEntry: !showPass,
						value: password,
						onChangeText: setPassword
					} }
				/>
				<Text
					variant='bodyMiddleMedium'
					style={ styles.forgotLabel }
					onPress={ navigateToForgotPass }
				>
					{ t('login-page.forgot-label') }
				</Text>
				<ActionButton
					style={ styles.actionButton }
					onPress={ doLogin }
					label={ t('login-page.sign-in') }
					loading={ isLoading }
				/>
				<View style={ styles.footer }>
					<View style={ styles.registerContainer }>
						<Text variant='bodyMiddleRegular'>{ t('login-page.dont-have-account') }</Text>
						<TouchableOpacity
							style={ styles.registerButton }
							onPress={ navigateToRegister }
						>
							<Text variant='bodyMiddleBold'>{ t('login-page.sign-up') }</Text>
						</TouchableOpacity>
					</View>
				</View>
			</KeyboardAwareScrollView>
		</Container>
	)
}

export default withCommon(React.memo(Login))