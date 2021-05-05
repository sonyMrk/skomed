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
  SET_DATA_LIST_FOR_TIMETABLE,
  CLEAR_DATA_LIST_FOR_TIMETABLE,
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

export const setDataListForTimeTable = (payload) => ({
  type: SET_DATA_LIST_FOR_TIMETABLE,
  payload
})

export const clearDataListForTimetable = () => ({
  type: CLEAR_DATA_LIST_FOR_TIMETABLE
})

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

    if (MOList.ErrorCode !== 0) {
      dispatch(setHospitalsError(MOList.ErrorDesc));
    }

    const localitysName = new Set();

    // получаем названия населенных пунктов и типы организаций
    for (let org of MOList.DataList) {
      localitysName.add(org.City);
    }

    const localitysArr = [];
    // форматируем данные в нужный формат
    for (local of localitysName) {
      localitysArr.push({ label: local, value: local });
    }

    MOList.locals = localitysArr;

    dispatch(setAllMO(MOList));
  } catch (error) {
    console.log(error);
    dispatch(setHospitalsError("Ошибка при загрузки списка организаций"));
  } finally {
    dispatch(setHospitalsLoading(false));
  }
};

export const getDataListForTimetable = (orgId) => async (dispatch) => {
  try {
    dispatch(setHospitalsLoading(true));
    const dataForTimeTable = await hospitalApi.GetDataListsForTimetable(orgId);
    if (dataForTimeTable.ErrorCode !== 0) {
      dispatch(setHospitalsError(dataForTimeTable.ErrorDesc));
    } else {

      const doctorsList = dataForTimeTable.ListsMap.reduce((prev, doc) => {
        return [...prev, { label: doc.Doctor, value: doc }] 
      }, [])

      dataForTimeTable.ListsMap = doctorsList
      
      dispatch(setDataListForTimeTable(dataForTimeTable));
    }
  } catch (error) {
    dispatch(setHospitalsError("Ошибка при загрузки списка организаций"));
  } finally {
    dispatch(setHospitalsLoading(false));
  }
}