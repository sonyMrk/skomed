import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { AppBoldText } from "./ui/AppBoldText";
import { THEME } from "../theme";
import { Preloader } from "./ui/Preloader";

export const BarScanner = ({ onScanned }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const askForPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => {
    askForPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    onScanned(data);
  };

  if (hasPermission === null) {
    return <Preloader />;
  }
  if (hasPermission === false) {
    return (
      <AppBoldText
        style={{ color: THEME.DANGER_COLOR, textAlign: "center", fontSize: 20 }}
      >
        Вы не дали прав на использование камеры
      </AppBoldText>
    );
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 10,
  },
});
