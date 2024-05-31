const { Application_type } = require('../dbContext')
module.exports = {
    postType: async (type) => {
        try {
            const newtype = await Application_type.create(type)
            return true
        } catch (error) {
            return error
        }
    },
    getAllTypes: async () => {
        try {
            const types = await Application_type.findAll();
            return types
        } catch (error) {
            return error
        }
    },
}