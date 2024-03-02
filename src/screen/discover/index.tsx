import React from "react"
import Container from "../../components/container"
import { Games } from "../../models/games"
import DiscoverItem from "../../components/discover-item"
import { FlatList, View } from "react-native"

const Discover = (): React.ReactNode => {
  return (
    <Container contentStyle={{}}>
      <FlatList
        data={dummyData}
        keyExtractor={item => item.game_code}
        renderItem={({ item }) => <DiscoverItem {...item} />}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}

        columnWrapperStyle={{ gap: 10 }}
        contentContainerStyle={{ margin: 10, paddingBottom: 72 }}

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