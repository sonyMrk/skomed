import { axios } from "../api/axios";
import { SECRET_KEY, SEPARATOR } from "./keys";
import { appApi } from "./appApi";
import { formatter } from "../utils/formatToBase64";

export const hospitalApi = {
  GetOrgListForAppointment: async () => {
    const dataTime = await appApi.GetServerTime();
    const paramsString = "";
    const dataString = `${SECRET_KEY}${SEPARATOR}${dataTime.ServerTime}${SEPARATOR}${paramsString}`;

    // console.log("dataString", dataString)

    const dataString64 = formatter.toBase64(dataString);
    const token = await formatter.toSHA256(dataString64);

    const params = new URLSearchParams();
    params.append("Token", token);
    params.append("AppVer", "2.0.0");
    // console.log("String64", token)
    // console.log("Token", token);

    const { data } = await axios.post("GetOrgListForAppointment", params);
    // console.log(data);
    // 1.0.1
    return data;
  },

  GetOrgListForTimetable: async () => {
    const { data } = await axios.post("GetOrgListForTimetable");
    return data;
  },

  GetShedule: async (orgId, DoctorId = "", profileId = "") => {
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
  },

  GetDoctorsTimetable: async (orgId, doctorId, cabinetId) => {
    const params = new URLSearchParams();
    params.append("OrgID", orgId);
    params.append("DoctorGUID", doctorId);
    params.append("CabinetGUID", cabinetId);

    const { data } = await axios.post("GetDoctorsTimetable", params);
    return data;
  },

  GetOrgListForRaitings: async () => {
    const { data } = await axios.post("GetOrgListForRaitings");
    return data;
  },
};
