import { StackNavigationOptions, StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { NavigationComponent, NavigationParams, NavigationRoute } from "react-navigation"

type TNavScreenComp = NavigationComponent<
  StackNavigationOptions, 
  StackNavigationProp<
    NavigationRoute<NavigationParams>, 
    NavigationParams
  >
>

export default TNavScreenComp

