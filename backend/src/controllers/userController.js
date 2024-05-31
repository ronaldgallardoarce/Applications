const { User } = require('../dbContext')
const { signIn } = require('../services/jwtservice')
module.exports = {
    postUser: async (user) => {
        try {
            const newUser = await User.create(user)
            return true
        } catch (error) {
            return error
        }
    },
    getAllUsers: async () => {
        try {
            const users = await User.findAll();
            return users
        } catch (error) {
            return error
        }
    },
    authLogin: async (user) => {
        try {
            const userExist = await User.findOne({
                where: { user: user.user },
            });
            if (!userExist) {
                return {
                    success: false,
                    message: 'Username does not exist',
                    status: 400
                }
            }
            else if (userExist.password !== user.password) {
                return {
                    success: false,
                    message: 'Password is incorrect',
                    status: 401
                }
            }
            else if (!userExist.state) {
                return {
                    success: false,
                    message: 'The user does not have access',
                    status: 401
                }
            }
            const token = await signIn(userExist);
            const userLogin = {
                userId: userExist.userId,
                fullName: userExist.fullName,
                role: userExist.role,
                token: token
            }
            return {
                success: true,
                userLogin,
                token
            };
        } catch (error) {
            return error;
        }
    }
}