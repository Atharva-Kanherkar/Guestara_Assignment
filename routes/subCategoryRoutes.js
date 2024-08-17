const express = require('express');
const subCategoryControllers = require('../controllers/subCategoryControllers');

const subCategoryRouter = express.Router();

// Route to create a new sub-category under a category
subCategoryRouter.post('/:categoryId', subCategoryControllers.createSubCategory);

// Route to get all sub-categories
subCategoryRouter.get('/', subCategoryControllers.getAllSubCategories);

// Route to get a sub-category by ID
subCategoryRouter.get('/:subCategoryId', subCategoryControllers.getSubCategoryById);

// Route to get all sub-categories under a specific category
subCategoryRouter.get('/category/:categoryId', subCategoryControllers.getSubCategoriesByCategory);

// Route to update an existing sub-category by ID
subCategoryRouter.put('/:subCategoryId', subCategoryControllers.editSubCategory);

 

module.exports = subCategoryRouter;
