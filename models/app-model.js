const { Schema, model } = require('mongoose');

const AppSchema = new Schema({
    img: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    description: { type: String, required: true },
    founder: { type: String, required: true },
    coFounder: { type: String, required: true },
    cto: { type: String, required: true },
    co: { type: String, required: true },
});

const AppModel = new model("App", AppSchema);

module.exports = AppModel; 