import React, { useReducer, useCallback, useState, useEffect } from 'react';
import {
	StyleSheet,
	View,
	ScrollView,
	KeyboardAvoidingView,
	ActivityIndicator,
} from 'react-native';
import Card from '../../common/Card';
import BeInput from '../../common/BeInput';
import MainButton from '../../common/MainButton';
import Colors from '../../../config/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { signUp, signIn } from '../../../store/actions/auth';
import { useThunk } from '../../hooks/useThunk';
import { RootState } from '../../../store/configureStore';
import { NavigationStackProp } from 'react-navigation-stack';
interface FormState {
	inputValues: {
		[name: string]: string;
	};
	inputValidities: {
		[name: string]: boolean;
	};
	formIsValid: boolean;
}

type FormActions = {
	type: 'UPDATE_INPUT';
	payload: {
		text: string;
		name: string;
		isValid: boolean;
	};
};

const formIsValid = (state: FormState) =>
	Object.values(state.inputValidities).indexOf(false) === -1;

const formReducer = (state: FormState, action: FormActions): FormState => {
	switch (action.type) {
		case 'UPDATE_INPUT':
			const updatedState: FormState = { ...state };
			const name = action.payload.name;
			updatedState.inputValues[name] = action.payload.text;
			updatedState.inputValidities[name] = action.payload.isValid;
			updatedState.formIsValid = formIsValid(state);
			return updatedState;

		default:
			return state;
	}
};

interface AuthProps {
	navigation: NavigationStackProp;
}

const Auth = (props: AuthProps) => {
	const [isSignUp, setIsSignUp] = useState(false);
	const [formState, dispatcher] = useReducer(formReducer, {
		inputValues: {
			email: '',
			password: '',
		},
		inputValidities: {
			email: false,
			password: false,
		},
		formIsValid: false,
	});

	const { email, password } = formState.inputValues;
	const [authState, isLoading, signUpHandler] = useThunk(
		{
			reduxSelector: (state: RootState) => state.auth,
			fetchOnInit: false,
			action: isSignUp ? signUp : signIn,
			actionParams: [email, password],
		},
		[isSignUp]
	);

	const inputChangeHandler = useCallback(
		(name: string, text: string, isValid: boolean) => {
			dispatcher({
				type: 'UPDATE_INPUT',
				payload: { text, name, isValid },
			});
		},
		[dispatcher]
	);

	const { navigation } = props;

	useEffect(() => {
		if (!isSignUp && authState.token) navigation.navigate('Shop');
	}, [navigation, authState]);

	return (
		<KeyboardAvoidingView
			style={styles.body}
			behavior="height"
			keyboardVerticalOffset={1}
		>
			<LinearGradient
				colors={['#ffedff', '#ffe3ff']}
				style={styles.background}
			>
				<Card style={styles.form}>
					<ScrollView>
						<BeInput
							name="email"
							onInput={inputChangeHandler}
							label="E-mail"
							initialValidity={true}
							errorText="Please enter a valid email address."
						/>
						<BeInput
							name="password"
							onInput={inputChangeHandler}
							label="Password"
							errorText="Please enter a valid password."
						/>
						<View style={styles.formActions}>
							<MainButton
								title={isSignUp ? 'Signup' : 'Login'}
								onPress={signUpHandler}
								style={{ width: 220 }}
							>
								{isLoading && (
									<View style={styles.centered}>
										<ActivityIndicator size="small" />
									</View>
								)}
							</MainButton>
							<MainButton
								style={{ marginTop: 3, width: 220 }}
								color={Colors.accent}
								title={`Switch to ${
									!isSignUp ? 'Signup' : 'Login'
								}`}
								onPress={() =>
									setIsSignUp((prevState) => !prevState)
								}
							/>
						</View>
					</ScrollView>
				</Card>
			</LinearGradient>
		</KeyboardAvoidingView>
	);
};
Auth.navigationOptions = {
	headerTitle: 'Please login',
};
export default Auth;

const styles = StyleSheet.create({
	body: {
		flex: 1,
	},
	background: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	form: {
		width: '90%',
		maxWidth: 400,
		maxHeight: 400,
	},
	formActions: {
		marginVertical: 8,
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
