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
  SET_DOCTORS_LIST_LOADING,
  SET_DOCTORS_TIMETABLE,
  SET_DOCTORS_TIMETABLE_LOADING,
  CLEAR_DOCTORS_TIMETABLE,
  SET_DATA_LIST_FOR_RAITING,
  SET_DATA_LIST_FOR_RAITING_LOADING,
  CLEAR_DATA_LIST_FOR_RAITING,
  SET_LIST_OF_WORKINDICATORS,
  CLEAR_LIST_OF_WORKINDICATORS,
  SET_SCAN_DATA_LIST_FOR_RAITING,
  CLEAR_SCAN_DATA_LIST_FOR_RAITING,
  SET_EVALUATION_RESULT,
  SET_EVALUATION_RESULT_LOADING,
  CLEAR_EVALUATION_RESULT,
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
  payload,
});

export const setDoctorsListLoading = (payload) => ({
  type: SET_DOCTORS_LIST_LOADING,
  payload,
});

export const setDoctorTimetable = (payload) => ({
  type: SET_DOCTORS_TIMETABLE,
  payload,
});

export const setDoctorTimetableLoading = (payload) => ({
  type: SET_DOCTORS_TIMETABLE_LOADING,
  payload,
});

export const clearDataListForTimetable = () => ({
  type: CLEAR_DATA_LIST_FOR_TIMETABLE,
});

export const clearDoctorTimetable = () => ({
  type: CLEAR_DOCTORS_TIMETABLE,
});

export const setDataListForRaiting = (payload) => ({
  type: SET_DATA_LIST_FOR_RAITING,
  payload,
});

export const setDataListForRaitingLoading = (payload) => ({
  type: SET_DATA_LIST_FOR_RAITING_LOADING,
  payload,
});

export const clearDataListForRaing = () => ({
  type: CLEAR_DATA_LIST_FOR_RAITING,
});

export const setListOfWorkIndicators = (payload) => ({
  type: SET_LIST_OF_WORKINDICATORS,
  payload,
});

export const clearListOfWorkIndicator = () => ({
  type: CLEAR_LIST_OF_WORKINDICATORS,
});

export const setScanDataListForRaiting = (payload) => ({
  type: SET_SCAN_DATA_LIST_FOR_RAITING,
  payload,
});

export const clearScanDataListForRaiting = () => ({
  type: CLEAR_SCAN_DATA_LIST_FOR_RAITING,
});

export const setEvaluationResult = (payload) => ({
  type: SET_EVALUATION_RESULT,
  payload
})

export const setEvaluationResultLoading = (payload) => ({
  type: SET_EVALUATION_RESULT_LOADING,
  payload
})

export const clearEvaluationResult = () => ({
  type: CLEAR_EVALUATION_RESULT
})

// THUNKS______________________________________________________________________________________________________________________________

export const getHospitalsForAppointment = () => async (dispatch) => {
  try {
    dispatch(setHospitalsLoading(true));
    const respHospitals = await hospitalApi.GetOrgListForAppointment();
    if (respHospitals.ErrorCode !== 0) {
      dispatch(setHospitalsError(respHospitals.ErrorDesc));
    } else {
      const hospitals = respHospitals.Orgs
        ? respHospitals.Orgs.reduce(
            (prev, org) => [...prev, { label: org.Name, value: org }],
            []
          )
        : [];
      respHospitals.Orgs = hospitals;
      dispatch(setHospitalsForAppointment(respHospitals));
    }
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

    if (respHospitals.ErrorCode !== 0) {
      dispatch(setHospitalsError(respHospitals.ErrorDesc));
    } else {
      const hospitals = respHospitals.Orgs.reduce(
        (prev, org) => [...prev, { label: org.Name, value: org }],
        []
      );
      respHospitals.Orgs = hospitals;
      dispatch(setAllHospitals(respHospitals));
    }
  } catch (error) {
    dispatch(setHospitalsError("Ошибка при загрузки списка организаций"));
  } finally {
    dispatch(setHospitalsLoading(false));
  }
};

export const getHospitalsForRaiting = () => async (dispatch) => {
  try {
    dispatch(setHospitalsLoading(true));
    const respHospitals = await hospitalApi.GetOrgListForRaitings();

    if (respHospitals.ErrorCode !== 0) {
      dispatch(setHospitalsError(respHospitals.ErrorDesc));
    } else {
      const hospitals = respHospitals.Orgs.reduce(
        (prev, org) => [...prev, { label: org.Name, value: org }],
        []
      );
      respHospitals.Orgs = hospitals;
      dispatch(setAllHospitals(respHospitals));
    }
  } catch (error) {
    dispatch(setHospitalsError("Ошибка при загрузки списка организаций"));
  } finally {
    dispatch(setHospitalsLoading(false));
  }
};

