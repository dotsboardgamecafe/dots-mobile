import React, {
	useCallback, useEffect, useMemo, useRef, useState
} from 'react'
import { View, Image, TouchableOpacity, Keyboard } from 'react-native'
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
import { usePostLoginMutation, usePostVerifyMutation } from '../../store/access'
import LoadingDialog from '../../components/loading-dialog'
import { useForm, Controller, type FieldValues } from 'react-hook-form'
import ErrorModal from '../../components/error-modal'
import { type BottomSheetModal } from '@gorhom/bottom-sheet'

type Props = NavigationProps<'login'>

interface FormData extends FieldValues { email: string, password: string }

const Login = ({ theme, t, navigation, route }: Props): React.ReactNode => {
	const errModalRef = useRef<BottomSheetModal>(null)
	const errVerifyRef = useRef<BottomSheetModal>(null)
	const { onSetLogin, onSetToken, onSetEmail } = useStorage()
	const { screenName } = navigationConstant
	const [showPass, setShowPass] = useState(false)
	const { control, handleSubmit, formState: { errors }, } = useForm<FormData>()
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
	const [postVerify, {
		data: verifyData,
		error: verifyError,
		isLoading: verifyLoading
	}] = usePostVerifyMutation()

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

	const doLogin = useCallback((data: { email: string, password: string }) => {
		Keyboard.dismiss()
		postLogin(data)
		onSetEmail(data.email)
	}, [])

	useEffect(() => {
		if (isSuccess) {
			onSetToken(data.token)
			onSetLogin()
		}
		if (isError) {
			errModalRef.current?.present()
		}
	}, [data, error, isError, isSuccess])

	useEffect(() => {
		if (route.params?.token) {
			postVerify(route.params.token)
		}
	}, [route.params])

	useEffect(() => {
		if (verifyData) {
			onSetToken(verifyData.token)
			onSetLogin()
		}
		if (verifyError) {
			errVerifyRef.current?.present()
		}
	}, [verifyData, verifyError])

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
				<Controller
					control={ control }
					name='email'
					rules={ { required: { value: true, message: 'Email required' } } }
					render={ ({ field: { onChange, onBlur, value } }) => (
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
								value,
								onChangeText: onChange
							} }
							errors={ errors.email }
						/>
					) }
				/>

				<Text variant='bodyMiddleRegular' style={ styles.passwordLabel }>{ t('login-page.password-label') }</Text>
				<Controller
					control={ control }
					name='password'
					rules={ {
						minLength: { value: 8, message: 'Min 8 characters' },
						required: { value: true, message: 'Password required' }
					} }
					render={ ({ field: { onChange, onBlur, value } }) => (
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
								value,
								onChangeText: onChange
							} }
							errors={ errors.password }
						/>
					) }
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
					onPress={ handleSubmit(doLogin) }
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
			{ verifyLoading && <LoadingDialog visible title='Verifying email' /> }
			<ErrorModal
				bsRef={ errModalRef }
				title='Failed To Login'
				message={ error ? (error as { data: string }).data : '' }
			/>
			<ErrorModal
				bsRef={ errVerifyRef }
				title='Failed To Verify Account'
				message={ error ? (error as { data: string }).data : '' }
			/>
		</Container>
	)
}

export default withCommon(React.memo(Login))