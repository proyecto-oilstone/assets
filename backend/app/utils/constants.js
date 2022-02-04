module.exports = {
  eventTypes: {
    "DRIVER": 1,
    "REPORT_PROBLEM": 2,
    "REPAIR_REQUEST": 3,
    "WORKSHOP": 4,
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
  }
}
