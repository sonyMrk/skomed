import { axios } from "../api/axios";

export const userApi = {
  GetPatientByIIN: async (iin) => {
    const params = new URLSearchParams();
    params.append("IIN", iin);

    const { data } = await axios.post("GetPatientByIIN", params);
    return data;
  },
};
