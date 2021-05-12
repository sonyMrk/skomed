import { axios } from "../api/axios";

export const GetServerTime = async () => {
    const { data } = await axios.post("GetServerTime");
    return data;
}