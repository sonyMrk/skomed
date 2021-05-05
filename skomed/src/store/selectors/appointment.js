
export const getAppointmentState = (state) => state.appointment

export const getAppointmentUserDataState = (state) => getAppointmentState(state).userData

export const getAppointmentErrorMessageState = (state) => getAppointmentState(state).errorMessage

export const getAppointmentUserDataLoadingState = (state) => getAppointmentState(state).isLoadingUserData

export const getAppointmentProfileSpecDataState = (state) => getAppointmentState(state).profileSpecsData

export const getAppointmentSheduleState = (state) => getAppointmentState(state).shedule

export const getAppointmentSheduleLoadingState = (state) => getAppointmentState(state).isLoadingShedule

export const getAppointmentProfileSpecLoadingState = (state) => getAppointmentState(state).isLoadingProfileSpecs