import { type Games } from '../../models/games'

export interface CardGameProps {
  item: Games,
  onPress?: (game: Games) => void | undefined
}