import React, { useCallback, useEffect } from 'react'
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

type Props = NavigationProps<'login'>

type FieldType = 'fullName' | 'phoneNumber'

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
		const content = {
			fullName: {
				label: 'Fullname',
				rules: {
					required: {
						value: true,
						message: 'This field required'
					}
				}
			},
			phoneNumber: {
				label: 'Phone Number',
				rules: {
					required: {
						value: true,
						message: 'This field required'
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

		return content[contentType]
	}, [])

	const _onSubmit = useCallback(async(data:any) => {
		await updateProfile({
			...userProfileData,
			fullname: data.fullName,
			phone_number: data.phoneNumber
		}).unwrap()
	}, [userProfileData])

	useEffect(() => {
		if (isSuccessGetUserProfile && userProfileData) {
			setValue('fullName', userProfileData.fullname, { shouldValidate: true })
			setValue('phoneNumber', userProfileData.phone_number, { shouldValidate: true })
		}
	}, [isSuccessGetUserProfile, userProfileData])

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
								inputProps={ {
									placeholder: content.label,
									placeholderTextColor: theme.colors.gray,
									value,
									onChangeText: contentName === 'fullName' ? onChange : text => {
										onChange(text.replace(/[A-Za-z]/g, ''))
									},
									keyboardType: contentName === 'phoneNumber' ? 'number-pad' : undefined
								} }
							/>
						)
					} }
				/>
				{
					formState.errors[contentName] ?
						<Text variant='bodyMiddleRegular'
							style={ [styles.passwordLabel, styles.hintTextStyle, styles.errorStyle] }>
							{ formState.errors[contentName]?.message }
						</Text> :
						null
				}
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