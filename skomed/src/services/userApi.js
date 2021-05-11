import { axios } from "../api/axios";

export const userApi = {
  GetPatientByIIN: async (iin) => {
    const params = new URLSearchParams();
    params.append("IIN", iin);

    const { data } = await axios.post("GetPatientByIIN", params);
    return data;
  },
  GetMedicalDocInfo: async (OrgID, ListNumber, DocType) => {
    const params = new URLSearchParams();
    params.append("OrgID", OrgID);
    params.append("DocNumber", ListNumber);
    params.append("DocType", DocType);

    const { data } = await axios.post("GetMedicalDocInfo", params);
    return data;
  },

  GetMedicalDocTypes: async () => {
    const { data } = await axios.post("GetMedicalDocTypes");

    return data;
  },

  AuthorizationRequest: async (iin, phone, hasConfirmCode = true) => {
    const params = new URLSearchParams();
    params.append("IIN", iin);
    params.append("MobileNumber", phone);
    params.append("HasConfirmCode", hasConfirmCode);

    const { data } = await axios.post("AuthorizationRequest", params);

    return data;
  },

  UserLogin: async (iin, phone, confirmCode) => {
    const params = new URLSearchParams();
    params.append("IIN", iin);
    params.append("MobileNumber", phone);
    params.append("ConfirmCode", confirmCode);

    const { data } = await axios.post("UserLogin", params);

    return data;
  },
};
