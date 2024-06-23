import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import OffOnline from '../../../components/OffOnLine';

const OtherSettingsPage = () => {
  const {t, i18n} = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const changeLanguage = (
    language: React.SetStateAction<any> | undefined,
  ): any => {
    i18n.changeLanguage(language);
    setSelectedLanguage(language);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('slct.lng')}</Text>
      <View style={styles.languageContainer}>
        <TouchableOpacity
          style={[
            styles.languageButton,
            selectedLanguage === 'en' && styles.selectedLanguageButton,
          ]}
          onPress={() => changeLanguage('en')}>
          <Text style={styles.languageButtonText}>{t('en')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.languageButton,
            selectedLanguage === 'tr' && styles.selectedLanguageButton,
          ]}
          onPress={() => changeLanguage('tr')}>
          <Text style={styles.languageButtonText}>{t('tr')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.offOnlineContainer}>
        <OffOnline />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center'},
  languageContainer: {
    margin: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
  },
  languageButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  selectedLanguageButton: {
    backgroundColor: 'blue',
  },
  languageButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
    color: 'black',
  },
  offOnlineContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default OtherSettingsPage;
