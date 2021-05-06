import { axios } from "../api/axios";

export const appApi = {
    GetServerTime: async () => {
    const { data } = await axios.post("GetServerTime");
    return data;
  },
};
