export const queryTemplates = {
  basic: {
    title: 'Basic Operations',
    icon: 'Database',
    queries: [
      {
        name: 'Show Databases',
        query: 'SHOW DATABASES;',
        description: 'List all available databases',
        keywords: ['show', 'database', 'list']
      },
      {
        name: 'Use Database',
        query: 'USE employee_db;',
        description: 'Select a database to work with',
        keywords: ['use', 'select', 'database']
      },
      {
        name: 'Show Tables',
        query: 'SHOW TABLES;',
        description: 'List all tables in the current database',
        keywords: ['show', 'tables', 'list']
      },
      {
        name: 'Describe Table',
        query: 'DESCRIBE employees;',
        description: 'Show the structure of a table',
        keywords: ['describe', 'structure', 'columns']
      },
      {
        name: 'Select All',
        query: 'SELECT * FROM employees;',
        description: 'Select all rows and columns from a table',
        keywords: ['select', 'all', 'from']
      },
      {
        name: 'Select with Limit',
        query: 'SELECT * FROM employees LIMIT 10;',
        description: 'Select first 10 rows from a table',
        keywords: ['select', 'limit', 'top']
      }
    ]
  },

  crud: {
    title: 'CRUD Operations',
    icon: 'Edit3',
    queries: [
      {
        name: 'Select with Condition',
        query: `SELECT name, email, department, salary 
FROM employees 
WHERE department = 'Engineering'
ORDER BY salary DESC;`,
        description: 'Select specific columns with a WHERE condition',
        keywords: ['select', 'where', 'condition', 'filter']
      },
      {
        name: 'Insert Single Record',
        query: `INSERT INTO employees 
VALUES (6, 'Alice Johnson', 'alice.johnson@company.com', 'Engineering', 78000.00, '2023-01-15');`,
        description: 'Insert a new record into a table',
        keywords: ['insert', 'add', 'new', 'record']
      },
      {
        name: 'Insert Multiple Records',
        query: `INSERT INTO employees (name, email, department, salary, hire_date)
VALUES 
  ('Alice Johnson', 'alice.johnson@company.com', 'Engineering', 78000.00, '2023-01-15'),
  ('Bob Smith', 'bob.smith@company.com', 'Marketing', 65000.00, '2023-02-01'),
  ('Carol Davis', 'carol.davis@company.com', 'Engineering', 82000.00, '2023-01-20');`,
        description: 'Insert multiple records at once',
        keywords: ['insert', 'multiple', 'bulk', 'batch']
      },
      {
        name: 'Update Record',
        query: `UPDATE employees 
SET salary = 85000 
WHERE name = 'John Doe';`,
        description: 'Update existing records',
        keywords: ['update', 'set', 'modify', 'change']
      },
      {
        name: 'Update Multiple Fields',
        query: `UPDATE employees 
SET salary = 85000, department = 'Senior Engineering'
WHERE id = 1;`,
        description: 'Update multiple fields in a record',
        keywords: ['update', 'multiple', 'fields', 'set']
      },
      {
        name: 'Delete Record',
        query: `DELETE FROM employees 
WHERE id = 6;`,
        description: 'Delete records from a table',
        keywords: ['delete', 'remove', 'drop']
      },
      {
        name: 'Delete with Condition',
        query: `DELETE FROM employees 
WHERE hire_date < '2020-01-01';`,
        description: 'Delete records based on a condition',
        keywords: ['delete', 'where', 'condition']
      }
    ]
  },

  advanced: {
    title: 'Advanced Queries',
    icon: 'Zap',
    queries: [
      {
        name: 'Group By with Aggregate',
        query: `SELECT department, 
       COUNT(*) as employee_count,
       ROUND(AVG(salary), 2) as avg_salary,
       MAX(salary) as max_salary,
       MIN(salary) as min_salary
FROM employees 
GROUP BY department
ORDER BY avg_salary DESC;`,
        description: 'Group records and calculate aggregates',
        keywords: ['group', 'aggregate', 'count', 'avg', 'max', 'min']
      },
      {
        name: 'Having Clause',
        query: `SELECT department, 
       COUNT(*) as employee_count,
       AVG(salary) as avg_salary
FROM employees 
GROUP BY department
HAVING COUNT(*) > 2
ORDER BY avg_salary DESC;`,
        description: 'Filter grouped results with HAVING',
        keywords: ['having', 'group', 'filter', 'aggregate']
      },
      {
        name: 'Inner Join',
        query: `SELECT e.name, e.email, d.name as department_name, d.budget
FROM employees e
INNER JOIN departments d ON e.department = d.name
ORDER BY e.name;`,
        description: 'Inner join between two tables',
        keywords: ['join', 'inner', 'tables', 'relationship']
      },
      {
        name: 'Left Join',
        query: `SELECT e.name, e.department, d.budget
FROM employees e
LEFT JOIN departments d ON e.department = d.name
ORDER BY e.name;`,
        description: 'Left join to include all employees',
        keywords: ['left join', 'outer', 'all records']
      },
      {
        name: 'Subquery in WHERE',
        query: `SELECT name, salary, department
FROM employees
WHERE salary > (
    SELECT AVG(salary) 
    FROM employees
)
ORDER BY salary DESC;`,
        description: 'Use a subquery to filter results',
        keywords: ['subquery', 'average', 'filter', 'nested']
      },
      {
        name: 'Correlated Subquery',
        query: `SELECT e1.name, e1.salary, e1.department
FROM employees e1
WHERE e1.salary > (
    SELECT AVG(e2.salary)
    FROM employees e2
    WHERE e2.department = e1.department
)
ORDER BY e1.department, e1.salary DESC;`,
        description: 'Find employees earning above their department average',
        keywords: ['correlated', 'subquery', 'department', 'average']
      },
      {
        name: 'Union Query',
        query: `SELECT name, 'Employee' as type FROM employees
UNION
SELECT name, 'Department' as type FROM departments
ORDER BY name;`,
        description: 'Combine results from multiple queries',
        keywords: ['union', 'combine', 'multiple', 'tables']
      },
      {
        name: 'Window Function',
        query: `SELECT name, department, salary,
       ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as dept_rank,
       RANK() OVER (ORDER BY salary DESC) as overall_rank
FROM employees
ORDER BY department, dept_rank;`,
        description: 'Use window functions for ranking',
        keywords: ['window', 'rank', 'partition', 'over']
      }
    ]
  },

  ddl: {
    title: 'Data Definition Language (DDL)',
    icon: 'Database',
    queries: [
      {
        name: 'Create Database',
        query: 'CREATE DATABASE my_new_database;',
        description: 'Create a new database',
        keywords: ['create', 'database', 'new']
      },
      {
        name: 'Create Table',
        query: `CREATE TABLE projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(50),
    budget DECIMAL(12,2),
    start_date DATE,
    end_date DATE,
    status ENUM('Planning', 'Active', 'Completed', 'On Hold') DEFAULT 'Planning',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`,
        description: 'Create a new table with various column types and constraints',
        keywords: ['create', 'table', 'primary key', 'constraints']
      },
      {
        name: 'Create Table with Foreign Key',
        query: `CREATE TABLE project_assignments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT,
    project_id INT,
    role VARCHAR(50),
    assigned_date DATE,
    FOREIGN KEY (employee_id) REFERENCES employees(id),
    FOREIGN KEY (project_id) REFERENCES projects(id)
);`,
        description: 'Create a table with foreign key relationships',
        keywords: ['foreign key', 'references', 'relationship']
      },
      {
        name: 'Alter Table - Add Column',
        query: `ALTER TABLE employees 
ADD COLUMN phone VARCHAR(20),
ADD COLUMN address TEXT;`,
        description: 'Add new columns to an existing table',
        keywords: ['alter', 'add', 'column', 'modify']
      },
      {
        name: 'Alter Table - Modify Column',
        query: `ALTER TABLE employees 
MODIFY COLUMN salary DECIMAL(10,2) NOT NULL;`,
        description: 'Modify an existing column',
        keywords: ['alter', 'modify', 'column', 'datatype']
      },
      {
        name: 'Create Index',
        query: `CREATE INDEX idx_employee_department ON employees(department);
CREATE INDEX idx_employee_salary ON employees(salary);`,
        description: 'Create indexes to improve query performance',
        keywords: ['index', 'performance', 'optimize']
      },
      {
        name: 'Drop Table',
        query: 'DROP TABLE IF EXISTS projects;',
        description: 'Delete a table and all its data (with safety check)',
        keywords: ['drop', 'table', 'delete', 'if exists']
      }
    ]
  },

  analytics: {
    title: 'Analytics & Reporting',
    icon: 'BarChart3',
    queries: [
      {
        name: 'Salary Distribution',
        query: `SELECT 
    CASE 
        WHEN salary < 60000 THEN 'Under 60K'
        WHEN salary BETWEEN 60000 AND 80000 THEN '60K-80K'
        WHEN salary BETWEEN 80001 AND 100000 THEN '80K-100K'
        ELSE 'Over 100K'
    END as salary_range,
    COUNT(*) as employee_count,
    ROUND(AVG(salary), 2) as avg_salary
FROM employees 
GROUP BY salary_range
ORDER BY MIN(salary);`,
        description: 'Analyze salary distribution across ranges',
        keywords: ['case', 'when', 'salary', 'distribution', 'ranges']
      },
      {
        name: 'Monthly Hire Trends',
        query: `SELECT 
    YEAR(hire_date) as hire_year,
    MONTH(hire_date) as hire_month,
    COUNT(*) as hires_count,
    MONTHNAME(hire_date) as month_name
FROM employees 
GROUP BY hire_year, hire_month
ORDER BY hire_year DESC, hire_month;`,
        description: 'Analyze hiring trends by month and year',
        keywords: ['date', 'year', 'month', 'trends', 'time series']
      },
      {
        name: 'Top Performers by Department',
        query: `SELECT department, name, salary,
       RANK() OVER (PARTITION BY department ORDER BY salary DESC) as dept_rank
FROM employees
WHERE salary IS NOT NULL
QUALIFY dept_rank <= 3
ORDER BY department, dept_rank;`,
        description: 'Find top 3 highest paid employees per department',
        keywords: ['rank', 'top', 'performers', 'department']
      },
      {
        name: 'Employee Tenure Analysis',
        query: `SELECT 
    name,
    hire_date,
    DATEDIFF(CURDATE(), hire_date) as days_employed,
    ROUND(DATEDIFF(CURDATE(), hire_date) / 365.25, 1) as years_employed,
    CASE 
        WHEN DATEDIFF(CURDATE(), hire_date) < 365 THEN 'New (< 1 year)'
        WHEN DATEDIFF(CURDATE(), hire_date) < 1095 THEN 'Experienced (1-3 years)'
        ELSE 'Veteran (3+ years)'
    END as tenure_category
FROM employees
ORDER BY days_employed DESC;`,
        description: 'Calculate employee tenure and categorize by experience',
        keywords: ['tenure', 'date', 'experience', 'datediff']
      },
      {
        name: 'Department Budget vs Salary',
        query: `SELECT 
    d.name as department,
    d.budget,
    COUNT(e.id) as employee_count,
    SUM(e.salary) as total_salaries,
    ROUND(SUM(e.salary) / d.budget * 100, 2) as salary_budget_ratio
FROM departments d
LEFT JOIN employees e ON d.name = e.department
GROUP BY d.name, d.budget
ORDER BY salary_budget_ratio DESC;`,
        description: 'Compare department budgets with actual salary costs',
        keywords: ['budget', 'cost', 'ratio', 'financial']
      }
    ]
  },

  ecommerce: {
    title: 'E-commerce Queries',
    icon: 'ShoppingCart',
    queries: [
      {
        name: 'Products by Category',
        query: `SELECT category, 
       COUNT(*) as product_count,
       ROUND(AVG(price), 2) as avg_price,
       MIN(price) as min_price,
       MAX(price) as max_price
FROM products 
GROUP BY category
ORDER BY product_count DESC;`,
        description: 'Analyze products by category with price statistics',
        keywords: ['category', 'products', 'price', 'statistics']
      },
      {
        name: 'Inventory Management',
        query: `SELECT name, stock, price, category,
    CASE 
        WHEN stock = 0 THEN 'Out of Stock'
        WHEN stock < 10 THEN 'Low Stock'
        WHEN stock < 50 THEN 'Medium Stock'
        ELSE 'High Stock'
    END as stock_status,
    stock * price as inventory_value
FROM products 
ORDER BY stock ASC, inventory_value DESC;`,
        description: 'Comprehensive inventory management analysis',
        keywords: ['inventory', 'stock', 'value', 'management']
      },
      {
        name: 'Price Range Analysis',
        query: `SELECT 
    CASE 
        WHEN price < 25 THEN 'Budget (< $25)'
        WHEN price BETWEEN 25 AND 100 THEN 'Mid-range ($25-$100)'
        WHEN price BETWEEN 101 AND 500 THEN 'Premium ($101-$500)'
        ELSE 'Luxury (> $500)'
    END as price_category,
    COUNT(*) as product_count,
    ROUND(AVG(stock), 0) as avg_stock
FROM products 
GROUP BY price_category
ORDER BY MIN(price);`,
        description: 'Categorize products by price ranges',
        keywords: ['price', 'ranges', 'categorize', 'analysis']
      },
      {
        name: 'Bulk Price Update',
        query: `UPDATE products 
SET price = CASE 
    WHEN category = 'Electronics' THEN price * 1.1
    WHEN category = 'Clothing' THEN price * 1.05
    WHEN category = 'Books' THEN price * 1.03
    ELSE price
END
WHERE category IN ('Electronics', 'Clothing', 'Books');`,
        description: 'Apply different price increases by category',
        keywords: ['bulk', 'update', 'case', 'category']
      }
    ]
  },

  performance: {
    title: 'Performance Optimization',
    icon: 'Zap',
    queries: [
      {
        name: 'Explain Query Plan',
        query: `EXPLAIN SELECT e.name, d.name as department_name
FROM employees e
JOIN departments d ON e.department = d.name
WHERE e.salary > 70000;`,
        description: 'Analyze query execution plan for optimization',
        keywords: ['explain', 'performance', 'optimization', 'plan']
      },
      {
        name: 'Index Usage Check',
        query: `SHOW INDEX FROM employees;`,
        description: 'Display all indexes on the employees table',
        keywords: ['index', 'show', 'performance']
      },
      {
        name: 'Query with Hints',
        query: `SELECT /*+ USE_INDEX(employees, idx_department) */ 
    name, department, salary
FROM employees 
WHERE department = 'Engineering'
ORDER BY salary DESC;`,
        description: 'Use index hints to optimize query performance',
        keywords: ['hints', 'index', 'optimize', 'performance']
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

export const searchQueries = (searchTerm) => {
  if (!searchTerm.trim()) return getAllQueries();
  
  const term = searchTerm.toLowerCase();
  const allQueries = getAllQueries();
  
  return allQueries.filter(query => {
    const nameMatch = query.name.toLowerCase().includes(term);
    const descriptionMatch = query.description.toLowerCase().includes(term);
    const keywordMatch = query.keywords && query.keywords.some(keyword => 
      keyword.toLowerCase().includes(term)
    );
    const queryMatch = query.query.toLowerCase().includes(term);
    
    return nameMatch || descriptionMatch || keywordMatch || queryMatch;
  });
};

export const getQueriesByCategory = (categoryKey) => {
  return queryTemplates[categoryKey]?.queries || [];
};

export const getCategoryInfo = (categoryKey) => {
  return {
    title: queryTemplates[categoryKey]?.title || '',
    icon: queryTemplates[categoryKey]?.icon || 'Code',
    count: queryTemplates[categoryKey]?.queries?.length || 0
  };
};
