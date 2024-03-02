import React from "react"
import { Games } from "../../models/games"
import { Image, View } from "react-native"
import RoundedBorder from "../rounded-border"
import { Text } from "react-native-paper"

import styles from "./styles"
import { useTranslation } from "react-i18next"

const DiscoverItem = (item: Games): React.ReactNode => {

  const { t } = useTranslation()

  const renderImage = (): React.ReactNode => {
    const image = <Image
      style={styles.image}
      source={{ uri: item.image_url }}
      resizeMode="cover"
    />

    if (item.is_popular) {
      return (
        <View>
          {image}

          <View style={styles.popularContainer}>
            <Text style={styles.popularTag}>{t('main-page.popular')}</Text>
          </View>
        </View>
      )
    }

    return image
  }

  return (
    <RoundedBorder radius={12} borderWidth={1}>
      {renderImage()}

      <Text style={styles.title}>{item.name}</Text>

      <Text style={styles.info}>{t('discover-page.slot')}: 3-5 {t('discover-page.person')}</Text>
      <Text style={styles.info}>{t('discover-page.level')}: {item.cafe_id}</Text>
      <Text style={styles.info}>{t('discover-page.duration')}: 20 {t('discover-page.minute')}</Text>

      <View style={styles.tagContainer}>
        <Text style={styles.gameTag}>{item.game_type}</Text>
      </View>
    </RoundedBorder>
  )
}

export default React.memo(DiscoverItem)