import React from 'react';
import SettingsButton from '../../../components/SettingsButtons';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
const Settings = ({navigation}: any) => {
  function gotoOS() {
    navigation.navigate('OtherSettingsPage');
  }
  return (
    <View style={{flex: 1}}>
      <View style={styles.title_container}>
        <Text style={styles.title}>Settings</Text>
      </View>
      <SettingsButton
        onPress={null}
        title="Ingenico Settings"
        bgColor="#4b71ec"
      />
      <SettingsButton onPress={null} title="Import All Sales" bgColor="green" />
      <SettingsButton
        onPress={null}
        title="Reinstall the Configuration"
        bgColor="green"
      />
      <SettingsButton
        onPress={null}
        title="Scales Settings"
        bgColor="#4b71ec"
      />
      <SettingsButton onPress={gotoOS} title="Other Settings" bgColor="green" />
      <SettingsButton onPress={null} title="Printer Test" bgColor="#ff8b26" />
      <SettingsButton onPress={null} title="Operations" bgColor="#4b71ec" />
    </View>
  );
};
export default Settings;
const styles = StyleSheet.create({
  title_container: {
    height: Dimensions.get('screen').height / 15,
    width: Dimensions.get('screen').width / 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 30,
  },
});
