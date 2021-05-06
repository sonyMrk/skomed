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
} from "../types";
import { userApi } from "../../services/userApi";
import { hospitalApi } from "../../services/hospitalApi";

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
    dispatch(setAppointmentError(error));
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
                (prev, time) => [
                  ...prev,
                  { label: time.TimeStart, value: time },
                ],
                []
              ),
            },
          },
        ];
      }, []);

      shedule.Dates = dates;
      dispatch(setAppointmentShedule(shedule));
  } catch (error) {
    dispatch(setAppointmentError(error));
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
    dispatch(setAppointmentError(error));
    console.log(error);
  } finally {
    dispatch(setAppointmentLoadingProfileSpecs(false));
  }
};
