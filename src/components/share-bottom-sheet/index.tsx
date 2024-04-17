import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import {
	Facebook, Instagram, Link, Whatsapp, Xrp
} from 'iconsax-react-native'

import BottomSheet from '../bottom-sheet'
import { type ShareBottomSheetProps } from './type'
import Text from '../text'
import { scaleHorizontal, scaleWidth } from '../../utils/pixel.ratio'
import { useTheme } from 'react-native-paper'
import { type ThemeType } from '../../models/theme'
import createStyle from './styles'

const ShareBottomSheet = ({ sRef, onShare }: ShareBottomSheetProps): React.ReactNode => {
	const theme = useTheme<ThemeType>()
	const styles = createStyle(theme)

	return (
		<BottomSheet
			bsRef={ sRef }
			viewProps={ { style: styles.bottomSheetView } }
		>
			<Text variant='bodyDoubleExtraLargeBold'>Share to</Text>
			<View style={ [styles.row, styles.mt24] }
			>
				<TouchableOpacity
					style={ styles.item }
					onPress={ () => { onShare('ig') } }
				>
					<Instagram size={ scaleWidth(42) } variant='Bold' color={ theme.colors.onBackground } />
					<Text variant='bodyLargeRegular'>Instagram</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={ styles.item }
					onPress={ () => { onShare('wa') } }
				>
					<Whatsapp size={ scaleWidth(42) } variant='Bold' color={ theme.colors.onBackground } />
					<Text variant='bodyLargeRegular'>Whatsapp</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={ styles.item }
					onPress={ () => { onShare('fb') } }
				>
					<Facebook size={ scaleWidth(42) } variant='Bold' color={ theme.colors.onBackground } />
					<Text variant='bodyLargeRegular'>Facebook</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={ styles.item }
					onPress={ () => { onShare('x') } }
				>
					<Xrp size={ scaleWidth(42) } variant='Bold' color={ theme.colors.onBackground } />
					<Text variant='bodyLargeRegular'>Twitter</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity
				style={ styles.copy }
				onPress={ () => { onShare('copy') } }
			>
				<View style={ [styles.row, { justifyContent: 'center' }] }>
					<Link size={ scaleWidth(24) } variant='Linear' color={ theme.colors.onBackground } style={ { marginEnd: scaleHorizontal(8) } } />
					<Text variant='bodyLargeBold'>Copy link</Text>
				</View>
			</TouchableOpacity>
		</BottomSheet>
	)
}

export default React.memo(ShareBottomSheet)