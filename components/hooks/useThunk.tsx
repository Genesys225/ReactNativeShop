import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, DefaultRootState, useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
interface UseThunkProps {
	reduxSelector: (state: any) => any;
	action: any;
	actionParams?: any | any[];
}
export function useThunk(props: UseThunkProps) {
	const { action, reduxSelector } = props;
	const actionParams = Array.isArray(props.actionParams)
		? props.actionParams
		: props.actionParams === undefined
		? false
		: [props.actionParams];
	const [isLoading, setIsLoading] = useState<boolean>(true);
	// (state: RootState) => state.orders.orders
	const stateSlice = useSelector(reduxSelector);
	const thunkDispatch = useDispatch() as ThunkDispatch<
		DefaultRootState,
		{},
		Action<any>
	>;

	const effect = useCallback(async () => {
		setIsLoading(true);
		await thunkDispatch(actionParams ? action(...actionParams) : action());
		setIsLoading(false);
	}, [thunkDispatch]);

	useEffect(() => {
		effect();
	}, [effect]);

	return [stateSlice, isLoading, effect];
}
