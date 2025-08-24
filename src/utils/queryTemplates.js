export const queryTemplates = {
  basic: {
    title: 'Basic Operations',
    queries: [
      {
        name: 'Show Databases',
        query: 'SHOW DATABASES;',
        description: 'List all available databases'
      },
      {
        name: 'Use Database',
        query: 'USE employee_db;',
        description: 'Select a database to work with'
      },
      {
        name: 'Show Tables',
        query: 'SHOW TABLES;',
        description: 'List all tables in the current database'
      },
      {
        name: 'Describe Table',
        query: 'DESCRIBE employees;',
        description: 'Show the structure of a table'
      },
      {
        name: 'Select All',
        query: 'SELECT * FROM employees;',
        description: 'Select all rows and columns from a table'
      }
    ]
  },

  crud: {
    title: 'CRUD Operations',
    queries: [
      {
        name: 'Select with Condition',
        query: `SELECT name, email, department, salary 
FROM employees 
WHERE department = 'Engineering';`,
        description: 'Select specific columns with a WHERE condition'
      },
      {
        name: 'Insert Record',
        query: `INSERT INTO employees 
VALUES (6, 'Alice Johnson', 'alice.johnson@company.com', 'Engineering', 78000.00, '2023-01-15');`,
        description: 'Insert a new record into a table'
      },
      {
        name: 'Update Record',
        query: `UPDATE employees 
SET salary = 85000 
WHERE name = 'John Doe';`,
        description: 'Update existing records'
      },
      {
        name: 'Delete Record',
        query: `DELETE FROM employees 
WHERE id = 6;`,
        description: 'Delete records from a table'
      }
    ]
  },

  advanced: {
    title: 'Advanced Queries',
    queries: [
      {
        name: 'Group By with Aggregate',
        query: `SELECT department, 
       COUNT(*) as employee_count,
       AVG(salary) as avg_salary,
       MAX(salary) as max_salary
FROM employees 
GROUP BY department;`,
        description: 'Group records and calculate aggregates'
      },
      {
        name: 'Join Tables',
        query: `SELECT e.name, e.email, d.name as department_name, d.budget
FROM employees e
JOIN departments d ON e.department = d.name;`,
        description: 'Join two tables together'
      },
      {
        name: 'Order and Limit',
        query: `SELECT name, salary 
FROM employees 
ORDER BY salary DESC 
LIMIT 3;`,
        description: 'Sort results and limit the number of rows'
      },
      {
        name: 'Subquery',
        query: `SELECT name, salary
FROM employees
WHERE salary > (
    SELECT AVG(salary) 
    FROM employees
);`,
        description: 'Use a subquery to filter results'
      }
    ]
  },

  ddl: {
    title: 'Data Definition Language (DDL)',
    queries: [
      {
        name: 'Create Database',
        query: 'CREATE DATABASE my_new_database;',
        description: 'Create a new database'
      },
      {
        name: 'Create Table',
        query: `CREATE TABLE projects (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(50),
    budget INT,
    start_date DATE,
    status VARCHAR(20) DEFAULT 'Active'
);`,
        description: 'Create a new table with various column types'
      },
      {
        name: 'Alter Table - Add Column',
        query: `ALTER TABLE employees 
ADD COLUMN phone VARCHAR(20);`,
        description: 'Add a new column to an existing table'
      },
      {
        name: 'Drop Table',
        query: 'DROP TABLE projects;',
        description: 'Delete a table and all its data'
      }
    ]
  },

  ecommerce: {
    title: 'E-commerce Queries',
    queries: [
      {
        name: 'Products by Category',
        query: `SELECT category, 
       COUNT(*) as product_count,
       AVG(price) as avg_price
FROM products 
GROUP BY category
ORDER BY product_count DESC;`,
        description: 'Analyze products by category'
      },
      {
        name: 'Expensive Products',
        query: `SELECT name, price, category
FROM products 
WHERE price > 100
ORDER BY price DESC;`,
        description: 'Find products above a certain price'
      },
      {
        name: 'Low Stock Alert',
        query: `SELECT name, stock, category
FROM products 
WHERE stock < 30
ORDER BY stock ASC;`,
        description: 'Find products with low stock levels'
      },
      {
        name: 'Update Product Price',
        query: `UPDATE products 
SET price = price * 1.1 
WHERE category = 'Electronics';`,
        description: 'Increase prices for a specific category'
      }
    ]
  }
};

export const getRandomQuery = () => {
  const categories = Object.values(queryTemplates);
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const randomQuery =
    randomCategory.queries[Math.floor(Math.random() * randomCategory.queries.length)];
  return randomQuery;
};

export const getAllQueries = () => {
  return Object.values(queryTemplates).reduce((acc, category) => {
    return acc.concat(category.queries);
  }, []);
};
