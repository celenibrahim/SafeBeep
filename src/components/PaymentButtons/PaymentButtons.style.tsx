import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  sub_container: {
    flex: 0.12,
    margin: 5,
    height: Dimensions.get('screen').height / 22,
    width: Dimensions.get('screen').width / 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Dimensions.get('screen').width / 60,
  },
  methodButton: {
    flex: 1,
    padding: 10,
    height: Dimensions.get('screen').height / 13,
    margin: 3,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bt_text: {
    color: 'white',
    fontWeight: 'bold',
  },
  selectedMethodContainer: {
    alignItems: 'center',
  },
  selectedMethodText: {
    marginTop: 15,
    fontSize: 16,
    color: 'black',
  },
  container2: {
    flex: 1,
  },
  inputContainer: {
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  input: {
    width: Dimensions.get('window').width / 1.5,
    borderWidth: 1,
    fontSize: 24,
    margin: 10,
    borderRadius: 10,
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
  buttonContainer: {
    width: '70%',
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
  bot_top_buttons: {
    marginHorizontal: 2,
    marginVertical: 2,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkblue',
    width: Dimensions.get('window').width / 2.45,
  },
  modal_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal_inner_container: {
    backgroundColor: 'white',
    padding: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  modal_text: {
    color: 'black',
    fontSize: 20,
    fontStyle: 'italic',
  },
  modal_title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
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
