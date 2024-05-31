const { Record } = require('../dbContext');

module.exports = {
    getAllRecords: async () => {
        try {
            const records = await Record.findAll();
            return records
        } catch (error) {
            return error
        }
    },
    getRecordsByUser: async (userId) => {
        try {
            const records = await Record.findAll({
                where: {
                    userId: userId
                }
            });
            return records
        } catch (error) {
            return error
        }
    }
}