 # Internship Assignment: Node.js Backend for Menu Management

## Overview

This project is a Node.js backend server designed for menu management. The menu is divided into three hierarchical parts: Category, Sub-Category, and Items. The API provides CRUD (Create, Read, Update, Delete) operations for each part and allows searching for items by name.

## Assignment Objectives

- Project Setup
- Create, Retrieve, Edit, and Delete operations for Category, Sub-Category, and Items
- Search functionality for items by name
- Comprehensive documentation

## Table of Contents

- [Project Setup](#project-setup)
- [API Endpoints](#api-endpoints)
  - [Category Endpoints](#category-endpoints)
  - [Sub-Category Endpoints](#sub-category-endpoints)
  - [Item Endpoints](#item-endpoints)
  - [Search Endpoint](#search-endpoint)
- [Running the Project Locally](#running-the-project-locally)
- [Short Answer Questions](#short-answer-questions)
- [Contributing](#contributing)
- [License](#license)

## Project Setup

The project is set up using Node.js and Express.js. It uses MongoDB as the database due to its flexibility in handling hierarchical data structures, which is essential for managing categories, sub-categories, and items.

## API Endpoints

### Category Endpoints

- **Create Category**
  - **POST** `/api/categories`
  - **Attributes**:
    - `name`: String
    - `image`: URL
    - `description`: String
    - `taxApplicability`: Boolean
    - `tax`: Number (if applicable)
    - `taxType`: String

- **Get All Categories**
  - **GET** `/api/categories`

- **Get Category by ID or Name**
  - **GET** `/api/categories/:idOrName`

- **Edit Category**
  - **PUT** `/api/categories/:id`

- **Delete Category**
  - **DELETE** `/api/categories/:id`

### Sub-Category Endpoints

- **Create Sub-Category**
  - **POST** `/api/categories/:categoryId/subcategories`
  - **Attributes**:
    - `name`: String
    - `image`: URL
    - `description`: String
    - `taxApplicability`: Boolean (default: Category tax applicability)
    - `tax`: Number (default: Category tax number)

- **Get All Sub-Categories**
  - **GET** `/api/subcategories`

- **Get All Sub-Categories under a Category**
  - **GET** `/api/categories/:categoryId/subcategories`

- **Get Sub-Category by ID or Name**
  - **GET** `/api/subcategories/:idOrName`

- **Edit Sub-Category**
  - **PUT** `/api/subcategories/:id`

- **Delete Sub-Category**
  - **DELETE** `/api/subcategories/:id`

### Item Endpoints

- **Create Item**
  - **POST** `/api/subcategories/:subCategoryId/items`
  - **Attributes**:
    - `name`: String
    - `image`: URL
    - `description`: String
    - `taxApplicability`: Boolean
    - `tax`: Number (if applicable)
    - `baseAmount`: Number
    - `discount`: Number
    - `totalAmount`: Number (Base Amount - Discount)

- **Get All Items**
  - **GET** `/api/items`

- **Get All Items under a Category**
  - **GET** `/api/categories/:categoryId/items`

- **Get All Items under a Sub-Category**
  - **GET** `/api/subcategories/:subCategoryId/items`

- **Get Item by ID or Name**
  - **GET** `/api/items/:idOrName`

- **Edit Item**
  - **PUT** `/api/items/:id`

- **Delete Item**
  - **DELETE** `/api/items/:id`

### Search Endpoint

- **Search Item by Name**
  - **GET** `/api/items/search?name=ItemName`

## Running the Project Locally

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/menu-management-backend.git
    ```

2. **Navigate to the project directory:**
    ```bash
    cd menu-management-backend
    ```

3. **Install the dependencies:**
    ```bash
    npm install
    ```

4. **Create a `.env` file in the root directory and add your MongoDB connection string:**
    ```plaintext
    MONGO_URI=your_mongodb_connection_string
    PORT=5000
    ```

5. **Start the development server:**
    ```bash
    npm run dev
    ```

6. **Test the API using Postman or any other API testing tool.**

## Short Answer Questions

1. **Which database you have chosen and why?**
   - I chose MongoDB because it provides a flexible schema design and is well-suited for hierarchical data structures, making it easier to manage categories, sub-categories, and items.

2. **3 things that you learned from this assignment?**
   - Efficient structuring of RESTful APIs.
   - Importance of thorough testing using tools like Postman.
   - The significance of error handling and validation in backend development.

3. **What was the most difficult part of the assignment?**
   - Managing relationships between categories, sub-categories, and items in a way that allows for flexible querying and CRUD operations.

4. **What you would have done differently given more time?**
   - Implement advanced features like pagination for listing endpoints, better error handling with custom middleware, and integrating authentication for secure access.

## Contributing

If you'd like to contribute to this project, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
