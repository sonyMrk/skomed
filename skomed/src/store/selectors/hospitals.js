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


export const getAllMOState = (state) => getHospitalsState(state).allMo;