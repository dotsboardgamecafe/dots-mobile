import { View, FlatList } from 'react-native'
import React, { useCallback, useMemo } from 'react'
import Container from '../../components/container'
import Header from '../../components/header'
import { formatGridData } from '../../utils/format-grid'
import { rackIllu } from '../../assets/images'
import styles from './styles'
import withCommon from '../../hoc/with-common'
import { type NavigationProps } from '../../models/navigation'
import { useGetGameBoardCollectionQuery } from '../../store/game-board-collection'
import useStorage from '../../hooks/useStorage'
import Loading from '../../components/loading'
import ReloadView from '../../components/reload-view'
import { type GameBoardCollection as GameBoarCollectionType } from '../../models/game-board-collection'
import Image from '../../components/image'

type Props = NavigationProps<'gameBoardCollection'>

const GameBoardCollection = ({ t }: Props): React.ReactNode => {
	const { user } = useStorage()
	const {
		data: gameBoardCollectionData,
		isLoading: isLoadingGameBoardCollection,
		refetch: refetchGameBoardCollection,
		isError: isErrorGameBoardCollection
	} = useGetGameBoardCollectionQuery(user?.user_code)

	const _isLoading = useMemo(() => {
		const isLoading = isLoadingGameBoardCollection
		return isLoading
	}, [isLoadingGameBoardCollection])

	const _isError = useMemo(() => {
		const isError = isErrorGameBoardCollection
		return isError
	}, [isErrorGameBoardCollection])

	const _onRefresh = useCallback(() => {
		refetchGameBoardCollection()
	}, [])

	const _renderListGame = useCallback(() => {
		const { numColumns, resultData } = formatGridData<GameBoarCollectionType>(gameBoardCollectionData ?? [])

		if (_isError) return <ReloadView onRefetch={ _onRefresh } />

		return (
			<FlatList
				style={ styles.listGameWrapperStyle }
				data={ resultData }
				renderItem={ ({ item }) => {
					if (item) return <Image source={ { uri: item.game_image_url } } style={ styles.boardGameItemStyle } />

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
	}, [_isError, gameBoardCollectionData])

	return (
		<Container>
			<Header title={ t('game-collection-page.header-title') } />
			{ _renderListGame() }
			<Loading isLoading={ _isLoading } />
		</Container>
	)
}

export default withCommon(React.memo(GameBoardCollection))