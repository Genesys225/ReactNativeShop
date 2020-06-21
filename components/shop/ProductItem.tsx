import React, { ComponentType } from 'react'
import {
  StyleSheet,
  View,
  GestureResponderEvent,
  Platform,
  TouchableOpacityProps,
  TouchableNativeFeedbackProps,
  TouchableNativeFeedback,
  TouchableOpacity
} from 'react-native'
import BeImg from '../common/BeImg'
import BeText from '../common/BeText'
import MainButton from '../common/MainButton'
import Card from '../common/Card'
import Product from '../../models/product'
import BeButton from '../common/BeButton'
import Colors from '../../config/colors'
import H1 from '../common/H1'

export interface ProductItemProps extends Omit<Product, 'id'|'ownerId'> {
  onViewDetails: (event: GestureResponderEvent) => void,
  onViewCart: (event: GestureResponderEvent) => void
}

const ProductItem = (props: ProductItemProps) => {
  const platformCondition = Platform.OS === 'android' 
    && Platform.Version >= 21;
  const TouchableComponent: ComponentType<
    TouchableOpacityProps | TouchableNativeFeedbackProps
  > = platformCondition ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <TouchableComponent onPress={props.onViewDetails} useForeground>
          <View>
            <BeImg style={styles.image} source={{uri: props.imageUrl}} />
            <View style={styles.details}>
              <H1 style={styles.title}>{props.title}</H1>
              <BeText style={styles.price}>${props.price.toFixed(2)}</BeText>
            </View>
            <View style={styles.actionsContainer}>
              <BeButton 
                title="View Details" 
                style={{width: 'auto'}}
                color={Colors.primary}
                onPress={props.onViewDetails} 
                />
              <BeButton 
                title="To Cart"
                color={Colors.accent}
                onPress={props.onViewCart} 
                />
            </View>
          </View>
        </TouchableComponent>
      </View>
    </Card>
  )
}

export default ProductItem

const styles = StyleSheet.create({
  product: {
    shadowRadius: 8,
    height: 300,
    margin: 20,
    padding: 0,
    
  },
  image: {
    width: '100%',
    height: '60%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  title: {
    fontSize: 18,
    marginVertical: 2
  },
  price: {
    fontSize: 14,
    color: '#888'
  },
  details: {
    alignItems: 'center',
    height: '15%',
    padding: 10
  },
  btnText: {
    fontSize: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25%',
    paddingHorizontal: 20
  },
  touchable: {
    overflow: 'hidden',
    borderRadius: 10
  }
})
