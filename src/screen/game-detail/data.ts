import { type GameMaster } from '../../models/games'

export const avatars = ['https://picsum.photos/24', 'https://picsum.photos/24', 'https://picsum.photos/24']

export const gamePlays = ['https://picsum.photos/240', 'https://picsum.photos/240', 'https://picsum.photos/240']

export const rooms = ['https://picsum.photos/360/140', 'https://picsum.photos/360/140']

export const gameMasters: GameMaster[] = Array.from({ length: 4 }, (_, i) => ({
	id: i,
	name: `Master ${i + 1}`,
	photo: 'https://picsum.photos/64'
}))