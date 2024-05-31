const { getAllRecords, getRecordsByUser } = require("../controllers/recordController");
const getErrorResponse = require("../utils/getErrorResponse");

module.exports = {
    getAllRecords: async (req, res) => {
        try {
            const records = await getAllRecords();
            res.status(200).json({
                success: true,
                records: records
            })
        } catch (error) {
            getErrorResponse(error)
        }
    },
    getRecordsByUser: async (req, res) => {
        try {
            const userId = req.params.userId
            const records = await getRecordsByUser(userId);
            res.status(200).json({
                success: true,
                records: records
            })
        } catch (error) {
            getErrorResponse(error)
        }
    },
}