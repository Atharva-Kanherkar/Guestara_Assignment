const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String },
    description: { type: String },
    taxApplicability: { type: Boolean, default: false },
    tax: { type: Number },
    taxType: { type: String }
});

module.exports = mongoose.model('Category', CategorySchema);
//This is the schema for the Category model. It has a name, image, description, taxApplicability, tax, and taxType fields.