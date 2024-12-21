const { z } = require('zod');

const loginSchema = z.object({
    email: z
        .string({ required_error: "Email not valid" })
        .trim()
        .email({ message: "Invalid email address" }),
    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(6, { message: "password must be at least of 6 digits." })
        .max(225, { message: "password must not be more than 225 digits." }),
});

const signupSchema = z.object({
    fullname: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name must be at least of 3 characters." })
        .max(255, { message: "Name must not be more than 255 characters." }),
    username: z
        .string({ required_error: "Surname is required" })
        .trim()
        .min(1, { message: "Surname must be at least of 3 characters." })
        .max(255, { message: "Surname must not be more than 255 characters." }),
    email: z
        .string({ required_error: "Email not valid" })
        .trim()
        .email({ message: "Invalid email address" }),
    phone: z
        .string({ required_error: "Phone is required" })
        .trim()
        .min(10, { message: "Phone must be at least of 10 digits." })
        .max(10, { message: "Phone must not be more than 10 digits." }),
    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(6, { message: "Password must be at least of 6 characters." })
        .max(224, { message: "Password can't be greater than 224 characters." }),
});

module.exports = { loginSchema, signupSchema }