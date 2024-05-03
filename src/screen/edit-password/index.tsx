import React, { useCallback, useState } from 'react'
import { Eye, EyeSlash, type IconProps, Lock } from 'iconsax-react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { scaleWidth } from '../../utils/pixel.ratio'
import Container from '../../components/container'
import TextInput from '../../components/text-input'
import useStorage from '../../hooks/useStorage'
import ActionButton from '../../components/action-button'
import styles from './styles'
import Text from '../../components/text'
import { type NavigationProps } from '../../models/navigation'
import withCommon from '../../hoc/with-common'
import { Pressable, View } from 'react-native'
import Header from '../../components/header'

type Props = NavigationProps<'login'>

type PasswordType = 'currentPassword' | 'newPassword' | 'confirmPassword'

const initialVisiblePasswordValue = {
	currentPassword: false,
	newPassword: false,
	confirmPassword: false
}

const EditPassword = ({ theme, t, navigation }: Props): React.ReactNode => {
	const { onSetLogin } = useStorage()
	const [visiblePassword, setVisiblePassword] = useState(initialVisiblePasswordValue)

	const _newConfirmPasswordFactory = useCallback((passwordType: PasswordType) => {
		const content = {
			currentPassword: {
				label: 'Current Password'
			},
			newPassword: {
				label: 'New Password'
			},
			confirmPassword: {
				label: 'Confirm New Password'
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
  
	const _renderPasswordFields = useCallback((passwordType: PasswordType) => {
		const content = _newConfirmPasswordFactory(passwordType)
		return (
			<View style={ styles.fieldWrapperStyle }>
				<Text variant='bodyMiddleRegular' style={ styles.passwordLabel }>{ content.label }</Text>
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
						secureTextEntry: !visiblePassword[passwordType]
					} }
				/>
				{
					passwordType !== 'currentPassword' ?
						<Text variant='bodyMiddleRegular' style={ [styles.passwordLabel, styles.hintTextStyle] }>Password must be at least 8 characters long</Text> :
						null
				}
			</View>
		)
	}, [visiblePassword])

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
					onPress={ onSetLogin }
					label={ 'Submit' }
				/>
			</KeyboardAwareScrollView>
		</Container>
	)
}

export default withCommon(React.memo(EditPassword))