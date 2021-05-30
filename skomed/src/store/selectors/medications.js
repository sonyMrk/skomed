const getMedicationsState = (state) => state.medications;

export const getMedicationsListState = (state) =>
  getMedicationsState(state).medicationsList;

export const getMedicationsMarkerListState = (state) =>
  getMedicationsState(state).medicationsMapMarkers;

export const getMedicationsLoadingState = (state) =>
  getMedicationsState(state).medicationsListLoading;

export const getMedicationsErrorState = (state) =>
  getMedicationsState(state).medicationsError;

export const getMedicationsListPageState = (page) => (state) => {
  return getMedicationsListState(state)?.slice(page, 10);
};

export const getMedicationsListLengthState = (state) =>
  getMedicationsListState(state)?.length;
