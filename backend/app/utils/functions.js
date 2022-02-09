const { carStates, providerTypes, typeVehicles } = require("./constants");

module.exports = {
  statusCarToString: (type) => {
    return Object.keys(carStates).find(state => carStates[state] === type);
  },
  typeProviderToString: (type) => {
    return Object.keys(providerTypes).find(t => providerTypes[t] === type);
  },
  typeVehicleToString: (type) => {
    return Object.keys(typeVehicles).find(t => typeVehicles[t] === type);
  },
}
