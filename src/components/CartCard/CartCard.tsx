import React from 'react';
import {View, Text} from 'react-native';
import styles from './CartCard.style';
import Button from '../Button';
import {useTranslation} from 'react-i18next';
const CartCard = ({
  productName,
  price,
  taxRate,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}: any) => {
  const {t}: any = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.inner_container}>
        <Text style={styles.title}>{t(productName)}</Text>
      </View>

      <View style={styles.info_container}>
        <View style={{flex: 1}}>
          <Text style={styles.price}>
            {t('price')}: {price} $
          </Text>
          <Text style={styles.piece}>
            {t('piece')}:{quantity}
          </Text>
          <Text style={styles.taxes}>
            {t('tax')}: %{taxRate}
          </Text>
        </View>
        <View>
          <View style={styles.button_pm}>
            <Button text={'-1'} onPress={onDecrease} />
            <Button text={'+1'} onPress={onIncrease} />
          </View>
          <View>
            <Button text={t('del.prdct')} onPress={onRemove} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartCard;
