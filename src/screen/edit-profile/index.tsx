import React, { useCallback } from 'react'
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

type Props = NavigationProps<'login'>

type FieldType = 'userName' | 'fullName' | 'phoneNumber'

const EditProfile = ({ theme, t, navigation }: Props): React.ReactNode => {

	const { control, formState, handleSubmit } = useForm({
		defaultValues: {
			userName: '',
			fullName: '',
			phoneNumber: ''
		},
		mode: 'all'
	})

	const _fieldFactory = useCallback((contentType: FieldType) => {
		const content = {
			userName: {
				label: 'Username',
				rules: {

				}
			},
			fullName: {
				label: 'Fullname'
			},
			phoneNumber: {
				label: 'Phone Number'
			},
		}

		return content[contentType]
	}, [])

	const _onSubmit = useCallback((data:any) => {
		console.log(data)
	}, [])

	const _renderFields = useCallback((contentName: FieldType) => {
		const content = _fieldFactory(contentName)
		return (
			<View style={ styles.fieldWrapperStyle }>
				<Text variant='bodyMiddleRegular' style={ styles.passwordLabel }>{ content.label }</Text>
				<Controller
					rules={ {
						required: true,
					} }
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
									onChangeText: onChange
								} }
							/>
						)
					} }
				/>
				{
					formState.errors[contentName] ?
						<Text variant='bodyMiddleRegular'
							style={ [styles.passwordLabel, styles.hintTextStyle, styles.errorStyle] }>
							This field required
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
				{ _renderFields('userName') }
				{ _renderFields('fullName') }
				{ _renderFields('phoneNumber') }
				<ActionButton
					style={ styles.actionButton }
					onPress={ handleSubmit(_onSubmit) }
					label={ 'Update' }
				/>
			</KeyboardAwareScrollView>
		</Container>
	)
}

export default withCommon(React.memo(EditProfile))