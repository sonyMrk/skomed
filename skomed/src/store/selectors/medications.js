const getMedicationsState = (state) => state.medications;

export const getMedicationsListState = (state) =>
  getMedicationsState(state).medicationsList;

export const getMedicationsMarkerListState = (state) =>
  getMedicationsState(state).medicationsMapMarkers;

export const getMedicationsLoadingState = (state) =>
  getMedicationsState(state).medicationsListLoading;

export const getMedicationsErrorState = (state) =>
  getMedicationsState(state).medicationsError;

export const getMedicationsListSortState = (sortBy) => (state) => {
  if (sortBy === "price") {
    return getMedicationsListState(state)?.sort(
      (a, b) => a[sortBy] - b[sortBy]
    );
  } else {
    return getMedicationsListState(state)?.sort((a, b) =>
      a[sortBy].localeCompare(b[sortBy])
    );
  }
};

export const getMedicationsListLengthState = (state) =>
  getMedicationsListState(state)?.length;
