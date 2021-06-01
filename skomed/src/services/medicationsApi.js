import axios from "axios";

export const getListOfMedications = async (name, pharmacy, district) => {
  try {
    const verifiedPharmacy = pharmacy ? pharmacy.split(" ").join("+") : "all";
    const verifiedDistrict = district ? district.split(" ").join("+") : "all";
    const verifiedName = name.split(" ").join("+");
    const { data } = await axios.get(
      `http://192.168.10.49:3030/farm?name=${verifiedName}&pharmacy=${verifiedPharmacy}&district=${verifiedDistrict}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
