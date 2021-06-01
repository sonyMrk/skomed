import React, { useState } from "react";
import { Provider } from "react-redux";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import store from "./src/store/store";

import { bootstrap } from "./src/bootstrap";
import AppNavigation from "./src/navigation/AppNavigation";

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
      <StatusBar style="dark" />
      <AppNavigation />
    </Provider>
  );
}
