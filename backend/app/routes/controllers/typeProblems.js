const problemsTypesService = require("./services/problems_types_services/problemTypes");

module.exports = {

    /**
     * Create one problem type
     * /problems-types [POST]
     * @param {ProblemType} in body
     * @return 201 and @ProblemType created
     */
    postTypeProblem: async (req, res) => {
        const problemType = await problemsTypesService.create(req.body);
        res.status(201).json(problemType);
    },
    
    /**
     * Get all problems types
     * /problems-types [GET]
     * @returns 200 and Array of @ProblemType
     */
    getAllTypeProblems: async (req, res) => {
        const problemsTypes = await problemsTypesService.getAll();
        res.status(200).json(problemsTypes);
    },

    /**
     * Edit one problem type
     * /problems-types/{id} [PUT]
     * @param {Number} id
     * @param {ProblemType} in body
     * @returns 200 and @ProblemType edited
     */
    putTypeProblem: async (req, res) => {
        const params = { ...req.body, id: req.params.id };
        const editedProblemType = await problemsTypesService.edit(params);
        res.status(200).json(editedProblemType);
    },

    /**
     * Delete one problem type
     * /problems-types/{id} [DELETE]
     * @param {Number} id
     * @returns 204 if was deleted
     * @returns 403 if the problem type is referenced to one or more report problems
     */
    deleteTypeProblem: async (req, res) => {
        try {
            await problemsTypesService.delete(req.params.id);
            res.status(204).send();
        } catch (e) {
            res.status(403).json({ message: e.message });
        }
    },
    
}