import React, { ReactNode } from 'react';
import { StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../App';
import Product from '../../../models/product';
import ProductItem, { ProductItemProps } from '../../shop/ProductItem';
import { NavigationStackProp } from 'react-navigation-stack';
import TNavScreenComp from '../../types/TNavScreenComp';


interface ProductsOverviewProps  {
  navigation: NavigationStackProp
}

const ProductsOverview: TNavScreenComp = (props: ProductsOverviewProps) => {
  const products = useSelector(
    (state: RootState): Product[] => state.products.availableProducts
  )

  const renderItem: ListRenderItem<Product> = (itemData) => {
    const productItemProps: ProductItemProps = { 
      ...itemData.item,
      onViewDetails() {
        props.navigation.navigate(
          'ProductDetails', 
          {
            productId: itemData.item.id,
            productTitle: itemData.item.title
          });
      },
      onViewCart() {

      }
    }
    return (
      <ProductItem {...productItemProps} />
    )
  }

  return (
    <FlatList 
      data={products} 
      renderItem={renderItem}
    />
  )
}

ProductsOverview.navigationOptions = {
  headerTitle: 'All Products'
}

export default ProductsOverview

const styles = StyleSheet.create({})
