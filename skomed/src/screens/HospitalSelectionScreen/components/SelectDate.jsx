import React from "react";
import { StyleSheet, View, ScrollView, Dimensions } from "react-native";
import { TimeBadge } from "./TimeBadge";
import { normalize } from "../../../utils/normalizeFontSize";
import { AppSelect } from "../../../components/ui/AppSelect";
import { AppText } from "../../../components/ui/AppText";
import { AppButton } from "../../../components/ui/AppButton";
import { AppBoldText } from "../../../components/ui/AppBoldText";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

export const SelectDate = ({
  appointmentData,
  handleChangeDate,
  sheduleData,
  setAppointmentTime,
  handleSaveAppointment,
  appointmentTime,
}) => {
  if (appointmentData?.Times.length === 0) {
    return (
      <View style={styles.empty}>
        <AppText style={styles.empty__text}>
          У врача отсутствует свободное время записи. Для записи обратитесь в
          регистратуру поликлиники!
        </AppText>
      </View>
    );
  }

  return (
    <View style={styles.selectDate}>
      <View style={styles.select}>
        <AppSelect
          placeholder="Выберите дату"
          value={appointmentData}
          onValueChange={handleChangeDate}
          data={sheduleData ? sheduleData : []}
        />
      </View>
      <View style={styles.times}>
        <View>
          <AppText style={styles.times__title}>Доступное время:</AppText>
        </View>
        <ScrollView style={styles.time_scroll}>
          <View style={styles.times__list}>
            {appointmentData &&
              appointmentData.Times.map((time) => {
                return (
                  <TimeBadge
                    time={time}
                    setAppointmentTime={setAppointmentTime}
                    appointmentTimeStart={appointmentTime?.TimeStart}
                    key={time.label}
                  />
                );
              })}
          </View>
        </ScrollView>
        <AppButton
          style={{
            marginHorizontal: normalize(10),
          }}
          disabled={!appointmentTime}
          onPress={handleSaveAppointment}
        >
          Далее
        </AppButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  times: {
    marginTop: normalize(20),
    flex: 1,
  },
  time_scroll: {
    height: "100%",
    marginVertical: 15,
  },
  times__list: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  times__title: {
    fontSize: normalize(20),
    marginHorizontal: normalize(15),
  },
  select: {
    marginVertical: 10,
    marginHorizontal: normalize(15),
  },
  selectDate: {
    paddingBottom: normalize(25),
    flex: 1,
    justifyContent: "space-between",
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: normalize(20),
  },
  empty__text: {
    textAlign: "center",
  },
});
