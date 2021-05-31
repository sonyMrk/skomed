import {
  SET_APPOINTMENT_USER_DATA,
  SET_APPOINTMENT_ERROR,
  CLEAR_APPOINTMENT_USER_DATA,
  SET_APPOINTMENT_SHEDULE,
  CLEAR_APPOINTMENT_SHEDULE,
  SET_APPOINTMENT_PROFILE_SPECS,
  CLEAR_APPOINTMENT_PROFILE_SPECS,
  SET_APPOINTMENT_LOADING_USER_DATA,
  SET_APPOINTMENT_LOADING_SHEDULE,
  SET_APPOINTMENT_LOADING_PROFILE_SPECS,
  CLEAR_APPOINTMENT_ERROR,
  SET_HOUSE_CALL_RESULT,
  SET_SAVE_APPOINTMENT_RESULT,
  SET_SAVE_APPOINTMENT_LOADING,
  CLEAR_HOUSE_CALL_RESULT,
  CLEAR_SAVE_APPOINTMENT_RESULT,
  SET_HISTOTRY_APPOINTMENTS,
  SET_HISTOTRY_APPOINTMENTS_ERROR,
  SET_HISTOTRY_APPOINTMENTS_LOADING,
} from "../types";
import { userApi } from "../../services/userApi";
import { hospitalApi } from "../../services/hospitalApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const setAppointmentUserData = (payload) => ({
  type: SET_APPOINTMENT_USER_DATA,
  payload,
});

export const setAppointmentLoadingUserData = (payload) => ({
  type: SET_APPOINTMENT_LOADING_USER_DATA,
  payload,
});

export const setAppointmentLoadingShedule = (payload) => ({
  type: SET_APPOINTMENT_LOADING_SHEDULE,
  payload,
});

export const setAppointmentLoadingProfileSpecs = (payload) => ({
  type: SET_APPOINTMENT_LOADING_PROFILE_SPECS,
  payload,
});

export const setAppointmentError = (payload) => ({
  type: SET_APPOINTMENT_ERROR,
  payload,
});

export const clearUserData = () => ({
  type: CLEAR_APPOINTMENT_USER_DATA,
});

export const setAppointmentShedule = (payload) => ({
  type: SET_APPOINTMENT_SHEDULE,
  payload,
});

export const clearShedule = () => ({
  type: CLEAR_APPOINTMENT_SHEDULE,
});

export const setAppointmentProfileSpecs = (payload) => ({
  type: SET_APPOINTMENT_PROFILE_SPECS,
  payload,
});

export const clearProfileSpecs = () => ({
  type: CLEAR_APPOINTMENT_PROFILE_SPECS,
});

export const clearAppointmentError = () => ({
  type: CLEAR_APPOINTMENT_ERROR,
});

export const setHouseCallResult = (payload) => ({
  type: SET_HOUSE_CALL_RESULT,
  payload,
});

export const clearHouseCallResult = () => ({
  type: CLEAR_HOUSE_CALL_RESULT,
});

export const setAppointmentSaveResult = (payload) => ({
  type: SET_SAVE_APPOINTMENT_RESULT,
  payload,
});

export const clearAppointmentSaveResult = () => ({
  type: CLEAR_SAVE_APPOINTMENT_RESULT,
});

export const setAppointmentSaveLoading = (payload) => ({
  type: SET_SAVE_APPOINTMENT_LOADING,
  payload,
});

export const setHistoryAppointments = (payload) => ({
  type: SET_HISTOTRY_APPOINTMENTS,
  payload,
});

export const getAppointmentUserData = (iin) => async (dispatch) => {
  try {
    dispatch(clearAppointmentError());
    dispatch(setAppointmentLoadingUserData(true));
    const userData = await userApi.GetPatientByIIN(iin);
    if (userData.ErrorCode !== 0) {
      dispatch(setAppointmentError(userData.ErrorDesc));
    }
    dispatch(setAppointmentUserData(userData));
  } catch (error) {
    dispatch(
      setAppointmentError("Ошибка при получении данных о пользователе!")
    );
    console.log(error);
  } finally {
    dispatch(setAppointmentLoadingUserData(false));
  }
};

export const getShedule = (orgId, doctorId, profileId) => async (dispatch) => {
  try {
    dispatch(setAppointmentLoadingShedule(true));
    const shedule = await hospitalApi.GetShedule(orgId, doctorId, profileId);

    const dates = shedule.Dates?.reduce((prev, date) => {
      return [
        ...prev, // форматируем для селекта выбора даты
        {
          label: date.DateView,
          value: {
            ...date,
            Times: date.Times.reduce(
              // форматируем для селекта выбора времени
              (prev, time) => [...prev, { label: time.TimeStart, value: time }],
              []
            ),
          },
        },
      ];
    }, []);

    shedule.Dates = dates;
    dispatch(setAppointmentShedule(shedule));
  } catch (error) {
    dispatch(setAppointmentError("Ошибка при получении данных о расписании!"));
    console.log(error);
  } finally {
    dispatch(setAppointmentLoadingShedule(false));
  }
};

export const getProfileSpecsData = (orgId) => async (dispatch) => {
  try {
    dispatch(setAppointmentLoadingProfileSpecs(true));
    const profileSpecs = await hospitalApi.GetProfileSpecsData(orgId);

    const profiles = profileSpecs.Profiles.reduce((prev, profile) => {
      return [
        ...prev, // форматируем для выбора специализации
        {
          label: profile.Name,
          value: {
            ...profile,
            Specialists: profile.Specialists.reduce((prev, spec) => {
              return [...prev, { label: spec.Doctor, value: spec }]; // форматируем для выбора врача
            }, []),
          },
        },
      ];
    }, []);

    profileSpecs.Profiles = profiles;
    dispatch(setAppointmentProfileSpecs(profileSpecs));
  } catch (error) {
    dispatch(
      setAppointmentError("Ошибка при получении данных о специалистах!")
    );
    console.log(error);
  } finally {
    dispatch(setAppointmentLoadingProfileSpecs(false));
  }
};

