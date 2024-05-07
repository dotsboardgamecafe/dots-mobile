import React, {
	useCallback, useEffect, useMemo, useRef, useState
} from 'react'
import { Image, Keyboard, TouchableOpacity, View } from 'react-native'
import { ArrowDown2, type IconProps, Lock, Unlock } from 'iconsax-react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { type BottomSheetModal } from '@gorhom/bottom-sheet'
import { openInbox } from 'react-native-email-link'

import Container from '../../components/container'
import { LOGO } from '../../assets/images'
import { scaleHeight, scaleWidth } from '../../utils/pixel.ratio'
import TextInput from '../../components/text-input'
import ActionButton from '../../components/action-button'
import styles from './styles'
import MailSent from '../../assets/svg/MailSent.svg'
import BottomSheet from '../../components/bottom-sheet'
import { type NavigationProps } from '../../models/navigation'
import withCommon from '../../hoc/with-common'
import Text from '../../components/text'
import { type RegisterParam } from '../../models/profile'
import { usePostRegisterMutation, usePostResendVerifyMutation, usePostVerifyMutation } from '../../store/access'
import useStorage from '../../hooks/useStorage'
import LoadingDialog from '../../components/loading-dialog'
import { Controller, useForm } from 'react-hook-form'
import ErrorModal from '../../components/error-modal'

type Props = NavigationProps<'register'>

