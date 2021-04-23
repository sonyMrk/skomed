import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { AntDesign } from '@expo/vector-icons';

import { AppBoldText } from "../components/ui/AppBoldText";
import { THEME } from "../theme";

export const AppointmentScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppBoldText style={styles.title}>Выбор мед организации</AppBoldText>
      </View>
      <View style={styles.select}>
        <RNPickerSelect
          placeholder={{
            label: "Выберите организацию для записи",
            value: null,
            color: THEME.MAIN_COLOR,
          }}
          onValueChange={(value) => console.log(value)}
          items={[
            { label: "Football", value: { name: "football", id: 2 }, inputLabel: "inputLabel", key: "key", color: "red" },
            { label: "Baseball", value: "baseball" },
            { label: "Hockey", value: "hockey" },
          ]}
          useNativeAndroidPickerStyle={false}
          style={{
            inputAndroidContainer: {
              
            },
            headlessAndroidContainer: {
              borderWidth: 2,
              borderColor: THEME.MAIN_COLOR,
              justifyContent: "center",
              borderRadius: 5,
              borderWidth: 2,
              padding: 10
            },
            iconContainer: {
              backgroundColor: THEME.MAIN_COLOR,
              padding: 5,
              borderRadius: 5,
            },
            placeholder: {
              fontSize: 15,
              color: "#000"
            }
          }}
          Icon={() => (<AntDesign name="medicinebox" size={20} color="white" />)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
  },
  select: {
    padding: 15,
  },
});
