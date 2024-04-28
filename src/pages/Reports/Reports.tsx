import React from 'react';
import ReportsButton from '../../components/ReportsButtons';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
const Reports = ({navigation}: any) => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.title_container}>
        <Text style={styles.title}>Reports</Text>
      </View>
      <ReportsButton onPress={null} title="X Report" bgColor="#fb3131" />
      <ReportsButton onPress={null} title="Z Report" bgColor="#fb3131" />
      <ReportsButton onPress={null} title="Bank Reports" bgColor="green" />
      <ReportsButton
        onPress={null}
        title="IBB Card Cash Out Report"
        bgColor="green"
      />
      <ReportsButton
        onPress={null}
        title="Hadi Cash Out Reports"
        bgColor="#ff8b26"
      />
      <ReportsButton
        onPress={null}
        title="Hadi Store Credit Reports"
        bgColor="#ff8b26"
      />
      <ReportsButton
        onPress={null}
        title="Hadi Web Invoice Cash Out Report"
        bgColor="#ff8b26"
      />
      <ReportsButton
        onPress={null}
        title="Hadi Credit Cash Out Report"
        bgColor="#ff8b26"
      />
    </View>
  );
};
export default Reports;
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
