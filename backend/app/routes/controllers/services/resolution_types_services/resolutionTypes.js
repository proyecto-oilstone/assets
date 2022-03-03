const { ResolutionType } = require("../../../../db/index");

module.exports = {
  
  /**
   * Create one @ResolutionType
   * @param {ResolutionType} ResolutionType 
   * @returns {ResolutionType} created
   */
  create: async (resolutionType) => {
    return ResolutionType.create(resolutionType);
  },

  /**
   * Get all @ResolutionType
   * @returns {Array} of @ResolutionType
   */
  getAll: async () => {
    return ResolutionType.findAll();
  },

  /**
   * Edit one  @ResolutionType
   * @returns {ResolutionType} edited
   */
  edit: async (resolutionType) => {
    const id = resolutionType.id;
    await ResolutionType.update({ resolution: resolutionType.resolution }, { where: { id } });
    return ResolutionType.findOne({ where: { id } });
  },

  /**
   * Delete one resolution type by id
   * @param {ResolutionType} resolutionTypeId
   * @throws Error if the resolution type is referenced to one or more repair event
   */
  delete: async (resolutionTypeId) => {
    try {
      await ResolutionType.destroy({ where: { id: resolutionTypeId } });
    } catch (e) {
      throw new Error("El tipo de resolucion esta usado por uno o mas reportes de resolucion")
    }
  },
};
