#!/usr/bin/env node

// Database Validation Test Script - Standalone Node.js Version
// Run with: node docs/database-validation-script.js

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m'
};

// Console formatting functions
const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✅${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}❌${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️${colors.reset} ${msg}`),
  header: (msg) => console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}`),
  section: (msg) => console.log(`\n${colors.magenta}📋 ${msg}${colors.reset}`),
  query: (msg) =>
    console.log(`${colors.yellow}   SQL:${colors.reset} ${colors.bright}${msg}${colors.reset}`),
  result: (msg) => console.log(`${colors.cyan}   →${colors.reset} ${msg}`),
  table: (data) => {
    if (Array.isArray(data) && data.length > 0) {
      console.table(data);
    } else {
      console.log(`${colors.cyan}   →${colors.reset} No data to display`);
    }
  }
};

// Mock UUID function for SQLEngine
function mockUUID() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Simple SQLEngine loader for Node.js
async function loadSQLEngine() {
  try {
    const sqlEnginePath = join(__dirname, '..', 'src', 'utils', 'SQLEngine.js');
    log.info(`Loading SQLEngine from: ${sqlEnginePath}`);

    let sqlEngineCode = readFileSync(sqlEnginePath, 'utf8');

    // Replace ES6 import with mock
    sqlEngineCode = sqlEngineCode.replace(
      "import { v4 as uuidv4 } from 'uuid'",
      `const uuidv4 = () => '${mockUUID()}';`
    );

    // Replace export statement
    sqlEngineCode = sqlEngineCode.replace('export default SQLEngine;', 'return SQLEngine;');

    // Create function and execute
    const SQLEngineFactory = new Function(sqlEngineCode);
    const SQLEngine = SQLEngineFactory();

    log.success('SQLEngine loaded successfully');
    return SQLEngine;
  } catch (error) {
    log.error(`Failed to load SQLEngine: ${error.message}`);
    throw error;
  }
}

// Import SQLEngine class
let SQLEngine;

// Test suite configuration
const testSuites = [
  // Basic Operations
  {
    category: 'Database Operations',
    queries: [
      'SHOW DATABASES',
      'USE employee_db',
      'SHOW TABLES',
      'DESCRIBE employees',
      'DESCRIBE departments'
    ]
  },

  // Simple SELECT
  {
    category: 'Basic SELECT Queries',
    queries: [
      'SELECT COUNT(*) as total_employees FROM employees',
      'SELECT * FROM employees LIMIT 5',
      'SELECT name, department, salary FROM employees',
      'SELECT * FROM departments'
    ]
  },

  // WHERE Conditions
  {
    category: 'WHERE Conditions',
    queries: [
      "SELECT * FROM employees WHERE department = 'Engineering'",
      'SELECT name, salary FROM employees WHERE salary > 80000',
      "SELECT name, status FROM employees WHERE status = 'Active'",
      "SELECT name FROM employees WHERE name LIKE 'A%'"
    ]
  },

  // Sorting and Grouping
  {
    category: 'Sorting and Aggregation',
    queries: [
      'SELECT name, salary FROM employees ORDER BY salary DESC LIMIT 3',
      'SELECT department, COUNT(*) as employee_count FROM employees GROUP BY department',
      'SELECT department, AVG(salary) as avg_salary FROM employees GROUP BY department',
      'SELECT AVG(salary) as average_salary, MAX(salary) as max_salary FROM employees'
    ]
  },

  // JOIN Operations
  {
    category: 'JOIN Operations',
    queries: [
      `SELECT e.name, e.salary, d.name as department_name, d.budget 
       FROM employees e 
       JOIN departments d ON e.department = d.name 
       LIMIT 5;`,
      `SELECT d.name as department, COUNT(e.id) as employee_count, d.budget
       FROM departments d 
       JOIN employees e ON d.name = e.department 
       GROUP BY d.name, d.budget;`
    ]
  },

  // Advanced Queries
  {
    category: 'Advanced Queries',
    queries: [
      `SELECT name, salary 
       FROM employees 
       WHERE salary > (SELECT AVG(salary) FROM employees);`,
      `SELECT department, COUNT(*) as employee_count 
       FROM employees 
       GROUP BY department 
       HAVING COUNT(*) > 3;`,
      `SELECT e1.name, e1.salary, e1.department
       FROM employees e1
       WHERE e1.salary > (
         SELECT AVG(e2.salary) 
         FROM employees e2 
         WHERE e2.department = e1.department
       );`
    ]
  },

  // Data Modification Tests
  {
    category: 'Data Modification',
    queries: [
      // Test INSERT
      "INSERT INTO employees VALUES (99, 'Test User', 'test@company.com', 'Engineering', 75000, '2024-01-01', 'Active')",
      'SELECT COUNT(*) as count_after_insert FROM employees',

      // Test UPDATE
      "UPDATE employees SET salary = 76000 WHERE name = 'Test User'",
      "SELECT salary FROM employees WHERE name = 'Test User'",

      // Test DELETE
      "DELETE FROM employees WHERE name = 'Test User'",
      'SELECT COUNT(*) as count_after_delete FROM employees'
    ]
  }
];

