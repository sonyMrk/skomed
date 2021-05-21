import { axios } from "../api/axios";
import { SECRET_KEY, SEPARATOR } from "./keys";
import { formatter } from "../utils/formatToBase64";
import { GetServerTime } from "./getServerTime";

export const hospitalApi = {
  GetOrgListForAppointment: async () => {
    const dataTime = await GetServerTime();
    const paramsString = "AppVer=2.0.0";
    const dataString = `${SECRET_KEY}${SEPARATOR}${dataTime.ServerTime}${SEPARATOR}${paramsString}`;
    // const dataString = `${SECRET_KEY}${SEPARATOR}20210511000000${SEPARATOR}IIN=860502350142&AppVer=2.0.0`;

    const dataString64 = formatter.toBase64(dataString);
    const token = await formatter.toSHA256(dataString64);

    const params = new URLSearchParams();
    params.append("AppVer", "2.0.0");
    params.append("Token", token);

    console.log("GetOrgListForAppointment token === ", token);

    const { data } = await axios.post("GetOrgListForAppointment", params);
    return data;
  },

  GetOrgListForTimetable: async () => {
    const dataTime = await GetServerTime();
    const paramsString = "AppVer=2.0.0";
    const dataString = `${SECRET_KEY}${SEPARATOR}${dataTime.ServerTime}${SEPARATOR}${paramsString}`;

    const dataString64 = formatter.toBase64(dataString);
    const token = await formatter.toSHA256(dataString64);

    const params = new URLSearchParams();

    params.append("AppVer", "2.0.0");
    params.append("Token", token);

    console.log("GetOrgListForTimetable token === ", token);

    const { data } = await axios.post("GetOrgListForTimetable", params);
    return data;
  },

  GetShedule: async (orgId, DoctorId = "", profileId = "") => {
    const dataTime = await GetServerTime();
    const paramsString = `OrgID=${orgId}&DoctorID=${DoctorId}&ProfileID=${profileId}&AppVer=2.0.0`;
    const dataString = `${SECRET_KEY}${SEPARATOR}${dataTime.ServerTime}${SEPARATOR}${paramsString}`;

    const dataString64 = formatter.toBase64(dataString);
    const token = await formatter.toSHA256(dataString64);

    const params = new URLSearchParams();

    params.append("OrgID", orgId);
    params.append("DoctorID", DoctorId);
    params.append("ProfileID", profileId);
    params.append("AppVer", "2.0.0");
    params.append("Token", token);

    console.log("GetShedule token === ", token);

    const { data } = await axios.post("GetShedule", params);
    return data;
  },

  GetProfileSpecsData: async (orgId) => {
    const dataTime = await GetServerTime();
    const paramsString = `OrgID=${orgId}&AppVer=2.0.0`;
    const dataString = `${SECRET_KEY}${SEPARATOR}${dataTime.ServerTime}${SEPARATOR}${paramsString}`;

    const dataString64 = formatter.toBase64(dataString);
    const token = await formatter.toSHA256(dataString64);

    console.log("GetProfileSpecsData token === ", token);

    const params = new URLSearchParams();

    params.append("OrgID", orgId);
    params.append("AppVer", "2.0.0");
    params.append("Token", token);

    const { data } = await axios.post("GetProfileSpecsData", params);
    return data;
  },

  GetMOList: async () => {
    const dataTime = await GetServerTime();
    const paramsString = "AppVer=2.0.0";
    const dataString = `${SECRET_KEY}${SEPARATOR}${dataTime.ServerTime}${SEPARATOR}${paramsString}`;

    const dataString64 = formatter.toBase64(dataString);
    const token = await formatter.toSHA256(dataString64);

    const params = new URLSearchParams();
    params.append("AppVer", "2.0.0");
    params.append("Token", token);

    console.log("GetMOList token === ", token);

    const { data } = await axios.post("GetMOList", params);
    return data;
  },

  GetDataListsForTimetable: async (orgId) => {
    const dataTime = await GetServerTime();
    const paramsString = `OrgID=${orgId}&AppVer=2.0.0`;
    const dataString = `${SECRET_KEY}${SEPARATOR}${dataTime.ServerTime}${SEPARATOR}${paramsString}`;

    const dataString64 = formatter.toBase64(dataString);
    const token = await formatter.toSHA256(dataString64);

    const params = new URLSearchParams();

    params.append("OrgID", orgId);
    params.append("AppVer", "2.0.0");
    params.append("Token", token);

    console.log("GetDataListsForTimetable token === ", token);

    const { data } = await axios.post("GetDataListsForTimetable", params);
    return data;
  },

  GetDoctorsTimetable: async (orgId, doctorId, cabinetId) => {
    const dataTime = await GetServerTime();
    const paramsString = `OrgID=${orgId}&DoctorGUID=${doctorId}&CabinetGUID=${cabinetId}&AppVer=2.0.0`;
    const dataString = `${SECRET_KEY}${SEPARATOR}${dataTime.ServerTime}${SEPARATOR}${paramsString}`;

    const dataString64 = formatter.toBase64(dataString);

    const token = await formatter.toSHA256(dataString64);

    const params = new URLSearchParams();

    params.append("OrgID", orgId);
    params.append("DoctorGUID", doctorId);
    params.append("CabinetGUID", cabinetId);
    params.append("AppVer", "2.0.0");
    params.append("Token", token);

    console.log("GetDoctorsTimetable token === ", token);

    const { data } = await axios.post("GetDoctorsTimetable", params);

    return data;
  },

  GetOrgListForRaitings: async () => {
    const dataTime = await GetServerTime();
    const paramsString = "AppVer=2.0.0";
    const dataString = `${SECRET_KEY}${SEPARATOR}${dataTime.ServerTime}${SEPARATOR}${paramsString}`;

    const dataString64 = formatter.toBase64(dataString);
    const token = await formatter.toSHA256(dataString64);

    const params = new URLSearchParams();

    params.append("AppVer", "2.0.0");
    params.append("Token", token);

    console.log("GetOrgListForRaitings token === ", token);

    const { data } = await axios.post("GetOrgListForRaitings", params);
    return data;
  },
  GetDataListsForRatings: async (orgId) => {
    const dataTime = await GetServerTime();
    const paramsString = `OrgGUID=${orgId}&AppVer=2.0.0`;
    const dataString = `${SECRET_KEY}${SEPARATOR}${dataTime.ServerTime}${SEPARATOR}${paramsString}`;

    const dataString64 = formatter.toBase64(dataString);
    const token = await formatter.toSHA256(dataString64);

    const params = new URLSearchParams();

    params.append("OrgGUID", orgId);
    params.append("AppVer", "2.0.0");
    params.append("Token", token);

    console.log("GetDataListsForRatings token === ", token);

    const { data } = await axios.post("GetDataListsForRatings", params);
    return data;
  },
  GetListOfWorkIndicators: async (orgId) => {
    const dataTime = await GetServerTime();
    const paramsString = `OrgGUID=${orgId}&AppVer=2.0.0`;
    const dataString = `${SECRET_KEY}${SEPARATOR}${dataTime.ServerTime}${SEPARATOR}${paramsString}`;

    const dataString64 = formatter.toBase64(dataString);
    const token = await formatter.toSHA256(dataString64);

    const params = new URLSearchParams();

    params.append("OrgGUID", orgId);
    params.append("AppVer", "2.0.0");
    params.append("Token", token);

    console.log("GetListOfWorkIndicators token === ", token);

    const { data } = await axios.post("GetListOfWorkIndicators", params);

    return data;
  },
  SaveWorkIndicatorsByUser: async (
    iin,
    orgId,
    doctorId,
    doctorName,
    cabinetId,
    cabinetName,
    appraisals,
    comment
  ) => {
    const dataTime = await GetServerTime();
    const paramsString = `IIN=${iin}&OrgGUID=${orgId}&DoctorGUID=${doctorId}&DoctorName=${doctorName}&CabinetGUID=${cabinetId}&CabinetName=${cabinetName}&Indicators=${appraisals}&Comment=${comment}&AppVer=2.0.0`;
    const dataString = `${SECRET_KEY}${SEPARATOR}${dataTime.ServerTime}${SEPARATOR}${paramsString}`;

    const dataString64 = formatter.toBase64(dataString);
    const token = await formatter.toSHA256(dataString64);

    const params = new URLSearchParams();

    params.append("IIN", iin);
    params.append("OrgGUID", orgId);
    params.append("DoctorGUID", doctorId);
    params.append("DoctorName", doctorName);
    params.append("CabinetGUID", cabinetId);
    params.append("CabinetName", cabinetName);
    params.append("Indicators", appraisals);
    params.append("Comment", comment);
    params.append("AppVer", "2.0.0");
    params.append("Token", token);

    console.log("SaveWorkIndicatorsByUser token === ", token);

    const { data } = await axios.post("SaveWorkIndicatorsByUser", params);

    return data;
  },
  SaveAppointment: async (
    iin,
    orgId,
    doctorId,
    date,
    timeStart,
    timeEnd,
    recordingMethod = 1,
    cabinetId = "",
    reason = "",
    language = 1
  ) => {
    const dataTime = await GetServerTime();
    const paramsString = `IIN=${iin}&OrgID=${orgId}&DoctorID=${doctorId}&Date=${date}&TimeStart=${timeStart}&TimeEnd=${timeEnd}&RecordingMethod=${recordingMethod}&CabinetID=${cabinetId}&Reason=${reason}&Language=${language}&AppVer=2.0.0`;
    const dataString = `${SECRET_KEY}${SEPARATOR}${dataTime.ServerTime}${SEPARATOR}${paramsString}`;

    const dataString64 = formatter.toBase64(dataString);

    const token = await formatter.toSHA256(dataString64);

    const params = new URLSearchParams();

    params.append("IIN", iin);
    params.append("OrgID", orgId);
    params.append("DoctorID", doctorId);
    params.append("Date", date);
    params.append("TimeStart", timeStart);
    params.append("TimeEnd", timeEnd);
    params.append("RecordingMethod", recordingMethod);
    params.append("CabinetID", cabinetId);
    params.append("Reason", reason);
    params.append("Language", language);
    params.append("AppVer", "2.0.0");
    params.append("Token", token);

    console.log("SaveAppointment token === ", token);

    const { data } = await axios.post("SaveAppointment", params);

    return data;
  },

  SaveDoctorCall: async (
    iin,
    orgId,
    phoneNumber,
    reason = "",
    recordingMethod = 1,
    language = 1
  ) => {
    const dataTime = await GetServerTime();
    const paramsString = `IIN=${iin}&OrgID=${orgId}&PhoneNumber=${phoneNumber}&Reason=${reason}&RecordingMethod=${recordingMethod}&Language=${language}&AppVer=2.0.0`;
    const dataString = `${SECRET_KEY}${SEPARATOR}${dataTime.ServerTime}${SEPARATOR}${paramsString}`;

    const dataString64 = formatter.toBase64(dataString);
    const token = await formatter.toSHA256(dataString64);

    const params = new URLSearchParams();

    params.append("IIN", iin);
    params.append("OrgID", orgId);
    params.append("PhoneNumber", phoneNumber);
    params.append("Reason", reason);
    params.append("RecordingMethod", recordingMethod);
    params.append("Language", language);
    params.append("AppVer", "2.0.0");
    params.append("Token", token);

    console.log("SaveDoctorCall token === ", token);

    const { data } = await axios.post("SaveDoctorCall", params);

    return data;
  },
  СancelReception: async (orgId, regType, id) => {
    const dataTime = await GetServerTime();
    const paramsString = `OrgID=${orgId}&RegType=${regType}&GUID=${id}&AppVer=2.0.0`;
    const dataString = `${SECRET_KEY}${SEPARATOR}${dataTime.ServerTime}${SEPARATOR}${paramsString}`;

    console.log("paramsString API", paramsString);

    const dataString64 = formatter.toBase64(dataString);
    const token = await formatter.toSHA256(dataString64);

    const params = new URLSearchParams();

    params.append("OrgID", orgId);
    params.append("RegType", regType);
    params.append("GUID", id);
    params.append("AppVer", "2.0.0");
    params.append("Token", token);

    console.log("СancelReception token === ", token);

    const { data } = await axios.post("СancelReception", params);

    return data;
  },
};
