import React, { ReactNode } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TextInputProps,
  ViewStyle,
  TextStyle
} from 'react-native'
import H1 from './H1'

interface BeInputProps extends TextInputProps {
  label: ReactNode,
  style?: ViewStyle,
  labelStyle?: TextStyle,
  inputStyle?: TextStyle
}

const BeInput = (props: BeInputProps) => {
  const { style, label, inputStyle, labelStyle, ...filteredProps } = props
  return (
    <View style={{...styles.inputContainer, ...props.style}}>
      <H1 style={{...styles.label, ...labelStyle}}>{props.label}</H1>
      <TextInput style={{...styles.input, ...inputStyle}} {...filteredProps} />
    </View>
  )
}

export default BeInput

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginVertical: 8,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  input: {
  },
  label: {
    fontSize: 16,
    paddingHorizontal: 2,
    paddingVertical: 5
  }
})
