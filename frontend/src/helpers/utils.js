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