import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Alert,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";

import { AppBoldText } from "../../components/ui/AppBoldText";
import { THEME } from "../../theme";
import { AppTextInput } from "../../components/ui/AppTextInput";
import { AppButton } from "../../components/ui/AppButton";
import { InfoBlock } from "../../components/InfoBlock";
import { Preloader } from "../../components/ui/Preloader";
import {
  clearHospitalsError,
  getHospitalsForAppointment,
  clearHospitalsForAppointment,
} from "../../store/actions/hospitals";
import {
  getAppointmentUserData,
  clearUserData,
} from "../../store/actions/appointment";
import {
  getHospitalsLoadingState,
  getHospitalsForAppointmentState,
  getHospitalsErrorState,
} from "../../store/selectors/hospitals";
import {
  getAppointmentErrorMessageState,
  getAppointmentUserDataState,
  getAppointmentUserDataLoadingState,
} from "../../store/selectors/appointment";
import {
  getUserIINState,
  getUserFamilyState,
  getUserPhoneState,
} from "../../store/selectors/user";
import { AppText } from "../../components/ui/AppText";
import { Stepper } from "./components/Stepper";
import { normalize } from "../../utils/normalizeFontSize";
import { PeopleItem } from "./components/PeopleItem";
import { ModalAddPerson } from "./components/ModalAddPerson";
import { createFamilyPerson } from "../../store/actions/user";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

const titles = {
  1: "Кого записываем?",
  2: "Куда записываем?",
  3: "Выберите время",
  4: "",
};

export const HospitalSelectionScreen = ({ navigation, navigateTo, route }) => {
  const isHouseCall = navigateTo === "ConfirmHouseCallScreen"; // запись на прием или вызов врача на дом

  const [access, setAccess] = useState(false);
  const [showSupportedHospitals, setShowSupportedHospitals] = useState(false);
  const [organization, setOrganization] = useState(null); // выбранная мед. организация
  const [iinInputValue, setIinInputValue] = useState(userIin); // Значение ИИН в форме

  const dispatch = useDispatch();

  const userIin = useSelector(getUserIINState);
  const profileFamily = useSelector(getUserFamilyState);
  const profilePhone = useSelector(getUserPhoneState);

  const isHospitalLoading = useSelector(getHospitalsLoadingState);
  const hospitalsForAppointment = useSelector(getHospitalsForAppointmentState);
  const hospitalsLoadError = useSelector(getHospitalsErrorState);

  const appointmentUserData = useSelector(getAppointmentUserDataState);
  const appointmentError = useSelector(getAppointmentErrorMessageState);
  const isLoadingUserData = useSelector(getAppointmentUserDataLoadingState);

  const [step, setStep] = useState(1);
  const [visibleAddModal, setVisibleAddModal] = useState(false);
  const [selectedIIN, setSelectedIIN] = useState(null);

  const fetchData = (IIN) => {
    dispatch(getAppointmentUserData(IIN));
  };

  const appointmentType = route.params.type;

  // обработчик выбора ИИН из членов семьи
  const selectIIN = (IIN) => {
    dispatch(clearUserData());
    setAccess(false);
    setSelectedIIN(IIN);
    setStep(2);
    if (
      appointmentType === "familyDoctor" ||
      appointmentType === "profileSpecialists"
    ) {
      fetchData(IIN);
    }
  };

  const handleOpenModal = () => {
    setVisibleAddModal(true);
  };

  const handleCloseModal = () => {
    setVisibleAddModal(false);
  };

  const addFamilyPerson = (newMan) => {
    dispatch(createFamilyPerson(newMan));
  };

  if (isHospitalLoading || isLoadingUserData) {
    return <Preloader />;
  }

  return (
    <View style={styles.container}>
      <Stepper step={step} />
      <View style={styles.title}>
        <AppBoldText style={styles.title__text}>{titles[step]}</AppBoldText>
      </View>
      {userIin && step === 1 && (
        <>
          <ScrollView>
            <View style={styles.peoples}>
              {[{ label: "Вы", value: userIin }, ...profileFamily].map(
                (people) => {
                  return (
                    <PeopleItem
                      item={people}
                      key={people.value}
                      onPress={selectIIN}
                    />
                  );
                }
              )}
            </View>
          </ScrollView>
          <TouchableOpacity style={styles.add} onPress={handleOpenModal}>
            <View>
              <Image
                source={require("../../../assets/icons/add_btn.png")}
                style={styles.add_icon}
              />
            </View>
          </TouchableOpacity>
        </>
      )}

      <ModalAddPerson
        modalVisible={visibleAddModal}
        closeModal={handleCloseModal}
        addPerson={addFamilyPerson}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    padding: 15,
  },
  title: {
    paddingVertical: 10,
  },
  title__text: {
    textAlign: "center",
    fontSize: normalize(23),
  },
  peoples: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: normalize(12),
  },
  add: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    right: 15,
    bottom: 15,
    width: viewportWidth / 7,
    height: viewportWidth / 7,
    borderRadius: viewportWidth / 14,
    backgroundColor: THEME.MAIN_COLOR,
  },
  add_icon: {
    resizeMode: "contain",
    width: viewportWidth / 20,
    height: viewportWidth / 20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  headlessAndroidContainer: {
    borderColor: THEME.MAIN_COLOR,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 15,
    paddingLeft: 15,
    justifyContent: "center",
  },
  inputAndroid: {
    color: "#000",
  },
  iconContainer: {
    backgroundColor: THEME.MAIN_COLOR,
    padding: 5,
    borderRadius: 5,
  },
});
