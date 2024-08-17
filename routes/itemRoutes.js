const express = require('express');
const itemControllers = require('../controllers/itemControllers');

const itemRouter = express.Router();

// Route to create a new item
itemRouter.post('/create', itemControllers.createItem);

// Route to get all items
itemRouter.get('/get', itemControllers.getAllItems);

// Route to search items by name
itemRouter.get('/get/search', itemControllers.searchItemByName);

// Route to get an item by ID
itemRouter.get('/get/:itemId', itemControllers.getItemById);

// Route to get all items under a specific category
itemRouter.get('/get/category/:categoryId', itemControllers.getItemsByCategory);

// Route to get all items under a specific sub-category
itemRouter.get('/get/sub-category/:subCategoryId', itemControllers.getItemsBySubCategory);

// Route to update an existing item by ID
itemRouter.put('/edit/:itemId', itemControllers.editItem);

 


module.exports = itemRouter;
