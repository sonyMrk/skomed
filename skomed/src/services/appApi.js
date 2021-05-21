import { axios } from "../api/axios";
import { SECRET_KEY, SEPARATOR } from "../services/keys";
import { formatter } from "../utils/formatToBase64";
import { GetServerTime } from "./getServerTime";

export const appApi = {
  UpdateSubscriberData: async (
    SubscriberID,
    AuthToken = "",
    DeviceGUID = ""
  ) => {
    const dataTime = await GetServerTime();
    const paramsString = `SubscriberID=${SubscriberID}&AuthToken=${AuthToken}&DeviceGUID=${DeviceGUID}&AppVer=2.0.0`;
    const dataString = `${SECRET_KEY}${SEPARATOR}${dataTime.ServerTime}${SEPARATOR}${paramsString}`;

    console.log("UPDATE API SUBSCRIBER RESP", paramsString);

    const dataString64 = formatter.toBase64(dataString);
    const token = await formatter.toSHA256(dataString64);

    const params = new URLSearchParams();

    params.append("SubscriberID", SubscriberID);
    params.append("AuthToken", AuthToken);
    params.append("DeviceGUID", DeviceGUID);
    params.append("AppVer", "2.0.0");
    params.append("Token", token);

    const { data } = await axios.post("UpdateSubscriberData", params);
    return data;
  },

  GetNewMessagesCount: async (DeviceGUID = "", AuthToken = "") => {
    const dataTime = await GetServerTime();
    const paramsString = `DeviceGUID=${DeviceGUID}&AuthToken=${AuthToken}&AppVer=2.0.0`;
    const dataString = `${SECRET_KEY}${SEPARATOR}${dataTime.ServerTime}${SEPARATOR}${paramsString}`;

    const dataString64 = formatter.toBase64(dataString);
    const token = await formatter.toSHA256(dataString64);

    console.log("paramsString", paramsString);

    const params = new URLSearchParams();

    params.append("DeviceGUID", DeviceGUID);
    params.append("AuthToken", AuthToken);
    params.append("AppVer", "2.0.0");
    params.append("Token", token);

    console.log("GetNewMessagesCount token === ", token);

    const { data } = await axios.post("GetNewMessagesCount", params);
    return data;
  },

  GetMessagesForUser: async (DeviceGUID, AuthToken = "") => {
    const dataTime = await GetServerTime();
    const paramsString = `DeviceGUID=${DeviceGUID}&AuthToken=${AuthToken}&AppVer=2.0.0`;
    const dataString = `${SECRET_KEY}${SEPARATOR}${dataTime.ServerTime}${SEPARATOR}${paramsString}`;

    const dataString64 = formatter.toBase64(dataString);
    const token = await formatter.toSHA256(dataString64);

    const params = new URLSearchParams();

    params.append("DeviceGUID", DeviceGUID);
    params.append("AuthToken", AuthToken);
    params.append("AppVer", "2.0.0");
    params.append("Token", token);

    console.log("GetMessagesForUser token === ", token);

    const { data } = await axios.post("GetMessagesForUser", params);
    return data;
  },

  ConfirmMessageViewingOnDevice: async (DeviceGUID, MessageGUID) => {
    const dataTime = await GetServerTime();
    const paramsString = `DeviceGUID=${DeviceGUID}&MessageGUID=${MessageGUID}&AppVer=2.0.0`;
    const dataString = `${SECRET_KEY}${SEPARATOR}${dataTime.ServerTime}${SEPARATOR}${paramsString}`;

    const dataString64 = formatter.toBase64(dataString);
    const token = await formatter.toSHA256(dataString64);

    const params = new URLSearchParams();

    params.append("DeviceGUID", DeviceGUID);
    params.append("MessageGUID", MessageGUID);
    params.append("AppVer", "2.0.0");
    params.append("Token", token);

    console.log("ConfirmMessageViewingOnDevice token === ", token);

    const { data } = await axios.post("ConfirmMessageViewingOnDevice", params);
    return data;
  },
};
