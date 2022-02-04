const { carStates, providerTypes } = require("./constants");

module.exports = {
  statusCarToString: (type) => {
    return Object.keys(carStates).find(state => carStates[state] === type);
  },
  typeProviderToString: (type) => {
    return Object.keys(providerTypes).find(t => providerTypes[t] === type);
  },
}
