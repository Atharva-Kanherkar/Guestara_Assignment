const SubCategory = require('../models/SubCategory');
const Category = require('../models/Category');

// Create Sub-Category
const createSubCategory = async (req, res) => {
    const { categoryId } = req.params;
    const { name, image, description, taxApplicable, tax } = req.body;

    try {
        // Validate category existence
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Create sub-category
        const newSubCategory = new SubCategory({
            name,
            image,
            description,
            taxApplicable: taxApplicable !== undefined ? taxApplicable : category.taxApplicable,
            tax: tax !== undefined ? tax : category.tax,
            category: categoryId
        });

        const savedSubCategory = await newSubCategory.save();
        res.status(201).json(savedSubCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Sub-Categories
const getAllSubCategories = async (req, res) => {
    try {
        const subCategories = await SubCategory.find();
        res.status(200).json(subCategories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Sub-Category by ID
const getSubCategoryById = async (req, res) => {
    const { subCategoryId } = req.params;

    try {
        const subCategory = await SubCategory.findById(subCategoryId);
        if (!subCategory) {
            return res.status(404).json({ message: 'Sub-category not found' });
        }
        res.status(200).json(subCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Sub-Categories Under a Category
const getSubCategoriesByCategory = async (req, res) => {
    const { categoryId } = req.params;

    try {
        const subCategories = await SubCategory.find({ category: categoryId });
        if (!subCategories.length) {
            return res.status(404).json({ message: 'No sub-categories found for this category' });
        }
        res.status(200).json(subCategories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Edit Sub-Category
const editSubCategory = async (req, res) => {
    const { subCategoryId } = req.params;
    const updateData = req.body;

    try {
        const updatedSubCategory = await SubCategory.findByIdAndUpdate(subCategoryId, updateData, { new: true });
        if (!updatedSubCategory) {
            return res.status(404).json({ message: 'Sub-category not found' });
        }
        res.status(200).json(updatedSubCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

 module.exports = {
    createSubCategory,
    getAllSubCategories,
    getSubCategoryById,
    getSubCategoriesByCategory,
    editSubCategory
 };