const express = require('express');
const subCategoryControllers = require('../controllers/subCategoryControllers');

const subCategoryRouter = express.Router();

// Route to create a new sub-category under a category
subCategoryRouter.post('/create/:categoryId', subCategoryControllers.createSubCategory);

// Route to get all sub-categories
subCategoryRouter.get('/getAllSubCategories', subCategoryControllers.getAllSubCategories);

// Route to get a sub-category by ID
subCategoryRouter.get('getCategory/:subCategoryId', subCategoryControllers.getSubCategoryById);

// Route to get all sub-categories under a specific category
subCategoryRouter.get('/getByCategory/:categoryId', subCategoryControllers.getSubCategoriesByCategory);

// Route to update an existing sub-category by ID
subCategoryRouter.put('/edit/:subCategoryId', subCategoryControllers.editSubCategory);

 

module.exports = subCategoryRouter;
