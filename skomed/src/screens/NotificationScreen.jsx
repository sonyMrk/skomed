import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  getExpoPushTokenState,
  getAppNotificationsState,
  getAppNotificationsErrorState,
  getAppNotificationsLoadingState,
  getNewNotificationsCountState,
  getSubscriberIdState,
  getDeviceIdState,
} from "../store/selectors/app";
import { THEME } from "../theme";
import { AppBoldText } from "../components/ui/AppBoldText";
import { AppText } from "../components/ui/AppText";
import { formatServerDate } from "../utils/formatDate";
import { useState } from "react";
import { confirmMessageViewingOnDevice } from "../store/actions/app";
import { AppButton } from "../components/ui/AppButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NotificationItem = ({ item, expoPushToken }) => {
  const [fullSize, setFullSize] = useState(false);

  const subscriberId = useSelector(getSubscriberIdState);
  const deviceId = useSelector(getDeviceIdState);


  const dispatch = useDispatch()

  const handlePressOnItem = () => {
    setFullSize(!fullSize)
    dispatch(confirmMessageViewingOnDevice(subscriberId, deviceId, item.MessageGUID, expoPushToken ))
  }

  return (
    <TouchableOpacity style={styles.notification} onPress={handlePressOnItem}>
      <View style={styles.notification__date}>
        <AppText>{formatServerDate(item.Date)}</AppText>
      </View>
      <View>
        {item.IsNew ? (
          <AppBoldText>
            {fullSize ? item.Text : `${item.Text.slice(0, 40)}...`}
          </AppBoldText>
        ) : (
          <AppText>
            {fullSize ? item.Text : `${item.Text.slice(0, 40)}...`}
          </AppText>
        )}
      </View>
    </TouchableOpacity>
  );
};

export const NotificationScreen = ({}) => {
  const expoPushToken = useSelector(getExpoPushTokenState);
  const notifications = useSelector(getAppNotificationsState);
  const notificationsError = useSelector(getAppNotificationsErrorState);
  const notificationsLoading = useSelector(getAppNotificationsLoadingState);
  const newNotificationsCount = useSelector(getNewNotificationsCountState);
   

  if (notificationsLoading) {
    return <Preloader />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppBoldText style={styles.title}>Уведомления</AppBoldText>
        {/* Выводим ошибки */}
        {notificationsError ? (
          <AppBoldText style={styles.error}>{notificationsError}</AppBoldText>
        ) : null}
      </View>
      {newNotificationsCount === 0 ? null : (
        <View style={styles.header}>
          <AppBoldText
            style={styles.count}
          >{`У вас ${newNotificationsCount} новых уведомления (-ий)!`}</AppBoldText>
        </View>
      )}
      <View style={styles.list}>
        {notifications &&
          notifications.map((notification) => {
            return (
              <NotificationItem
                expoPushToken={expoPushToken}
                item={notification}
                key={notification.MessageGUID}
              />
            );
          })}
      </View>
      <AppButton onPress={() => { AsyncStorage.clear() }}>Очистить хранилище</AppButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 5,
  },
  count: {
    color: "#009933",
    textAlign: "center",
    fontSize: 16,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
  },
  error: {
    color: THEME.DANGER_COLOR,
    fontSize: 18,
    textAlign: "center",
  },
  list: {
    padding: 20,
  },
  notification: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: THEME.MAIN_COLOR,
    paddingBottom: 10,
  },
  notification__date: {
    marginBottom: 5,
  },
});

