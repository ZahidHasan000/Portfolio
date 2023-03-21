const User = require("../model/User");
const jwt = require("jsonwebtoken");
// const { promisify } = require('util');
// const cookieParser = require("cookie-parser");

const isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        // const { token } = req.cookieParser;

        if (!token) {
            return res.status(400).json({
                success: false,
                meessage: "Login to access this resource"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);
        req.user = user;

        next();

    } catch (error) {
        return res.status(400).json({
            success: false,
            meessage: error.meessage
        });
    }
};

module.exports = isAuthenticated;