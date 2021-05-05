

export const getAppState = (state) => state.app

export const getInitAppState = (state) => getAppState(state).isInitApp;
export const getAppNotificationsState = (state) => getAppState(state).notification;