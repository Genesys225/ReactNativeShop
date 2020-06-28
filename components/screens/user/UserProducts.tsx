import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../store/configureStore'
import ProductItem from '../../shop/ProductItem'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import BeHeaderBtn from '../../common/BeHeaderBtn'
import BeButton from '../../common/BeButton'
import Colors from '../../../config/colors'
import { deleteProduct } from '../../../store/actions/products'

const UserProducts = (props) => {
  const dispatch = useDispatch()
  const userProducts = useSelector((state: RootState) => (
    state.products.userProducts
  ))

  const editProductHandler = (id: string) => {
    props.navigation.navigate('EditProduct', {productId: id})
  }

  return (
    <FlatList
      data={userProducts}
      renderItem={itemData => (
        <ProductItem
          {...itemData.item}
          onSelect={()=>{
            editProductHandler(itemData.item.id)
          }}
          >
          <BeButton 
            title="Edit details" 
            style={{width: 'auto'}}
            onPress={()=>{
              editProductHandler(itemData.item.id)
            }} 
            color={Colors.accent}
          />
          <BeButton 
            title="Delete"
            onPress={() => {
              dispatch(deleteProduct(itemData.item.id))
            }} 
            />
          </ProductItem>
      )}
    />
  )
}

UserProducts.navigationOptions = navData => {
  return {
    headerTitle: 'Your Products',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={BeHeaderBtn}>
        <Item
          title='Menu'
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer()
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={BeHeaderBtn}>
        <Item
          title='Add'
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            navData.navigation.navigate('EditProduct')
          }}
        />
      </HeaderButtons>
    )
  }
}

export default UserProducts

const styles = StyleSheet.create({})
