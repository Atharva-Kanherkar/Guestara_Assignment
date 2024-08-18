const Item = require('../models/Item');
const SubCategory = require('../models/SubCategory');
const Category = require('../models/Category');

// Create Item
const createItem = async (req, res) => {
    
    const { name, image, description, taxApplicable, tax, baseAmount, discount,categoryId, subCategoryId } = req.body;

    try {
        // Find the category
        const category = categoryId ? await Category.findById(categoryId) : null;
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Find the sub-category
        const subCategory = subCategoryId ? await SubCategory.findById(subCategoryId) : null;
        if (subCategoryId && !subCategory) {
            return res.status(404).json({ message: 'Sub-category not found' });
        }

        // Create item
        const newItem = new Item({
            name,
            image,
            description,
            taxApplicable: taxApplicable !== undefined ? taxApplicable : (subCategory ? subCategory.taxApplicable : category.taxApplicable),
            tax: tax !== undefined ? tax : (subCategory ? subCategory.tax : category.tax),
            baseAmount,
            discount,
            totalAmount: baseAmount - discount,
            categoryId: categoryId,
            subCategoryId: subCategoryId
        });

        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Items
const getAllItems = async (req, res) => {
    try {
        const items = await Item.find().populate('categoryId subCategoryId');
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Item by ID
const getItemById = async (req, res) => {
    const { itemId } = req.params;

    try {
        const item = await Item.findById(itemId).populate('categoryId subCategoryId');
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Items Under a Category
const getItemsByCategory = async (req, res) => {
    const { categoryId } = req.params;

    try {
        const items = await Item.find({ category: categoryId }).populate('categoryId subCategoryId');
        if (!items.length) {
            return res.status(404).json({ message: 'No items found for this category' });
        }
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Items Under a Sub-Category
const getItemsBySubCategory = async (req, res) => {
    const { subCategoryId } = req.params;

    try {
        const items = await Item.find({ subCategory: subCategoryId }).populate('categoryId subCategoryId');
        if (!items.length) {
            return res.status(404).json({ message: 'No items found for this sub-category' });
        }
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Edit Item
const editItem = async (req, res) => {
    const { itemId } = req.params;
    const updateData = req.body;

    try {
        const updatedItem = await Item.findByIdAndUpdate(itemId, updateData, { new: true }).populate('categoryId subCategoryId');
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Item
const deleteItem = async (req, res) => {
    const { itemId } = req.params;

    try {
        const deletedItem = await Item.findByIdAndDelete(itemId);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Search Item by Name
const searchItemByName = async (req, res) => {
    const { name } = req.query;

    try {
        const items = await Item.find({ name: new RegExp(name, 'i') }).populate('categoryId subCategoryId');
        if (!items.length) {
            return res.status(404).json({ message: 'No items found' });
        }
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Exporting all functions
module.exports = {
    createItem,
    getAllItems,
    getItemById,
    getItemsByCategory,
    getItemsBySubCategory,
    editItem,
    deleteItem,
    searchItemByName
};
