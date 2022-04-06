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

/**
 * 
 * @param {String|Date} date1 
 * @param {String|Date} date2 
 * @returns diff in days between date1 and date2
 */
export function dateDiffInDays(date1, date2) {
  if (typeof date1 === "string") {
    date1 = new Date(date1);
  }
  if (typeof date2 === "string") {
    date2 = new Date(date2);
  }
  const diff = date1.getTime() - date2.getTime();
  const days = Math.ceil(diff / (1000 * 3600 * 24));
  return days;
}

/**
 * Get the Date from one date in String
 * @param {String} dateString in DD/MM/YYYY
 * @returns {Date}
 */
export function fromDDMMYYYYToDate(dateString) {
  let separator = "/";
  let dateParts = dateString.split(separator);
  if (dateParts.length === 1) {
    separator = "-";
    dateParts = dateString.split(separator);
  }
  return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
}

export function getShortDescriptionEvent(event) {
  switch (event.type) {
    case "DRIVER": return event.isReserved ? "Reserva conductor" : "Asignacion conductor"
    case "REPORT_PROBLEM": return "Problema informado"
    case "REPAIR_REQUEST": return "Pedido de reparacion";
    case "WORKSHOP": return "Almacenado en taller";
    case "VTV": return "Carga VTV";
    case "SEGURO": return "Carga Seguro";
    case "REPAIRED": return "Problema finalizado";
    case "NEW_CAR": return "Nuevo vehiculo";
    case "DISCHARGED_CAR": return "Baja de vehiculo";
    case "EDIT_CAR": return "Edicion de vehiculo";
    default: return "Desconocido";
  }
}

export function getDescriptionEvent(event) {
  switch (event.type) {
    case "DRIVER": {
      if (event.isReserved && event.driver)
        return "Se reservo al conductor " + event.driver + ", en el garage " + event?.Garage?.nombreCorto;
      if (event.isReserved && event.driver === null)
        return "Se quito la reseva del conductor";
      if (event.driver === null)
        return "Se quito al conductor";
      return "Se asigno al conductor " + event.driver;
    }
    case "REPORT_PROBLEM": {
      let toReturn = "Se reporto el problema " + event?.ProblemType?.problem;
      const formatedDateResolving = dateToDDMMYYYYHHMM(new Date(event.resolvingDate));
      if (event.resolving) {
        return toReturn + ", y fue llevado al taller el " + formatedDateResolving;
      }
      if (event.resolved) {
        return toReturn + ", fue llevado al taller el " + formatedDateResolving + " y estuvo " + ` ${dateDiffInDays(event.resolvedDate, event.resolvingDate)} dias en reparacion`
      }
      return toReturn;
    }
    case "REPAIR_REQUEST": return "Se realizo un pedido de reparacion al problema " + event?.ReportProblemEvent?.ProblemType?.problem;
    case "WORKSHOP": return "Se almaceno en el garage " + event?.Garage?.nombreCorto;
    case "VTV": return "Se cargo VTV";
    case "SEGURO": return "Se cargo Seguro";
    case "REPAIRED": return "Se completo la reparacion al problema " + event?.ReportProblemEvent?.ProblemType?.problem + ", con el tipo de resolucion " + event?.ResolutionType?.resolution;
    case "NEW_CAR": return "Vehiculo creado";
    case "DISCHARGED_CAR": return "Vehiculo dado de baja";
    case "EDIT_CAR": return "Edicion de vehiculo";
    default: return "Desconocido";
  }
}

export function onlyLetters(str) {
  return /^[a-zA-Z]+$/.test(str);
}

export function onlyNumbers(str) {
  return str.match(/^[0-9]+$/) != null;
}

/**
 * Format one patente of one car, Example:
 * input="abc123" output="ABC 123"
 * input="AB123CD" output="AB 123 CD"
 * @param {String} patente 
 * @returns {String}
 */
export function getFormattedPatente(patente) {
  let type;
  if (patente.length === 6)
    type = "old";
  else if (patente.length === 7)
    type = "new";
  else throw new Error("Invalid lenght of patente");

  if (type === "old") {// ABC-123
    const firstThreeCharacters = patente.substring(0,3);
    const lastThreeCharacters = patente.substring(3,6);
    const isValid = onlyLetters(firstThreeCharacters) && onlyNumbers(lastThreeCharacters);
    if (isValid) {
      return firstThreeCharacters.toUpperCase() + " " + lastThreeCharacters.toUpperCase();
    } else {
      throw new Error("Invalid old format");
    }
  }

  if (type === "new") {// AB-123-CD
    const firstTwoCharacters = patente.substring(0,2);
    const middleCharacters = patente.substring(2,5);
    const lastTwoCharacters = patente.substring(5,7);
    const isValid = onlyLetters(firstTwoCharacters) && onlyNumbers(middleCharacters) && onlyLetters(lastTwoCharacters);
    if (isValid) {
      return firstTwoCharacters.toUpperCase() + " " + middleCharacters + " " + lastTwoCharacters.toUpperCase();
    } else {
      throw new Error("Invalid new format");
    }
  }
}

export function isPatenteValid(patente) {
  try {
    getFormattedPatente(patente);
    return true;
  } catch (e) {
    return false;
  }
}

export function removeSpaces(str) {
  return str.replace(/\s/g,'');
}

export function numberWithDots(x) {
  if (x === undefined) return "";
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function numberWithoutDots(x) {
  return x.replace(/\./g, '');
}