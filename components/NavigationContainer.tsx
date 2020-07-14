import React, { useRef, useEffect } from 'react';
import ShopNavigator from '../navigation/ShopNavigator';
import { RootState } from '../store/configureStore';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationActions } from 'react-navigation';

const NavigationContainer = () => {
	const dispatch = useDispatch();
	const navRef = useRef({ dispatch } as any);
	const isAuth = useSelector((state: RootState) => !!state.auth.userId);
	useEffect(() => {
		if (!isAuth) {
			if (!navRef.current) {
				return () => {};
			}
			navRef.current.dispatch(
				NavigationActions.navigate({ routeName: 'Auth' })
			);
		}
	}, [isAuth]);
	return <ShopNavigator ref={navRef} />;
};

export default NavigationContainer;
