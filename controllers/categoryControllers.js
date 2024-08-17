const Category = require('../models/Category');


// Create Category
exports.createCategory = async (req, res) => {
    const { name, image, description, taxApplicable, tax, taxType } = req.body;
    
    try {
        const newCategory = new Category({
            name,
            image,
            description,
            taxApplicable,
            tax,
            taxType,
        });

        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




// Edit Category
exports.editCategory = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




// GET: Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET: Get category by ID or Name
exports.getCategoryByIdOrName = async (req, res) => {
    const { idOrName } = req.params;
    try {
        const category = await Category.findOne({
            $or: [{ _id: idOrName }, { name: idOrName }]
        });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};