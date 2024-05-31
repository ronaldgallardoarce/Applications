const { postUser, authLogin, getAllUsers } = require("../controllers/userController")

module.exports = {
    postUser: async (req, res) => {
        try {
            const user = req.body
            const response = await postUser(user)
            res.status(200).json({
                message: 'The user was registered correctly',
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
    getAllUsers: async (req, res) => {
        try {
            const users = await getAllUsers();
            res.status(200).json({
                users: users,
                success: true
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error
            })
        }
    },
    authLogin: async (req, res) => {
        try {
            const user = req.body;
            const login = await authLogin(user);
            if (login.success) {
                res.cookie('token', login.token, {
                    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                    httpOnly: true
                });
                res.status(200).json({
                    success: true,
                    userLogin: login.userLogin
                })
            }
            else {
                res.status(404).json(login);
            }
        } catch (error) {
            res.status(500).json({
                message: 'An error occurred while logging in',
                success: false,
                error: error
            })
        }
    }
}