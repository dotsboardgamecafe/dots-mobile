import React from 'react'
import GiDominoTiles from '../../assets/svg/GiDominoTiles.svg'
import { type GameType, type Games } from '../../models/games'
import { scaleHeight, scaleWidth } from '../../utils/pixel.ratio'

export const games: Games[] = Array.from({ length: 30 }, (_, i) => ({
	game_code: `CODE-${i + 1}`,
	game_type: 'War Game',
	cafe_id: 1,
	name: `Rising Game ${i + 1}`,
	image_url: 'https://cf.geekdo-images.com/dT1vJbUizZFmJAphKg-byA__opengraph/img/Y6XRS8qo8oR5g7p_PUAz8qqjIY4=/0x447:960x951/fit-in/1200x630/filters:strip_icc()/pic7720813.png',
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