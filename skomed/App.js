import "react-native-gesture-handler";
import React, { useState } from "react";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import AppNavigation from "./src/navigation/AppNavigation";
import store from "./src/store/store";

import { bootstrap } from "./src/bootstrap";

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={bootstrap}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }
  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <AppNavigation />
    </Provider>
  );
}
