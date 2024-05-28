const { User } = require('../dbContext')
module.exports = {
    postUser: async (user) => {
        try {
            const newUser = await User.create(user)
            return true
        } catch (error) {
            return error
        }
    }
}