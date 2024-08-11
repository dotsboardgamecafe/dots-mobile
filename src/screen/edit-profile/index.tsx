import React, { useCallback, useEffect, useMemo } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Container from '../../components/container'
import TextInput from '../../components/text-input'
import ActionButton from '../../components/action-button'
import styles from './styles'
import Text from '../../components/text'
import { type NavigationProps } from '../../models/navigation'
import withCommon from '../../hoc/with-common'
import { View } from 'react-native'
import Header from '../../components/header'
import { Controller, useForm } from 'react-hook-form'
import { useGetUserProfileQuery, useUpdateProfileMutation } from '../../store/user'
import { ArrowDown2 } from 'iconsax-react-native'
import { scaleWidth } from '../../utils/pixel.ratio'
import Toast from 'react-native-toast-message'

type Props = NavigationProps<'login'>

type FieldType = 'fullName' | 'phoneNumber'

const fieldFactory = {
	fullName: {
		label: 'Fullname',
		rules: {
			required: {
				value: true,
				message: 'Fullname required'
			}
		},
	},
	phoneNumber: {
		label: 'Phone Number',
		rules: {
			required: {
				value: true,
				message: 'Phone number required'
			},
			minLength: {
				value: 9,
				message: 'Minimum 9 digit'
			},
			maxLength: {
				value: 13,
				message: 'Maximum 13 digit'
			}
		}
	},
}

const EditProfile = ({ theme, t, navigation }: Props): React.ReactNode => {
	const {
		data: userProfileData,
		isSuccess: isSuccessGetUserProfile
	} = useGetUserProfileQuery()
	const [
		updateProfile,
		{
			isLoading: isLoadingUpdateProfile
		}
	] = useUpdateProfileMutation()
	const { control, formState, handleSubmit, setValue,  } = useForm({
		defaultValues: {
			fullName: '',
			phoneNumber: ''
		},
		mode: 'all',
		reValidateMode: 'onChange'
	})

	const _fieldFactory = useCallback((contentType: FieldType) => {
		const content = fieldFactory

		return content[contentType]
	}, [])

	const _onSubmit = useCallback(async(data:any) => {
		try {
			await updateProfile({
				...userProfileData,
				fullname: data.fullName,
				phone_number: data.phoneNumber
			}).unwrap()
			Toast.show({
				type: 'success',
				text1: 'Update profile successfully'
			})
		} catch (error) {
			Toast.show({
				type: 'error',
				text1: 'Something went wrong'
			})
		}
	}, [userProfileData])

	useEffect(() => {
		if (isSuccessGetUserProfile && userProfileData) {
			setValue('fullName', userProfileData.fullname)
			setValue('phoneNumber', userProfileData.phone_number)
		}
	}, [isSuccessGetUserProfile, userProfileData])

	const phonePrefix = useMemo(() => {
		return (
			<View style={ { flexDirection: 'row', alignItems: 'center' } }>
				<Text variant='bodyMiddleRegular' style={ styles.countryCode }>+62</Text>
				<ArrowDown2
					color={ theme.colors.gray }
					size={ scaleWidth(0) }
					style={ styles.phonePrefixArrow }
				/>
			</View>
		)
	}, [])

	const _renderFields = useCallback((contentName: FieldType) => {
		const content = _fieldFactory(contentName)
		return (
			<View style={ styles.fieldWrapperStyle }>
				<Text variant='bodyMiddleRegular' style={ styles.passwordLabel }>{ content.label }</Text>
				<Controller
					rules={ content.rules }
					name={ contentName }
					control={ control }
					render={ ({ field: { onChange, value } }) => {
						return (
							<TextInput
								containerStyle={ styles.input }
								borderFocusColor={ theme.colors.blueAccent }
								prefix={ contentName === 'phoneNumber' ? phonePrefix : null }
								inputProps={ {
									placeholder: content.label,
									placeholderTextColor: theme.colors.gray,
									value,
									onChangeText: contentName === 'fullName' ? onChange : text => {
										onChange(text.replace(/[A-Za-z]/g, ''))
									},
									keyboardType: contentName === 'phoneNumber' ? 'number-pad' : undefined
								} }
								errors={ formState.errors[contentName] }
							/>
						)
					} }
				/>
			</View>
		)
	}, [formState])

	return (
		<Container>
			<Header title='Edit Profile' />
			<KeyboardAwareScrollView
				contentContainerStyle={ styles.scrollView }
				showsVerticalScrollIndicator={ false }
				bounces={ false }
				enableOnAndroid
			>
				{ _renderFields('fullName') }
				{ _renderFields('phoneNumber') }
				<ActionButton
					style={ styles.actionButton }
					onPress={ handleSubmit(_onSubmit) }
					label={ 'Update' }
					loading={ isLoadingUpdateProfile }
				/>
			</KeyboardAwareScrollView>
		</Container>
	)
}

export default withCommon(React.memo(EditProfile))