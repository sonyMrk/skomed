import { axios } from "../api/axios";
import { SECRET_KEY, SEPARATOR } from "../services/keys"
import { formatter } from "../utils/formatToBase64";

export const appApi = {
  GetServerTime: async () => {
    const { data } = await axios.post("GetServerTime");
    return data;
  },
  UpdateSubscriberData: async (
    SubscriberID,
    AuthToken,
    DeviceGUID,
    // // DeviceName,
    // // OSVersion,
    // // AppVersion,
    // // Processor,
    // // RAM,
    // // DisableSubscription
  ) => {
    const dataTime = await appApi.GetServerTime();
    const paramsString = `SubscriberID=${SubscriberID}&AuthToken=${AuthToken}&DeviceGUID=${DeviceGUID}&AppVer=2.0.0`;
    const dataString = `${SECRET_KEY}${SEPARATOR}${dataTime.ServerTime}${SEPARATOR}${paramsString}`;

    const dataString64 = formatter.toBase64(dataString);
    const token = await formatter.toSHA256(dataString64);

    const params = new URLSearchParams();
    params.append("AppVer", "2.0.0");
    params.append("SubscriberID", SubscriberID);
    params.append("AuthToken", AuthToken);
    params.append("DeviceGUID", DeviceGUID);
    // params.append("DeviceName", DeviceName);
    // params.append("OSVersion", OSVersion);
    // params.append("AppVersion", AppVersion);
    // params.append("Processor", Processor);
    // params.append("RAM", RAM);
    // params.append("DisableSubscription", DisableSubscription);
    params.append("Token", token);

    const { data } = await axios.post("UpdateSubscriberData", params);
    return data;
  },

  GetNewMessagesCount: async (DeviceGUID, AuthToken) => {
    const dataTime = await appApi.GetServerTime()
    const paramsString = `DeviceGUID=${DeviceGUID}&AuthToken=${AuthToken}&AppVer=2.0.0`;
    const dataString = `${SECRET_KEY}${SEPARATOR}${dataTime.ServerTime}${SEPARATOR}${paramsString}`;

    const dataString64 = formatter.toBase64(dataString);
    const token = await formatter.toSHA256(dataString64);

    const params = new URLSearchParams();
    params.append("AppVer", "2.0.0");
    params.append("DeviceGUID", DeviceGUID);
    params.append("AuthToken", AuthToken);
    params.append("Token", token);

    console.log("GetNewMessagesCount token === ", token)

    const { data } = await axios.post("GetNewMessagesCount", params);
    return data;
  },

  GetMessagesForUser: async (DeviceGUID, AuthToken) => {
    const dataTime = await appApi.GetServerTime();
    const paramsString = `DeviceGUID=${DeviceGUID}&AuthToken=${AuthToken}&AppVer=2.0.0`;
    const dataString = `${SECRET_KEY}${SEPARATOR}${dataTime.ServerTime}${SEPARATOR}${paramsString}`;

    const dataString64 = formatter.toBase64(dataString);
    const token = await formatter.toSHA256(dataString64);

    const params = new URLSearchParams();
    params.append("AppVer", "2.0.0");
    params.append("DeviceGUID", DeviceGUID);
    params.append("AuthToken", AuthToken);
    params.append("Token", token);

    console.log("GetMessagesForUser token === ", token)

    const { data } = await axios.post("GetMessagesForUser", params);
    return data;
  },

  ConfirmMessageViewingOnDevice: async (DeviceGUID, MessageGUID) => {
    const dataTime = await appApi.GetServerTime();
    const paramsString = `DeviceGUID=${DeviceGUID}&MessageGUID=${MessageGUID}&AppVer=2.0.0`;
    const dataString = `${SECRET_KEY}${SEPARATOR}${dataTime.ServerTime}${SEPARATOR}${paramsString}`;

    const dataString64 = formatter.toBase64(dataString);
    const token = await formatter.toSHA256(dataString64);

    const params = new URLSearchParams();
    params.append("AppVer", "2.0.0");
    params.append("DeviceGUID", DeviceGUID);
    params.append("MessageGUID", MessageGUID);
    params.append("Token", token);

    console.log("ConfirmMessageViewingOnDevice token === ", token)
    
    const { data } = await axios.post("ConfirmMessageViewingOnDevice", params);
    return data;
  }
};
