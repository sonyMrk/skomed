import { axios } from "../api/axios";

export const appApi = {
  GetServerTime: async () => {
    const { data } = await axios.post("GetServerTime");
    return data;
  },
  UpdateSubscriberData: async (
    SubscriberID,
    AuthToken,
    DeviceGUID
    // DeviceName,
    // OSVersion,
    // AppVersion,
    // Processor,
    // RAM,
    // DisableSubscription
  ) => {
    const params = new URLSearchParams();
    params.append("SubscriberID", SubscriberID);
    params.append("AuthToken", AuthToken);
    // params.append("DeviceGUID", DeviceGUID);
    // params.append("DeviceName", DeviceName);
    // params.append("OSVersion", OSVersion);
    // params.append("AppVersion", AppVersion);
    // params.append("Processor", Processor);
    // params.append("RAM", RAM);
    // params.append("DisableSubscription", DisableSubscription);

    const { data } = await axios.post("UpdateSubscriberData", params);
    return data;
  },

  GetNewMessagesCount: async (DeviceGUID, AuthToken) => {
    const params = new URLSearchParams();
    params.append("DeviceGUID", DeviceGUID);
    params.append("AuthToken", AuthToken);

    const { data } = await axios.post("GetNewMessagesCount", params);
    return data;
  },

  GetMessagesForUser: async (DeviceGUID, AuthToken) => {
    const params = new URLSearchParams();
    params.append("DeviceGUID", DeviceGUID);
    params.append("AuthToken", AuthToken);

    const { data } = await axios.post("GetMessagesForUser", params);
    return data;
  },
};
