import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import BeButton from '../common/BeButton'
import Card from '../common/Card'
import BeText from '../common/BeText'
import H1 from '../common/H1'
import OrderItem from '../../models/orderTypes'
import CartItem from './CartItem'

interface OrderItemProps extends OrderItem {

}

const OrderItemComp = (props: OrderItemProps) => {
  const [showDetails, setShowDetails] = useState<boolean>(false)
  return (
    <Card style={styles.order}>
      <View style={styles.orderSummary}>
        <H1 style={styles.orderTotal}>{props.totalAmount.toFixed(2)}</H1>
        <BeText style={styles.orderDate}>
          {props.date.toLocaleString('he-IL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </BeText>
      </View>
      <BeButton
        style={{ width: 'auto' }}
        title={!showDetails ? "Show details" : "Hide details"}
        onPress={() => { setShowDetails(prevState => !prevState) }}
      />
      {showDetails && (
        <View style={styles.itemDetails}>
          {props.items.map(cartItem =>
            <CartItem key={cartItem.id} {...cartItem} />
          )}
        </View>
      )}
    </Card>
  )
}

export default OrderItemComp

const styles = StyleSheet.create({
  order: {
    margin: 20,
    padding: 10,
    alignItems: 'center'
  },
  orderSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15
  },
  orderTotal: {

  },
  itemDetails: {
    width: '100%'
  },
  orderDate: {
    color: '#888',
  },
})
