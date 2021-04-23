import React from "react"
import {Text, StyleSheet} from "react-native"


export const AppBoldText = ({children, style}) => (
    <Text style={{ ...styles.text, ...style }}>{children}</Text>
)

const styles = StyleSheet.create({
    text: {
        fontFamily: 'roboto-bold'
    }
})