import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  RefreshControl,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { AppBoldText } from "../components/ui/AppBoldText";
import { AppText } from "../components/ui/AppText";
import {
  cancelReception,
  clearAppointmentError,
} from "../store/actions/appointment";
import {
  getHistoryAppointmentsState,
  getHistoryAppointmentsErrorState,
} from "../store/selectors/app";
import { THEME } from "../theme";
import {
  formatServerDate,
  formatDateForHistory,
  compareAscDate,
  formatDataDistance,
} from "../utils/formatDate";
import { useState } from "react";
import { AppButton } from "../components/ui/AppButton";
import { useEffect } from "react";
import {
  clearHistoryAppointmentsLoading,
  getHistoryAppointments,
  removeItemFromHistoryAppointments,
} from "../store/actions/app";

export const HistoryAppointmentsScreen = () => {
  const [isHouseCallScreen, setIsHouseCallScreen] = useState(false);

  const history = useSelector(getHistoryAppointmentsState);
  const historyError = useSelector(getHistoryAppointmentsErrorState);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getHistoryAppointments());
    dispatch(clearAppointmentError());
    setRefreshing(false);
  }, []);

  const dispatch = useDispatch();

  const handleDeleteAppointment = (orgId, regType, id) => {
    Alert.alert("Запись будет отменена", "Продолжить выполнение операции?", [
      {
        text: "Отмена",
        style: "cancel",
      },
      {
        text: "Ок",
        onPress: () => {
          dispatch(cancelReception(orgId, regType, id));
        },
        style: "default",
      },
    ]);
  };

  const handlePressDel = (id, regType) => {
    Alert.alert("Запись будет удалена", "Продолжить выполнение операции?", [
      {
        text: "Отмена",
        style: "cancel",
      },
      {
        text: "Ок",
        onPress: () => {
          dispatch(removeItemFromHistoryAppointments(id, regType));
        },
        style: "default",
      },
    ]);
  };

  useEffect(() => {
    return () => {
      dispatch(clearHistoryAppointmentsLoading());
    };
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <AppBoldText style={styles.title}>
            История записей и вызовов врача
          </AppBoldText>
          {historyError && (
            <AppBoldText style={styles.error}>{historyError}</AppBoldText>
          )}
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
                      <View>
                        {compareAscDate(
                          formatDateForHistory(app.data, app.timeStart),
                          new Date()
                        ) === 1 ? (
                          <View>
                            <AppBoldText>
                              {`До приема осталось ${formatDataDistance(
                                formatDateForHistory(app.data, app.timeStart)
                              )}`}
                            </AppBoldText>
                          </View>
                        ) : (
                          <View
                            style={{
                              flexDirection: "row",
                              flex: 1,
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <AppBoldText>"ЗАВЕРШЕНО"</AppBoldText>
                            <AppButton
                              style={styles.btn}
                              color={THEME.MAIN_COLOR}
                              onPress={() => {
                                handlePressDel(app.GUID, "1");
                              }}
                            >
                              <Ionicons
                                name="trash"
                                size={20}
                                color={THEME.DANGER_COLOR}
                              />
                            </AppButton>
                          </View>
                        )}
                      </View>
                    </View>
                    {compareAscDate(
                      formatDateForHistory(app.data, app.timeStart),
                      new Date()
                    ) === 1 && (
                      <AppButton
                        onPress={() => {
                          handleDeleteAppointment(app.orgId, "1", app.GUID);
                        }}
                      >
                        Отменить вызов
                      </AppButton>
                    )}
                  </View>
                );
              })}
          </View>
        ) : (
          <View>
            {history &&
              history.houseCalls?.map((app) => {
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
                      <AppText>Дата вызова: </AppText>
                      <AppBoldText>
                        {formatServerDate(app.RegDateTime)}
                      </AppBoldText>
                    </View>
                    <AppButton
                      onPress={() => {
                        handleDeleteAppointment(app.orgId, "2", app.GUID);
                      }}
                    >
                      Отменить вызов
                    </AppButton>
                  </View>
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
  error: {
    textAlign: "center",
    color: THEME.DANGER_COLOR,
  },
  btn: {
    borderRadius: 10,
    paddingHorizontal: 10,
    marginLeft: 25,
  },
});
