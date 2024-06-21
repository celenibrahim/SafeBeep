import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  optContainer: {flexDirection: 'row'},
  optButtons: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 3,
    height: Dimensions.get('screen').height / 14,
    width: Dimensions.get('screen').width / 2,
    borderWidth: 1,
    borderRadius: 8,
    margin: 5,
  },
  text_button: {
    fontWeight: 'bold',
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    margin: 2,
    borderWidth: 1,
    borderRadius: 10,
    width: Dimensions.get('window').width / 5,
    height: Dimensions.get('window').height / 11.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkblue',
  },
  del_button: {
    marginLeft: 10,
    borderWidth: 1,
    borderRadius: 10,
    width: Dimensions.get('window').width / 5,
    height: Dimensions.get('window').height / 11.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  del_button_text: {
    fontWeight: 'bold',
    color: 'black',
  },
  bot_top_buttons: {
    marginHorizontal: 2,
    marginVertical: 2,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkblue',
    width: Dimensions.get('window').width / 2.41,
  },
  buttonContainer: {
    width: '70%',
    flex: 1,
  },
  inputContainer: {
    flex: 0.37,
    borderWidth: 1,
    margin: 10,
  },
  result: {
    textAlign: 'center',
    borderRadius: 10,
    fontSize: 24,
    fontWeight: 'bold',
    borderWidth: 1,
    marginBottom: 10,
    width: Dimensions.get('window').width / 1.5,
  },
  prd_cont: {
    flex: 1,
    margin: 5,
    borderColor: 'black',
    borderWidth: 1,
  },
  total_text: {
    color: 'black',
  },
  cart_container: {
    flex: 1,
    margin: 5,
  },
  selected_item: {
    backgroundColor: '#e0e0e0',
  },
});
