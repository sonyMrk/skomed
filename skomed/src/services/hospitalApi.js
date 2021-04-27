import { axios } from "../api/axios";

export const hospitalApi = {
    GetOrgListForAppointment: async (iin) => {

    const { data } = await axios.post("GetOrgListForAppointment")
    return data
  },
};