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
  /**
   * Get the model events without the field 'data' that has binary data of events with files
   * @param {EventModel} eventModel
   * @return {EventModel} 
   */
  getChildrenEventModelsWithoutBinaryData: (eventModel) => {
    return eventModel.childrenModels.map(model => ({ model, attributes: {exclude: ['data']} }));
  },
}
