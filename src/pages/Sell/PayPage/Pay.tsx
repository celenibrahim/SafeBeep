import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import styles from './Pay.styles';
import {useTranslation} from 'react-i18next';
const Pay = () => {
  const {t}: any = useTranslation();
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleInput = (value: any) => {
    setInput(input + value);
  };
  const handleDelete = () => {
    setInput(input.slice(0, -1));
  };

  const clearInput = () => {
    setInput('');
    setResult('');
  };
  return (
    <View style={styles.container}>
      <View style={styles.optContainer}>
        <TouchableOpacity style={[styles.optButtons, {backgroundColor: 'red'}]}>
          <Text style={styles.text_button}>{t('cancel.doc')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optButtons, {backgroundColor: '#ffa200'}]}>
          <Text style={styles.text_button}>{t('finish.doc')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.optContainer}>
        <TouchableOpacity style={[styles.optButtons, {backgroundColor: 'red'}]}>
          <Text style={styles.text_button}>{t('del')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optButtons, {backgroundColor: '#0098d9'}]}>
          <Text style={styles.text_button}>{t('hadi.wallet')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.optContainer}>
        <TouchableOpacity
          style={[styles.optButtons, {backgroundColor: '#0098d9'}]}>
          <Text style={styles.text_button}>TomBank</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optButtons, {backgroundColor: '#15b82e'}]}>
          <Text style={styles.text_button}>{t('giftC')}</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.inputContainer}>
            <Text style={styles.input}>{input}</Text>
            <Text style={styles.result}>{result}</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.del_button} onPress={clearInput}>
              <Text style={styles.del_button_text}>X</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flexDirection: 'row', flex: 1, margin: 5}}>
          <View style={styles.buttonContainer}>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.bot_top_buttons}
                onPress={() => handleInput('00')}>
                <Text style={styles.text_button}>00</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleInput('000')}>
                <Text style={styles.text_button}>000</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleInput('1')}>
                <Text style={styles.text_button}>1</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleInput('2')}>
                <Text style={styles.text_button}>2</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleInput('3')}>
                <Text style={styles.text_button}>3</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleInput('4')}>
                <Text style={styles.text_button}>4</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleInput('5')}>
                <Text style={styles.text_button}>5</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleInput('6')}>
                <Text style={styles.text_button}>6</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleInput('7')}>
                <Text style={styles.text_button}>7</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleInput('8')}>
                <Text style={styles.text_button}>8</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleInput('9')}>
                <Text style={styles.text_button}>9</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <TouchableOpacity
                style={styles.bot_top_buttons}
                onPress={() => handleInput('0')}>
                <Text style={styles.text_button}>0</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleInput('.')}>
                <Text style={styles.text_button}>.</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <View style={styles.row}>
              <TouchableOpacity
                style={{
                  marginLeft: 3,
                  marginVertical: 2,
                  borderWidth: 1,
                  borderRadius: 10,
                  width: Dimensions.get('window').width / 3,
                  height: Dimensions.get('window').height / 11.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'darkblue',
                }}
                onPress={handleDelete}>
                <Text style={styles.text_button}>{t('del')}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={{
                marginLeft: 3,
                marginVertical: 2,
                borderWidth: 1,
                borderRadius: 10,
                width: Dimensions.get('window').width / 3,
                height: Dimensions.get('window').height / 5.6,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'green',
              }}
              onPress={() => null}>
              <Text style={styles.text_button}>{t('card.credit')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                marginLeft: 3,
                marginVertical: 2,
                borderWidth: 1,
                borderRadius: 10,
                width: Dimensions.get('window').width / 3,
                height: Dimensions.get('window').height / 5.6,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'green',
              }}
              onPress={() => null}>
              <Text style={styles.text_button}>{t('cash')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Pay;
