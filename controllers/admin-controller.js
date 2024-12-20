const ContactModel = require("../models/contact-model");
const UserModel = require("../models/user-model");

// Get All Users Logic
const getAllUsers = async( req, res) =>{
    try {
        const users = await UserModel.find({}, {password: 0});
        console.log(users);
        
        if(!users || users.length === 0){
            return res.status(404).json({message: "Users Not Found"})
        }
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
} 

// User Update Logic
const updateUserById = async(req, res) => {
    try {
        const id = req.params.id;
        const updateUserData = req.body;
        const updateUser = await UserModel.updateOne({_id: id}, {$set: updateUserData})
        return res.status(200).json(updateUser);
    } catch (error) {
        next(error);
    }
}

// User Delete Logic
const deleteUserById = async(req, res) => {
    try {
        const id = req.params.id;
        await UserModel.deleteOne({_id: id});
        return res.status(200).json({message: "User Deleted Successfully"});
    } catch (error) {
        next(error);
    }
}

// Single User Logic
const getUserById = async(req, res) => {
    try {
        const id = req.params.id;
        const data = await UserModel.findOne({_id: id}, {password: 0});
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}


// Get All Contacts Logic
const getAllContacts = async( req, res) =>{
    try {
        const contacts = await ContactModel.find();
        console.log(contacts);
        
        if(!contacts || contacts.length === 0){
            return res.status(404).json({message: "No Contacts"});
        }
        return res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
}

// Contact Delete Logic
const deleteContactById = async(req, res) => {
    try {
        const id = req.params.id;
        await ContactModel.deleteOne({_id: id});
        return res.status(200).json({message: "Contact Deleted Successfully"});
    } catch (error) {
        next(error);
    }
}


module.exports = {getAllUsers, updateUserById, deleteUserById, getUserById, getAllContacts, deleteContactById};