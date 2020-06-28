import React from 'react'
import { StyleSheet, Text, View, FlatList, Platform } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/configureStore'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import BeHeaderBtn from '../../common/BeHeaderBtn'
import OrderItem from '../../shop/OrderItem'

const Orders = () => {
  const orders = useSelector((state: RootState) => state.orders.orders)
  return (
    <FlatList
      data={orders}
      renderItem={ itemData => <OrderItem {...itemData.item} /> }
    />
  )
}

Orders.navigationOptions = navData => {
  return {
    headerTitle: 'Your Orders',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={BeHeaderBtn}>
        <Item 
          title='Menu' 
          iconName={ Platform.OS === 'android' ? 'md-menu' : 'ios-menu' } 
          onPress={()=>{
            navData.navigation.toggleDrawer()
          }}
        />
      </HeaderButtons>
    )
  }
}

export default Orders

const styles = StyleSheet.create({})
