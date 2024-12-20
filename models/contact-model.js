const { Schema, model } = require('mongoose');

const contactSchema = new Schema({
    fullname : {type: String, required: true},
    email: {type: String, required: true},
    phone: { type: Number, required: true },
    message: { type: String, required: true },
});

const ContactModel = new model("Contact", contactSchema);

module.exports = ContactModel; 