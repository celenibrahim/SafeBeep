import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 10,
    margin: 2,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  inner_container: {
    alignItems: 'center',
  },
  info_container: {
    flex: 1,
    flexDirection: 'row',
  },
  button_container: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  price: {
    fontSize: 20,
    fontStyle: 'italic',
  },
});
