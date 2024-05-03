import React, {useState} from 'react';
import {
  View,
  Button,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {useTranslation} from 'react-i18next';
const SortButton = ({
  iconUrl,
  onpress,
  onpressB,
  onpressC,
  onPressD,
  onPressE,
}: any) => {
  const {t}: any = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={openModal}>
        <Image style={styles.icon} source={iconUrl} />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.container}>
          <View style={styles.inner_container}>
            <Text style={styles.title}>{t('opt.sort')}:</Text>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity onPress={onpress}>
                <Text style={styles.text}>{t('sort.asc')}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onpressB}>
                <Text style={styles.text}>{t('sort.des')}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onpressC}>
                <Text style={styles.text}>{t('sort.alp')}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onPressD}>
                <Text style={styles.text}>{t('fav')}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onPressE}>
                <Text style={styles.text}>{t('reset')}</Text>
              </TouchableOpacity>
            </View>
            <Button title={t('close')} onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SortButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner_container: {
    backgroundColor: 'white',
    padding: 20,
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontStyle: 'italic',
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    width: Dimensions.get('screen').width / 8,
    height: Dimensions.get('window').height / 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 30,
    margin: 1,
  },
});
