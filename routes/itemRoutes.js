const express = require('express');
const itemControllers = require('../controllers/itemControllers');

const itemRouter = express.Router();

// Route to create a new item
itemRouter.post('/:categoryId?/:subCategoryId?', itemControllers.createItem);

// Route to get all items
itemRouter.get('/', itemControllers.getAllItems);

// Route to get an item by ID
itemRouter.get('/:itemId', itemControllers.getItemById);

// Route to get all items under a specific category
itemRouter.get('/category/:categoryId', itemControllers.getItemsByCategory);

// Route to get all items under a specific sub-category
itemRouter.get('/sub-category/:subCategoryId', itemControllers.getItemsBySubCategory);

// Route to update an existing item by ID
itemRouter.put('/:itemId', itemControllers.editItem);

// Route to delete an item by ID
itemRouter.delete('/:itemId', itemControllers.deleteItem);

// Route to search items by name
itemRouter.get('/search', itemControllers.searchItemByName);

module.exports = itemRouter;
