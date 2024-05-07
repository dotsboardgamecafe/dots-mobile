import React, {
	useCallback, useEffect, useMemo, useRef, useState
} from 'react'
import { Image, Keyboard } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { type IconProps, Lock, Eye, EyeSlash } from 'iconsax-react-native'

import { LOGO } from '../../assets/images'
import ActionButton from '../../components/action-button'
import Container from '../../components/container'
import withCommon from '../../hoc/with-common'
import { type NavigationProps } from '../../models/navigation'
import createStyle from './styles'
import Text from '../../components/text'
import TextInput from '../../components/text-input'
import { scaleWidth } from '../../utils/pixel.ratio'
import { usePostVerifyForgotPassMutation, usePutUpdatePassMutation } from '../../store/access'
import LoadingDialog from '../../components/loading-dialog'
import useStorage from '../../hooks/useStorage'
import { Controller, useForm } from 'react-hook-form'
import { type BottomSheetModal } from '@gorhom/bottom-sheet'
import ErrorModal from '../../components/error-modal'

type Props = NavigationProps<'updatePassword'>

interface FormData { new_password: string, confirm_password: string }

const UpdatePassword = ({ theme, t, navigation, route }: Props): React.ReactNode => {
	const styles = createStyle(theme)
	const bsVerifyErrRef = useRef<BottomSheetModal>(null)
	const bsErrRef = useRef<BottomSheetModal>(null)
	const { onSetToken } = useStorage()
	const { control, handleSubmit, formState: { errors }, } = useForm<FormData>({
		defaultValues: { new_password: '', confirm_password: '' }
	})
	const [showPass, setShowPass] = useState(false)
	const [showConfimPass, setShowConfirmPass] = useState(false)
	const [postVerifyForgotPass, { isLoading: verifyLoading, data: verifyData, error: verifyError }] = usePostVerifyForgotPassMutation()
	const [putUpdatePass, { isLoading, isSuccess, error }] = usePutUpdatePassMutation()

	const iconProps = useMemo<IconProps>(() => {
		return {
			variant: 'Bold',
			size: scaleWidth(16),
			color: theme.colors.gray,
		}
	}, [])

	const passPrefix = useMemo(() => (
		<Lock
			{ ...iconProps }
		/>
	), [iconProps])

	const passSuffix = useMemo(() => {
		const props = {
			...iconProps,
			onPress: () => { setShowPass(!showPass) }
		}

		if (showPass) return <Eye { ...props } />

		return <EyeSlash { ...props } />
	}, [showPass, iconProps])

	const confirmPassSuffix = useMemo(() => {
		const props = {
			...iconProps,
			onPress: () => { setShowConfirmPass(!showConfimPass) }
		}

		if (showPass) return <Eye { ...props } />

		return <EyeSlash { ...props } />
	}, [showConfimPass, iconProps])

	const doUpdate = useCallback((data: FormData) => {
		Keyboard.dismiss()
		putUpdatePass(data)
	}, [])

	useEffect(() => {
		if (verifyData) {
			onSetToken(verifyData.token)
		}
		if (verifyError) {
			bsVerifyErrRef.current?.present()
		}
	}, [verifyError, verifyData])

	useEffect(() => {
		if (isSuccess) {
			navigation.popToTop()
			navigation.navigate('login', {})
		}
		if (error) {
			bsErrRef.current?.present()
		}
	}, [isSuccess, error])

	useEffect(() => {
		if (route.params?.token) {
			postVerifyForgotPass(route.params?.token)
		}
	}, [route.params])

	return (
		<Container>
			<KeyboardAwareScrollView
				contentContainerStyle={ styles.scrollView }
				showsVerticalScrollIndicator={ false }
				keyboardShouldPersistTaps='handled'
				bounces={ false }
				enableOnAndroid
			>
				<Image source={ LOGO } style={ styles.headerImage } />
				<Text variant='headingMedium' style={ styles.title }>
					{ t('update-password-page.title') }
				</Text>
				<Text variant='bodyMiddleRegular' style={ styles.desc }>
					{ t('update-password-page.desc') }
				</Text>

				<Text variant='bodyMiddleMedium' style={ styles.nameLabel }>
					{ t('login-page.password-label') }
				</Text>
				<Controller
					control={ control }
					name='new_password'
					rules={ { required: true, minLength: 8 } }
					render={ ({ field: { onChange, value } }) => (
						<TextInput
							containerStyle={ styles.mt8 }
							borderFocusColor={ theme.colors.blueAccent }
							inputProps={ {
								placeholder: t('login-page.password-hint'),
								placeholderTextColor: theme.colors.gray,
								secureTextEntry: !showPass,
								value,
								onChangeText: onChange
							} }
							prefix={ passPrefix }
							suffix={ passSuffix }
							errors={ errors.new_password }
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
					rules={ { required: true, validate: value => value === control._formValues.new_password } }
					render={ ({ field: { onChange, value } }) => (
						<TextInput
							containerStyle={ styles.mt8 }
							borderFocusColor={ theme.colors.blueAccent }
							inputProps={ {
								placeholder: t('register-page.confirm-password-hint'),
								placeholderTextColor: theme.colors.gray,
								secureTextEntry: !showConfimPass,
								value,
								onChangeText: onChange
							} }
							prefix={ passPrefix }
							suffix={ confirmPassSuffix }
							errors={ errors.confirm_password }
						/>
					) }
				/>
				{ errors.confirm_password && <Text style={ { color: theme.colors.redAccent } }>This is required.</Text> }
				<Text variant='bodyMiddleRegular' style={ styles.inputInfo }>
					{ t('register-page.confirm-password-info') }
				</Text>

				<ActionButton
					style={ styles.actionButton }
					onPress={ handleSubmit(doUpdate) }
					label={ t('update-password-page.submit') }
					loading={ isLoading }
				/>
			</KeyboardAwareScrollView>
			{ (verifyLoading) && <LoadingDialog visible title='Verifying' /> }
			<ErrorModal
				bsRef={ bsVerifyErrRef }
				title='Failed To Verify Account'
				message={ verifyError ? (verifyError as { data: string }).data : '' }
				onDismiss={ () => {
					if (navigation.canGoBack()) {
						navigation.goBack()
					} else {
						navigation.replace('forgotPassword')
					}
				} }
			/>
			<ErrorModal
				bsRef={ bsErrRef }
				title='Failed To Update Password'
				message={ error ? (error as { data: string }).data : '' }
			/>
		</Container>
	)
}

export default withCommon(React.memo(UpdatePassword))