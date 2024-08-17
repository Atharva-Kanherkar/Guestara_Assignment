const express = require('express');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Category = require('../models/Category');

// Create Category
const createCategory = [
    // Validation rules
    body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required'),
    body('image').optional().isURL().withMessage('Image must be a valid URL'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('taxApplicable').optional().isBoolean().withMessage('Tax Applicable must be a boolean'),
    body('tax').optional().isNumeric().withMessage('Tax must be a number'),
    body('taxType').optional().isString().withMessage('Tax Type must be a string'),

    async (req, res) => {
        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, image, description, taxApplicable, tax, taxType } = req.body;

        try {
            // Create and save new category
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
            // Handle unexpected errors
            res.status(500).json({ error: error.message });
        }
    }
];

// Edit Category
const editCategory = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid category ID' });
    }

    try {
        // Update and retrieve the category
        const updatedCategory = await Category.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        // Handle unexpected errors
        res.status(500).json({ error: error.message });
    }
};

// GET: Get all categories
const getAllCategories = async (req, res) => {
    try {
        // Retrieve all categories
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        // Handle unexpected errors
        res.status(500).json({ error: error.message });
    }
};

// GET: Get category by ID or Name
const getCategoryByIdOrName = async (req, res) => {
    const { idOrName } = req.params;

    // Construct query based on ID or Name
    const query = mongoose.Types.ObjectId.isValid(idOrName) 
        ? { _id: idOrName }
        : { name: idOrName };

    try {
        // Find category by ID or Name
        const category = await Category.findOne(query);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        // Handle unexpected errors
        res.status(500).json({ error: error.message });
    }
};

// Export controller functions
module.exports = {
    createCategory,
    editCategory,
    getAllCategories,
    getCategoryByIdOrName
};
