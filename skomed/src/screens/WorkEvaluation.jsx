import React, { useState } from "react";
import { View, TouchableOpacity, Dimensions, StyleSheet } from "react-native";


import { AppBoldText } from "../components/ui/AppBoldText";
import { BarScanner } from "../components/BarScanner";


export const WorkEvaluation = ({}) => {

    const [data, setData] = useState(null)

    const handleScannedQRCode = (data) => {
        setData(data)
    }

    return (
        <View style={styles.container}>
        <View style={styles.header}>
          <AppBoldText style={styles.title}>
            Отсканируйте QR-код для оценки
          </AppBoldText>
        </View>
          {!data && <BarScanner onScanned={handleScannedQRCode} />}
          <AppBoldText>{data}</AppBoldText>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
      },
      flex: {
        flex: 1,
      },
      header: {
        paddingVertical: 10,
      },
      title: {
        textAlign: "center",
        fontSize: 18,
      },
})