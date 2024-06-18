import React, { useCallback, useEffect, useState } from 'react'
import { Eye, EyeSlash, type IconProps, Lock } from 'iconsax-react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'

import { scaleWidth } from '../../utils/pixel.ratio'
import Container from '../../components/container'
import TextInput from '../../components/text-input'
import ActionButton from '../../components/action-button'
import styles from './styles'
import Text from '../../components/text'
import { type NavigationProps } from '../../models/navigation'
import withCommon from '../../hoc/with-common'
import { Pressable, View } from 'react-native'
import Header from '../../components/header'
import { useUpdatePasswordMutation } from '../../store/user'
import Toast from 'react-native-toast-message'
import { type RulesType } from '../../models/validation'

type Props = NavigationProps<'login'>

type PasswordType = 'currentPassword' | 'newPassword' | 'confirmPassword'

type SubmitDataType = SubmitHandler<{ currentPassword: string; newPassword: string; confirmPassword: string }>

const initialVisiblePasswordValue = {
	currentPassword: false,
	newPassword: false,
	confirmPassword: false
}

const defaultPasswordRules = (field: string): RulesType => {
	return {
		required: {
			value: true,
			message: `${field} is required`
		},
		minLength: {
			value: 8,
			message: 'Password must be at least 8 characters long'
		}
	}
}

const EditPassword = ({ theme }: Props): React.ReactNode => {
	const [visiblePassword, setVisiblePassword] = useState(initialVisiblePasswordValue)
	const { control, formState, handleSubmit, getValues, reset } = useForm({
		defaultValues: {
			currentPassword: '',
			newPassword: '',
			confirmPassword: ''
		},
		mode: 'all',
		reValidateMode: 'onChange'
	})
	const [
		updatePassword,
		{
			isLoading: isLoadingUpdatePassword,
			isError: isErrorUpdatePassword,
			isSuccess: isSuccessUpdatePassword,
			error: errorUpdatePassword
		}
	] = useUpdatePasswordMutation()

	const _onSubmit: SubmitDataType = useCallback(async(data, event) => {
		updatePassword(data)
	}, [])

	const _passwordFieldFactory = useCallback((passwordType: PasswordType) => {
		const content = {
			currentPassword: {
				name: 'currentPassword',
				label: 'Current Password',
				rules: {
					...defaultPasswordRules('Current Password'),
					validate: () => {
						return undefined
					}
				},
				hintText: ''
			},
			newPassword: {
				name: 'newPassword',
				label: 'New Password',
				rules: {
					...defaultPasswordRules('New Password'),
					validate: (text:string) => {
						if (text === getValues('currentPassword')) return 'The new password must not match the current password'
					}
				},
				hintText: 'Password must be at least 8 characters long'
			},
			confirmPassword: {
				name: 'confirmPassword',
				label: 'Confirm New Password',
				rules: {
					...defaultPasswordRules('Confirm New Password'),
					validate: (text:string) => {
						if (text !== getValues('newPassword')) return 'The confirm password not match'
					}
				},
				hintText: 'Make sure your password matches the password above'
			},
		}

		return content[passwordType]
	}, [])

	const _getVisibleSuffix = useCallback((passwordType: PasswordType) => {
		const props: IconProps = {
			variant: 'Bold',
			size: scaleWidth(16),
			color: theme.colors.gray,
		}

		if (visiblePassword[passwordType]) return <Eye { ...props } />

		return <EyeSlash { ...props } />
	}, [visiblePassword])

	const _onPressVisiblePassword = useCallback((passwordType: PasswordType) => () => {
		setVisiblePassword({
			...visiblePassword,
			[passwordType]: !visiblePassword[passwordType]
		})
	}, [visiblePassword])

	useEffect(() => {
		if (isErrorUpdatePassword || isSuccessUpdatePassword) {
			const errorUpdate: any = errorUpdatePassword
			Toast.show({
				type: isErrorUpdatePassword ?  'error' : 'success',
				text1: isErrorUpdatePassword ? errorUpdate ? errorUpdate.data : 'Updated password failed' : 'Updated password successfully',
			})
			if (isSuccessUpdatePassword) reset()
		}
	}, [isErrorUpdatePassword, isSuccessUpdatePassword])
  
	const _renderPasswordFields = useCallback((passwordType: PasswordType) => {
		const content = _passwordFieldFactory(passwordType)
		return (
			<View style={ styles.fieldWrapperStyle }>
				<Text variant='bodyMiddleRegular' style={ styles.passwordLabel }>{ content.label }</Text>
				<Controller
					name={ passwordType }
					rules={ content.rules }
					control={ control }
					render={ ({ field: { onChange, value } }) => (
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
								<Pressable onPress={ _onPressVisiblePassword(passwordType) }>
									{ _getVisibleSuffix(passwordType) }
								</Pressable>
							}
							inputProps={ {
								placeholder: content.label,
								placeholderTextColor: theme.colors.gray,
								keyboardType: 'default',
								secureTextEntry: !visiblePassword[passwordType],
								value,
								onChangeText: onChange
							} }
							errors={ formState.errors[passwordType] }
						/>
					) }
				/>
				{
					!formState.errors[passwordType] ?
						<Text variant='bodyMiddleRegular' style={ [styles.passwordLabel, styles.hintTextStyle] }>
							{ content.hintText }
						</Text> : null
				}
			</View>
		)
	}, [visiblePassword, formState, _passwordFieldFactory])

	return (
		<Container>
			<Header title='Edit Password' />
			<KeyboardAwareScrollView
				contentContainerStyle={ styles.scrollView }
				showsVerticalScrollIndicator={ false }
				bounces={ false }
				enableOnAndroid
			>
				{ _renderPasswordFields('currentPassword') }
				{ _renderPasswordFields('newPassword') }
				{ _renderPasswordFields('confirmPassword') }
				<ActionButton
					style={ styles.actionButton }
					onPress={ handleSubmit(_onSubmit) }
					label={ 'Submit' }
					loading={ isLoadingUpdatePassword }
				/>
			</KeyboardAwareScrollView>
		</Container>
	)
}

export default withCommon(React.memo(EditPassword))