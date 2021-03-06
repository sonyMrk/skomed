const getHospitalsState = (state) => state.hospitals;

export const getHospitalsLoadingState = (state) =>
  getHospitalsState(state).isLoading;

export const getHospitalsForAppointmentState = (state) =>
  getHospitalsState(state).hospitalsForAppointment;

export const getAllHospitalsState = (state) =>
  getHospitalsState(state).allHospitals;

export const getHospitalsErrorState = (state) =>
  getHospitalsState(state).errorMessage;

export const getHospitalsForSickListState = (state) => {
  const hospitalsState = getAllHospitalsState(state);
  if (hospitalsState) {
    const filterHospitals = hospitalsState.Orgs.filter(
      (item) => item.value.SickListsSearch
    );
    hospitalsState.Orgs = filterHospitals;
  }

  return hospitalsState;
};

// для записи на платный прием

export const getHospitalsForPaidAppointmentState = (state) => {
  return getHospitalsForAppointmentState(state)?.Orgs.filter(
    (hospital) =>
      hospital.value.OrgID === "335" ||
      hospital.value.OrgID === "45500000000000184"
  ); // есиль диагностик || областная взрослая пол-ка
};

// для справочника организаций

export const getAllMOState = (state) => getHospitalsState(state)?.allMo;
export const getAllMoErrorDesc = (state) => getAllMOState(state)?.ErrorDesc;
export const getAllMoLocals = () => (state) => getAllMOState(state)?.locals;

export const getAllMoTypes = (localityValue) => (state) => {
  const moList = getAllMOState(state)?.DataList;
  if (moList) {
    const filterMOList = moList.filter((mo) => mo.City === localityValue);

    const typesName = new Set();
    const typesApp = [];

    for (let org of filterMOList) {
      typesName.add(org.OrgType);
    }

    for (type of typesName) {
      typesApp.push({ label: type, value: type });
    }

    return typesApp;
  } else {
    return [];
  }
};

export const getAllMoList = (localityValue, typeValue, searchInput) => (
  state
) => {
  const moList = getAllMOState(state)?.DataList;
  if (moList && (typeValue || searchInput)) {
    const filterMOList = moList.filter((mo) => {
      if (!typeValue) {
        return (
          mo.City === localityValue &&
          mo.Name.toLowerCase().includes(searchInput.toLowerCase())
        );
      }
      return (
        mo.City === localityValue &&
        mo.OrgType === typeValue &&
        mo.Name.toLowerCase().includes(searchInput.toLowerCase())
      );
    });
    return filterMOList;
  } else {
    return [];
  }
};

// для расписания врачей

export const getDataListForTimetableState = (state) =>
  getHospitalsState(state)?.dataListForTimetable;

export const getOrgDoctorsListState = (state) =>
  getDataListForTimetableState(state)?.ListsMap;

export const getOrgDoctorsListLoadingState = (state) =>
  getHospitalsState(state)?.doctorsListLoading;

export const getDoctorTimetableState = (state) =>
  getHospitalsState(state)?.doctorTimetable?.Timetable;

export const getDoctorTimetableLoadingState = (state) =>
  getHospitalsState(state)?.doctorTimetableLoading;

// для оценки работы врача

export const getDoctorsListForRaitingState = (state) =>
  getHospitalsState(state).dataListForRaiting?.ListsMap;

export const getScanDoctorsListForRaitingState = (state) =>
  getHospitalsState(state).scanDataListForRaiting?.ListsMap;

export const getDataListForRaitingLoadingState = (state) =>
  getHospitalsState(state).dataListForRaitingLoading;

export const getListForWorkIndicatorsState = (state) =>
  getHospitalsState(state).listOfWorkIndicators;

export const getEvaluationResultState = (state) =>
  getHospitalsState(state).evaluationResult;

export const getEvaluationResultLoadingState = (state) =>
  getHospitalsState(state).evaluationResultLoading;
