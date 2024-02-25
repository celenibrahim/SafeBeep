import {Dimensions, StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  section_info: {
    fontSize: 15,
    color: 'black',
    marginBottom: 10,
  },
  cartItemsContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  favoriteItemsContainer: {
    alignItems: 'center',
  },
  cartItem: {
    fontSize: 18,
    marginBottom: 5,
  },
  favoriteItem: {
    fontSize: 18,
    color: 'green',
    marginBottom: 5,
  },
  bottom_container: {
    backgroundColor: '#2669b1',
    borderRadius: 10,
    width: Dimensions.get('window').width / 1,
    height: Dimensions.get('window').height / 10,
  },
  bottom_inner: {
    justifyContent: 'center',
    flex: 1,
    borderBottomWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
  },
  bc_text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  bottom_button: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'white',
    alignItems: 'center',
    marginTop: 6,
    width: Dimensions.get('window').width / 3,
  },
});
