import { StyleSheet } from "react-native";
import { ThemeType } from "../../models/theme";
import { scaleHeight, scaleWidth } from "../../utils/pixel.ratio";

export const createStyle = ({ colors }: ThemeType) => StyleSheet.create({
  searchContainer: {
    marginHorizontal: scaleWidth(10),
    marginTop: scaleHeight(16),
  },

  search: {
    flex: 1,
    marginStart: scaleWidth(4),
    borderWidth: 0,
    color: colors.onBackground,
    fontFamily: 'FuturaPTBook'
  },

  filterContainer: {
    marginStart: scaleWidth(10),
    marginTop: scaleHeight(16),
    flexDirection: 'row'
  },

  list: {
    marginHorizontal: scaleWidth(10),
    marginTop: scaleHeight(10)
  },

  columnWrapper: {
    gap: scaleWidth(10)
  }
})