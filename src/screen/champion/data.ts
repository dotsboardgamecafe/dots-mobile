import { type MostVP } from '../../models/champions'
import { type Games } from '../../models/games'
import { type Users } from '../../models/users'

export const mostVps: MostVP[] = Array.from({ length: 100 }, (_, i) => ({
	rank: i + 1,
	name: `VP Player ${i + 1}`,
	photo: 'https://picsum.photos/32',
	vp: 10_000 - (i * 100)
}))

export interface HOFType {
	game: Games,
	player: Users,
	location: string
}

export const hofData: HOFType[] = Array.from({ length: 100 }, (_, i) => ({
	game: {
		game_code: `CODE-${i + 1}`,
		game_type: 'War Game',
		cafe_id: 1,
		name: `Rising Game ${i + 1}`,
		image_url: 'https://picsum.photos/124',
		description: '',
		collection_url: '',
		status: 'ok',
		created_date: '01-01-2024',
		is_popular: i < 4
	},
	player: {
		user_code: `P${i + 1}`,
		fullname: `Player ${i + 1}`,
		image_url: 'https://picsum.photos/16'
	},
	location: 'Jakarta'
}))