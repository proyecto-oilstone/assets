module.exports = {
  /**
   * Check the documentation of one car (VTV, seguro)
   * @param {Car} car 
   * @throws Error if car has missing documentation
   */
  checkDocumentation: (car) => {
    const hasMandatoryDocumentation = car.VTV !== null && car.seguro !== null;
    if (!hasMandatoryDocumentation) throw new Error("Invalid documentations of car");
  }
}