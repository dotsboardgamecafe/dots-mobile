import React from 'react'
import Domino from '../../assets/svg/games/domino'
import { type GameType, type Games } from '../../models/games'
import { scaleWidth } from '../../utils/pixel.ratio'

export const games: Games[] = Array.from({ length: 30 }, (_, i) => ({
	game_code: `CODE-${i + 1}`,
	game_type: 'War Game',
	cafe_id: 1,
	name: `Rising Game ${i + 1}`,
	image_url: 'https://picsum.photos/200',
	description: '',
	collection_url: '',
	status: 'ok',
	created_date: '01-01-2024',
	is_popular: i < 4
}))

export const gameTypes: GameType[] = [
	{
		id: 0,
		name: 'Board Game',
		icon: <Domino size={ scaleWidth(17) } />
	},
	{
		id: 1,
		name: 'Cards',
		icon: <Domino size={ scaleWidth(17) } />
	},
	{
		id: 2,
		name: 'Party',
		icon: <Domino size={ scaleWidth(17) } />
	},
	{
		id: 3,
		name: 'Party',
		icon: <Domino size={ scaleWidth(17) } />
	},
	{
		id: 4,
		name: 'Party',
		icon: <Domino size={ scaleWidth(17) } />
	},
]