const { upLoadFile } = require("../controllers/uploadController");
const getErrorResponse = require("../utils/getErrorResponse");

module.exports = {
    upLoadFile: async (req, res) => {
        try {
            const file = req.file;
            const response = await upLoadFile(file);
            if (response == true) {
                res.status(200).send({
                    message: 'The data has been loaded correctly',
                    success: response
                })
            }
            else if (response == false) {
                res.status(200).send({
                    message: 'The data is already registered in the database',
                    success: response
                })
            }
            else {
                res.status(500).send({
                    message: 'Registration could not be completed',
                    success: false,
                })
            }
        } catch (error) {
            getErrorResponse(error)
            // res.status(500).send({
            //     message: 'Registration could not be completed',
            //     success: false,
            // })
        }
    }
}