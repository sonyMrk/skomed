import {
  SET_MEDICATIONS_ERROR,
  SET_MEDICATIONS_LIST,
  SET_MEDICATIONS_LIST_LOADING,
  CLEAR_MEDICATIONS_ERROR,
  CLEAR_MEDICATIONS_LIST,
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

export const clearMedicationsList = () => ({
  type: CLEAR_MEDICATIONS_LIST,
});

export const getMedicationsList = (name, pharmacy, district) => async (
  dispatch
) => {
  try {
    dispatch(setMedicationsLoading(true));
    const respData = await getListOfMedications(name, pharmacy, district);
    if (respData) {
      dispatch(setMedicationsList(respData.data));
    }
  } catch (error) {
    console.log("getMedicationsList", error);
    dispatch(setMedicationsError("Ошибка при загрузке данных"));
  } finally {
    dispatch(setMedicationsLoading(false));
  }
};
