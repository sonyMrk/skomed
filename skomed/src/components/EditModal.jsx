import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, View } from "react-native";

import { AppButton } from "./ui/AppButton";

import { AppBoldText } from "./ui/AppBoldText";
import { AppTextInput } from "./ui/AppTextInput";

export const EditModal = ({
  visible,
  toggleModal,
  onSave,
  editMode,
  personData,
  offEditMode,
}) => {
  const [iinValue, setIinValue] = useState("");
  const [nameValue, setNameValue] = useState("");

  useEffect(() => {
    setIinValue(personData.iin);
    setNameValue(personData.name);
  }, [editMode, personData]); // хз как синхронизировать

  const closeModal = () => {
    setIinValue("");
    setNameValue("");
    toggleModal();
    offEditMode();
  };

  const handlePressOk = () => {
    const newObj = {
      id: toString(Math.random()),
      relationship: "Сын",
      name: nameValue,
      iin: iinValue,
    };
    onSave(newObj);
    closeModal();
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <AppBoldText style={styles.title}>
              {editMode ? "Редактирование" : "Добавить члена семьи"}
            </AppBoldText>
            <AppTextInput
              placeholder="ИНН"
              value={iinValue}
              onChange={setIinValue}
              type="numeric"
            />
            <AppTextInput
              placeholder="ФИО"
              value={nameValue}
              onChange={setNameValue}
              autoCapitalize="words"
            />
            <View style={styles.actions}>
              <View>
                <AppButton onPress={() => {}} onPress={handlePressOk}>
                  {editMode ? "Сохранить изменения" : "Добавить"}
                </AppButton>
              </View>
              <View>
                <AppButton
                  onPress={() => {
                    closeModal();
                  }}
                  color="#ff4d4d"
                >
                  Отмена
                </AppButton>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    flex: 1,
    width: "100%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    width: "100%",
  },
  title: {
    textAlign: "center",
    textTransform: "uppercase",
    paddingVertical: 20,
    backgroundColor: "#fff",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    marginTop: 20,
    width: "100%",
  },
});
