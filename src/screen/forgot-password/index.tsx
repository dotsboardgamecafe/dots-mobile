import React, { useCallback, useEffect, useRef } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Image, Keyboard, TouchableOpacity, View } from 'react-native'
import { type BottomSheetModal } from '@gorhom/bottom-sheet'
import { openInbox } from 'react-native-email-link'

import Container from '../../components/container'
import withCommon from '../../hoc/with-common'
import { type NavigationProps } from '../../models/navigation'
import { LOGO } from '../../assets/images'
import Text from '../../components/text'
import createStyle from './styles'
import TextInput from '../../components/text-input'
import ActionButton from '../../components/action-button'
import BottomSheet from '../../components/bottom-sheet'
import MailSent from '../../assets/svg/MailSent.svg'
import { scaleWidth, scaleHeight } from '../../utils/pixel.ratio'
import { usePostForgotPassMutation } from '../../store/access'
import { Controller, useForm } from 'react-hook-form'
import ErrorModal from '../../components/error-modal'

type Props = NavigationProps<'forgotPassword'>

const ForgotPassword = ({ theme, t, navigation }: Props): React.ReactNode => {
	const styles = createStyle(theme)
	const bottomSheetRef = useRef<BottomSheetModal>(null)
	const bsErrRef = useRef<BottomSheetModal>(null)
	const { control, handleSubmit, formState: { errors }, } = useForm<{email: string}>({
		defaultValues: { email: '' }
	})
	const [postForgotPass, { isLoading, error, isSuccess }] = usePostForgotPassMutation()

	const openMail = useCallback(() => {
		bottomSheetRef.current?.dismiss()
		openInbox()
	}, [])

	const postForm = useCallback((data: {email: string}) => {
		Keyboard.dismiss()
		postForgotPass(data.email)
	}, [])

	useEffect(() => {
		if (isSuccess) {
			bottomSheetRef.current?.present()
		}
		if (error) {
			bsErrRef.current?.present()
		}
	}, [isSuccess, error])

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

				<Text variant='bodyDoubleExtraLargeJunegull' style={ styles.title }>
					{ t('forgot-password-page.title') }
				</Text>

				<Text variant='bodyMiddleRegular' style={ styles.desc }>
					{ t('forgot-password-page.desc') }
				</Text>

				<Text variant='bodyMiddleMedium' style={ styles.nameLabel }>
					{ t('login-page.email-label') }
				</Text>

				<Controller
					control={ control }
					name='email'
					rules={ { required: { value: true, message: 'Email is required' } } }
					render={ ({ field: { onChange, value } }) => (
						<TextInput
							containerStyle={ styles.mt8 }
							borderFocusColor={ theme.colors.blueAccent }
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

				<ActionButton
					style={ styles.actionButton }
					onPress={ handleSubmit(postForm) }
					label={ t('forgot-password-page.verification') }
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
				bsRef={ bottomSheetRef }
				viewProps={ { style: styles.bottomSheetView } }
			>
				<MailSent width={ scaleWidth(140) } height={ scaleHeight(108) } />
				<Text
					variant='bodyDoubleExtraLargeBold'
				 style={ styles.successTitle }
				 >
					{ t('forgot-password-page.success-title') }
				</Text>
				<Text
				 variant='bodyMiddleRegular'
				  style={ styles.successInfo }
				>
					{ t('forgot-password-page.success-info') }
				</Text>
				<ActionButton
					style={ styles.successAction }
					onPress={ openMail }
					label={ t('register-page.open-email') }
				/>
			</BottomSheet>
			<ErrorModal
				bsRef={ bsErrRef }
				title='Failed To Send Email'
				message={ error ? (error as { data: string }).data : '' }
			/>
		</Container>
	)
}

export default withCommon(React.memo(ForgotPassword))