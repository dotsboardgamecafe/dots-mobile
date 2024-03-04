import { StyleSheet } from "react-native";
import { scaleHeight } from "../../utils/pixel.ratio";

const styles = StyleSheet.create({
  itemContainer: {
    height: scaleHeight(64),
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: scaleHeight(4)
  },

  label: {
    fontWeight: 'normal'
  },

  labelFocus: {
    fontWeight: 'bold'
  },
})

export default styles