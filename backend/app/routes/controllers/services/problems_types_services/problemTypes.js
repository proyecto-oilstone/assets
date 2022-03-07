const { ProblemType } = require("../../../../db/index");

module.exports = {
  
  /**
   * Create one @ProblemType
   * @param {ProblemType} problemType 
   * @returns {ProblemType} created
   */
  create: async (problemType) => {
    return ProblemType.create(problemType);
  },

  /**
   * Get all @ProblemType
   * @returns {Array} of @ProblemType
   */
  getAll: async () => {
    return ProblemType.findAll();
  },

  /**
   * Edit one  @ProblemType
   * @returns {ProblemType} edited
   */
  edit: async (problemType) => {
    const id = problemType.id;
    await ProblemType.update({ problem: problemType.problem }, { where: { id } });
    return ProblemType.findOne({ where: { id } });
  },

  /**
   * Delete one problem type by id
   * @param {ProblemType} problemTypeId
   * @throws Error if the problem type is referenced to one or more report problems
   */
  delete: async (problemTypeId) => {
    try {
      await ProblemType.destroy({ where: { id: problemTypeId } });
    } catch (e) {
      throw new Error("El tipo de problema esta usado por uno o mas reportes de problemas")
    }
  },
};
