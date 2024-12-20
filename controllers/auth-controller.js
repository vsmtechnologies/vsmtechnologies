const UserModel = require('../models/user-model');

const Home = async (req, res) => {
    try {
        res.status(200).send('Hello AUTH');
    } catch (error) {
        console.log(error);
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//                         Register Form
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
const Register = async (req, res) => {
    try {
        const { fullname, username, email, phone, password, isAdmin } = req.body;

        const userExist = await UserModel.findOne({ email }) || await UserModel.findOne({ phone });

        if (userExist) {
            return res.status(400).json({ message: "email or phone already exists" })
        }

        const newUser = new UserModel({ fullname, username, email, phone, password, isAdmin });

        const saveUser = await newUser.save();

        if (saveUser) {
            console.log("Registration Successful");

            res.status(200).json(
                {
                    mag: "Registration Successful",
                    token: await saveUser.generateToken(),
                    userId: saveUser._id.toString(),
                });
        }

    } catch (error) {
        console.log(error);
        res.status(404).send({ msg: "Internal Server Error" });
    }
}


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//                         Login Form
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await UserModel.findOne({ email });

        // check user existense
        if (!userExist) {
            return res.status(400).json({ message: "Invalid User" });
        }

        // password compare
        const userPassword = await userExist.comparePassword(password);

        if (userPassword) {
            console.log("Login Successful");
            res.status(200).json(
                {
                    msg: "Login Successful",
                    token: await userExist.generateToken(),
                    userId: userExist._id.toString(),
                });
        } else {
            res.status(401).json({message : "Invalid email or password"});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//                         User Data
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
const UserData = async (req, res) => {
    try {
        const userData = req.user;
        console.log("user data : ", userData);
        return res.status(200).json({userData})
    } catch (error) {
        console.log(`error from the user route ${error}`);
    }
}

module.exports = { Home, Register, Login, UserData};