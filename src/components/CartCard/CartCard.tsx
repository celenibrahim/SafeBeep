import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './CartCard.style';
import Button from '../Button';
const CartCard = ({
  productName,
  price,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.inner_container}>
        <Text style={styles.title}>{productName}</Text>
      </View>

      <View style={styles.info_container}>
        <View style={{flex: 1}}>
          <Text style={styles.price}>Price: {price} $</Text>
          <Text style={styles.piece}>Piece: {quantity}</Text>
        </View>
        <View>
          <View style={styles.button_pm}>
            <Button text={'-1'} onPress={onDecrease} />
            <Button text={'+1'} onPress={onIncrease} />
          </View>
          <View>
            <Button text={'Delete From Cart'} onPress={onRemove} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartCard;
