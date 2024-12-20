const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

// secure the password with the bcrypt
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified) {
        next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);

        user.password = hash_password;
    } catch (error) {
        next(error);
    }
})

// JWT (Json Web Token)
userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '30d',
            }
        )
    } catch (error) {
        console.error(error);
    }
}

// compare password
userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password)
}

const UserModel = new model("User", userSchema);

module.exports = UserModel;