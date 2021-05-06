

export const getUserState = (state) => state.user

export const getUserErrorMessageState = (state) => getUserState(state).errorMessage

export const getUserLoadingState = (state) => getUserState(state).isLoading

export const getUserSickListState = (state) => getUserState(state).sickList

export const getMedicalDoctypesState = (state) => getUserState(state).doctypes

export const getUserProfileState = (state) => getUserState(state).profile

export const getUserDataState = (state) => getUserState(state).userData


export const getUserIINState = (state) => getUserProfileState(state)?.iin
export const getUserFamilyState = (state) => getUserProfileState(state)?.family
export const getUserPhoneState = (state) => getUserProfileState(state)?.phone


