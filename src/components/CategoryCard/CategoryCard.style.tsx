import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  inner_container: {
    height: Dimensions.get('screen').height / 5,
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 2,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 0.5,
  },
  image: {
    width: Dimensions.get('screen').width / 2.07,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: 'column',
    flex: 2,
  },
  text: {
    margin: 5,
    color: 'black',
    fontSize: 20,
  },
});
