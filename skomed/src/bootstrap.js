import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const bootstrap = async () => {
  try {
    await Font.loadAsync({
      "roboto-regular": require("../assets/fonts/Roboto-Regular.ttf"),
      "roboto-bold": require("../assets/fonts/Roboto-Bold.ttf"),
    });

    // await db.init()
    // await AsyncStorage.getAllKeys((err, keys) => {
    //   AsyncStorage.multiGet(keys, (error, stores) => {
    //     stores.map((result, i, store) => {
    //       console.log({ [store[i][0]]: store[i][1] });
    //       return true;
    //     });
    //   });
    // });

  } catch (error) {
    console.log("Error ", error);
  }
};
