import React, { useMemo, useRef, useState } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { ArrowDown2, Lock } from 'iconsax-react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { type BottomSheetModal } from '@gorhom/bottom-sheet'

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

type Props = NavigationProps<'register'>

const Register = ({ t, theme, navigation }: Props): React.ReactNode => {

	const styles = createStyle(theme)
	const bottomSheetRef = useRef<BottomSheetModal>(null)
	const [countryCode] = useState('+62')

	const phonePrefix = useMemo(() => {
		return (
			<TouchableOpacity style={ { flexDirection: 'row', alignItems: 'center' } }>
				<Text style={ styles.countryCode }>{ countryCode }</Text>
				<ArrowDown2
					color={ theme.colors.gray }
					size={ scaleWidth(0) }
					style={ styles.phonePrefixArrow }
				/>
			</TouchableOpacity>
		)
	}, [countryCode])

	const passSuffix = useMemo(() => {
		return (
			<Lock
				variant='Bold'
				size={ scaleWidth(16) }
				color={ theme.colors.gray }
			/>
		)
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
					} }
					suffix={ passSuffix }
				/>
				<Text variant='bodyMiddleRegular' style={ styles.inputInfo }>
					{ t('register-page.confirm-password-info') }
				</Text>

				<ActionButton
					style={ styles.actionButton }
					onPress={ () => bottomSheetRef.current?.present() }
					label={ t('register-page.sign-up') }
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
				/>
			</BottomSheet>
		</Container>
	)
}

export default withCommon(React.memo(Register))