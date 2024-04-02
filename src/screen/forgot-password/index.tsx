import React, { useCallback, useRef } from 'react'

import Container from '../../components/container'
import withCommon from '../../hoc/with-common'
import { type NavigationProps } from '../../models/navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Image, TouchableOpacity, View } from 'react-native'
import { LOGO } from '../../assets/images'
import Text from '../../components/text'
import createStyle from './styles'
import TextInput from '../../components/text-input'
import ActionButton from '../../components/action-button'
import BottomSheet from '../../components/bottom-sheet'
import { type BottomSheetModal } from '@gorhom/bottom-sheet'
import MailSent from '../../assets/svg/MailSent.svg'
import { scaleWidth, scaleHeight } from '../../utils/pixel.ratio'
import navigationConstant from '../../constants/navigation'

type Props = NavigationProps<'forgotPassword'>

const ForgotPassword = ({ theme, t, navigation }: Props): React.ReactNode => {
	const styles = createStyle(theme)
	const bottomSheetRef = useRef<BottomSheetModal>(null)
	const { screenName } = navigationConstant

	const navigateToUpdatePassword = useCallback(() => {
		navigation.replace(screenName.updatePassword as never, '' as never)
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

				<Text variant='headingMedium' style={ styles.title }>
					{ t('forgot-password-page.title') }
				</Text>

				<Text variant='bodyMiddleRegular' style={ styles.desc }>
					{ t('forgot-password-page.desc') }
				</Text>

				<Text variant='bodyMiddleMedium' style={ styles.nameLabel }>
					{ t('login-page.email-label') }
				</Text>

				<TextInput
					containerStyle={ styles.mt8 }
					borderFocusColor={ theme.colors.blueAccent }
					inputProps={ {
						placeholder: t('login-page.email-hint'),
						placeholderTextColor: theme.colors.gray,
					} }
				/>

				<ActionButton
					style={ styles.actionButton }
					onPress={ () => bottomSheetRef.current?.present() }
					label={ t('forgot-password-page.verification') }
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
					onPress={ navigateToUpdatePassword }
					label={ t('register-page.open-email') }
				/>
			</BottomSheet>
		</Container>
	)
}

export default withCommon(React.memo(ForgotPassword))