import React, { useCallback, useMemo, useState } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { useTheme } from 'react-native-paper'
import {
	Eye, EyeSlash, type IconProps, Lock, Sms
} from 'iconsax-react-native'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { scaleWidth } from '../../utils/pixel.ratio'
import Container from '../../components/container'
import { LOGO } from '../../assets/images'
import TextInput from '../../components/text-input'
import useStorage from '../../hooks/useStorage'
import { type ThemeType } from '../../models/theme'
import ActionButton from '../../components/action-button'
import styles from './styles'
import navigationConstant from '../../constants/navigation'
import Text from '../../components/text'

const Login = (): React.ReactNode => {
	const { t } = useTranslation()
	const { onSetLogin } = useStorage()
	const { colors } = useTheme<ThemeType>()
	const navigation = useNavigation()
	const { screenName } = navigationConstant

	const [showPass, setShowPass] = useState(false)

	const passSuffix = useMemo(() => {
		const props: IconProps = {
			variant: 'Bold',
			size: scaleWidth(16),
			color: colors.gray,
			onPress: () => { setShowPass(!showPass) }
		}

		if (showPass) return <Eye { ...props } />

		return <EyeSlash { ...props } />
	}, [showPass])

	const navigateToRegister = useCallback(() => {
		navigation.navigate(screenName.register as never)
	}, [])

	return (
		<Container>
			<KeyboardAwareScrollView
				contentContainerStyle={ styles.scrollView }
				showsVerticalScrollIndicator={ false }
				bounces={ false }
				enableOnAndroid
			>
				<Image source={ LOGO } style={ styles.headerImage } />
				<Text variant='headingMedium' style={ styles.headerTitle }>{ t('login-page.title') }</Text>
				<Text style={ styles.emailLabel }>{ t('login-page.email-label') }</Text>
				<TextInput
					containerStyle={ styles.input }
					borderFocusColor={ colors.blueAccent }
					prefix={ <Sms
						variant='Bold'
						size={ scaleWidth(16) }
						color={ colors.gray }
					/> }
					inputProps={ {
						placeholder: t('login-page.email-hint'),
						placeholderTextColor: colors.gray,
						keyboardType: 'email-address'
					} }
				/>
				<Text style={ styles.passwordLabel }>{ t('login-page.password-label') }</Text>
				<TextInput
					containerStyle={ styles.input }
					borderFocusColor={ colors.blueAccent }
					prefix={ <Lock
						variant='Bold'
						size={ scaleWidth(16) }
						color={ colors.gray }
					/> }
					suffix={ passSuffix }
					inputProps={ {
						placeholder: t('login-page.password-hint'),
						placeholderTextColor: colors.gray,
						keyboardType: 'default',
						secureTextEntry: !showPass
					} }
				/>
				<Text style={ styles.forgotLabel }>{ t('login-page.forgot-label') }</Text>
				<ActionButton
					style={ styles.actionButton }
					onPress={ onSetLogin }
					label={ t('login-page.sign-in') }
				/>
				<View style={ styles.footer }>
					<View style={ styles.registerContainer }>
						<Text style={ styles.registerInfo }>{ t('login-page.dont-have-account') }</Text>
						<TouchableOpacity
							style={ styles.registerButton }
							onPress={ navigateToRegister }
						>
							<Text style={ styles.registerLabel }>{ t('login-page.sign-up') }</Text>
						</TouchableOpacity>
					</View>
				</View>
			</KeyboardAwareScrollView>
		</Container>
	)
}

export default React.memo(Login)