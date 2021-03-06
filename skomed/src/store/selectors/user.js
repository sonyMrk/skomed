export const getUserState = (state) => state.user;

export const getUserErrorMessageState = (state) =>
  getUserState(state).errorMessage;

export const getUserLoadingState = (state) => getUserState(state).isLoading;

export const getUserSickListState = (state) => getUserState(state).sickList;

export const getUserSickListErrorMessageState = (state) =>
  getUserState(state).sickListError;

export const getMedicalDoctypesState = (state) => getUserState(state).doctypes;

export const getUserProfileState = (state) => getUserState(state).profile;
export const getUserFamilyState = (state) => getUserState(state).family;

export const getUserDataState = (state) => getUserState(state).userData;

export const getUserAuthRequestState = (state) =>
  getUserState(state).authRequest;

export const getIsVisibleConfirmCodeState = (state) =>
  getUserState(state).isVisibleConfirmCodeField;

export const getUserIINState = (state) => getUserProfileState(state)?.iin;
export const getUserPhoneState = (state) => getUserProfileState(state)?.phone;
