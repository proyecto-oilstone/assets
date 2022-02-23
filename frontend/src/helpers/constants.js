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
};
export const eventsColors = {
  "DRIVER": "#C4C4C4",
  "REPORT_PROBLEM": "#5E7948",
  "REPAIR_REQUEST": "#457750",
  "WORKSHOP": "#FF68B2",
  "VTV": "#2675AA",
  "SEGURO": "#2675AA",
  "EXPIRATION_FILE": "#2675AA"
}
export const eventsTextColors = {
  "DRIVER": "#000000",
  "REPORT_PROBLEM": "#FFFFFF",
  "REPAIR_REQUEST": "#FFFFFF",
  "WORKSHOP": "#FFFFFF",
  "VTV": "#FFFFFF",
  "SEGURO": "#FFFFFF",
  "EXPIRATION_FILE": "#FFFFFF"
}