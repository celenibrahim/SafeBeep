import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logo_container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    marginTop: Dimensions.get('screen').height / 10,
    marginBottom: Dimensions.get('screen').height / 10,
    width: Dimensions.get('screen').width / 1.7,
    height: Dimensions.get('screen').height / 3.7,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  offOnlineContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});
