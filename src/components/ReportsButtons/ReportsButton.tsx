import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';

const ReportsButton = ({
  title,
  onPress,
  bgColor,
}: {
  title: any;
  onPress: any;
  bgColor: any;
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button_container, {backgroundColor: bgColor}]}
        onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReportsButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button_container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('screen').width / 1.02,
    height: Dimensions.get('screen').height / 18,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 25,
    margin: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
