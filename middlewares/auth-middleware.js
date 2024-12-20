const jwt = require('jsonwebtoken');
const UserModel = require('../models/user-model');

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");

    // if you attempt to use an expired token, you'll receive a "Unauthorized HTTP, Token not provided" response
    if (!token) {
        return res
            .status(401)
            .json({ message: "Unauthorized HTTP, Token not provided" });
    }

    const jwtToken = token.replace("Bearer", "").trim();
    console.log("token form auth middleware :", jwtToken);
 
    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

        const userData = await UserModel.findOne({ email: isVerified.email }).select({ password: 0, });

        req.user = userData;
        req.token = token;
        req.userID = userData._id;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized, invalid token." })
    }
}

module.exports = authMiddleware;