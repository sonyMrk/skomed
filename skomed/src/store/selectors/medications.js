const getMedicationsState = (state) => state.medications;

export const getMedicationsListState = (state) =>
  getMedicationsState(state).medicationsList;
export const getMedicationsLoadingState = (state) =>
  getMedicationsState(state).medicationsListLoading;
export const getMedicationsErrorState = (state) =>
  getMedicationsState(state).medicationsError;
