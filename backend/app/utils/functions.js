const { carStates } = require("./constants");

module.exports = {
  statusCarToString: (type) => {
    return Object.keys(carStates).find(state => carStates[state] === type);
  },
}
