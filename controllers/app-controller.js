const AppModel = require('../models/app-model');

const getAppData = async (req, res) => {
    try {
        const response = await AppModel.find();
        if (!response) {
            res.status(404).json({ mag: "No Data found" });
        }
        res.status(200).json({ msg: response });
    } catch (error) {
        next(error);
    }
} 

module.exports = {getAppData};