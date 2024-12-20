const { z } = require("zod")

const adminUserSchema = z.object({
    fullname: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name must be at least of 3 characters." })
        .max(255, { message: "Name must not be more than 255 characters." }),
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(10, { message: "Email must be at least of 10 characters." })
        .max(255, { message: "Email must not be more than 255 characters." }),
    phone: z
        .string({ required_error: "Phone is required" })
        .trim()
        .min(10, { message: "Phone must be at least of 10 digits." })
        .max(10, { message: "Phone must not be more than 10 digits." }),
});

module.exports = {adminUserSchema};