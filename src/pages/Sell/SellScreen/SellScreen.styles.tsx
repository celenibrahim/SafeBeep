import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  button_container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: Dimensions.get('window').height / 10,
    width: Dimensions.get('window').width,
  },
  offOnlineContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    bottom: 0,
    right: 0,
  },
});
