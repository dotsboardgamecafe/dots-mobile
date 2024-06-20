/* eslint-disable react/no-unescaped-entities */
import { ActivityIndicator, Linking, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import Container from '../../components/container'
import Header from '../../components/header'
import Text from '../../components/text'
import {
	type IconProps, Lock, Verify, Eye, EyeSlash,
	Sms,
	ArrowDown2
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
import useStorage from '../../hooks/useStorage'
import Modal from '../../components/modal'
import { List } from 'react-native-paper'
import { usePostVerifyPasswordMutation } from '../../store/access'
import Toast from 'react-native-toast-message'
import { useDeleteAccountMutation, useUpdateEmailMutation } from '../../store/user'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { baseApi } from '../../utils/base.api'

type Props = NavigationProps<'accountInformation'>

const initialState = {
	visiblePassword: false,
	isChangeEmail: false
}

const AccountInformation = ({ theme, navigation, t }:Props): React.ReactNode => {
	const dispatch = useDispatch()
	const { user, onSetUser, onSetLogout } = useStorage()
	const { control, setValue, handleSubmit, formState, reset } = useForm({
		defaultValues: {
			email: ''
		},
		mode: 'all',
		reValidateMode: 'onChange'
	})
	const bottomSheetRef = useRef<BottomSheetModal>(null)
	const [visiblePassword, setVisiblePassword] = useState(initialState.visiblePassword)
	const [isChangeEmail, setIsChangeEmail] = useState(initialState.isChangeEmail)
	const [actionType, setActionType] = useState<string | undefined>('')
	const [password, setPassword] = useState<string>('')
	const [visibleDeleteAccount, setVisibleDeleteAccount] = useState(false)
	const [isBottomSheetAnimate, setIsBottomSheetAnimate] = useState(false)
	const [
		verifyPassword,
		{
			isLoading: isLoadingVerifyPassword,
		}
	] = usePostVerifyPasswordMutation()
	const [
		updateEmail,
		{
			isLoading: isLoadingUpdateEmail,
		}
	] = useUpdateEmailMutation()
	const [
		deleteAccount,
		{
			isLoading: isLoadingDeleteAccount,
		}
	] = useDeleteAccountMutation()

	const _onOpenBottomSheet = useCallback((type?: string) => () => {
		bottomSheetRef.current?.present()
		setActionType(type)
	}, [bottomSheetRef])

	const _onPressSubmitEmail = useCallback(async(data: {email: string}) => {
		const onOpenBottomSheet = _onOpenBottomSheet()
		try {
			await updateEmail(data.email).unwrap()
			onSetUser({
				...user,
				email: data.email
			})
			onOpenBottomSheet()
		} catch (error: any) {
			Toast.show({
				type: error?.data ?? 'error',
				text1: 'Something went wrong'
			})
		}
	}, [_onOpenBottomSheet])

	const _onPressDeleteAccount = useCallback(async() => {
		try {
			if (!isLoadingDeleteAccount) {
				await deleteAccount(user?.user_code ?? '').unwrap()
				setVisibleDeleteAccount(false)
				onSetLogout()
				dispatch(baseApi.util.resetApiState())
			}
		} catch (error) {
			Toast.show({
				type: 'error',
				text1: 'Something went wrong'
			})
		}
	}, [isLoadingDeleteAccount])

	const _onPressSubmit = useCallback(async() => {
		try {
			await verifyPassword(password).unwrap()
			setPassword('')
			if (actionType === 'edit') {
				if (!isChangeEmail) {
					bottomSheetRef.current?.close()
				}
				setValue('email', user?.email ?? '')
				setIsChangeEmail(!isChangeEmail)
				setVisiblePassword(false)
			}
			if (actionType === 'delete') {
				setVisibleDeleteAccount(!visibleDeleteAccount)
				bottomSheetRef.current?.close()
			}
		} catch (error: any) {
			Toast.show({
				type: 'error',
				text1: error?.data ?? 'Something went wrong'
			})
		}
	}, [isChangeEmail, actionType, password, user])

	const _onPressLogoutAndOpenEmail = useCallback(() => {
		onSetLogout()
		Linking.openURL(`mailto:${user?.email}`)
	}, [user])

	const _onPressBack = useCallback(() => {
		if (!isChangeEmail) {
			navigation.goBack()
		} else {
			setIsChangeEmail(initialState.isChangeEmail)
			reset()
		}
	}, [navigation, isChangeEmail])

	const _getHeaderTitle = useMemo(() => {
		let title = 'header-title'

		if (isChangeEmail) {
			title = `${title}-2`
		}

		return t(`account-info-page.${title}`)
	}, [isChangeEmail])

	const _onPressVisiblePassword = useCallback(() => {
		setVisiblePassword(!visiblePassword)
	}, [visiblePassword, _onOpenBottomSheet])

	const _onAnimateBottomSheet = useCallback((fromIndex: number, toIndex: number) => {
		setIsBottomSheetAnimate(fromIndex > toIndex)
	}, [])

	const _renderPrimaryContent = useMemo(() => {
		return (
			<React.Fragment>
				<View>
					<Text variant='bodyMiddleMedium'>{ t('account-info-page.email-label') }</Text>
					<View style={ styles.cardWrapperStyle }>
						<View style={ [styles.rowStyle, styles.justifyBetweenStyle] }>
							<Text variant='bodyMiddleRegular'>{ user?.email }</Text>
							<TouchableOpacity onPress={ _onOpenBottomSheet('edit') }>
								<Text variant='bodyMiddleDemi' style={ styles.editLabelStyle }>{ t('account-info-page.btn-edit') }</Text>
							</TouchableOpacity>
						</View>
						<View style={ [styles.rowStyle, styles.rowCenterStyle, styles.verifyWrapperStyle] }>
							<Verify size={ scaleWidth(14) } variant='Bold' color={ colorsTheme.blueAccent } />
							<Text style={ styles.activatedLabelStyle } variant='bodyExtranSmallMedium'>{ t('account-info-page.mark-activate') }</Text>
						</View>
					</View>
					<Text style={ styles.infoLabelStyle } variant='bodyMiddleRegular'>{ t('account-info-page.email-info') }</Text>
				</View>
				<View style={ styles.successTitle }>
					<Text variant='bodyMiddleMedium'>{ t('account-info-page.delete-label') }</Text>
					<List.Accordion
						title={ <Text variant='bodyMiddleRegular' style={ styles.deleteDescriptionStyle }>Deleting your account means:</Text> }
						left={ () => null }
						right={ () => <ArrowDown2 size={ scaleWidth(20) } color={ colorsTheme.black } /> }
						theme={ { colors: { background: 'transparent',  } } }
						style={ styles.deleteAccountWrapper }
					>
						<List.Item
							style={ { paddingLeft: 0 } }
							titleNumberOfLines={ 10 }
							title={
								<View style={ [styles.rowStyle] }>
									<Text variant='bodyMiddleRegular' style={ [styles.deleteDescriptionStyle, { width: 20 }] }>1. </Text>
									<Text variant='bodyMiddleRegular' style={ [styles.deleteDescriptionStyle] }>Your account disappears forever. This means you`ll lose your level, benefits, and any other stuff you have in the app.</Text>
								</View>
							 }
						/>
						<List.Item
							style={ { paddingLeft: 0 } }
							titleNumberOfLines={ 10 }
							title={
								<View style={ [styles.rowStyle] }>
									<Text variant='bodyMiddleRegular' style={ [styles.deleteDescriptionStyle, { width: 20 }] }>2. </Text>
									<Text variant='bodyMiddleRegular' style={ [styles.deleteDescriptionStyle] }>Starting over as new. If you rejoin later, it'll be a fresh account.</Text>
								</View>
							 }
						/>
						<TouchableOpacity style={ styles.deleteButtonStyle } onPress={ _onOpenBottomSheet('delete') }>
							<Text style={ styles.deleteLabelStyle } variant='bodyExtraLargeBold'>Delete</Text>
						</TouchableOpacity>
					</List.Accordion>
				</View>
			</React.Fragment>
		)
	}, [user])

	const _renderSecondaryContent = useMemo(() => {
		return (
			<React.Fragment>
				<Text style={ styles.infoLabelStyle } variant='bodyMiddleRegular'>{ t('account-info-page.header-subtitle-2') }</Text>
				<View>
					<Text variant='bodyMiddleRegular' style={ styles.emailLabel }>{ t('account-info-page.email-label-2') }</Text>
					<Controller
						name='email'
						rules={ {
							required: 'Email required',
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: 'Invalid email address'
							},
							validate: (text:string) => {
								return text === user?.email ? 'The email must be different from the current email' : undefined
							}
						} }
						control={ control }
						render={ ({ field: { onChange, value } }) => (
							<TextInput
								containerStyle={ styles.input }
								borderFocusColor={ theme.colors.blueAccent }
								prefix={ <Sms
									variant='Bold'
									size={ scaleWidth(16) }
									color={ theme.colors.gray }
								/> }
								inputProps={ {
									placeholder: t('account-info-page.email-placeholder'),
									placeholderTextColor: theme.colors.gray,
									keyboardType: 'email-address',
									value,
									onChangeText: onChange,
								} }
								errors={ formState?.errors.email }
							/>
						) }
					/>
				</View>
				<View style={ styles.changeEmailBtnWrapper }>
					<ActionButton
						style={ styles.actionButton }
						label={ t('account-info-page.btn-change-email') }
						onPress={ handleSubmit(_onPressSubmitEmail) }
						loading={ isLoadingUpdateEmail }
					/>
				</View>
			</React.Fragment>
		)
	}, [isLoadingUpdateEmail, user, formState])

	const _renderContent = useMemo(() => {
		return (
			<View style={ styles.contentStyle }>
				{ isChangeEmail ? _renderSecondaryContent : _renderPrimaryContent }
			</View>
		)
	}, [isChangeEmail, _renderSecondaryContent])

	const _getVisibleSuffix = useMemo(() => {
		const props: IconProps = {
			variant: 'Bold',
			size: scaleWidth(16),
			color: theme.colors.gray,
		}

		if (visiblePassword) return <Eye { ...props } />

		return <EyeSlash { ...props } />
	}, [visiblePassword])

	const _renderPasswordFields = useMemo(() => {
		return (
			<View style={ styles.fieldWrapperStyle }>
				<Text variant='bodyMiddleRegular' style={ styles.passwordLabel }>{ t('account-info-page.bottomsheet-password.password-label') }</Text>
				<TextInput
					isBottomSheet
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
							{ _getVisibleSuffix }
						</TouchableOpacity>
					}
					inputProps={ {
						placeholder: t('account-info-page.bottomsheet-password.password-label'),
						placeholderTextColor: theme.colors.gray,
						keyboardType: 'default',
						secureTextEntry: !visiblePassword,
						value: password,
						onChangeText: setPassword
					} }
				/>
				<ActionButton
					style={ styles.actionButton }
					onPress={ _onPressSubmit }
					label={ t('account-info-page.bottomsheet-password.btn-submit') }
					loading={ isLoadingVerifyPassword }
				/>
			</View>
		)
	}, [visiblePassword, _onPressVisiblePassword, _onPressSubmit, password, isLoadingVerifyPassword])

	const _renderBottomSheetTopContent = useMemo(() => {
		return (
			<View style={ [styles.rowStyle, styles.justifyBetweenStyle] }>
				<Text style={ styles.bottomSheetTitleStyle } variant='bodyExtraLargeHeavy'>{ t('account-info-page.bottomsheet-password.header-title') }</Text>
				<TouchableOpacity onPress={ () => bottomSheetRef.current?.close() }>
					<CloseIcon />
				</TouchableOpacity>
			</View>
		)
	}, [bottomSheetRef])

	const _renderPrimaryBottomSheetContent = useMemo(() => {
		return (
			<React.Fragment>
				{ _renderBottomSheetTopContent }
				<Text variant='bodyMiddleRegular' style={ styles.infoLabelStyle }>
					{ t('account-info-page.bottomsheet-password.header-title') }
				</Text>
				{ _renderPasswordFields }
			</React.Fragment>
		)
	}, [_renderBottomSheetTopContent, _renderPasswordFields])

	const _renderSecondaryBottomSheetContent = useMemo(() => {
		if (isBottomSheetAnimate) return null
		
		return (
			<View style={ styles.rowCenterStyle }>
				<MailSent width={ scaleWidth(140) } height={ scaleHeight(108) } />
				<Text
					variant='bodyDoubleExtraLargeBold'
				 style={ styles.successTitle }
				 >
					{ t('account-info-page.bottomsheet-verification.header-title') }
				</Text>
				<Text
				 variant='bodyMiddleRegular'
				  style={ styles.successInfo }
				>
					{ t('account-info-page.bottomsheet-verification.header-subtitle', { email: 'oke@mail.com' }) }
				</Text>
				<ActionButton
					style={ styles.actionButton }
					onPress={ _onPressLogoutAndOpenEmail }
					label={ t('account-info-page.bottomsheet-verification.btn-verification') }
				/>
			</View>
		)
	}, [_onPressLogoutAndOpenEmail, isBottomSheetAnimate])

	const _renderBottomSheetContent = useMemo(() => {

		if (isChangeEmail) return _renderSecondaryBottomSheetContent
		
		return _renderPrimaryBottomSheetContent
	}, [
		isChangeEmail,
		_renderSecondaryBottomSheetContent,
		_renderPrimaryBottomSheetContent
	])

	const _renderModalDeleteAccount = useMemo(() => {
		return (
			<View>
				<View style={ [styles.rowStyle, styles.justifyBetweenStyle] }>
					<View/>
					<TouchableOpacity onPress={ () => { setVisibleDeleteAccount(visibleDeleteAccount) } }>
						<CloseIcon />
					</TouchableOpacity>
				</View>
				<Text style={ [styles.textCenterStyle, styles.bottomSheetTitleStyle] } variant='bodyLargeBold'>Are you sure wanna delete your account?</Text>
				<Text variant='bodyMiddleRegular'>If you have any questions regarding account deletion or require further assistance, please contact us at [Support Email Address].</Text>
				<View style={ styles.input }>
					<View style={ [styles.rowStyle] }>
						<Text variant='bodyMiddleRegular' style={ [styles.deleteDescriptionStyle, styles.orderedStyle] }>{ '\u2022' } </Text>
						<Text variant='bodyMiddleRegular' style={ [styles.deleteDescriptionStyle,  styles.shrinkTextStyle] }>Account deletion is a permanent action.</Text>
					</View>
					<View style={ [styles.rowStyle] }>
						<Text variant='bodyMiddleRegular' style={ [styles.deleteDescriptionStyle, styles.orderedStyle] }>{ '\u2022' } </Text>
						<Text variant='bodyMiddleRegular' style={ [styles.deleteDescriptionStyle, styles.shrinkTextStyle] }>We cannot recover your account or data once it is deleted.</Text>
					</View>
				</View>
				<TouchableOpacity style={ [styles.deleteButtonStyle, styles.actionButton] } onPress={ _onPressDeleteAccount }>
					{
						isLoadingDeleteAccount ? <ActivityIndicator color='white' size={ scaleHeight(20) } /> :
							<Text style={ styles.deleteLabelStyle } variant='bodyMiddleBold'>Yes, Sure</Text>
					}
				</TouchableOpacity>
			</View>
		)
	}, [_onPressDeleteAccount, isLoadingDeleteAccount])

	return (
		<Container>
			<Header title={ _getHeaderTitle } onPressBack={ _onPressBack } />
			{ _renderContent }
			<BottomSheet
				bsProps={ { onAnimate: _onAnimateBottomSheet, keyboardBlurBehavior: 'restore' } }
				bsRef={ bottomSheetRef }
				viewProps={ { style: styles.bottomSheetView } }
				pressBehavior={ isChangeEmail ? 'close' : 'none' }
			>
				{ _renderBottomSheetContent }
			</BottomSheet>
			<Modal visible={ visibleDeleteAccount } dismissable={ false } borderRadius={ 8 }>
				{ _renderModalDeleteAccount }
			</Modal>
		</Container>
	)
}

export default withCommon(React.memo(AccountInformation))
