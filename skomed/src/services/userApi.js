import { axios } from "../api/axios";

export const userApi = {
  GetPatientByIIN: async (iin) => {
    const params = new URLSearchParams();
    params.append("IIN", iin);

    const { data } = await axios.post("GetPatientByIIN", params);
    return data;
  },
  GetSickListInfo: async(OrgID, ListNumber, DocType) => {
    const params = new URLSearchParams();
    params.append("OrgID", OrgID);
    params.append("ListNumber", ListNumber);
    params.append("DocType", DocType);

    const { data } = await axios.post("GetSickListInfo", params);
    return data;
  }
};
