import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { AppLoading } from 'expo'
import * as Font from 'expo-font';

import productsReducer, { IProducts } from './store/reducers/products';
import ShopNavigator from './navigation/ShopNavigator';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
}

type productsReducer = IProducts;

const rootReducer = combineReducers({
  products: productsReducer
});

const store = createStore(rootReducer)

const App = () => {
  const [loading, setLoading] = useState<boolean>(true);

  if (loading) {
    return <AppLoading 
        startAsync={fetchFonts}
        onFinish={setLoading.bind(App, false)}
        onError={console.error}
    />
  }
  
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})

export type RootState = ReturnType<typeof rootReducer>