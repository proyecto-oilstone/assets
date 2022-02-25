/**
 * Add aditional keys to an array of objects to use it in react-select component,
 * in each object of array, add the fields "label" and "key".
 * @param {Array} array of items that you want to add fields
 * @param {String or Function} labelKey the field that contains the label in each object
 * @param {String} valueKey the field that contains the value in each object
 * @returns {Array} the array with aditional fields in each object
 */
export function setLabelAndValue(array, labelSelector, valueKey) {
  if (typeof labelSelector === "string") {
    const labelKey = labelSelector;
    labelSelector = (item) => {
      return item[labelKey];
    };
  }
  return array.map((item) => ({
    ...item,
    label: labelSelector(item),
    value: item[valueKey],
  }));
}

/**
 * Parse to array the response of api
 * @param {Object} response of api with keys in numbers
 * @returns {Array} of object of response
 */
export function responseToArray(response) {
  let array = [];
  Object.keys(response).forEach(key => {
    array.push(response[key]);
  });
  return array;
}

/**
 * Replace the :{key} in url for the value in key of object
 * example string='/vehiculos/:id' object={id=1,...} output='/vehiculos/1'
 * @param {String} string url
 * @param {Object} object with key
 * @returns {String} with url replaced with key
 */
export function findAndReplaceWithKey(string, object) {
  const splited = string.split(":");
  const secondSplit = splited[1].split("/");
  const key = secondSplit[0];
  return `${splited[0]}${object[key]}${secondSplit.length > 0 ? "/" + secondSplit.filter((_, index) => index !== 0).join("/") : ""}`;
}

/**
 * Get the status of one car by the number of type
 * @param {String} carType
 * @returns {String} status
 */
export function getCarStatus(carType) {
  switch (carType) {
  case "OUT_OF_SERVICE": return "fuera de servicio";
  case "IN_USE": return "en uso";
  case "RESERVED": return "reservado";
  case "INFORMED": return "informado";
  case "REPAIR": return "en reparacion";
  case "AVAILABLE": return  "backup";
  case "EXPIRED_DOCUMENTATION": return "con documentacion vencida";
  case "DISCHARGED": return "dado de baja";
  default: return "desconocido";
  }
}

/**
 * Get the type text of one car type
 * @param {String} type 
 * @returns {String} car type in text
 */
export function getCarTypeType(type) {
  switch (type) {
  case "LIGHT_VEHICLE": return "vehiculo liviano";
  case "HEAVY_VEHICLE": return "vehiculo pesado";
  default:return "desconocido";
  }
}

/**
 * Get the type text of provider
 * @param {String} type 
 * @returns {String} provider type in text
 */
export function getProviderType(type) {
  switch (type) {
  case "WORKSHOP": return "taller";
  case "RENTAL": return "alquiler";
  case "CAR_WASH": return "lavadero";
  default: return "desconocido";
  }
}

/**
 * Format one date to dd/mm/yyyy hh:mm
 * @param {Date} date 
 * @return {String}
 */
export function dateToDDMMYYYYHHMM(date) {
  if (date instanceof Date) {
    return `${date.getDate()}/${date.getMonth() +1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  } else {
    return "Fecha invalida";
  }
}

/**
 * Same as dateToDDMMYYYYHHMM without hours and minutes
 * @param {Date} date 
 * @returns {String}
 */
export function dateToDDMMYYYY(date) {
  if (date instanceof Date) {
    return `${date.getDate()}/${date.getMonth() +1}/${date.getFullYear()}`;
  } else {
    return "Fecha invalida";
  }
}
