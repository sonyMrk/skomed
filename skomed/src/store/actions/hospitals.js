import {
  SET_HOSPITALS_FOR_APPOINTMENT,
  SET_HOSPITALS_ERROR,
  SET_HOSPITALS_LOADING,
  CLEAR_HOSPITALS_ERROR,
  SET_ALL_HOSPITALS,
  CLEAR_ALL_HOSPITALS,
  CLEAR_HOSPITALS_FOR_APPOINTMENT,
  SET_ALL_MO,
  CLEAR_ALL_MO,
} from "../types";
import { hospitalApi } from "../../services/hospitalApi";

export const setHospitalsForAppointment = (payload) => ({
  type: SET_HOSPITALS_FOR_APPOINTMENT,
  payload,
});

export const setAllHospitals = (payload) => ({
  type: SET_ALL_HOSPITALS,
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

export const clearHospitalsError = () => ({
  type: CLEAR_HOSPITALS_ERROR,
});

export const clearAllHospitals = () => ({
  type: CLEAR_ALL_HOSPITALS,
});

export const clearHospitalsForAppointment = () => ({
  type: CLEAR_HOSPITALS_FOR_APPOINTMENT,
});

export const clearAllMo = () => ({
  type: CLEAR_ALL_MO,
});

export const setAllMO = (payload) => ({
  type: SET_ALL_MO,
  payload,
});

export const getHospitalsForAppointment = () => async (dispatch) => {
  try {
    dispatch(setHospitalsLoading(true));
    const respHospitals = await hospitalApi.GetOrgListForAppointment();
    const hospitals = respHospitals.Orgs
      ? respHospitals.Orgs.reduce(
          (prev, org) => [...prev, { label: org.Name, value: org }],
          []
        )
      : [];
    respHospitals.Orgs = hospitals;
    dispatch(setHospitalsForAppointment(respHospitals));
  } catch (error) {
    dispatch(setHospitalsError("Ошибка при загрузки списка организаций"));
  } finally {
    dispatch(setHospitalsLoading(false));
  }
};

export const getAllHospitals = () => async (dispatch) => {
  try {
    dispatch(setHospitalsLoading(true));
    const respHospitals = await hospitalApi.GetOrgListForTimetable();
    const hospitals = respHospitals.Orgs.reduce(
      (prev, org) => [...prev, { label: org.Name, value: org }],
      []
    );
    respHospitals.Orgs = hospitals;
    dispatch(setAllHospitals(respHospitals));
  } catch (error) {
    dispatch(setHospitalsError("Ошибка при загрузки списка организаций"));
  } finally {
    dispatch(setHospitalsLoading(false));
  }
};

export const getAllMO = () => async (dispatch) => {
  try {
    dispatch(setHospitalsLoading(true));
    const MOList = await hospitalApi.GetMOList();

    const localitysName = new Set();
    const typesName = new Set();
    
    // получаем названия населенных пунктов и типы организаций
    for (let org of MOList.DataList) {
      localitysName.add(org.City);
      typesName.add(org.OrgType);
    }

    const localitysArr = []
    const typesApp = []
    // форматируем данные в нужный формат
    for (local of localitysName) {
      localitysArr.push({ label: local, value: local })
    }
    // форматируем данные в нужный формат
    for (type of typesName) {
      typesApp.push({ label: type, value: type })
    }
    
    MOList.locals = localitysArr;
    MOList.types = typesApp;

    dispatch(setAllMO(MOList));
  } catch (error) {
    console.log(error)
    dispatch(setHospitalsError("Ошибка при загрузки списка организаций"));
  } finally {
    dispatch(setHospitalsLoading(false));
  }
};
