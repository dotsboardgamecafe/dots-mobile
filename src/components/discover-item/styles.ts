import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  image: {
    borderRadius: 11,
    width: '100%',
    aspectRatio: 1
  },

  popularContainer: {
    position: 'absolute',
    bottom: 10,
    start: 12,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 8
  },

  popularTag: {
    fontWeight: 'bold',
    color: 'red',
    fontSize: 10
  },

  title: {
    fontWeight: 'bold',
    marginTop: 8
  },

  info: {
    fontWeight: 'normal',
    fontSize: 12,
  },

  tagContainer: {
    alignSelf: 'flex-start',
    backgroundColor: 'blue',
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginTop: 8
  },

  gameTag: {
    fontWeight: 'bold',
    color: 'white',
  },

})

export default styles