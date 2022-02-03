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