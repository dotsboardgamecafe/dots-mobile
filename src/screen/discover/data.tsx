import React from 'react'
import GiDominoTiles from '../../assets/svg/GiDominoTiles.svg'
import { type GameType, type Games } from '../../models/games'
import { scaleHeight, scaleWidth } from '../../utils/pixel.ratio'

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
		icon: <GiDominoTiles width={ scaleWidth(17) } height={ scaleHeight(17) } />
	},
	{
		id: 1,
		name: 'Cards',
		icon: <GiDominoTiles width={ scaleWidth(17) } height={ scaleHeight(17) }/>
	},
	{
		id: 2,
		name: 'Party',
		icon: <GiDominoTiles width={ scaleWidth(17) } height={ scaleHeight(17) } />
	},
	{
		id: 3,
		name: 'Party',
		icon: <GiDominoTiles width={ scaleWidth(17) } height={ scaleHeight(17) } />
	},
	{
		id: 4,
		name: 'Party',
		icon: <GiDominoTiles width={ scaleWidth(17) } height={ scaleHeight(17) }/>
	},
]