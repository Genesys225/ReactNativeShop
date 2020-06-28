import React from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import BeText from '../common/BeText'
import MainButton from '../common/MainButton'
import CartItem from '../../models/cartTypes'

interface CartItemProps extends CartItem {
  onRemove?: ()=>void | false
}

const CartItemComp = (props: CartItemProps) => {
  const onRemove = props.onRemove || false;
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <BeText style={styles.itemQty}>{props.quantity} </BeText>
        <BeText style={styles.mainText}>{props.title}</BeText>
      </View>
      <View style={styles.itemData}>
        <BeText style={styles.mainText}>{props.sum.toFixed(2)}</BeText>
        {onRemove && <MainButton 
          iconName={
            Platform.OS === 'android' ? 'md-trash' : 'ios-trash'
          }
          iconColor='red'
          iconSize={23}
          onPress={onRemove}
          style={styles.deleteBtn}
        />}
      </View>
    </View>
  )
}

export default CartItemComp

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemQty: {
    color: '#888',
    fontSize: 16
  },
  mainText: {
    fontFamily: 'open-sans-bold',
    fontSize: 16
  },
  deleteBtn: {
    marginLeft: 20,
    backgroundColor: 'white',
    width: 'auto',
    paddingHorizontal: 3
  },
})
