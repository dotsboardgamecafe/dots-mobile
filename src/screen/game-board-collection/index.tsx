import { View, FlatList, Image } from 'react-native'
import React, { useCallback } from 'react'
import Container from '../../components/container'
import Header from '../../components/header'
import { formatGridData } from '../../utils/format-grid'
import { rackIllu } from '../../assets/images'
import styles from './styles'
import withCommon from '../../hoc/with-common'
import { type NavigationProps } from '../../models/navigation'

type Props = NavigationProps<'gameBoardCollection'>

const listGame = [
	'https://cf.geekdo-images.com/iwevA6XmiNLHn1QnGUucqw__itemrep/img/QC2OAbicZssRpGJkUmp0Zbto-cs=/fit-in/246x300/filters:strip_icc()/pic3880340.jpg',
	'https://cf.geekdo-images.com/Nnzu4eqkUoGybbziFGPI6g__itemrep/img/iGanwQiMDaXz5AiNdf2ynDFHVXA=/fit-in/246x300/filters:strip_icc()/pic5212377.png',
	'https://cf.geekdo-images.com/XNbpOGwHR2PkoZ3TiIfxaw__itemrep/img/07N0xOAF1zoCpbPtUYlmzYrYe9I=/fit-in/246x300/filters:strip_icc()/pic7545827.png',
	'https://cf.geekdo-images.com/A_XP2_VN3ugyqPhezowB_w__itemrep/img/wGng6fVAYRI5NKBX6x-pksZKJGI=/fit-in/246x300/filters:strip_icc()/pic8026369.png',
	'https://cf.geekdo-images.com/JUrmY8GgFPQlENiPT7BGZw__itemrep/img/3ttYjcoLikqMvCeaX3iyc71YubI=/fit-in/246x300/filters:strip_icc()/pic6884563.jpg',
	'https://cf.geekdo-images.com/rNOQrjNmhTaBmaAyZah8cA__itemrep/img/NWYapPlzxEttTgRE9NE58ryZMd8=/fit-in/246x300/filters:strip_icc()/pic8115796.jpg',
	'https://cf.geekdo-images.com/oI8jrUmwBtlWyCiIuYH6YQ__itemrep/img/zTojsO6Ou7Si2iUOffU6eDGl7pY=/fit-in/246x300/filters:strip_icc()/pic8107311.jpg',
]

const GameBoardCollection = ({ t }: Props): React.ReactNode => {

	const _renderListGame = useCallback(() => {
		const { numColumns, resultData } = formatGridData(listGame)

		return (
			<FlatList
				style={ styles.listGameWrapperStyle }
				data={ resultData }
				renderItem={ ({ item }) => {
					if (item) return <Image source={ { uri: item } } style={ styles.boardGameItemStyle } />

					return <View style={ styles.boardGameItemStyle }/>
				} }
				keyExtractor={ (_, index) => index.toString() as any }
				numColumns={ numColumns }
				scrollEnabled={ false }
				contentContainerStyle={ [styles.justifyCenterStyle, styles.rowCenterStyle] }
				columnWrapperStyle={ styles.justifyCenterStyle }
				ItemSeparatorComponent={ () => <Image resizeMode='contain' source={ rackIllu } style={ styles.boardGameItemSeparatorStyle } /> }
				ListFooterComponent={ () => <Image resizeMode='contain' source={ rackIllu } style={ styles.boardGameItemSeparatorStyle } />  }
				removeClippedSubviews
			/>
		)
	}, [])

	return (
		<Container>
			<Header title={ t('game-collection-page.header-title') } />
			{ _renderListGame() }
		</Container>
	)
}

export default withCommon(React.memo(GameBoardCollection))