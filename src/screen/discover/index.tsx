import React, { useState } from "react"

import Container from "../../components/container"
import { Games } from "../../models/games"
import DiscoverItem from "../../components/discover-item"
import { FlatList, View } from "react-native"
import { TextInput, useTheme } from "react-native-paper"
import { SearchNormal } from "iconsax-react-native"
import { scaleHeight, scaleWidth } from "../../utils/pixel.ratio"
import { ThemeType } from "../../models/theme"

const Discover = (): React.ReactNode => {
  const { colors } = useTheme<ThemeType>()
  const [search, setSearch] = useState('')

  return (
    <Container contentStyle={{
      paddingVertical: scaleHeight(10),
      paddingHorizontal: scaleWidth(10)
    }}>
      <TextInput
        placeholder="Search for a game..."
        mode="outlined"
        theme={{ roundness: 14 }}
        outlineColor={colors.background}
        style={{
          height: scaleHeight(48),
          paddingHorizontal: 2,
          backgroundColor: colors.surface,
        }}
        value={search}
        onChangeText={setSearch}
        left={<SearchNormal size={scaleWidth(16)} color={colors.gray} />}
        right={<SearchNormal size={scaleWidth(16)} color={'red'} />}
      />

      <FlatList
        data={dummyData}
        keyExtractor={item => item.game_code}
        renderItem={({ item }) => <DiscoverItem {...item} />}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}

        style={{ marginTop: scaleHeight(10) }}
        columnWrapperStyle={{ gap: scaleWidth(10) }}
        contentContainerStyle={{ paddingBottom: scaleHeight(72) }}

        numColumns={2}
      />
    </Container>
  )
}

const dummyData: Array<Games> = Array.from({ length: 100 }, (_, i) => ({
  game_code: `CODE-${i + 1}`,
  game_type: 'War Game',
  cafe_id: 1,
  name: `Rising Game ${i + 1}`,
  image_url: 'https://picsum.photos/seed/picsum/200',
  description: '',
  collection_url: '',
  status: 'ok',
  created_date: '01-01-2024',
  is_popular: i < 4
}))

export default React.memo(Discover)