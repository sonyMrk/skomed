import React from "react";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { AppText } from "../../../components/ui/AppText";
import { normalize } from "../../../utils/normalizeFontSize";
import { THEME } from "../../../theme";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

export const ModalRecordsType = ({
  modalVisible,
  closeModal,
  onMenuItemPress,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.ref}
            onPress={() => {
              onMenuItemPress("AppointmentFamilyDoctor");
              closeModal();
            }}
          >
            <AppText style={styles.text}>Платный прием</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ref}
            onPress={() => {
              onMenuItemPress("AppointmentFamilyDoctor");
              closeModal();
            }}
          >
            <AppText style={styles.text}>К узкому специалисту</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ref}
            onPress={() => {
              onMenuItemPress("AppointmentFamilyDoctor");
              closeModal();
            }}
          >
            <AppText style={styles.text}>К участковому врачу</AppText>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.cancel}
          activeOpacity={0.9}
          onPress={closeModal}
        >
          <AppText style={styles.text}>Отмена</AppText>
        </TouchableOpacity>
      </View>
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
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    width: "93%",
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
    width: "93%",
    paddingVertical: normalize(14),
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: viewportHeight / 14,
  },
});
