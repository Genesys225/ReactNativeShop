import React, { ReactNode, useReducer, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TextInputProps,
	ViewStyle,
	TextStyle,
} from 'react-native';
import H1 from './H1';
import BeText from './BeText';

interface BeInputProps extends TextInputProps {
	label: ReactNode;
	style?: ViewStyle;
	labelStyle?: TextStyle;
	inputStyle?: TextStyle;
	errorText?: string;
	isInvalid?: boolean;
	required?: boolean;
	type?: string;
	min?: number;
	max?: number;
	minLength?: number;
	onInput: (name: string, text: string, isInvalid: boolean) => any;
	name: string;
}

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

interface InputState {
	value: string;
	isInvalid: boolean;
	touched: boolean;
}

interface InputChangeAction {
	type: 'INPUT_CHANGE';
	payload: {
		value: string;
		isInvalid: boolean;
	};
}

interface BlurAction {
	type: 'INPUT_BLUR';
}

type InputActions = InputChangeAction | BlurAction;

const beInputReducer = (
	state: InputState,
	action: InputActions
): InputState => {
	switch (action.type) {
		case INPUT_CHANGE:
			return {
				...state,
				value: action.payload.value,
				isInvalid: action.payload.isInvalid,
			};
		case INPUT_BLUR:
			return {
				...state,
				touched: true,
			};

		default:
			return state;
	}
};

const BeInput = (props: BeInputProps) => {
	const initialState = {
		value: props.value || '',
		isInvalid: props.isInvalid || false,
		touched: false,
	};
	const {
		style,
		label,
		name,
		inputStyle,
		labelStyle,
		onInput,
		value: _value,
		...filteredProps
	} = props;
	const [inputState, dispatch] = useReducer(beInputReducer, initialState);
	const { value, isInvalid } = inputState;
	useEffect(() => {
		if (inputState.touched) {
			onInput(value, props.name, isInvalid);
		}
	}, [inputState, onInput]);

	const onChangeHandler = (text: string): void => {
		const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		let isValid = true;
		if (props.required && text.trim().length === 0) {
			isValid = false;
		}
		if (props.type === 'email' && !emailRegex.test(text.toLowerCase())) {
			isValid = false;
		}
		if (props.min !== undefined && +text < props.min) {
			isValid = false;
		}
		if (props.max !== undefined && +text > props.max) {
			isValid = false;
		}
		if (props.minLength !== undefined && text.length < props.minLength) {
			isValid = false;
		}
		dispatch({
			type: INPUT_CHANGE,
			payload: {
				value: text,
				isInvalid: !isValid,
			},
		});
		onInput(name, text, isInvalid);
	};

	const lostFocus = () => {
		dispatch({ type: INPUT_BLUR });
	};

	return (
		<View style={styles.inputGroup}>
			<View style={{ ...styles.inputContainer, ...props.style }}>
				<H1 style={{ ...styles.label, ...labelStyle }}>
					{props.label}
				</H1>
				<TextInput
					style={{ ...styles.input, ...inputStyle }}
					{...filteredProps}
					value={inputState.value}
					onChangeText={onChangeHandler}
					onBlur={lostFocus}
				/>
			</View>
			{isInvalid && (
				<BeText style={styles.errorText}>{props.errorText}</BeText>
			)}
		</View>
	);
};

export default BeInput;

const styles = StyleSheet.create({
	inputGroup: {
		marginVertical: 8,
	},
	inputContainer: {
		width: '100%',
	},
	input: {
		minWidth: 40,
		height: 30,
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
	},
	errorText: {
		color: 'red',
		fontSize: 14,
	},
	label: {
		fontSize: 16,
		paddingHorizontal: 2,
		paddingVertical: 5,
	},
});
