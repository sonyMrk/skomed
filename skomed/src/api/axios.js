import axios from "axios";

// PROD SITE
axios.interceptors.request.use((config) => {
  config.headers["Content-Security-Policy-Report-Only"] = "default-src 'none';";
  config.headers["Authorization"] =
    "Basic d2ViLXNpdGU6NmlhSkw4N0s4NnpCb3RhWHMxSkg=";
  config.baseURL = "https://srvbase.e-health.kz:4343/sb/hs/PatientCab/";
  return config;
});

// PROD SKO_MED
// axios.interceptors.request.use((config) => {
//   config.headers["Content-Security-Policy-Report-Only"] = "default-src 'none';";
//   config.headers["Authorization"] =
//     "Basic d2ViLW1hMjoyeHNuUmZhbncxcU5uc3hhMEJVeg==";
//   config.baseURL = "https://srvbase.e-health.kz:4343/sb/hs/PatientCab/";
//   return config;
// });

// DEV

// axios.interceptors.request.use((config) => {
//   config.headers["Content-Security-Policy-Report-Only"] = "default-src 'none';";
//   config.headers["Authorization"] =
//     "Basic d2ViOnNEVUtNVHcyWHVlUHV3RFhLSDdY";
//   config.baseURL = "http://192.168.10.245/srvbase/hs/PatientCab/";
//   return config;
// })

export { axios };
