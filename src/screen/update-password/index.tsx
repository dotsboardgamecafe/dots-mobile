import React, { useMemo, useState } from 'react'
import { Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { type IconProps, Lock, Eye, EyeSlash } from 'iconsax-react-native'

import { LOGO } from '../../assets/images'
import ActionButton from '../../components/action-button'
import Container from '../../components/container'
import withCommon from '../../hoc/with-common'
import { type NavigationProps } from '../../models/navigation'
import createStyle from './styles'
import Text from '../../components/text'
import TextInput from '../../components/text-input'
import { scaleWidth } from '../../utils/pixel.ratio'

type Props = NavigationProps<'updatePassword'>

const UpdatePassword = ({ theme, t, navigation }: Props): React.ReactNode => {
	const styles = createStyle(theme)
	const [showPass, setShowPass] = useState(false)
	const [showConfimPass, setShowConfirmPass] = useState(false)
  
	const iconProps = useMemo<IconProps>(() => {
		return {
			variant: 'Bold',
			size: scaleWidth(16),
			color: theme.colors.gray,
		}
	}, [])

	const passPrefix = useMemo(() => (
		<Lock
			{ ...iconProps }
		/>
	), [iconProps])

	const passSuffix = useMemo(() => {
		const props = {
			...iconProps,
			onPress: () => { setShowPass(!showPass) }
		}

		if (showPass) return <Eye { ...props } />

		return <EyeSlash { ...props } />
	}, [showPass, iconProps])

	const confirmPassSuffix = useMemo(() => {
		const props = {
			...iconProps,
			onPress: () => { setShowConfirmPass(!showConfimPass) }
		}

		if (showPass) return <Eye { ...props } />

		return <EyeSlash { ...props } />
	}, [showConfimPass, iconProps])

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
					{ t('update-password-page.title') }
				</Text>
				<Text variant='bodyMiddleRegular' style={ styles.desc }>
					{ t('update-password-page.desc') }
				</Text>

				<Text variant='bodyMiddleMedium' style={ styles.nameLabel }>
					{ t('login-page.password-label') }
				</Text>
				<TextInput
					containerStyle={ styles.mt8 }
					borderFocusColor={ theme.colors.blueAccent }
					inputProps={ {
						placeholder: t('login-page.password-hint'),
						placeholderTextColor: theme.colors.gray,
					} }
					prefix={ passPrefix }
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
					prefix={ passPrefix }
					suffix={ confirmPassSuffix }
				/>
				<Text variant='bodyMiddleRegular' style={ styles.inputInfo }>
					{ t('register-page.confirm-password-info') }
				</Text>

				<ActionButton
					style={ styles.actionButton }
					onPress={ navigation.goBack }
					label={ t('update-password-page.submit') }
				/>
			</KeyboardAwareScrollView>

		</Container>
	)
}

export default withCommon(React.memo(UpdatePassword))