const resolutionsTypesService = require("./services/resolution_types_services/resolutionTypes");

module.exports = {

    /**
     * Create one resolution type
     * /resolutions-types [POST]
     * @param {ResolutionType} in body
     * @return 201 and @ResolutionType created
     */
    postTypeResolution: async (req, res) => {
        const resolutionType = await resolutionsTypesService.create(req.body);
        res.status(201).json(resolutionType);
    },
    
    /**
     * Get all resolution types
     * /resolutions-types [GET]
     * @returns 200 and Array of @ResolutionType
     */
    getAllTypeResolutions: async (req, res) => {
        const resolutionsTypes = await resolutionsTypesService.getAll();
        res.status(200).json(resolutionsTypes);
    },

    /**
     * Edit one resolution type
     * /resolutions-types/{id} [PUT]
     * @param {Number} id
     * @param {ResolutionType} in body
     * @returns 200 and @ResolutionType edited
     */
    putTypeResolution: async (req, res) => {
        const params = { ...req.body, id: req.params.id };
        const editedResolutionType = await resolutionsTypesService.edit(params);
        res.status(200).json(editedResolutionType);
    },

    /**
     * Delete one resolution type
     * /resolutions-types/{id} [DELETE]
     * @param {Number} id
     * @returns 204 if was deleted
     * @returns 403 if the resolution type is referenced to one or more repair events
     */
    deleteTypeResolution: async (req, res) => {
        try {
            await resolutionsTypesService.delete(req.params.id);
            res.status(204).send();
        } catch (e) {
            res.status(403).json({ message: e.message });
        }
    },
    
}