import React from "react";
import { Modal, StyleSheet, View } from "react-native";

import { AppButton } from "./ui/AppButton";

import { AppBoldText } from "./ui/AppBoldText";
import { AppTextInput } from "./ui/AppTextInput";

export const InfoModal = ({ visible, onClose, children }) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}></View>
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
    justifyContent: "center",
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