export const saveAppointment = (
  info,
  iin,
  orgId,
  doctorId,
  date,
  TimeStart,
  timeEnd,
  recordingMethod,
  cabinetId,
  reason,
  language
) => async (dispatch) => {
  try {
    dispatch(setAppointmentSaveLoading(true));

    const respData = await hospitalApi.SaveAppointment(
      iin,
      orgId,
      doctorId,
      date,
      TimeStart,
      timeEnd,
      recordingMethod,
      cabinetId,
      reason,
      language
    );

    if (respData.ErrorCode !== 0) {
      dispatch(setAppointmentError(respData.ErrorDesc));
    } else {
      const history = await AsyncStorage.getItem("history");
      const updateHistory = JSON.parse(history);

      updateHistory.appointments.push({
        ...respData,
        ...info,
        iin,
        dateCancel: null,
      });

      await AsyncStorage.setItem("history", JSON.stringify(updateHistory));

      dispatch(
        setAppointmentSaveResult({
          ...respData,
          ...info,
          iin,
          dateCancel: null,
        })
      );
      dispatch(getHistoryAppointments());
    }
  } catch (error) {
    dispatch(setAppointmentError("Ошибка при сохранении записи на прием!"));
    console.log(error);
  } finally {
    dispatch(setAppointmentSaveLoading(false));
  }
};

export const saveHouseCall = (
  info,
  iin,
  orgId,
  phoneNumber,
  reason,
  recordingMethod,
  language
) => async (dispatch) => {
  try {
    dispatch(setAppointmentSaveLoading(true));

    const respData = await hospitalApi.SaveDoctorCall(
      iin,
      orgId,
      phoneNumber,
      reason,
      recordingMethod,
      language
    );

    if (respData.ErrorCode !== 0) {
      dispatch(setAppointmentError(respData.ErrorDesc));
    } else {
      const history = await AsyncStorage.getItem("history");

      const updateHistory = JSON.parse(history);

      updateHistory.houseCalls.push({
        ...respData,
        ...info,
        iin,
        dateCancel: null,
      });

      await AsyncStorage.setItem("history", JSON.stringify(updateHistory));

      dispatch(setHouseCallResult(respData));
      dispatch(getHistoryAppointments());
    }
  } catch (error) {
    dispatch(setAppointmentError("Ошибка при сохранении вызова врача на дом!"));
    console.log(error);
  } finally {
    dispatch(setAppointmentSaveLoading(false));
  }
};

export const cancelReception = (orgId, regType, id) => async (dispatch) => {
  try {
    const types = {
      1: "appointments",
      2: "houseCalls",
    };

    const currentType = types[regType];

    dispatch(setAppointmentSaveLoading(true));

    const respData = await hospitalApi.СancelReception(orgId, regType, id);

    console.log("orgId, regType, id", orgId, regType, id);
    console.log(respData);

    if (respData.ErrorCode !== 0) {
      dispatch(setAppointmentError(respData.ErrorDesc));
    }
    if (!respData.UnregDateTime) {
      dispatch(
        setAppointmentError(
          respData.ErrorDesc
            ? respData.ErrorDesc
            : "Ошибка отмены регистрации - отмена визита возможна не менее чем за 1 час до начала приема!"
        )
      );
    } else {
      const history = await AsyncStorage.getItem("history");

      const updateHistory = JSON.parse(history);

      const filteredHistory = updateHistory[currentType].filter(
        (rec) => rec.GUID !== id
      );

      updateHistory[currentType] = filteredHistory;

      await AsyncStorage.setItem("history", JSON.stringify(updateHistory));

      dispatch(getHistoryAppointments());
    }
  } catch (error) {
    dispatch(setAppointmentError("Ошибка при удалении записи"));
    console.log(error);
  } finally {
    dispatch(setAppointmentSaveLoading(false));
  }
};

export const getHistoryAppointments = () => async (dispatch) => {
  try {
    let history = await AsyncStorage.getItem("history");

    if (history) {
      const parsedHistory = JSON.parse(history);

      dispatch(setHistoryAppointments(parsedHistory));
    } else {
      await AsyncStorage.setItem(
        "history",
        JSON.stringify({
          appointments: [],
          houseCalls: [],
        })
      );
      dispatch(setHistoryAppointments([]));
    }
  } catch (error) {
    dispatch(setNotificationsError("Ошибка сети, попробуйте еще раз"));
    console.log("getHistoryAppointments", error);
  }
};

export const removeItemFromHistoryAppointments = (id, regType) => async (
  dispatch
) => {
  try {
    const types = {
      1: "appointments",
      2: "houseCalls",
    };

    const currentType = types[regType];

    dispatch(setAppointmentSaveLoading(true));

    const history = await AsyncStorage.getItem("history");

    const updateHistory = JSON.parse(history);

    const filteredHistory = updateHistory[currentType].filter(
      (rec) => rec.GUID !== id
    );

    updateHistory[currentType] = filteredHistory;

    await AsyncStorage.setItem("history", JSON.stringify(updateHistory));

    dispatch(getHistoryAppointments());
  } catch (error) {
    dispatch(setNotificationsError("Ошибка сети, попробуйте еще раз"));
    console.log("getHistoryAppointments", error);
  }
};
