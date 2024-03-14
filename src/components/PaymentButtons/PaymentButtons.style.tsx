import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  sub_container: {
    flex: 0.07,
    margin: 2,
    height: Dimensions.get('screen').height / 22,
    width: Dimensions.get('screen').width / 1.01,
    flexDirection: 'row',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Dimensions.get('screen').width / 60,
  },
  methodButton: {
    flex: 1,
    padding: 10,
    width: Dimensions.get('screen').width / 3.3,
    height: Dimensions.get('screen').height / 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    marginLeft: 5,
    alignItems: 'center',
  },
  bt_text: {
    color: 'white',
    fontWeight: 'bold',
  },
  selectedMethodContainer: {
    alignItems: 'center',
  },
  selectedMethodText: {
    fontSize: 16,
    color: 'black',
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: 'red',
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'orange',
    borderWidth: 1,
    fontSize: 24,
    marginBottom: 10,
  },
  result: {
    textAlign: 'center',
    backgroundColor: 'blue',
    borderRadius: 15,
    fontSize: 32,
    fontWeight: 'bold',
    borderWidth: 1,
    width: Dimensions.get('window').width / 1.5,
    height: Dimensions.get('window').height / 18,
  },
  buttonContainer: {
    backgroundColor: 'gray',
    width: '70%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderWidth: 1,
    width: Dimensions.get('window').width / 5,
    height: Dimensions.get('window').height / 11.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
});
