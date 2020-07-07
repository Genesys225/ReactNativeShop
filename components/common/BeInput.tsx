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
	initialValidity?: boolean;
	initialValue?: string;
	required?: boolean;
	type?: string;
	min?: number;
	max?: number;
	minLength?: number;
	onInput: (name: string, text: string, isValid: boolean) => any;
	name: string;
}

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

interface InputState {
	value: string;
	isValid: boolean;
	touched: boolean;
}

interface InputChangeAction {
	type: string;
	payload: {
		value: string;
		isValid: boolean;
	};
}

interface BlurAction {
	type: 'INPUT_BLUR';
}

const beInputReducer = (
	state: InputState,
	action: InputChangeAction | BlurAction
): InputState => {
	switch (action.type) {
		case INPUT_CHANGE:
			const { payload } = action as InputChangeAction;
			return {
				...state,
				value: payload.value,
				isValid: payload.isValid,
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
		value: props.initialValue || '',
		isValid:
			props.initialValidity === undefined ? false : props.initialValidity,
		touched: props.initialValidity,
	};
	const {
		style,
		label,
		name,
		inputStyle,
		labelStyle,
		onInput,
		errorText,
		initialValue: _initialValue,
		value: _value,
		...filteredProps
	} = props;
	const [inputState, inputDispatch] = useReducer(
		beInputReducer,
		initialState
	);
	useEffect(() => {
		if (inputState.touched) {
			onInput(name, inputState.value, inputState.isValid);
		}
	}, [inputState, onInput, name]);

	const onChangeTextHandler = (text: string) => {
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
		inputDispatch({
			type: INPUT_CHANGE,
			payload: {
				value: text,
				isValid,
			},
		});
	};

	const lostFocus = () => {
		inputDispatch({ type: INPUT_BLUR });
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
					onChangeText={onChangeTextHandler}
					onBlur={lostFocus}
				/>
			</View>
			{!inputState.isValid && inputState.touched && (
				<View style={styles.errorContainer}>
					<BeText style={styles.errorText}>{errorText}</BeText>
				</View>
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
	errorContainer: {
		marginVertical: 5,
	},
});