// Validation functions
const validateQueryResult = (query, result) => {
  console.log(`\n🔍 Testing: ${query}`);

  if (result.error) {
    console.error(`❌ Error: ${result.error}`);
    return false;
  }

  if (result.data && result.data.length > 0) {
    console.log(`✅ Success: Returned ${result.data.length} rows`);
    if (result.data.length <= 3) {
      console.log('📊 Sample data:', result.data);
    }
    return true;
  } else if (result.message) {
    console.log(`✅ Success: ${result.message}`);
    return true;
  } else {
    console.log('⚠️  Query executed but returned no data');
    return true;
  }
};

const runTestSuite = async (sqlEngine) => {
  console.log('🚀 Starting Database Validation Tests\n');

  let totalTests = 0;
  let passedTests = 0;

  for (const testGroup of testSuites) {
    console.log(`\n📋 ${testGroup.category}`);
    console.log('='.repeat(50));

    for (const query of testGroup.queries) {
      totalTests++;
      try {
        const result = sqlEngine.executeQuery(query);
        if (validateQueryResult(query, result)) {
          passedTests++;
        }
      } catch (error) {
        console.error(`❌ Exception: ${error.message}`);
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`📊 Test Results: ${passedTests}/${totalTests} tests passed`);
  console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);

  if (passedTests === totalTests) {
    console.log('🎉 All tests passed! Database is functioning correctly.');
  } else {
    console.log('⚠️  Some tests failed. Please review the errors above.');
  }

  return { total: totalTests, passed: passedTests };
};

// Specific validation tests
const validateEmployeeData = (sqlEngine) => {
  console.log('\n🔍 Validating Employee Data Diversity');
  console.log('='.repeat(40));

  const result = sqlEngine.executeQuery('SELECT name, department FROM employees');

  if (result.data && result.data.length >= 15) {
    console.log(`✅ Expected employee count: ${result.data.length} employees`);

    // Check department distribution
    const deptCount = {};
    result.data.forEach((emp) => {
      deptCount[emp.department] = (deptCount[emp.department] || 0) + 1;
    });

    console.log('📊 Department Distribution:');
    Object.entries(deptCount).forEach(([dept, count]) => {
      console.log(`   ${dept}: ${count} employees`);
    });

    // Check name diversity
    const uniqueNames = new Set(result.data.map((emp) => emp.name));
    console.log(`✅ Name diversity: ${uniqueNames.size} unique names`);

    return true;
  } else {
    console.error('❌ Insufficient employee data');
    return false;
  }
};

const validateJoinFunctionality = (sqlEngine) => {
  console.log('\n🔍 Validating JOIN Functionality');
  console.log('='.repeat(35));

  const query = `
    SELECT e.name, e.department, d.budget, d.location 
    FROM employees e 
    JOIN departments d ON e.department = d.name 
    LIMIT 5;
  `;

  const result = sqlEngine.executeQuery(query);

  if (result.data && result.data.length > 0) {
    console.log('✅ JOIN operation successful');
    console.log('📊 Sample joined data:', result.data[0]);
    return true;
  } else {
    console.error('❌ JOIN operation failed');
    return false;
  }
};

// Main execution function
async function main() {
  try {
    log.header('🚀 SQLHub Database Validation Test Suite');
    log.info('Testing database functionality with diverse employee data\n');

    // Load SQLEngine
    const SQLEngine = await loadSQLEngine();
    const sqlEngine = new SQLEngine();

    // Run comprehensive test suite
    const results = await runTestSuite(sqlEngine);

    // Run specific validations
    console.log('\n');
    validateEmployeeData(sqlEngine);
    console.log('\n');
    validateJoinFunctionality(sqlEngine);

    // Exit with appropriate code
    process.exit(results.passed === results.total ? 0 : 1);
  } catch (error) {
    log.error(`Test execution failed: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  }
}

// Handle ES module execution - run if this file is executed directly
main();

// Export for use in browser console or testing environment
export {
  testSuites,
  runTestSuite,
  validateEmployeeData,
  validateJoinFunctionality,
  validateQueryResult
};
