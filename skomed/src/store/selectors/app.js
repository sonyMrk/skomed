export const getAppState = (state) => state.app;

export const getInitAppState = (state) => getAppState(state).isInitApp;
export const getAppNotificationsState = (state) =>
  getAppState(state).notifications;
export const getExpoPushTokenState = (state) =>
  getAppState(state).expoPushToken;
export const getSubscriberIdState = (state) => getAppState(state).subscriberId;
export const getNewNotificationsCountState = (state) =>
  getAppState(state).newNotificationsCount;
