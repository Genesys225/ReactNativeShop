import React from 'react'
import { StyleSheet, Text, View, TextProps, TextStyle } from 'react-native'

interface H1Props extends TextProps {
  style?: TextStyle,
  children: string
}

const H1 = (props: H1Props) => {
  return (
    <Text style={{ ...styles.body, ...props.style}}>{props.children}</Text>
  )
}

export default H1

const styles = StyleSheet.create({
  body: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  }
})
