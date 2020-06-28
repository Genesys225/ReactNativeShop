import React, { useState } from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import BeInput from '../../common/BeInput'
import { Item, HeaderButtons } from 'react-navigation-header-buttons'
import BeHeaderBtn from '../../common/BeHeaderBtn'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/configureStore'

const EditProduct = (props) => {
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

  return (
    <ScrollView>
      <View style={styles.form}>
        <BeInput
          label="Title"
          value={title}
          onChangeText={text => setTitle(text)}
        />
        <BeInput
          label="Image URL"
          value={imageUrl}
          onChangeText={text => setImageUrl(text)}
        />
        {!editedProduct && <BeInput
          label="Price"
          value={price.toFixed(2)}
          onChangeText={text => setPrice(parseFloat(text))}
        />}
        <BeInput
          label="Description"
          value={description}
          onChangeText={text => setDescription(text)}
        />
      </View>
    </ScrollView>
  )
}

EditProduct.navigationOptions = navData => {


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
