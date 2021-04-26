import axios from "axios";

axios.interceptors.request.use((config) => {
  config.headers["Content-Security-Policy-Report-Only"] = "default-src 'none';";
  config.headers["Authorization"] =
    "Basic d2ViLXNpdGU6NmlhSkw4N0s4NnpCb3RhWHMxSkg=";
  config.baseURL = "https://srvbase.e-health.kz:4343/sb/hs/PatientCab/";
  return config;
});

export { axios };
