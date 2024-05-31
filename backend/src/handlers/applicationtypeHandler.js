const { getAllTypes, postType } = require("../controllers/applicationtypeController")

module.exports = {
    postType: async (req, res) => {
        try {
            const type = req.body
            const response = await postType(type)
            res.status(200).json({
                message: 'The application type was registered correctly',
                success: response
            })
        } catch (error) {
            res.status(500).json({
                message: 'Registration could not be completed',
                success: false,
                error: error
            })
        }
    },
    getAllTypes: async (req, res) => {
        try {
            const types = await getAllTypes();
            res.status(200).json({
                types: types,
                success: true
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error
            })
        }
    },
}