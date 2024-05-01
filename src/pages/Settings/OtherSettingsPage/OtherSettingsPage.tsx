import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import Button from '../../../components/Button';

const OtherSettingsPage = () => {
  console.log(typeof Intl !== 'undefined');

  const {i18n} = useTranslation();

  const changeLanguage = () => {
    if (i18n.language === 'en') {
      i18n.changeLanguage('tr');
    } else {
      i18n.changeLanguage('en');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.languageContainer}>
        <Button text="Change Language TR / EN" onPress={changeLanguage} />
      </View>
    </View>
  );
};

export default OtherSettingsPage;

const styles = StyleSheet.create({
  container: {flex: 1},
  languageContainer: {
    width: Dimensions.get('screen').width / 1,
    height: Dimensions.get('screen').height / 15,
    borderWidth: 1,
  },
});
