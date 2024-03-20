import React, { useCallback, useMemo, useRef, useState } from "react"
import { Text, useTheme } from "react-native-paper"
import { FlatList, View } from "react-native"
import { ArrowDown2, SearchNormal, Setting4 } from "iconsax-react-native"
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
import { useTranslation } from "react-i18next"

import Container from "../../components/container"
import FilterItem from "../../components/filter-item"
import DiscoverItem from "../../components/discover-item"
import TextInput from "../../components/text-input"
import { Games } from "../../models/games"
import { scaleHeight, scaleWidth } from "../../utils/pixel.ratio"
import { ThemeType } from "../../models/theme"
import { createStyle } from "./styles"
import { useKeyboardShown } from "../../utils/keyboard"
import { FilterItemType } from "../../components/filter-item/type"
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"

const Discover = (): React.ReactNode => {
  const theme = useTheme<ThemeType>()
  const styles = useMemo(() => createStyle(theme), [theme])
  const tabBarHeight = useBottomTabBarHeight()
  const isKeyboardShown = useKeyboardShown()
  const [search, setSearch] = useState('')
  const { t } = useTranslation()
  const bottomSheetRef = useRef<BottomSheet>(null)

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, [])

  const arrowDown = <ArrowDown2
    variant="Linear"
    color={theme.colors.onBackground}
    size={14}
    style={{ marginStart: 4 }}
  />
  const filters: FilterItemType[] = [
    { label: t('discover-page.filter-game-type'), suffix: arrowDown },
    { label: t('discover-page.filter-game-mechanics'), suffix: arrowDown },
    { label: t('discover-page.filter-game-location'), suffix: arrowDown },
    { label: 'duration', suffix: arrowDown },
  ]

  return (
    <Container>
      <TextInput
        containerStyle={{
          marginHorizontal: scaleWidth(10),
          marginTop: scaleHeight(16),
        }}
        prefix={<SearchNormal size={scaleWidth(16)} color={theme.colors.gray} />}
        inputProps={{
          placeholder: t('discover-page.search-game'),
          placeholderTextColor: theme.colors.gray,
          enterKeyHint: "search",
          value: search,
          onChangeText: setSearch
        }}
      />

      <View style={styles.filterContainer}>
        <FilterItem
          label={t('discover-page.filter-game')}
          prefix={
            <Setting4
              size={scaleWidth(14)}
              variant="Linear"
              color={theme.colors.onBackground}
              style={{ marginEnd: 4 }}
            />
          }
          onPress={() => bottomSheetRef.current?.snapToIndex(0)}
        />

        <FlatList
          horizontal
          data={filters}
          renderItem={({ item }) => <FilterItem {...item} />}
          ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />
      </View>

      <FlatList
        data={dummyData}
        keyExtractor={item => item.game_code}
        renderItem={({ item }) => <DiscoverItem {...item} />}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}

        style={styles.list}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={{ paddingBottom: isKeyboardShown ? 10 : tabBarHeight }}

        numColumns={2}
      />

      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        index={-1}
        enablePanDownToClose
        enableDynamicSizing
      >
        <BottomSheetView style={{ height: 200 }}>
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheet>
    </Container>
  )
}

const dummyData: Array<Games> = Array.from({ length: 30 }, (_, i) => ({
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

export default React.memo(Discover)