const Register = ({ t, theme, navigation, route }: Props): React.ReactNode => {
	const { onSetLogin, onSetToken, email, onSetEmail } = useStorage()
	const { control, handleSubmit, formState: { errors }, } = useForm<RegisterParam>()
	const bsRegRef = useRef<BottomSheetModal>(null)
	const bsErrRef = useRef<BottomSheetModal>(null)
	const bsErrResendRef = useRef<BottomSheetModal>(null)
	const bsResendRef = useRef<BottomSheetModal>(null)
	const [countryCode] = useState('+62')
	const [showPass, setShowPass] = useState(false)
	const [showConfirmPass, setShowConfirmPass] = useState(false)
	const [loadingLabel, setLoadingLabel] = useState(t('register-page.verify-email'))
	const [postRegister, { data, error, isLoading }] = usePostRegisterMutation()
	const [postVerify, {
		data: verifyData,
		error: verifyError,
		isLoading: verifyLoading
	}] = usePostVerifyMutation()
	const [postResendVerify, { isLoading: resendLoading, isSuccess: resendSuccess, error: resendError }] = usePostResendVerifyMutation()

	const phonePrefix = useMemo(() => {
		return (
			<TouchableOpacity style={ { flexDirection: 'row', alignItems: 'center' } }>
				<Text variant='bodyMiddleRegular' style={ styles.countryCode }>{ countryCode }</Text>
				<ArrowDown2
					color={ theme.colors.gray }
					size={ scaleWidth(0) }
					style={ styles.phonePrefixArrow }
				/>
			</TouchableOpacity>
		)
	}, [countryCode])

	const iconProps = useMemo((): IconProps => ({
		variant: 'Bold',
		size: scaleWidth(16),
		color: theme.colors.gray
	}), [])

	const passSuffix = useMemo(() => {
		const props = { ...iconProps, onPress: () => { setShowPass(!showPass) } }
		if (showPass)
			return (<Unlock { ...props } />)
		return (<Lock { ...props } />)
	}, [showPass])

	const confirmPassSuffix = useMemo(() => {
		const props = { ...iconProps, onPress: () => { setShowConfirmPass(!showConfirmPass) } }
		if (showConfirmPass)
			return (<Unlock { ...props } />)
		return (<Lock { ...props } />)
	}, [showConfirmPass])

	const doRegister = useCallback((data: RegisterParam) => {
		Keyboard.dismiss()
		onSetEmail(data.email)
		postRegister(data)
	}, [])

	const openMail = useCallback(() => {
		bsRegRef.current?.dismiss()
		openInbox()
	}, [])

	const resendVerify = useCallback(() => {
		bsResendRef.current?.dismiss()
		bsErrResendRef.current?.dismiss()
		setLoadingLabel(t('register-page.send-email'))
		postResendVerify(email)
	}, [email])

	useEffect(() => {
		if (data) {
			bsRegRef.current?.present()
		}
		if (error) {
			bsErrRef.current?.present()
		}
	}, [data, error])

	useEffect(() => {
		if (verifyData) {
			onSetToken(verifyData.token)
			onSetLogin()
		}
		if (verifyError)  {
			bsResendRef.current?.present()
		}
	}, [verifyData, verifyError])

	useEffect(() => {
		if (resendSuccess) {
			bsRegRef.current?.present()
		}
		if (resendError)  {
			bsErrResendRef.current?.present()
		}
	}, [resendSuccess, resendError])

	useEffect(() => {
		if (route.params?.token) {
			postVerify(route.params.token)
		}
	}, [route.params])

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
				<Text variant='headingMedium' style={ styles.title }>
					{ t('register-page.title') }
				</Text>
				<Text variant='bodyMiddleRegular' style={ styles.mt8 }>
					{ t('register-page.subtitle') }
				</Text>

				<Text variant='bodyMiddleMedium' style={ styles.nameLabel }>
					{ t('register-page.name-label') }
				</Text>
				<Controller
					control={ control }
					name='fullname'
					rules={ { required: { value: true, message: 'Name is required' } } }
					render={ ({ field: { onChange, onBlur, value } }) => (
						<TextInput
							containerStyle={ styles.mt8 }
							borderFocusColor={ theme.colors.blueAccent }
							inputProps={ {
								placeholder: t('register-page.name-hint'),
								placeholderTextColor: theme.colors.gray,
								value,
								onChangeText: onChange,
								editable: !isLoading
							} }
							errors={ errors.fullname }
						/>
					) }
				/>

				<Text variant='bodyMiddleMedium' style={ styles.inputLabel }>
					{ t('login-page.email-label') }
				</Text>
				<Controller
					control={ control }
					name='email'
					rules={ { required: { value: true, message: 'Email is required' } } }
					render={ ({ field: { onChange, onBlur, value } }) => (
						<TextInput
							containerStyle={ styles.mt8 }
							borderFocusColor={ theme.colors.blueAccent }
							inputProps={ {
								placeholder: t('login-page.email-hint'),
								placeholderTextColor: theme.colors.gray,
								value,
								onChangeText: onChange,
								editable: !isLoading
							} }
							errors={ errors.email }
						/>
					) }
				/>

				<Text variant='bodyMiddleMedium' style={ styles.inputLabel }>
					{ t('register-page.phone-label') }
				</Text>
				<Controller
					control={ control }
					name='phone_number'
					rules={ { required: { value: true, message: 'Phone is required' } } }
					render={ ({ field: { onChange, onBlur, value } }) => (
						<TextInput
							containerStyle={ styles.mt8 }
							borderFocusColor={ theme.colors.blueAccent }
							prefix={ phonePrefix }
							inputProps={ {
								placeholder: t('register-page.phone-hint'),
								placeholderTextColor: theme.colors.gray,
								keyboardType: 'number-pad',
								value,
								onChangeText: onChange,
								editable: !isLoading
							} }
							errors={ errors.phone_number }
						/>
					) }
				/>

				<Text variant='bodyMiddleMedium' style={ styles.inputLabel }>
					{ t('login-page.password-label') }
				</Text>
				<Controller
					control={ control }
					name='password'
					rules={ {
						required: { value: true, message: 'Password is required' },
						minLength: 8
					} }
					render={ ({ field: { onChange, onBlur, value } }) => (
						<TextInput
							containerStyle={ styles.mt8 }
							borderFocusColor={ theme.colors.blueAccent }
							inputProps={ {
								placeholder: t('login-page.password-hint'),
								placeholderTextColor: theme.colors.gray,
								value,
								onChangeText: onChange,
								secureTextEntry: !showPass,
								editable: !isLoading
							} }
							suffix={ passSuffix }
							errors={ errors.password }
						/>
					) }
				/>
				<Text variant='bodyMiddleRegular' style={ styles.inputInfo }>
					{ t('register-page.password-info') }
				</Text>

				<Text variant='bodyMiddleMedium' style={ styles.inputLabel }>
					{ t('register-page.confirm-password-label') }
				</Text>
				<Controller
					control={ control }
					name='confirm_password'
					rules={ {
						required: { value: true, message: 'Confirm password is required' },
						validate: value => control._formValues.password === value
					} }
					render={ ({ field: { onChange, onBlur, value } }) => (
						<TextInput
							containerStyle={ styles.mt8 }
							borderFocusColor={ theme.colors.blueAccent }
							inputProps={ {
								placeholder: t('register-page.confirm-password-hint'),
								placeholderTextColor: theme.colors.gray,
								value,
								onChangeText: onChange,
								secureTextEntry: !showConfirmPass,
								editable: !isLoading
							} }
							suffix={ confirmPassSuffix }
							errors={ errors.confirm_password }
						/>
					) }
				/>
				<Text variant='bodyMiddleRegular' style={ styles.inputInfo }>
					{ t('register-page.confirm-password-info') }
				</Text>

				<ActionButton
					style={ styles.actionButton }
					onPress={ handleSubmit(doRegister) }
					label={ t('register-page.sign-up') }
					loading={ isLoading }
				/>

				<View style={ styles.footer }>
					<View style={ styles.footerContent }>
						<Text variant='bodyMiddleRegular'>
							{ t('register-page.have-account') }
						</Text>

						<TouchableOpacity
							style={ styles.login }
							onPress={ navigation.goBack }
						>
							<Text variant='bodyMiddleBold'>
								{ t('register-page.sign-in') }
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</KeyboardAwareScrollView>

			<BottomSheet
				bsRef={ bsRegRef }
				viewProps={ { style: styles.bottomSheetView } }
			>
				<MailSent width={ scaleWidth(140) } height={ scaleHeight(108) } />
				<Text
					variant='bodyDoubleExtraLargeBold'
				 style={ styles.successTitle }
				 >
					{ t('register-page.success-title') }
				</Text>
				<Text
				 variant='bodyMiddleRegular'
				  style={ styles.successInfo }
				>
					{ t('register-page.success-info') }
				</Text>
				<ActionButton
					style={ styles.successAction }
					label={ t('register-page.open-email') }
					onPress={ openMail }
				/>
			</BottomSheet>
			<ErrorModal
				bsRef={ bsErrRef }
				title='Failed To Register'
				message={ error ? (error as { data: string }).data : '' }
			/>
			<ErrorModal
				bsRef={ bsErrResendRef }
				title='Failed To Resend Verification Email'
				message={ resendError ? (resendError as { data: string }).data : '' }
				actionLabel='Retry'
				onClickAction={ resendVerify }
			/>
			<ErrorModal
				bsRef={ bsResendRef }
				title={ t('register-page.failed-verify') }
				message={ verifyError ? (verifyError as {data:string}).data : '' }
				actionLabel={ t('register-page.resend-token') }
				onClickAction={ resendVerify }
			/>
			{ (verifyLoading || resendLoading) && <LoadingDialog visible title={ loadingLabel } /> }
		</Container>
	)
}

export default withCommon(React.memo(Register))