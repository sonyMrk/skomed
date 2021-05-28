import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { AppText } from "../../../components/ui/AppText";
import { normalize } from "../../../utils/normalizeFontSize";
import { THEME } from "../../../theme";
import { AppTextInput } from "../../../components/ui/AppTextInput";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

export const ModalAddPerson = ({ modalVisible, closeModal, addPerson }) => {
  const [iinValue, setIINValue] = useState("");
  const [nameValue, setNameValue] = useState("");

  const handleAddPerson = () => {
    if (iinValue.trim().length !== 12 || isNaN(iinValue)) {
      Alert.alert("Не корректный ИИН", "Значение ИИН должно быть 12 цифр");
    } else {
      const newObj = {
        label: nameValue,
        value: iinValue,
      };
      addPerson(newObj);
      setIINValue("");
      setNameValue("");
      closeModal();
    }
  };

  const handlePressOut = () => {
    Keyboard.dismiss();
    closeModal();
  };

  const ModalWrapper = Platform.OS === "android" ? View : KeyboardAvoidingView;

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.centeredView}
        onPress={handlePressOut}
      >
        <ModalWrapper style={styles.wrapper} behavior="padding">
          <View style={styles.modalView}>
            <AppTextInput
              placeholder="ИНН"
              value={iinValue}
              onChange={setIINValue}
              type="numeric"
              style={{ marginBottom: 12 }}
              maxLength={12}
            />
            <AppTextInput
              placeholder="ФИО"
              value={nameValue}
              onChange={setNameValue}
              autoCapitalize="words"
            />
            <TouchableOpacity
              style={styles.add_btn}
              activeOpacity={0.9}
              onPress={handleAddPerson}
            >
              <AppText style={styles.text}>Добавить</AppText>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.cancel}
            activeOpacity={0.9}
            onPress={closeModal}
          >
            <AppText style={styles.text}>Отмена</AppText>
          </TouchableOpacity>
        </ModalWrapper>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
  },
  wrapper: {
    width: "93%",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ref: {
    paddingVertical: normalize(14),
    borderBottomWidth: 1,
    borderBottomColor: "rgba(52, 52, 52, 0.8)",
  },
  text: {
    textAlign: "center",
    fontSize: normalize(17),
    color: THEME.BLUE_COLOR,
  },
  cancel: {
    width: "100%",
    paddingVertical: normalize(14),
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: viewportHeight / 14,
  },
  add_btn: {
    marginTop: viewportHeight / 55,
    paddingVertical: viewportHeight / 55,
  },
});
