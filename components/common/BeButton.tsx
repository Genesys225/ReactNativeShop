import React from 'react'
import { StyleSheet, View, Button, ButtonProps, ViewStyle } from 'react-native'

interface BeButtonProps extends ButtonProps {
  style?: ViewStyle,
}

const BeButton = (props: BeButtonProps) => {
  return (
    <View style={{...styles.button, ...props.style}}>
      <Button {...props}/>
    </View>
  )
}

export default BeButton

const styles = StyleSheet.create({
  button: {
    width: 100
  }
})
