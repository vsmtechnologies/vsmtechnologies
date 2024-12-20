const ContactModel = require('../models/contact-model');

const contactForm = async (req, res) =>{
    try {
        const response = req.body;
        await ContactModel.create(response);
        if(response){
            console.log("message send successful");
        }
        return res.status(200).json({ message: "message send successful"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "message not delivered"});
    }
}

module.exports = {contactForm};