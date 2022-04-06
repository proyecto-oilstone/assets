module.exports = {
  eventTypes: {
    "DRIVER": 1,
    "REPORT_PROBLEM": 2,
    "REPAIR_REQUEST": 3,
    "WORKSHOP": 4,
    "VTV": 5,
    "SEGURO": 6,
    "REPAIRED": 7,
    "NEW_CAR": 8,
    "DISCHARGED_CAR": 9,
    "EDIT_CAR": 10,
  },
  carStates: {
    "OUT_OF_SERVICE": 1,
    "IN_USE": 2,
    "RESERVED": 3,
    "INFORMED": 4,
    "REPAIR": 5,
    "AVAILABLE": 6,
    "EXPIRED_DOCUMENTATION": 7,
    "DISCHARGED": 8,
  },
  providerTypes: {
    "WORKSHOP": 1,
    "RENTAL": 2,
    "CAR_WASH": 3,
  },
  typeVehicles: {
    "LIGHT_VEHICLE": 1,
    "HEAVY_VEHICLE": 2,
  },
}
