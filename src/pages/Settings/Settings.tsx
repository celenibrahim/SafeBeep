import React from 'react';
import SettingsCard from '../../components/SettingsCard';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
const Settings = ({navigation}: any) => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.title_container}>
        <Text style={styles.title}>Settings</Text>
      </View>
      <SettingsCard
        onPress={null}
        title="Ingenico Settings"
        bgColor="#4b71ec"
      />
      <SettingsCard onPress={null} title="Import All Sales" bgColor="green" />
      <SettingsCard
        onPress={null}
        title="Reinstall the Configuration"
        bgColor="green"
      />
      <SettingsCard onPress={null} title="Scales Settings" bgColor="#4b71ec" />
      <SettingsCard onPress={null} title="Other Settings" bgColor="green" />
      <SettingsCard onPress={null} title="Printer Test" bgColor="#ff8b26" />
      <SettingsCard onPress={null} title="Operations" bgColor="#4b71ec" />
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
