import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 5,
    margin: 2,
    borderWidth: 1,
    width: Dimensions.get('window').width / 1,
    height: Dimensions.get('window').height / 6,
  },
  inner_container: {
    backgroundColor: '#d6dadb',
    alignItems: 'center',
  },
  info_container: {
    flexDirection: 'row',
  },
  title: {
    color: 'black',
    fontSize: 20,
  },
  price: {
    color: 'black',
    fontSize: 20,
    fontStyle: 'italic',
  },
  piece: {
    color: 'black',
    fontSize: 15,
  },
  button_pm: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
