import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Danger } from 'iconsax-react-native'
import Text from '../text'
import { scaleHeight, scaleWidth } from '../../utils/pixel.ratio'
import ActionButton from '../action-button'
import { useTranslation } from 'react-i18next'

interface ReloadViewProps {
  onRefetch: () => void
}

const ReloadView = ({ onRefetch }: ReloadViewProps): React.ReactNode => {

	const { t } = useTranslation()

	return (
		<View style={ styles.containerStyle }>
			<Danger size={ scaleWidth(48) } color='black' />
			<Text style={ styles.titleStyle } variant='bodyExtraLargeBold'>
				{ t('components.reload-view.title') }
			</Text>
			<Text style={ styles.descriptionStyle } variant='bodySmallRegular'>
				{ t('components.reload-view.description') }
			</Text>
			<ActionButton onPress={ onRefetch } label='Reload' style={ styles.buttonStyle } />
		</View>
	)
}

const styles = StyleSheet.create({
	containerStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	titleStyle: {
		textAlign: 'center',
		marginTop: scaleHeight(8)
	},
	buttonStyle: {
		marginTop: scaleHeight(8),
		width: scaleWidth(250),
		alignSelf: 'center',
	},
	descriptionStyle: {
		marginTop: scaleHeight(8),
		textAlign: 'center',
	},
})

export default ReloadView