import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Alert, Image, Keyboard } from 'react-native'
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

type Props = NavigationProps<'updatePassword'>

const UpdatePassword = ({ theme, t, navigation, route }: Props): React.ReactNode => {
	const styles = createStyle(theme)
	const { onSetToken } = useStorage()
	const [pass, setPass] = useState('')
	const [confirmPass, setConfirmPass] = useState('')
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

	const doUpdate = useCallback(() => {
		Keyboard.dismiss()
		putUpdatePass({
			new_password: pass,
			confirm_password: confirmPass
		})
	}, [pass, confirmPass])

	useEffect(() => {
		if (verifyData) {
			onSetToken(verifyData.token)
		}
		if (verifyError) {
			Alert.alert('', (verifyError as {data:string}).data, [], {
				cancelable: false,
				onDismiss: () => {
					if (navigation.canGoBack()) {
						navigation.goBack()
					} else {
						navigation.replace('forgotPassword')
					}
				}
			})
		}
	}, [verifyError, verifyData])

	useEffect(() => {
		if (isSuccess) {
			navigation.popToTop()
			navigation.navigate('login', {})
		}
		if (error) {
			Alert.alert((error as {data: string}).data)
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
				<TextInput
					containerStyle={ styles.mt8 }
					borderFocusColor={ theme.colors.blueAccent }
					inputProps={ {
						placeholder: t('login-page.password-hint'),
						placeholderTextColor: theme.colors.gray,
						secureTextEntry: !showPass,
						value: pass,
						onChangeText: setPass
					} }
					prefix={ passPrefix }
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
						secureTextEntry: !showConfimPass,
						value: confirmPass,
						onChangeText: setConfirmPass
					} }
					prefix={ passPrefix }
					suffix={ confirmPassSuffix }
				/>
				<Text variant='bodyMiddleRegular' style={ styles.inputInfo }>
					{ t('register-page.confirm-password-info') }
				</Text>

				<ActionButton
					style={ styles.actionButton }
					onPress={ doUpdate }
					label={ t('update-password-page.submit') }
					loading={ isLoading }
				/>
			</KeyboardAwareScrollView>
			{ (verifyLoading) && <LoadingDialog visible title='Verifying' /> }
		</Container>
	)
}

export default withCommon(React.memo(UpdatePassword))