import axios from "axios";


// export const getFarm = async () => {

//   const {data} = await axios.get("https://pharmgorodok.kz/index.php?tmpl=component&option=com_baza&view=ajaxsearch&do=1&naimenovanie=%D0%BF%D0%B0%D1%80%D0%B0%D1%86%D0%B5%D1%82%D0%B0%D0%BC%D0%BE%D0%BB&apteka=%D0%97%D0%B5%D0%BD%D0%B8%D1%82&rayon=all")
//    return data
// }

// PROD SITE
// axios.interceptors.request.use((config) => {
//   config.headers["Content-Security-Policy-Report-Only"] = "default-src 'none';";
//   config.headers["Authorization"] =
//     "Basic d2ViLXNpdGU6NmlhSkw4N0s4NnpCb3RhWHMxSkg=";
//   config.baseURL = "https://srvbase.e-health.kz:4343/sb/hs/PatientCab/";
//   return config;
// });

// PROD SKO_MED
// axios.interceptors.request.use((config) => {
//   config.headers["Content-Security-Policy-Report-Only"] = "default-src 'none';";
//   config.headers["Authorization"] =
//     "Basic d2ViLW1hMjoyeHNuUmZhbncxcU5uc3hhMEJVeg==";
//   config.baseURL = "https://srvbase.e-health.kz:4343/sb/hs/PatientCab/";
//   return config;
// });

// DEV

axios.interceptors.request.use((config) => {
  config.headers["Content-Security-Policy-Report-Only"] = "default-src 'none';";
  config.headers["Authorization"] =
    "Basic d2ViOnNEVUtNVHcyWHVlUHV3RFhLSDdY";
  config.baseURL = "http://192.168.10.245/srvbase/hs/PatientCab/";
  return config;
})

export { axios };