export const getDataListForRaiting = (orgId) => async (dispatch) => {
  try {
    dispatch(setDataListForRaitingLoading(true));
    const respDataList = await hospitalApi.GetDataListsForRatings(orgId);

    if (respDataList.ErrorCode !== 0) {
      dispatch(setHospitalsError(respDataList.ErrorDesc));
    } else {
      const doctorsList = respDataList.ListsMap.reduce(
        (prev, doc) => [...prev, { label: doc.Doctor, value: doc }],
        []
      );
      respDataList.ListsMap = doctorsList;
      dispatch(setDataListForRaiting(respDataList));
    }
  } catch (error) {
    dispatch(setHospitalsError("Ошибка при загрузки списка врачей"));
  } finally {
    dispatch(setDataListForRaitingLoading(false));
  }
};

export const getScanDataListForRaiting = (orgId, cabId) => async (dispatch) => {
  try {
    dispatch(setDataListForRaitingLoading(true));
    const respDataList = await hospitalApi.GetDataListsForRatings(orgId);

    if (respDataList.ErrorCode !== 0) {
      dispatch(setHospitalsError(respDataList.ErrorDesc));
    } else {
      const doctorsList = respDataList.ListsMap.filter(
        (doc) => doc.CabinetGUID === cabId
      ).reduce((prev, doc) => [...prev, { label: doc.Doctor, value: doc }], []);
      respDataList.ListsMap = doctorsList;
      dispatch(setScanDataListForRaiting(respDataList));
    }
  } catch (error) {
    dispatch(setHospitalsError("Ошибка при загрузки списка врачей"));
  } finally {
    dispatch(setDataListForRaitingLoading(false));
  }
};

export const getListForWorkIndicator = (typeId=1) => async (dispatch) => {
  try {
    const respHospitals = await hospitalApi.GetListOfWorkIndicators(typeId);

    if (respHospitals.ErrorCode !== 0) {
      dispatch(setHospitalsError(respHospitals.ErrorDesc));
    } else {
      dispatch(setListOfWorkIndicators(respHospitals.Indicators));
    }
  } catch (error) {
    dispatch(setHospitalsError("Ошибка при загрузки списка организаций"));
  }
};

export const getAllMO = () => async (dispatch) => {
  try {
    dispatch(setHospitalsLoading(true));
    const MOList = await hospitalApi.GetMOList();

    if (MOList.ErrorCode !== 0) {
      dispatch(setHospitalsError(MOList.ErrorDesc));
    } else {
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
    }
  } catch (error) {
    console.log(error);
    dispatch(setHospitalsError("Ошибка при загрузки списка организаций"));
  } finally {
    dispatch(setHospitalsLoading(false));
  }
};

export const getDataListForTimetable = (orgId) => async (dispatch) => {
  try {
    dispatch(setDoctorsListLoading(true));
    const dataForTimeTable = await hospitalApi.GetDataListsForTimetable(orgId);
    if (dataForTimeTable.ErrorCode !== 0) {
      dispatch(setHospitalsError(dataForTimeTable.ErrorDesc));
    } else {
      const doctorsList = dataForTimeTable?.ListsMap?.reduce((prev, doc) => {
        return [...prev, { label: doc.Doctor, value: doc }];
      }, []);

      dataForTimeTable.ListsMap = doctorsList;

      dispatch(setDataListForTimeTable(dataForTimeTable));
    }
  } catch (error) {
    console.log(error);
    dispatch(setHospitalsError("Ошибка при загрузки списка врачей"));
  } finally {
    dispatch(setDoctorsListLoading(false));
  }
};

export const getDoctorTimetable = (orgId, doctorId, cabinetId) => async (
  dispatch
) => {
  try {
    dispatch(setDoctorTimetableLoading(true));
    const timetableData = await hospitalApi.GetDoctorsTimetable(
      orgId,
      doctorId,
      cabinetId
    );
    if (timetableData.ErrorCode !== 0) {
      dispatch(setHospitalsError(timetableData.ErrorDesc));
    } else {
      const timetable = timetableData.Timetable.map((day) => {
        return [
          `${day.Date} (${day.DayShortView})`,
          `${
            day.VacationDay === "1"
              ? "Отпуск"
              : `${day.TimeWorkStart} - ${day.TimeWorkEnd}`
          }`,
          `${day.TimeBreakStart} - ${day.TimeBreakEnd}`,
        ];
      });

      timetableData.Timetable = timetable;

      dispatch(setDoctorTimetable(timetableData));
    }
  } catch (error) {
    console.log(error);
    dispatch(setHospitalsError("Ошибка при загрузки расписания"));
  } finally {
    dispatch(setDoctorTimetableLoading(false));
  }
};

export const setEvaluation = (iin, orgId, doctorId, doctorName, cabinetId, cabinetName, appraisals, comment) => async (dispatch) => {
  try {
    dispatch(setEvaluationResultLoading(true));
    const respData = await hospitalApi.SaveWorkIndicatorsByUser(iin, orgId, doctorId, doctorName, cabinetId, cabinetName, appraisals, comment);

    if (respData.ErrorCode !== 0) {
      dispatch(setHospitalsError(respData.ErrorDesc));
    } else {
      dispatch(setEvaluationResult(respData));
    }
  } catch (error) {
    console.log(error);
    dispatch(setHospitalsError("Ошибка при сохранении оценки"));
  } finally {
    dispatch(setEvaluationResultLoading(false));
  }
}