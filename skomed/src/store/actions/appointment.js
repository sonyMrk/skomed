import {
  SET_APPOINTMENT_USER_DATA,
  SET_APPOINTMENT_LOADING,
  SET_APPOINTMENT_ERROR,
} from "../types";
import { userApi } from "../../services/userApi";

export const setAppointmentUserData = (payload) => ({
  type: SET_APPOINTMENT_USER_DATA,
  payload,
});

export const setAppointmentLoading = (payload) => ({
  type: SET_APPOINTMENT_LOADING,
  payload,
});

export const setAppointmentError = (payload) => ({
  type: SET_APPOINTMENT_ERROR,
  payload,
});

export const getAppointmentUserData = (iin) => async (dispatch) => {
  try {
    dispatch(setAppointmentLoading(true));
    const userData = await userApi.GetPatientByIIN(iin);
    dispatch(setAppointmentUserData(userData));
  } catch (error) {
    dispatch(setAppointmentError(error));
    console.log(error);
  } finally {
    dispatch(setAppointmentLoading(false));
  }
};
