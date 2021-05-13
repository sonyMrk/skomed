import React from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

import { AppBoldText } from "../components/ui/AppBoldText";
import { AppText } from "../components/ui/AppText";
import { useSelector } from "react-redux";
import { getHistoryAppointmentsState } from "../store/selectors/app";
import { THEME } from "../theme";
import {
  formatServerDate,
  formatDateForHistory,
  compareAscDate,
  defaultFormatDate,
  formatDataDistance,
} from "../utils/formatDate";
import { useState } from "react";
import { AppButton } from "../components/ui/AppButton";

export const HistoryAppointmentsScreen = () => {
  const [isHouseCallScreen, setIsHouseCallScreen] = useState(false);

  const history = useSelector(getHistoryAppointmentsState);


  const handleDeleteAppointment = (id) => {
    console.log(id)
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <AppBoldText style={styles.title}>
            История записей и вызовов врача
          </AppBoldText>
        </View>
        <View style={styles.toggleProfile}>
          <View style={styles.checkboxWrapper}>
            <TouchableOpacity
              onPress={() => setIsHouseCallScreen(false)}
              activeOpacity={0.5}
            >
              <View
                style={[
                  styles.checkbox,
                  !isHouseCallScreen ? styles.activeCheckbox : {},
                ]}
              >
                <AppText
                  style={{
                    textAlign: "center",
                    color: !isHouseCallScreen ? "#fff" : "#000",
                  }}
                >
                  Записи на приемы
                </AppText>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.checkboxWrapper}>
            <TouchableOpacity
              onPress={() => setIsHouseCallScreen(true)}
              activeOpacity={0.5}
            >
              <View
                style={[
                  styles.checkbox,
                  isHouseCallScreen ? styles.activeCheckbox : {},
                ]}
              >
                <AppText
                  style={{
                    textAlign: "center",
                    color: isHouseCallScreen ? "#fff" : "#000",
                  }}
                >
                  Вызовы врача на дом
                </AppText>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {!isHouseCallScreen ? (
          <View>
            {history &&
              history.appointments?.map((app) => {
                return (
                  <View key={app.GUID} style={styles.appointment}>
                    <View style={styles.infoItem}>
                      <AppText>Имя пациента: </AppText>
                      <AppBoldText>{app.patientName}</AppBoldText>
                    </View>
                    <View style={styles.infoItem}>
                      <AppText>Мед. учреждение: </AppText>
                      <AppBoldText>{app.orgName}</AppBoldText>
                    </View>
                    <View style={styles.infoItem}>
                      <AppText>Врач: </AppText>
                      <AppBoldText>{app.doctorName}</AppBoldText>
                    </View>
                    <View style={styles.infoItem}>
                      <AppText>Дата записи: </AppText>
                      <AppBoldText>
                        {formatServerDate(app.RegDateTime)}
                      </AppBoldText>
                    </View>
                    <View style={styles.infoItem}>
                      <AppText>Время приема: </AppText>
                      <AppBoldText>
                        {formatServerDate(app.data)} {app.timeStart}
                      </AppBoldText>
                    </View>
                    <View style={styles.infoItem}>
                      <AppText>Номер талона: </AppText>
                      <AppBoldText>{app.ReceiptNumber}</AppBoldText>
                    </View>
                    <View style={styles.infoItem}>
                      <AppText>Статус: </AppText>
                      <AppBoldText>
                        {compareAscDate(
                          formatDateForHistory(app.data, app.timeStart),
                          new Date()
                        ) === 1
                          ? `До приема осталось ${formatDataDistance(
                              formatDateForHistory(app.data, app.timeStart)
                            )}`
                          : "ЗАВЕРШЕНО"}
                      </AppBoldText>
                    </View>
                    <AppButton onPress={() => { 
                      handleDeleteAppointment(app.GUID)
                    }}>Отменить запись</AppButton>
                  </View>
                );
              })}
          </View>
        ) : (
          <View>
            {history &&
              history.houseCalls?.map((app) => {
                return (
                  <TouchableOpacity key={app.GUID} style={styles.appointment}>
                    <View style={styles.infoItem}>
                      <AppText>Имя пациента: </AppText>
                      <AppBoldText>{app.patientName}</AppBoldText>
                    </View>
                    <View style={styles.infoItem}>
                      <AppText>Мед. учреждение: </AppText>
                      <AppBoldText>{app.orgName}</AppBoldText>
                    </View>
                    <View style={styles.infoItem}>
                      <AppText>Дата вызова: </AppText>
                      <AppBoldText>
                        {formatServerDate(app.RegDateTime)}
                      </AppBoldText>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    paddingVertical: 10,
  },
  appointment: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: THEME.MAIN_COLOR,
    paddingVertical: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
  },
  subtitle: {
    textAlign: "center",
    color: THEME.GRAY_COLOR,
  },
  infoItem: {
    paddingVertical: 5,
  },
  toggleProfile: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkboxWrapper: {
    flexBasis: "48%",
  },
  checkbox: {
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: THEME.MAIN_COLOR,
    borderRadius: 10,
    height: 50,
  },
  activeCheckbox: {
    backgroundColor: THEME.MAIN_COLOR,
  },
  activeText: {
    color: "#fff",
  },
});
