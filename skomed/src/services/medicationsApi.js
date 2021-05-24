import axios from "axios";

export const getListOfMedications = async (
  name = "",
  pharmacy = "all",
  district = "all"
) => {
  try {
    const { data } = await axios.get(
      `http://192.168.1.200:3030/farm?name=${name}&pharmacy=${pharmacy}&district=${district}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
