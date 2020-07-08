import React, { ReactNode } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ViewStyle,
	TouchableOpacity,
	TouchableOpacityProps,
	GestureResponderEvent,
	TextStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../config/colors';

interface MainButtonProps
	extends Omit<TouchableOpacityProps, 'longPressDelayTimeout'> {
	children?: ReactNode;
	style?: ViewStyle;
	onPress: (event: GestureResponderEvent) => void;
	title?: string;
	iconName?: string;
	iconColor?: string;
	iconSize?: number;
	textStyle?: TextStyle;
	color?: string;
}

const MainButton = (props: MainButtonProps) => {
	type filteredProps = TouchableOpacityProps;
	const {
		iconColor,
		iconSize,
		iconName,
		title,
		children,
		color,
		...filteredProps
	} = props;
	const dynamicChildren = children ? (
		children
	) : iconName ? (
		<Ionicons name={iconName} size={iconSize} color={iconColor} />
	) : (
		<Text style={{ ...styles.btnText, ...props.textStyle }}>{title}</Text>
	);
	let style = props.style;
	if (color) {
		style = { ...style, backgroundColor: color };
	}

	return (
		<TouchableOpacity activeOpacity={0.6} {...filteredProps}>
			<View style={{ ...styles.button, ...style }}>
				{dynamicChildren}
			</View>
		</TouchableOpacity>
	);
};

export default MainButton;

const styles = StyleSheet.create({
	button: {
		backgroundColor: Colors.primary,
		paddingVertical: 12,
		paddingHorizontal: 30,
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 3,
	},
	btnText: {
		color: 'white',
		fontFamily: 'open-sans',
		fontSize: 18,
		textAlign: 'center',
	},
});
