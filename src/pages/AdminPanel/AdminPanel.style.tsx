import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  text: {
    fontWeight: 'bold',
    color: 'black',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalContent: {
    alignItems: 'center',
  },
  modalText: {
    color: 'black',
    fontSize: 18,
    margin: 2,
  },
  modalTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  userItem: {
    marginVertical: 5,
  },
  label: {
    marginLeft: 15,
    fontWeight: 'bold',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    margin: 10,
  },
});
