const express = require('express');
const categoryControllers = require('../controllers/categoryControllers');

const categoryRouter = express.Router();

// Route to get all categories
categoryRouter.get('/', categoryControllers.getAllCategories);

// Route to get a category by ID or name
categoryRouter.get('/:idOrName', categoryControllers.getCategoryByIdOrName);

// Route to create a new category
categoryRouter.post('/', categoryControllers.createCategory);

// Route to update an existing category by ID
categoryRouter.put('/:id', categoryControllers.editCategory);

module.exports = categoryRouter;
