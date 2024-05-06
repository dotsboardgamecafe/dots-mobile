import { type StyleProp, type ViewStyle } from 'react-native'
import { type Games } from '../../models/games'

export interface CardGameProps {
  item: Games,
  onPress?: (game: Games) => void
  style?: StyleProp<ViewStyle>
}