import { axios } from "../api/axios";
import { SECRET_KEY, SEPARATOR } from "../services/keys"
import { formatter } from "../utils/formatToBase64";
import { GetServerTime } from "./getServerTime";

export const userApi = {
  GetPatientByIIN: async (iin) => {
    const dataTime = await GetServerTime();
    const paramsString = `IIN=${iin}&AppVer=2.0.0`;
    const dataString = `${SECRET_KEY}${SEPARATOR}${dataTime.ServerTime}${SEPARATOR}${paramsString}`;

    const dataString64 = formatter.toBase64(dataString);
    const token = await formatter.toSHA256(dataString64);

    const params = new URLSearchParams();
    
    params.append("IIN", iin);
    params.append("AppVer", "2.0.0");

    params.append("Token", token);

    console.log("GetPatientByIIN token === ", token)

    const { data } = await axios.post("GetPatientByIIN", params);
    return data;
  },
  GetMedicalDocInfo: async (OrgID, ListNumber, DocType) => {
    const dataTime = await GetServerTime();
    const paramsString = `OrgID=${OrgID}&DocNumber=${ListNumber}&DocType=${DocType}&AppVer=2.0.0`;
    const dataString = `${SECRET_KEY}${SEPARATOR}${dataTime.ServerTime}${SEPARATOR}${paramsString}`;

    const dataString64 = formatter.toBase64(dataString);
    const token = await formatter.toSHA256(dataString64);

    const params = new URLSearchParams();
    
    params.append("OrgID", OrgID);
    params.append("DocNumber", ListNumber);
    params.append("DocType", DocType);
    params.append("AppVer", "2.0.0");
    params.append("Token", token);

    console.log("GetMedicalDocInfo token === ", token)

    const { data } = await axios.post("GetMedicalDocInfo", params);
    return data;
  },

  GetMedicalDocTypes: async () => {
    const dataTime = await GetServerTime();
    const paramsString = `AppVer=2.0.0`;
    const dataString = `${SECRET_KEY}${SEPARATOR}${dataTime.ServerTime}${SEPARATOR}${paramsString}`;

    const dataString64 = formatter.toBase64(dataString);
    const token = await formatter.toSHA256(dataString64);

    const params = new URLSearchParams();

    params.append("AppVer", "2.0.0");
    params.append("Token", token);

    console.log("GetMedicalDocTypes token === ", token)

    const { data } = await axios.post("GetMedicalDocTypes", params);

    return data;
  },

  AuthorizationRequest: async (iin, phone, hasConfirmCode) => {
    const dataTime = await GetServerTime();
    
    // ${hasConfirmCode ? "Да" : "Нет"}
    const paramsString = `IIN=${iin}&MobileNumber=${phone}&HasConfirmCode=${hasConfirmCode ? "Да" : "Нет"}&AppVer=2.0.0`;
    // const paramsString = `IIN=${iin}&MobileNumber=${phone}&HasConfirmCode=Да&AppVer=2.0.0`;
    const dataString = `${SECRET_KEY}${SEPARATOR}20210512095500${SEPARATOR}${paramsString}`;
    
    const dataString64 = formatter.toBase64(dataString);
    const token = await formatter.toSHA256(dataString64);

    const params = new URLSearchParams();

    params.append("IIN", iin);
    params.append("MobileNumber", phone);
    params.append("HasConfirmCode", hasConfirmCode ? "Да" : "Нет");
    params.append("AppVer", "2.0.0");
    params.append("Token", token);

    console.log("AuthorizationRequest token === ", token)

    const { data } = await axios.post("AuthorizationRequest", params);

    return data;
  },

  UserLogin: async (iin, phone, confirmCode) => {
    const dataTime = await GetServerTime();
    const paramsString = `IIN=${iin}&MobileNumber=${phone}&ConfirmCode=${confirmCode}&AppVer=2.0.0`;
    const dataString = `${SECRET_KEY}${SEPARATOR}${dataTime.ServerTime}${SEPARATOR}${paramsString}`;

    const dataString64 = formatter.toBase64(dataString);
    const token = await formatter.toSHA256(dataString64);

    const params = new URLSearchParams();
    
    params.append("IIN", iin);
    params.append("MobileNumber", phone);
    params.append("ConfirmCode", confirmCode);
    params.append("AppVer", "2.0.0");

    params.append("Token", token);

    console.log("UserLogin token === ", token)

    const { data } = await axios.post("UserLogin", params);

    return data;
  },
};
