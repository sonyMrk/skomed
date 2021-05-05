import { axios } from "../api/axios";

export const hospitalApi = {
  GetOrgListForAppointment: async () => {
    const { data } = await axios.post("GetOrgListForAppointment");
    return data;
  },

  GetOrgListForTimetable: async () => {
    const { data } = await axios.post("GetOrgListForTimetable");
    return data;
  },

  GetShedule: async (orgId, DoctorId="", profileId="") => {
    const params = new URLSearchParams();
    params.append("OrgID", orgId);
    params.append("DoctorID", DoctorId);
    params.append("ProfileID", profileId);

    const { data } = await axios.post("GetShedule", params);
    return data;
  },
  
  GetProfileSpecsData: async (orgId) => {
    const params = new URLSearchParams();
    params.append("OrgID", orgId);

    const { data } = await axios.post("GetProfileSpecsData", params);
    return data;
  },

  GetMOList: async () => {
    const { data } = await axios.post("GetMOList");
    return data;
  },

  GetDataListsForTimetable: async (orgId) => {
    const params = new URLSearchParams();
    params.append("OrgID", orgId);
    
    const { data } = await axios.post("GetDataListsForTimetable", params);
    return data;
  }
};
