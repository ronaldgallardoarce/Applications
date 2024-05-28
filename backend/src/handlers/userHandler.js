const { postUser } = require("../controllers/userController")

module.exports = {
    postUser: async (req, res) => {
        try {
            const user = req.body
            const response = await postUser(user)
            res.status(200).send({
                message: 'The user was registered correctly',
                success: response
            })
        } catch (error) {
            res.status(500).send({
                message: 'Registration could not be completed',
                success: false,
            })
        }
    }
}