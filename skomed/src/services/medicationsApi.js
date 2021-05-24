import axios from "axios";

export const getListOfMedications = async (name, pharmacy, district) => {
  try {
    const { data } = await axios.post("http://localhost:3030/farm", {});
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
