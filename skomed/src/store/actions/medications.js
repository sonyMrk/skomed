import {
  SET_MEDICATIONS_ERROR,
  SET_MEDICATIONS_LIST,
  SET_MEDICATIONS_LIST_LOADING,
  CLEAR_MEDICATIONS_ERROR,
} from "./../types";
import { getListOfMedications } from "./../../services/medicationsApi";

export const setMedicationsError = (payload) => ({
  type: SET_MEDICATIONS_ERROR,
  payload,
});

export const setMedicationsLoading = (payload) => ({
  type: SET_MEDICATIONS_LIST_LOADING,
  payload,
});

export const setMedicationsList = (payload) => ({
  type: SET_MEDICATIONS_LIST,
  payload,
});

export const clearMedicationsError = () => ({
  type: CLEAR_MEDICATIONS_ERROR,
});

export const getMedicationsList =
  (name, pharmacy, district) => async (dispatch) => {
    try {
      dispatch(setMedicationsLoading(true));
      const respData = await getListOfMedications(name, pharmacy, district);
      dispatch(setMedicationsList(respData.data));
    } catch (error) {
      dispatch(setMedicationsError("Ошибка при загрузке данных"));
    } finally {
      dispatch(setMedicationsLoading(false));
    }
  };
