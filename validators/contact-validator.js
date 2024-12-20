const { z } = require('zod');

const contactSchema = z.object({
    fullname: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name must be at least of 3 characters." })
        .max(255, { message: "Name must not be more than 255 characters." }),
    email: z
        .string({ required_error: "Email not valid" })
        .trim()
        .email({ message: "Invalid email address" }),
    phone: z
        .string({ required_error: "Phone is required" })
        .trim()
        .min(10, { message: "Phone must be at least of 10 digits." })
        .max(12, { message: "Phone must not be more than 12 digits." }),
    message: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(25, { message: "message must be more than 25 characters." })
        .max(2048, { message: "message must not be more than 2048 characters." }),
}); 

module.exports = contactSchema;