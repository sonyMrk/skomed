import React from "react";
import { StyleSheet, View } from "react-native";
import { AppSelect } from "../../../components/ui/AppSelect";
import { AppButton } from "../../../components/ui/AppButton";
import { normalize } from "../../../utils/normalizeFontSize";

export const SelectSpecialization = ({
  specialization,
  handleChangeSpecialization,
  profileData,
  doctor,
  handleChangeDoctor,
  specializationData,
  goToSelectDate,
  disabled,
}) => {
  return (
    <View style={styles.profileActions}>
      <AppSelect
        placeholder="Выберите специализацию:"
        value={specialization}
        onValueChange={handleChangeSpecialization}
        data={profileData ? profileData : []}
      />
      <AppSelect
        placeholder="Выберите врача:"
        value={doctor}
        onValueChange={handleChangeDoctor}
        data={specializationData ? specializationData : []}
      />
      <AppButton
        style={{ marginTop: normalize(10) }}
        onPress={goToSelectDate}
        disabled={disabled}
      >
        Далее
      </AppButton>
    </View>
  );
};

const styles = StyleSheet.create({
  profileActions: {
    marginTop: normalize(20),
  },
});
