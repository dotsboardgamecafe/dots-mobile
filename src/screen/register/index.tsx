import React, {
	useCallback, useEffect, useMemo, useRef, useState
} from 'react'
import {
	Alert, Image, Keyboard, TouchableOpacity, View
} from 'react-native'
import {
	ArrowDown2, type IconProps, Lock, Warning2, Unlock
} from 'iconsax-react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { type BottomSheetModal } from '@gorhom/bottom-sheet'
import { openInbox } from 'react-native-email-link'

import Container from '../../components/container'
import { LOGO } from '../../assets/images'
import { scaleHeight, scaleWidth } from '../../utils/pixel.ratio'
import TextInput from '../../components/text-input'
import ActionButton from '../../components/action-button'
import createStyle from './styles'
import MailSent from '../../assets/svg/MailSent.svg'
import BottomSheet from '../../components/bottom-sheet'
import { type NavigationProps } from '../../models/navigation'
import withCommon from '../../hoc/with-common'
import Text from '../../components/text'
import { type RegisterParam } from '../../models/profile'
import { usePostRegisterMutation, usePostResendVerifyMutation, usePostVerifyMutation } from '../../store/access'
import useStorage from '../../hooks/useStorage'
import LoadingDialog from '../../components/loading-dialog'

type Props = NavigationProps<'register'>

const Register = ({ t, theme, navigation, route }: Props): React.ReactNode => {
	const styles = createStyle(theme)
	const { onSetLogin, onSetToken, email, onSetEmail } = useStorage()
	const [param, setParam] = useState<RegisterParam>({ fullname: '', email: '', phone_number: '', password: '', confirm_password: '' })
	const bsRegRef = useRef<BottomSheetModal>(null)
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
	const [postResendVerify, { isLoading: resendLoading, isSuccess: resendSuccess, isError: resendError }] = usePostResendVerifyMutation()

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

	const updateParam = useCallback((data: Partial<RegisterParam>) => {
		setParam({ ...param, ...data })
	}, [param])

	const doRegister = useCallback(() => {
		Keyboard.dismiss()
		onSetEmail(param.email)
		postRegister(param)
	}, [param])

	const openMail = useCallback(() => {
		bsRegRef.current?.dismiss()
		openInbox()
	}, [])

	const resendVerify = useCallback(() => {
		bsResendRef.current?.dismiss()
		setLoadingLabel(t('register-page.send-email'))
		postResendVerify(email)
	}, [email])

	useEffect(() => {
		if (data) {
			bsRegRef.current?.present()
		}
		if (error) {
			// TODO: change error layout, implement form error if possible
			Alert.alert((error as {data: string}).data)
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
			// TODO: change error layout
			Alert.alert('failed to send verification email')
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
				<TextInput
					containerStyle={ styles.mt8 }
					borderFocusColor={ theme.colors.blueAccent }
					inputProps={ {
						placeholder: t('register-page.name-hint'),
						placeholderTextColor: theme.colors.gray,
						value: param?.fullname,
						onChangeText: fullname => { updateParam({ fullname }) },
						editable: !isLoading
					} }
				/>

				<Text variant='bodyMiddleMedium' style={ styles.inputLabel }>
					{ t('login-page.email-label') }
				</Text>
				<TextInput
					containerStyle={ styles.mt8 }
					borderFocusColor={ theme.colors.blueAccent }
					inputProps={ {
						placeholder: t('login-page.email-hint'),
						placeholderTextColor: theme.colors.gray,
						value: param?.email,
						onChangeText: email => { updateParam({ email }) },
						editable: !isLoading
					} }
				/>

				<Text variant='bodyMiddleMedium' style={ styles.inputLabel }>
					{ t('register-page.phone-label') }
				</Text>
				<TextInput
					containerStyle={ styles.mt8 }
					borderFocusColor={ theme.colors.blueAccent }
					prefix={ phonePrefix }
					inputProps={ {
						placeholder: t('register-page.phone-hint'),
						placeholderTextColor: theme.colors.gray,
						keyboardType: 'number-pad',
						value: param?.phone_number,
						onChangeText: phone_number => { updateParam({ phone_number }) },
						editable: !isLoading
					} }
				/>

				<Text variant='bodyMiddleMedium' style={ styles.inputLabel }>
					{ t('login-page.password-label') }
				</Text>
				<TextInput
					containerStyle={ styles.mt8 }
					borderFocusColor={ theme.colors.blueAccent }
					inputProps={ {
						placeholder: t('login-page.password-hint'),
						placeholderTextColor: theme.colors.gray,
						value: param?.password,
						onChangeText: password => { updateParam({ password }) },
						secureTextEntry: !showPass,
						editable: !isLoading
					} }
					suffix={ passSuffix }
				/>
				<Text variant='bodyMiddleRegular' style={ styles.inputInfo }>
					{ t('register-page.password-info') }
				</Text>

				<Text variant='bodyMiddleMedium' style={ styles.inputLabel }>
					{ t('register-page.confirm-password-label') }
				</Text>
				<TextInput
					containerStyle={ styles.mt8 }
					borderFocusColor={ theme.colors.blueAccent }
					inputProps={ {
						placeholder: t('register-page.confirm-password-hint'),
						placeholderTextColor: theme.colors.gray,
						value: param?.confirm_password,
						onChangeText: confirm_password => { updateParam({ confirm_password }) },
						secureTextEntry: !showConfirmPass,
						editable: !isLoading
					} }
					suffix={ confirmPassSuffix }
				/>
				<Text variant='bodyMiddleRegular' style={ styles.inputInfo }>
					{ t('register-page.confirm-password-info') }
				</Text>

				<ActionButton
					style={ styles.actionButton }
					onPress={ doRegister }
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
			<BottomSheet
				bsRef={ bsResendRef }
				viewProps={ { style: styles.bottomSheetView } }
			>
				<Warning2 size={ scaleWidth(120) } color={ theme.colors.onBackground } />
				<Text
					variant='bodyDoubleExtraLargeBold'
				 style={ styles.successTitle }
				 >
					{ t('register-page.failed-verify') }
				</Text>
				<Text
				 variant='bodyMiddleRegular'
				  style={ styles.successInfo }
				>
					{ verifyError ? (verifyError as {data:string}).data : '' }
				</Text>
				<ActionButton
					style={ styles.successAction }
					label={ t('register-page.resend-token') }
					onPress={ resendVerify }
				/>
			</BottomSheet>
			{ (verifyLoading || resendLoading) && <LoadingDialog visible title={ loadingLabel } /> }
		</Container>
	)
}

export default withCommon(React.memo(Register))