import {
  SET_HOSPITALS,
  SET_HOSPITALS_ERROR,
  SET_HOSPITALS_LOADING,
} from "../types";
import { hospitalApi } from "../../services/hospitalApi";

export const setHospitals = (payload) => ({
  type: SET_HOSPITALS,
  payload,
});

export const setHospitalsError = (payload) => ({
  type: SET_HOSPITALS_ERROR,
  payload,
});

export const setHospitalsLoading = (payload) => ({
  type: SET_HOSPITALS_LOADING,
  payload,
});

export const getHospitals = () => async (dispatch) => {
  try {
    dispatch(setHospitalsLoading(true));
    const hospitals = await hospitalApi.GetOrgListForAppointment();
    dispatch(setHospitals(hospitals));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setHospitalsLoading(false));
  }
};
