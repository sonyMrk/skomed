import { axios } from "../api/skoMedAxios";

export const GetServerTime = async () => {
  const { data } = await axios.post("GetServerTime");
  return data;
};
