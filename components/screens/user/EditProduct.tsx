import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import BeInput from '../../common/BeInput'
import { Item, HeaderButtons } from 'react-navigation-header-buttons'
import BeHeaderBtn from '../../common/BeHeaderBtn'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../store/configureStore'
import { updateProduct, createProduct } from '../../../store/actions/products'
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack'

interface EditProductProps {
  navigation: NavigationStackProp
  navigationOptions: NavigationStackOptions
}

const EditProduct = (props: EditProductProps) => {
  const productId = props.navigation.getParam('productId')
  const editedProduct = useSelector((state: RootState) =>
    state.products.userProducts.find(product => product.id === productId)
  )
  const [title, setTitle] = useState<string>(
    editedProduct ? editedProduct.title : ''
  )
  const [price, setPrice] = useState<number>(
    editedProduct ? editedProduct.price : 0
  )
  const [imageUrl, setImageUrl] = useState<string>(
    editedProduct ? editedProduct.imageUrl : ''
  )
  const [description, setDescription] = useState<string>(
    editedProduct ? editedProduct.description : ''
  )
  const dispatch = useDispatch()

  const submitHandler = useCallback(
    () => {
      if (editedProduct) {
        dispatch(updateProduct(productId, title, imageUrl, description))
      } else {
        dispatch(createProduct(title, description, imageUrl, price))
      }
      props.navigation.goBack()
    }, [dispatch, productId, title, imageUrl, description, price]
  )

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler })
  }, [submitHandler])

  return (
    <ScrollView>
      <View style={styles.form}>
        <BeInput
          label="Title"
          value={title}
          onChangeText={text => setTitle(text)}
          autoCapitalize='sentences'
          autoCorrect
          autoFocus={!editedProduct}
          returnKeyType='next'
        />
        <BeInput
          label="Image URL"
          value={imageUrl}
          onChangeText={text => setImageUrl(text)}
          returnKeyType='next'
        />
        {!editedProduct && <BeInput
          label="Price"
          value={price.toFixed(2)}
          onChangeText={text => setPrice(parseFloat(text))}
          keyboardType='decimal-pad'
          returnKeyType='next'
        />}
        <BeInput
          label="Description"
          value={description}
          onChangeText={text => setDescription(text)}
          returnKeyType='done'
        />
      </View>
    </ScrollView>
  )
}

interface NavData {
  navigation: NavigationStackProp
}

EditProduct.navigationOptions = (navData: NavData) => {
  const submitCb = navData.navigation.getParam('submit')
  return {
    headerTitle: navData.navigation.getParam('productId')
      ? 'Edit Product'
      : 'Add Product',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={BeHeaderBtn}>
        <Item
          title='Save'
          iconName={
            Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
          }
          onPress={() => {
            submitCb()
          }}
        />
      </HeaderButtons>
    )
  }
}

export default EditProduct

const styles = StyleSheet.create({
  form: {
    margin: 20
  }
})
