export const baseURL = `${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/v1`;
export const carStatus = {
  "OUT_OF_SERVICE": 1,
  "IN_USE": 2,
  "RESERVED": 3,
  "INFORMED": 4,
  "REPAIR": 5,
  "AVAILABLE": 6,
  "EXPIRED_DOCUMENTATION": 7,
  "DISCHARGED": 8,
};
export const carStatusBackgroundColors = {
  "OUT_OF_SERVICE": "rgb(108, 117, 125)",
  "IN_USE": "#77dd77",
  "RESERVED": "#77dd77",
  "INFORMED": "#fdfd96",
  "REPAIR": "#fdfd96",
  "AVAILABLE": "#77dd77",
  "EXPIRED_DOCUMENTATION": "#ff6961",
  "DISCHARGED": "#ff6961",
}
export const carStatusTextColors = {
  "OUT_OF_SERVICE": "#ffffff",
  "IN_USE": "rgb(108, 117, 125)",
  "RESERVED": "rgb(108, 117, 125)",
  "INFORMED": "rgb(108, 117, 125)",
  "REPAIR": "rgb(108, 117, 125)",
  "AVAILABLE": "rgb(108, 117, 125)",
  "EXPIRED_DOCUMENTATION": "#ffffff",
  "DISCHARGED": "#ffffff",
}
export const providerTypes = {
  "WORKSHOP": 1,
  "RENTAL": 2,
  "CAR_WASH": 3,
};
export const eventTypes = {
  "DRIVER": 1,
  "REPORT_PROBLEM": 2,
  "REPAIR_REQUEST": 3,
  "WORKSHOP": 4,
  "VTV": 5,
  "SEGURO": 6,
  "REPAIRED": 7,
};
export const eventsColors = {
  "DRIVER": "#77dd77",
  "REPORT_PROBLEM": "#fdfd96",
  "REPAIRED": "#fdfd96",
  "REPAIR_REQUEST": "#fdfd96",
  "WORKSHOP": "#fdfd96",
  "VTV": "#ff6961",
  "SEGURO": "#ff6961",
  "EXPIRATION_FILE": "#ff6961"
}
export const eventsTextColors = {
  "DRIVER": "rgb(108, 117, 125)",
  "REPORT_PROBLEM": "rgb(108, 117, 125)",
  "REPAIRED": "rgb(108, 117, 125)",
  "REPAIR_REQUEST": "rgb(108, 117, 125)",
  "WORKSHOP": "rgb(108, 117, 125)",
  "VTV": "#ffffff",
  "SEGURO": "#ffffff",
  "EXPIRATION_FILE": "#ffffff"
}