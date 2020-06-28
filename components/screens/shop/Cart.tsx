import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import BeButton from '../../common/BeButton'
import { RootState } from '../../../store/configureStore'
import { useSelector, useDispatch } from 'react-redux'
import Card from '../../common/Card'
import H1 from '../../common/H1'
import Colors from '../../../config/colors'
import CartItem from '../../shop/CartItem'
import { removeFromCart } from '../../../store/actions/cart'
import { addOrder } from '../../../store/actions/orders'

const Cart = () => {
  const cartTotalAmount = useSelector(
    (state: RootState) => state.cart.totalAmount
  )
  const cartItems = useSelector((state: RootState) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        id: key,
        ...state.cart.items[key]
      })
    }
    return transformedCartItems
      .sort((a, b) => a.id > b.id ? 1 : -1)
  })
  const dispatch = useDispatch()
  return (
    <View style={styles.body}>
      <Card style={styles.summary}>
        <H1 style={styles.summaryText}>
          Total: <Text style={styles.amount}>
            ${Math.round(+cartTotalAmount.toFixed(2) * 100) / 100}
          </Text>
        </H1>
        <BeButton
          title="Order Now"
          color={Colors.accent}
          disabled={cartItems.length === 0}
          onPress={() => dispatch(addOrder(cartItems, cartTotalAmount))}
        />
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <CartItem
            {...itemData.item}
            onRemove={() => {
              dispatch(removeFromCart(itemData.item.id))
            }}
          />
        )}
      />
    </View>
  )
}

Cart.navigationOptions = {
  headerTitle: 'Your cart'
}

export default Cart

const styles = StyleSheet.create({
  body: {
    margin: 20
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10
  },
  summaryText: {

  },
  amount: {
    color: Colors.accent
  }
})
