import { TouchableOpacity, View } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import Container from '../../components/container'
import Header from '../../components/header'
import Text from '../../components/text'
import {
	type IconProps, Lock, Verify, Eye, EyeSlash,
	Sms
} from 'iconsax-react-native'
import styles from './styles'
import { colorsTheme } from '../../constants/theme'
import { scaleHeight, scaleWidth } from '../../utils/pixel.ratio'
import BottomSheet from '../../components/bottom-sheet'
import { type BottomSheetModal } from '@gorhom/bottom-sheet'
import CloseIcon from '../../assets/svg/close.svg'
import withCommon from '../../hoc/with-common'
import { type NavigationProps } from '../../models/navigation'
import TextInput from '../../components/text-input'
import ActionButton from '../../components/action-button'
import MailSent from '../../assets/svg/MailSent.svg'

type Props = NavigationProps<'accountInformation'>

const initialState = {
	visiblePassword: false,
	isChangeEmail: false
}

const AccountInformation = ({ theme, navigation, t }:Props): React.ReactNode => {
	const bottomSheetRef = useRef<BottomSheetModal>(null)
	const [visiblePassword, setVisiblePassword] = useState(initialState.visiblePassword)
	const [isChangeEmail, setIsChangeEmail] = useState(initialState.isChangeEmail)

	const _onOpenBottomSheet = useCallback(() => {
		bottomSheetRef.current?.present()
	}, [bottomSheetRef])

	const _onPressSubmit = useCallback(() => {
		if (!isChangeEmail) {
			bottomSheetRef.current?.close()
		}
		setIsChangeEmail(!isChangeEmail)
	}, [isChangeEmail])

	const _onPressBack = useCallback(() => {
		if (!isChangeEmail) {
			navigation.goBack()
		} else {
			setIsChangeEmail(initialState.isChangeEmail)
		}
	}, [navigation, isChangeEmail])

	const _renderPrimaryContent = useCallback(() => {
		return (
			<React.Fragment>
				<Text variant='bodyMiddleMedium'>Email Address</Text>
				<View style={ styles.cardWrapperStyle }>
					<View style={ [styles.rowStyle, styles.justifyBetweenStyle] }>
						<Text variant='bodyMiddleRegular'>olivia@gmail.com</Text>
						<TouchableOpacity onPress={ _onOpenBottomSheet }>
							<Text variant='bodyMiddleDemi' style={ styles.editLabelStyle }>Edit</Text>
						</TouchableOpacity>
					</View>
					<View style={ [styles.rowStyle, styles.rowCenterStyle, styles.verifyWrapperStyle] }>
						<Verify size={ scaleWidth(14) } variant='Bold' color={ colorsTheme.blueAccent } />
						<Text style={ styles.activatedLabelStyle } variant='bodyExtranSmallMedium'>Has been activated</Text>
					</View>
				</View>
				<Text style={ styles.infoLabelStyle } variant='bodyMiddleRegular'>Your email is used to log in and process transactions.</Text>
			</React.Fragment>
		)
	}, [])

	const _renderSecondaryContent = useCallback(() => {
		return (
			<React.Fragment>
				<Text style={ styles.infoLabelStyle } variant='bodyMiddleRegular'>Kindly enter your new email and we will send you a verification link so that you can have an access to this app.</Text>
				<View>
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
							keyboardType: 'email-address'
						} }
					/>
				</View>
				<View style={ styles.changeEmailBtnWrapper }>
					<ActionButton
						style={ styles.actionButton }
						label={ 'Change Email' }
						onPress={ _onOpenBottomSheet }
					/>
				</View>
			</React.Fragment>
		)
	}, [])

	const _renderContent = useCallback(() => {
		return (
			<View style={ styles.contentStyle }>
				{ isChangeEmail ? _renderSecondaryContent() : _renderPrimaryContent() }
			</View>
		)
	}, [isChangeEmail])

	const _getVisibleSuffix = useCallback(() => {
		const props: IconProps = {
			variant: 'Bold',
			size: scaleWidth(16),
			color: theme.colors.gray,
		}

		if (visiblePassword) return <Eye { ...props } />

		return <EyeSlash { ...props } />
	}, [visiblePassword])

	const _onPressVisiblePassword = useCallback(() => {
		setVisiblePassword(!visiblePassword)
	}, [visiblePassword, _onOpenBottomSheet])

	const _renderPasswordFields = useCallback(() => {
		return (
			<View style={ styles.fieldWrapperStyle }>
				<Text variant='bodyMiddleRegular' style={ styles.passwordLabel }>Password</Text>
				<TextInput
					containerStyle={ styles.input }
					borderFocusColor={ theme.colors.blueAccent }
					prefix={
						<View style={ styles.prefixWrapperStyle }>
							<Lock
								variant='Bold'
								size={ scaleWidth(16) }
								color={ theme.colors.gray }
							/>
						</View>
					}
					suffix={
						<TouchableOpacity onPress={ _onPressVisiblePassword }>
							{ _getVisibleSuffix() }
						</TouchableOpacity>
					}
					inputProps={ {
						placeholder: 'Password',
						placeholderTextColor: theme.colors.gray,
						keyboardType: 'default',
						secureTextEntry: !visiblePassword
					} }
				/>
			</View>
		)
	}, [visiblePassword, _onPressVisiblePassword])

	const _renderBottomSheetTopContent = useCallback(() => {
		return (
			<View style={ [styles.rowStyle, styles.justifyBetweenStyle] }>
				<Text style={ styles.bottomSheetTitleStyle } variant='bodyExtraLargeHeavy'>Security Verification</Text>
				<TouchableOpacity onPress={ () => bottomSheetRef.current?.close() }>
					<CloseIcon />
				</TouchableOpacity>
			</View>
		)
	}, [bottomSheetRef])

	const _renderPrimaryBottomSheetContent = useCallback(() => {
		return (
			<React.Fragment>
				{ _renderBottomSheetTopContent() }
				<Text variant='bodyMiddleRegular' style={ styles.infoLabelStyle }>
					Before continue to change email address, please kindly verify that this request is coming from you.
				</Text>
				{ _renderPasswordFields() }
				<ActionButton
					style={ styles.actionButton }
					onPress={ _onPressSubmit }
					label={ 'Submit' }
				/>
			</React.Fragment>
		)
	}, [_renderBottomSheetTopContent, _renderPasswordFields])

	const _renderSecondaryBottomSheetContent = useCallback(() => {
		return (
			<View style={ styles.rowCenterStyle }>
				<MailSent width={ scaleWidth(140) } height={ scaleHeight(108) } />
				<Text
					variant='bodyDoubleExtraLargeBold'
				 style={ styles.successTitle }
				 >
					Verification Link Sent
				</Text>
				<Text
				 variant='bodyMiddleRegular'
				  style={ styles.successInfo }
				>
					We have sent a link recovery for your password to your email address oliviaainsley@gmail.com
				</Text>
				<ActionButton
					style={ styles.actionButton }
					onPress={ _onPressSubmit }
					label={ 'Open Email' }
				/>
			</View>
		)
	}, [_onPressSubmit])

	const _renderBottomSheetContent = useCallback(() => {

		if (isChangeEmail) return _renderSecondaryBottomSheetContent()
		
		return _renderPrimaryBottomSheetContent()
	}, [
		isChangeEmail,
		_renderSecondaryBottomSheetContent,
		_renderPrimaryBottomSheetContent
	])

	return (
		<Container>
			<Header title={ isChangeEmail ? 'Change Email Address' : 'Account Information' } onPressBack={ _onPressBack } />
			{ _renderContent() }
			<BottomSheet bsRef={ bottomSheetRef } viewProps={ { style: styles.bottomSheetView } }>
				{ _renderBottomSheetContent() }
			</BottomSheet>
		</Container>
	)
}

export default withCommon(React.memo(AccountInformation))
