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

// для справочника организаций

export const getAllMOState = (state) => getHospitalsState(state).allMo;
export const getAllMoErrorDesc = (state) => getAllMOState(state)?.ErrorDesc;
export const getAllMoLocals = () => (state) => getAllMOState(state)?.locals;
export const getAllMoTypes = () => (state) => getAllMOState(state)?.types;
