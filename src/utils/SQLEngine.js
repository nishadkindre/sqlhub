import { v4 as uuidv4 } from 'uuid';

class SQLEngine {
  constructor() {
    this.databases = new Map();
    this.currentDatabase = null;
    this.queryHistory = [];
    this.initializeDefaultData();
  }

  initializeDefaultData() {
    // Create sample databases with tables and data
    this.createSampleData();
  }

  createSampleData() {
    // Create Employee Management Database
    this.executeQuery('CREATE DATABASE employee_db');
    this.executeQuery('USE employee_db');

    // Create employees table
    this.executeQuery(`
      CREATE TABLE employees (
        id INT PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100),
        department VARCHAR(50),
        salary INT,
        hire_date DATE,
        status VARCHAR(20)
      )
    `);

    // Insert diverse sample data (15 employees with inclusive representation)
    const employees = [
      [1, 'Amara Okafor', 'amara.okafor@company.com', 'Engineering', 85000, '2021-03-15', 'Active'],
      [2, 'Li Wei Chen', 'li.chen@company.com', 'Engineering', 92000, '2020-11-08', 'Active'],
      [
        3,
        'Maria Rodriguez',
        'maria.rodriguez@company.com',
        'Marketing',
        68000,
        '2022-01-20',
        'Active'
      ],
      [4, 'James Mitchell', 'james.mitchell@company.com', 'Sales', 75000, '2021-08-12', 'Active'],
      [5, 'Priya Sharma', 'priya.sharma@company.com', 'Engineering', 88000, '2021-05-03', 'Active'],
      [6, 'Ahmed Hassan', 'ahmed.hassan@company.com', 'HR', 62000, '2022-04-15', 'Active'],
      [7, 'Sarah Johnson', 'sarah.johnson@company.com', 'Marketing', 71000, '2021-09-22', 'Active'],
      [
        8,
        'Hiroshi Tanaka',
        'hiroshi.tanaka@company.com',
        'Engineering',
        95000,
        '2020-07-14',
        'Active'
      ],
      [9, 'Isabella Santos', 'isabella.santos@company.com', 'Sales', 79000, '2021-12-05', 'Active'],
      [10, 'Robert Williams', 'robert.williams@company.com', 'HR', 65000, '2022-02-28', 'Active'],
      [
        11,
        'Fatima Al-Zahra',
        'fatima.alzahra@company.com',
        'Marketing',
        73000,
        '2021-10-18',
        'Active'
      ],
      [12, 'David Kim', 'david.kim@company.com', 'Sales', 82000, '2020-12-02', 'Active'],
      [
        13,
        'Elena Petrov',
        'elena.petrov@company.com',
        'Engineering',
        90000,
        '2021-06-30',
        'Active'
      ],
      [14, 'Carlos Mendoza', 'carlos.mendoza@company.com', 'HR', 67000, '2022-03-10', 'On Leave'],
      [15, 'Aisha Patel', 'aisha.patel@company.com', 'Sales', 76000, '2021-11-25', 'Active']
    ];

    employees.forEach((emp) => {
      this.executeQuery(
        `INSERT INTO employees VALUES (${emp[0]}, '${emp[1]}', '${emp[2]}', '${emp[3]}', ${emp[4]}, '${emp[5]}', '${emp[6]}')`
      );
    });

    // Create departments table
    this.executeQuery(`
      CREATE TABLE departments (
        id INT PRIMARY KEY,
        name VARCHAR(50),
        manager_id INT,
        budget INT,
        location VARCHAR(50)
      )
    `);

    const departments = [
      [1, 'Engineering', 8, 750000, 'San Francisco'],
      [2, 'Marketing', 7, 250000, 'New York'],
      [3, 'HR', 10, 180000, 'Chicago'],
      [4, 'Sales', 12, 400000, 'Austin']
    ];

    departments.forEach((dept) => {
      this.executeQuery(
        `INSERT INTO departments VALUES (${dept[0]}, '${dept[1]}', ${dept[2]}, ${dept[3]}, '${dept[4]}')`
      );
    });

    // Create E-commerce Database
    this.executeQuery('CREATE DATABASE ecommerce_db');
    this.executeQuery('USE ecommerce_db');

    // Create products table
    this.executeQuery(`
      CREATE TABLE products (
        id INT PRIMARY KEY,
        name VARCHAR(100),
        category VARCHAR(50),
        price INT,
        stock INT,
        description TEXT
      )
    `);

    const products = [
      [1, 'Laptop Pro', 'Electronics', 1299.99, 50, 'High-performance laptop'],
      [2, 'Wireless Mouse', 'Electronics', 29.99, 200, 'Ergonomic wireless mouse'],
      [3, 'Coffee Mug', 'Home & Garden', 12.99, 100, 'Ceramic coffee mug'],
      [4, 'Desk Chair', 'Furniture', 199.99, 25, 'Ergonomic office chair'],
      [5, 'Smartphone', 'Electronics', 699.99, 75, 'Latest smartphone model']
    ];

    products.forEach((product) => {
      this.executeQuery(
        `INSERT INTO products VALUES (${product[0]}, '${product[1]}', '${product[2]}', ${product[3]}, ${product[4]}, '${product[5]}')`
      );
    });

    // Reset to first database
    this.executeQuery('USE employee_db');
  }

  executeQuery(sql) {
    try {
      const result = this.parseAndExecute(sql.trim());
      this.addToHistory(sql, result);
      return result;
    } catch (error) {
      const errorResult = {
        success: false,
        error: error.message,
        query: sql,
        timestamp: new Date()
      };
      this.addToHistory(sql, errorResult);
      return errorResult;
    }
  }

  parseAndExecute(sql) {
    // Remove semicolon at the end if present and trim whitespace
    const cleanSql = sql.trim().replace(/;+\s*$/, '');

    // Check if the cleaned SQL is empty
    if (!cleanSql) {
      throw new Error('Empty SQL command');
    }

    const sqlUpper = cleanSql.toUpperCase().trim();
    const startTime = Date.now();

    let result = {
      success: true,
      data: [],
      columns: [],
      affectedRows: 0,
      query: cleanSql,
      timestamp: new Date(),
      executionTime: 0
    };

    // CREATE DATABASE
    if (sqlUpper.startsWith('CREATE DATABASE')) {
      const dbName = this.extractDatabaseName(cleanSql);
      if (this.databases.has(dbName)) {
        throw new Error(`Database '${dbName}' already exists`);
      }
      this.databases.set(dbName, { tables: new Map(), name: dbName });
      result.message = `Database '${dbName}' created successfully`;
    }

    // DROP DATABASE
    else if (sqlUpper.startsWith('DROP DATABASE')) {
      const dbName = this.extractDatabaseName(cleanSql);
      if (!this.databases.has(dbName)) {
        throw new Error(`Database '${dbName}' does not exist`);
      }
      this.databases.delete(dbName);
      if (this.currentDatabase === dbName) {
        this.currentDatabase = null;
      }
      result.message = `Database '${dbName}' dropped successfully`;
    }

    // USE DATABASE
    else if (sqlUpper.startsWith('USE ')) {
      const dbName = cleanSql.split(/\s+/)[1];
      if (!this.databases.has(dbName)) {
        throw new Error(`Database '${dbName}' does not exist`);
      }
      this.currentDatabase = dbName;
      result.message = `Using database '${dbName}'`;
    }

    // SHOW DATABASES
    else if (sqlUpper === 'SHOW DATABASES') {
      result.columns = ['Database'];
      result.data = Array.from(this.databases.keys()).map((db) => ({ Database: db }));
    }

    // CREATE TABLE
    else if (sqlUpper.startsWith('CREATE TABLE')) {
      this.validateCurrentDatabase();
      const tableInfo = this.parseCreateTable(cleanSql);
      const db = this.databases.get(this.currentDatabase);
      if (db.tables.has(tableInfo.name)) {
        throw new Error(`Table '${tableInfo.name}' already exists`);
      }
      db.tables.set(tableInfo.name, {
        name: tableInfo.name,
        columns: tableInfo.columns,
        data: [],
        indexes: new Map()
      });
      result.message = `Table '${tableInfo.name}' created successfully`;
    }

    // DROP TABLE
    else if (sqlUpper.startsWith('DROP TABLE')) {
      this.validateCurrentDatabase();
      const tableName = this.extractTableName(cleanSql);
      const db = this.databases.get(this.currentDatabase);
      if (!db.tables.has(tableName)) {
        throw new Error(`Table '${tableName}' does not exist`);
      }
      db.tables.delete(tableName);
      result.message = `Table '${tableName}' dropped successfully`;
    }

    // ALTER TABLE
    else if (sqlUpper.startsWith('ALTER TABLE')) {
      this.validateCurrentDatabase();
      const alterInfo = this.parseAlterTable(cleanSql);
      const db = this.databases.get(this.currentDatabase);

      if (!db.tables.has(alterInfo.tableName)) {
        throw new Error(`Table '${alterInfo.tableName}' does not exist`);
      }

      const table = db.tables.get(alterInfo.tableName);

      if (alterInfo.action === 'ADD_COLUMN') {
        // Check if column already exists
        if (table.columns.find((col) => col.name === alterInfo.columnName)) {
          throw new Error(`Column '${alterInfo.columnName}' already exists`);
        }

        // Add new column to table structure
        table.columns.push({
          name: alterInfo.columnName,
          type: alterInfo.columnType
        });

        // Add default value to existing rows
        table.data.forEach((row) => {
          row[alterInfo.columnName] = alterInfo.defaultValue || null;
        });

        result.message = `Column '${alterInfo.columnName}' added to table '${alterInfo.tableName}'`;
      }
    }

    // SHOW TABLES
    else if (sqlUpper === 'SHOW TABLES') {
      this.validateCurrentDatabase();
      const db = this.databases.get(this.currentDatabase);
      result.columns = ['Tables_in_' + this.currentDatabase];
      result.data = Array.from(db.tables.keys()).map((table) => ({
        ['Tables_in_' + this.currentDatabase]: table
      }));
    }

    // DESCRIBE TABLE
    else if (sqlUpper.startsWith('DESCRIBE ') || sqlUpper.startsWith('DESC ')) {
      this.validateCurrentDatabase();
      const tableName = cleanSql.split(/\s+/)[1];
      const db = this.databases.get(this.currentDatabase);
      if (!db.tables.has(tableName)) {
        throw new Error(`Table '${tableName}' does not exist`);
      }
      const table = db.tables.get(tableName);
      result.columns = ['Field', 'Type', 'Null', 'Key', 'Default', 'Extra'];
      result.data = table.columns.map((col) => ({
        Field: col.name,
        Type: col.type,
        Null: col.nullable ? 'YES' : 'NO',
        Key: col.primaryKey ? 'PRI' : '',
        Default: col.defaultValue || null,
        Extra: col.autoIncrement ? 'auto_increment' : ''
      }));
    }

    // INSERT
    else if (sqlUpper.startsWith('INSERT INTO')) {
      this.validateCurrentDatabase();
      const insertInfo = this.parseInsert(cleanSql);
      const db = this.databases.get(this.currentDatabase);
      if (!db.tables.has(insertInfo.table)) {
        throw new Error(`Table '${insertInfo.table}' does not exist`);
      }
      const table = db.tables.get(insertInfo.table);

      // Validate column count
      if (insertInfo.values.length !== table.columns.length) {
        throw new Error(
          `Column count doesn't match. Expected ${table.columns.length}, got ${insertInfo.values.length}`
        );
      }

      // Create row object with validation
      const row = { _id: uuidv4() };
      try {
        insertInfo.values.forEach((value, index) => {
          const column = table.columns[index];

          // Check NOT NULL constraint
          if ((value === null || value === 'NULL') && !column.nullable) {
            throw new Error(`Column '${column.name}' cannot be NULL`);
          }

          row[column.name] = this.convertValue(value, column.type);
        });

        table.data.push(row);
        result.affectedRows = 1;
        result.message = `1 row inserted into '${insertInfo.table}'`;
      } catch (error) {
        throw new Error(`INSERT failed: ${error.message}`);
      }
    }

    // SELECT
    else if (sqlUpper.startsWith('SELECT')) {
      this.validateCurrentDatabase();
      const selectInfo = this.parseSelect(cleanSql);
      const db = this.databases.get(this.currentDatabase);

      if (!db.tables.has(selectInfo.from)) {
        throw new Error(`Table '${selectInfo.from}' does not exist`);
      }

      const table = db.tables.get(selectInfo.from);
      let data = [...table.data];

      // Handle JOIN operations
      if (selectInfo.join) {
        if (!db.tables.has(selectInfo.join.table)) {
          throw new Error(`Table '${selectInfo.join.table}' does not exist`);
        }
        const joinTable = db.tables.get(selectInfo.join.table);
        data = this.performJoin(data, joinTable.data, selectInfo.join);
      }

      // Apply WHERE clause
      if (selectInfo.where) {
        data = data.filter((row) => this.evaluateWhere(row, selectInfo.where));
      }

      // Handle GROUP BY and aggregations
      if (selectInfo.groupBy) {
        data = this.performGroupBy(data, selectInfo.groupBy, selectInfo.columns);
      } else if (this.hasAggregateColumns(selectInfo.columns)) {
        // Handle aggregate functions without GROUP BY (entire table aggregation)
        data = this.performAggregation(data, selectInfo.columns);
      } else {
        // Regular column selection
        data = this.performColumnSelection(data, selectInfo.columns, table);
      }

      // Apply HAVING clause (only valid with GROUP BY)
      if (selectInfo.having && selectInfo.groupBy) {
        data = data.filter((row) => this.evaluateHaving(row, selectInfo.having));
      }

      // Apply ORDER BY
      if (selectInfo.orderBy) {
        data = data.sort((a, b) => {
          const aVal = a[selectInfo.orderBy.column];
          const bVal = b[selectInfo.orderBy.column];
          const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
          return selectInfo.orderBy.direction === 'DESC' ? -comparison : comparison;
        });
      }

      // Apply LIMIT
      if (selectInfo.limit !== null && selectInfo.limit > 0) {
        data = data.slice(0, selectInfo.limit);
      }

      // Set result columns and data
      if (selectInfo.groupBy || this.hasAggregateColumns(selectInfo.columns)) {
        result.columns = Object.keys(data[0] || {});
      } else if (selectInfo.columns[0] === '*') {
        result.columns = table.columns.map((col) => col.name);
      } else {
        result.columns = selectInfo.columns;
      }

      result.data = data;
    }

    // UPDATE
    else if (sqlUpper.startsWith('UPDATE')) {
      this.validateCurrentDatabase();
      const updateInfo = this.parseUpdate(cleanSql);
      const db = this.databases.get(this.currentDatabase);
      if (!db.tables.has(updateInfo.table)) {
        throw new Error(`Table '${updateInfo.table}' does not exist`);
      }

      const table = db.tables.get(updateInfo.table);
      let affected = 0;

      table.data.forEach((row) => {
        if (!updateInfo.where || this.evaluateWhere(row, updateInfo.where)) {
          Object.keys(updateInfo.set).forEach((col) => {
            row[col] = updateInfo.set[col];
          });
          affected++;
        }
      });

      result.affectedRows = affected;
      result.message = `${affected} row(s) updated in '${updateInfo.table}'`;
    }

    // DELETE
    else if (sqlUpper.startsWith('DELETE FROM')) {
      this.validateCurrentDatabase();
      const deleteInfo = this.parseDelete(cleanSql);
      const db = this.databases.get(this.currentDatabase);
      if (!db.tables.has(deleteInfo.table)) {
        throw new Error(`Table '${deleteInfo.table}' does not exist`);
      }

      const table = db.tables.get(deleteInfo.table);
      const originalLength = table.data.length;

      if (deleteInfo.where) {
        table.data = table.data.filter((row) => !this.evaluateWhere(row, deleteInfo.where));
      } else {
        table.data = [];
      }

      const affected = originalLength - table.data.length;
      result.affectedRows = affected;
      result.message = `${affected} row(s) deleted from '${deleteInfo.table}'`;
    } else {
      // Enhanced error message with debugging info
      console.error('Unsupported SQL command detected:', {
        original: sql,
        cleaned: cleanSql,
        sqlUpper: sqlUpper
      });
      throw new Error(`Unsupported SQL command: ${cleanSql}`);
    }

    result.executionTime = Date.now() - startTime;
    return result;
  }

  validateCurrentDatabase() {
    if (!this.currentDatabase) {
      throw new Error('No database selected. Use "USE database_name" first.');
    }
  }

  extractDatabaseName(sql) {
    const match = sql.match(/(?:CREATE|DROP)\s+DATABASE\s+(\w+)/i);
    if (!match) throw new Error('Invalid database command');
    return match[1];
  }

  extractTableName(sql) {
    // More robust table name extraction
    let match = sql.match(/DROP\s+TABLE\s+(\w+)/i);
    if (match) return match[1];

    match = sql.match(/FROM\s+(\w+)/i);
    if (match) return match[1];

    throw new Error('Invalid table command');
  }

  parseCreateTable(sql) {
    const match = sql.match(/CREATE\s+TABLE\s+(\w+)\s*\((.*)\)/is);
    if (!match) throw new Error('Invalid CREATE TABLE syntax');

    const tableName = match[1];
    const columnsStr = match[2];

    const columns = columnsStr.split(',').map((col) => {
      const trimmedCol = col.trim();
      // Use regex to properly extract column name and type
      const colMatch = trimmedCol.match(/^(\w+)\s+([^,\s]+(?:\([^)]*\))?)/);

      if (!colMatch) {
        // Fallback to simple parsing if regex doesn't match
        const parts = trimmedCol.split(/\s+/);
        return {
          name: parts[0],
          type: parts[1] || 'VARCHAR(255)',
          nullable: !trimmedCol.toUpperCase().includes('NOT NULL'),
          primaryKey: trimmedCol.toUpperCase().includes('PRIMARY KEY'),
          autoIncrement: trimmedCol.toUpperCase().includes('AUTO_INCREMENT'),
          defaultValue: null
        };
      }

      return {
        name: colMatch[1],
        type: colMatch[2],
        nullable: !trimmedCol.toUpperCase().includes('NOT NULL'),
        primaryKey: trimmedCol.toUpperCase().includes('PRIMARY KEY'),
        autoIncrement: trimmedCol.toUpperCase().includes('AUTO_INCREMENT'),
        defaultValue: null
      };
    });

    return { name: tableName, columns };
  }

  parseInsert(sql) {
    const match = sql.match(/INSERT\s+INTO\s+(\w+)\s+VALUES\s*\((.*)\)/is);
    if (!match) throw new Error('Invalid INSERT syntax');

    const tableName = match[1];
    const valuesStr = match[2];

    // Simple parsing - split by comma but handle quoted strings
    const values = this.parseValues(valuesStr);

    return { table: tableName, values };
  }

  parseValues(valuesStr) {
    const values = [];
    let current = '';
    let inQuotes = false;
    let quoteChar = '';

    for (let i = 0; i < valuesStr.length; i++) {
      const char = valuesStr[i];

      if ((char === '"' || char === "'") && !inQuotes) {
        inQuotes = true;
        quoteChar = char;
      } else if (char === quoteChar && inQuotes) {
        // Check for escaped quotes
        if (i + 1 < valuesStr.length && valuesStr[i + 1] === quoteChar) {
          current += char + char; // Add both quotes for escaped quote
          i++; // Skip next quote
          continue;
        }
        inQuotes = false;
        quoteChar = '';
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
        continue;
      }

      current += char;
    }

    if (current.trim()) {
      values.push(current.trim());
    }

    return values.map((val) => {
      val = val.trim();
      if (val.startsWith('"') && val.endsWith('"')) {
        return val.slice(1, -1).replace(/""/g, '"'); // Handle escaped quotes
      }
      if (val.startsWith("'") && val.endsWith("'")) {
        return val.slice(1, -1).replace(/''/g, "'"); // Handle escaped quotes
      }
      return val;
    });
  }

  parseSelect(sql) {
    // First check for JOIN operations with a simpler approach
    const hasJoin = /\bJOIN\b/i.test(sql);

    if (hasJoin) {
      return this.parseSelectWithJoin(sql);
    }

    // Enhanced regex for regular SELECT without JOIN
    const selectMatch = sql.match(
      /SELECT\s+(.*?)\s+FROM\s+(\w+)(?:\s+WHERE\s+(.*?))?(?:\s+GROUP\s+BY\s+(.*?))?(?:\s+HAVING\s+(.*?))?(?:\s+ORDER\s+BY\s+(.*?))?(?:\s+LIMIT\s+(\d+))?\s*$/is
    );
    if (!selectMatch) throw new Error('Invalid SELECT syntax');

    const columnsStr = selectMatch[1].trim();
    const tableName = selectMatch[2];
    const whereClause = selectMatch[3];
    const groupByClause = selectMatch[4];
    const havingClause = selectMatch[5];
    const orderByClause = selectMatch[6];
    const limitClause = selectMatch[7];

    const columns = columnsStr === '*' ? ['*'] : columnsStr.split(',').map((col) => col.trim());

    const result = {
      columns,
      from: tableName,
      join: null,
      where: whereClause ? this.parseWhere(whereClause) : null,
      groupBy: groupByClause ? this.parseGroupBy(groupByClause) : null,
      having: havingClause ? this.parseHaving(havingClause) : null,
      orderBy: orderByClause ? this.parseOrderBy(orderByClause) : null,
      limit: limitClause ? parseInt(limitClause, 10) : null
    };

    return result;
  }

  parseSelectWithJoin(sql) {
    // Parse JOIN queries separately for better handling
    // Updated to handle column aliases in SELECT clause
    const joinMatch = sql.match(
      /SELECT\s+(.*?)\s+FROM\s+(\w+)\s+(\w+)\s+(?:INNER\s+|LEFT\s+|RIGHT\s+)?JOIN\s+(\w+)\s+(\w+)\s+ON\s+([^WHERE|GROUP|ORDER|HAVING|LIMIT]+?)(?:\s+WHERE\s+(.*?))?(?:\s+GROUP\s+BY\s+(.*?))?(?:\s+HAVING\s+(.*?))?(?:\s+ORDER\s+BY\s+(.*?))?(?:\s+LIMIT\s+(\d+))?\s*;?\s*$/is
    );

    if (!joinMatch) {
      // Try without table aliases
      const simpleJoinMatch = sql.match(
        /SELECT\s+(.*?)\s+FROM\s+(\w+)\s+(?:INNER\s+|LEFT\s+|RIGHT\s+)?JOIN\s+(\w+)\s+ON\s+([^WHERE|GROUP|ORDER|HAVING|LIMIT]+?)(?:\s+WHERE\s+(.*?))?(?:\s+GROUP\s+BY\s+(.*?))?(?:\s+HAVING\s+(.*?))?(?:\s+ORDER\s+BY\s+(.*?))?(?:\s+LIMIT\s+(\d+))?\s*;?\s*$/is
      );

      if (!simpleJoinMatch) throw new Error('Invalid JOIN syntax');

      const [
        ,
        columnsStr,
        leftTable,
        rightTable,
        joinCondition,
        whereClause,
        groupByClause,
        havingClause,
        orderByClause,
        limitClause
      ] = simpleJoinMatch;

      return {
        columns: columnsStr === '*' ? ['*'] : columnsStr.split(',').map((col) => col.trim()),
        from: leftTable,
        join: {
          table: rightTable,
          condition: joinCondition.trim(),
          leftAlias: leftTable,
          rightAlias: rightTable
        },
        where: whereClause ? this.parseWhere(whereClause) : null,
        groupBy: groupByClause ? this.parseGroupBy(groupByClause) : null,
        having: havingClause ? this.parseHaving(havingClause) : null,
        orderBy: orderByClause ? this.parseOrderBy(orderByClause) : null,
        limit: limitClause ? parseInt(limitClause, 10) : null
      };
    }

    const columnsStr = joinMatch[1].trim();
    const leftTable = joinMatch[2];
    const leftAlias = joinMatch[3];
    const rightTable = joinMatch[4];
    const rightAlias = joinMatch[5];
    const joinCondition = joinMatch[6].trim();
    const whereClause = joinMatch[7];
    const groupByClause = joinMatch[8];
    const havingClause = joinMatch[9];
    const orderByClause = joinMatch[10];
    const limitClause = joinMatch[11];

    const columns = columnsStr === '*' ? ['*'] : columnsStr.split(',').map((col) => col.trim());

    return {
      columns,
      from: leftTable,
      join: {
        table: rightTable,
        condition: joinCondition,
        leftAlias,
        rightAlias
      },
      where: whereClause ? this.parseWhere(whereClause) : null,
      groupBy: groupByClause ? this.parseGroupBy(groupByClause) : null,
      having: havingClause ? this.parseHaving(havingClause) : null,
      orderBy: orderByClause ? this.parseOrderBy(orderByClause) : null,
      limit: limitClause ? parseInt(limitClause, 10) : null
    };
  }

  parseWhere(whereClause) {
    // Enhanced WHERE parsing - supports basic conditions and LIKE operator
    const match = whereClause.match(/(\w+)\s*(=|!=|<>|<|>|<=|>=|LIKE)\s*(.+)/i);
    if (!match) return null;

    let value = match[3].trim();
    // Remove quotes if present
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    return {
      column: match[1],
      operator: match[2].toUpperCase(),
      value: value
    };
  }

  parseOrderBy(orderByClause) {
    const parts = orderByClause.trim().split(/\s+/);
    return {
      column: parts[0],
      direction: parts[1] && parts[1].toUpperCase() === 'DESC' ? 'DESC' : 'ASC'
    };
  }

  parseGroupBy(groupByClause) {
    return groupByClause.split(',').map((col) => col.trim());
  }

  parseHaving(havingClause) {
    // Similar to WHERE parsing but for HAVING clause
    const match = havingClause.match(/(\w+\([^)]*\)|\w+)\s*(=|!=|<>|<|>|<=|>=)\s*(.+)/i);
    if (!match) return null;

    let value = match[3].trim();
    // Remove quotes if present and convert to number if possible
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    } else if (!isNaN(value)) {
      value = parseFloat(value);
    }

    return {
      column: match[1],
      operator: match[2].toUpperCase(),
      value: value
    };
  }

  // Aggregate function helpers
  evaluateAggregateFunction(func, column, data) {
    const values = data
      .map((row) => {
        const val = row[column];
        return isNaN(val) ? 0 : parseFloat(val);
      })
      .filter((val) => !isNaN(val));

    switch (func.toUpperCase()) {
      case 'COUNT':
        return column === '*' ? data.length : values.length;
      case 'SUM':
        return values.reduce((sum, val) => sum + val, 0);
      case 'AVG':
        return values.length > 0 ? values.reduce((sum, val) => sum + val, 0) / values.length : 0;
      case 'MIN':
        return values.length > 0 ? Math.min(...values) : null;
      case 'MAX':
        return values.length > 0 ? Math.max(...values) : null;
      default:
        return null;
    }
  }

  parseAggregateColumn(columnStr) {
    const match = columnStr.match(
      /^(COUNT|SUM|AVG|MIN|MAX)\s*\(\s*([^)]+)\s*\)(?:\s+AS\s+(\w+))?$/i
    );
    if (match) {
      return {
        isAggregate: true,
        function: match[1].toUpperCase(),
        column: match[2].trim(),
        alias: match[3] || `${match[1].toLowerCase()}_${match[2].replace('*', 'all')}`
      };
    }

    // Check for column alias
    const aliasMatch = columnStr.match(/^(.+?)\s+AS\s+(\w+)$/i);
    if (aliasMatch) {
      return {
        isAggregate: false,
        column: aliasMatch[1].trim(),
        alias: aliasMatch[2]
      };
    }

    return {
      isAggregate: false,
      column: columnStr.trim(),
      alias: columnStr.trim()
    };
  }

  // Helper methods for enhanced SELECT operations
  hasAggregateColumns(columns) {
    return columns.some((col) => /^(COUNT|SUM|AVG|MIN|MAX)\s*\(/i.test(col));
  }

  performJoin(leftData, rightData, joinInfo) {
    // Handle JOIN with table aliases
    const condition = joinInfo.condition;
    const match = condition.match(/(\w+)\.(\w+)\s*=\s*(\w+)\.(\w+)/);
    if (!match) {
      throw new Error('Invalid JOIN condition');
    }

    const [, leftAlias, leftCol, rightAlias, rightCol] = match;
    const result = [];

    leftData.forEach((leftRow) => {
      rightData.forEach((rightRow) => {
        if (leftRow[leftCol] === rightRow[rightCol]) {
          // Merge rows with table aliases
          const mergedRow = {};

          // Add left table columns with aliases
          Object.keys(leftRow).forEach((key) => {
            mergedRow[`${leftAlias}.${key}`] = leftRow[key];
            if (!mergedRow.hasOwnProperty(key)) {
              mergedRow[key] = leftRow[key]; // Backward compatibility
            }
          });

          // Add right table columns with aliases
          Object.keys(rightRow).forEach((key) => {
            mergedRow[`${rightAlias}.${key}`] = rightRow[key];
            if (!mergedRow.hasOwnProperty(key)) {
              mergedRow[key] = rightRow[key];
            }
          });

          result.push(mergedRow);
        }
      });
    });

    return result;
  }

  performGroupBy(data, groupByColumns, selectColumns) {
    const groups = {};

    // Group the data
    data.forEach((row) => {
      const groupKey = groupByColumns.map((col) => row[col]).join('|');
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(row);
    });

    // Process each group
    const result = [];
    Object.keys(groups).forEach((groupKey) => {
      const groupData = groups[groupKey];
      const resultRow = {};

      // Add group by columns
      groupByColumns.forEach((col, index) => {
        resultRow[col] = groupKey.split('|')[index];
      });

      // Process select columns
      selectColumns.forEach((columnStr) => {
        const parsedCol = this.parseAggregateColumn(columnStr);
        if (parsedCol.isAggregate) {
          const value = this.evaluateAggregateFunction(
            parsedCol.function,
            parsedCol.column,
            groupData
          );
          resultRow[parsedCol.alias] = value;
        } else if (!groupByColumns.includes(parsedCol.column) && parsedCol.column !== '*') {
          // Non-aggregate columns must be in GROUP BY clause
          resultRow[parsedCol.alias] = groupData[0][parsedCol.column];
        }
      });

      result.push(resultRow);
    });

    return result;
  }

  performAggregation(data, selectColumns) {
    const resultRow = {};

    selectColumns.forEach((columnStr) => {
      const parsedCol = this.parseAggregateColumn(columnStr);
      if (parsedCol.isAggregate) {
        const value = this.evaluateAggregateFunction(parsedCol.function, parsedCol.column, data);
        resultRow[parsedCol.alias] = value;
      }
    });

    return [resultRow];
  }

  performColumnSelection(data, columns, table) {
    if (columns[0] === '*') {
      return data.map((row) => {
        const newRow = {};
        table.columns.forEach((col) => {
          newRow[col.name] = row[col.name];
        });
        return newRow;
      });
    } else {
      return data.map((row) => {
        const newRow = {};
        columns.forEach((col) => {
          const parsedCol = this.parseAggregateColumn(col);
          newRow[parsedCol.alias] = row[parsedCol.column];
        });
        return newRow;
      });
    }
  }

  evaluateHaving(row, havingCondition) {
    const value = row[havingCondition.column];
    switch (havingCondition.operator) {
      case '=':
        return value == havingCondition.value;
      case '!=':
      case '<>':
        return value != havingCondition.value;
      case '<':
        return value < havingCondition.value;
      case '>':
        return value > havingCondition.value;
      case '<=':
        return value <= havingCondition.value;
      case '>=':
        return value >= havingCondition.value;
      default:
        return false;
    }
  }

  parseUpdate(sql) {
    const match = sql.match(/UPDATE\s+(\w+)\s+SET\s+(.*?)(?:\s+WHERE\s+(.*?))?\s*$/is);
    if (!match) throw new Error('Invalid UPDATE syntax');

    const tableName = match[1];
    const setClause = match[2];
    const whereClause = match[3];

    const setPairs = setClause.split(',').map((pair) => {
      const [col, val] = pair.split('=').map((s) => s.trim());
      return { column: col, value: val.replace(/['"]/g, '') };
    });

    const setObj = {};
    setPairs.forEach((pair) => {
      setObj[pair.column] = pair.value;
    });

    return {
      table: tableName,
      set: setObj,
      where: whereClause ? this.parseWhere(whereClause) : null
    };
  }

  parseDelete(sql) {
    const match = sql.match(/DELETE\s+FROM\s+(\w+)(?:\s+WHERE\s+(.*?))?\s*$/is);
    if (!match) throw new Error('Invalid DELETE syntax');

    return {
      table: match[1],
      where: match[2] ? this.parseWhere(match[2]) : null
    };
  }

  parseAlterTable(sql) {
    // Support for ALTER TABLE ... ADD COLUMN
    const addColumnMatch = sql.match(/ALTER\s+TABLE\s+(\w+)\s+ADD\s+COLUMN\s+(\w+)\s+([^;]*)/i);
    if (addColumnMatch) {
      const columnDef = addColumnMatch[3].trim();
      const typeMatch = columnDef.match(/^(\w+(?:\(\d+\))?)/);
      const defaultMatch = columnDef.match(/DEFAULT\s+(.+)/i);

      return {
        tableName: addColumnMatch[1],
        action: 'ADD_COLUMN',
        columnName: addColumnMatch[2],
        columnType: typeMatch ? typeMatch[1] : 'VARCHAR(50)',
        defaultValue: defaultMatch ? defaultMatch[1].replace(/['"]/g, '') : null
      };
    }

    throw new Error('Unsupported ALTER TABLE operation');
  }

  evaluateWhere(row, whereCondition) {
    const { column, operator, value } = whereCondition;
    const rowValue = row[column];

    // Handle null values
    if (rowValue === null || rowValue === undefined) {
      if (value === 'NULL' || value === null) {
        return operator === '=' || operator === 'IS';
      }
      return operator === '!=' || operator === '<>' || operator === 'IS NOT';
    }

    const rowValueStr = String(rowValue);
    const valueStr = String(value);

    switch (operator) {
      case '=':
        return rowValueStr === valueStr;
      case '!=':
      case '<>':
        return rowValueStr !== valueStr;
      case '<':
        // Try numeric comparison first, then string comparison
        if (!isNaN(rowValue) && !isNaN(value)) {
          return Number(rowValue) < Number(value);
        }
        return rowValueStr < valueStr;
      case '>':
        if (!isNaN(rowValue) && !isNaN(value)) {
          return Number(rowValue) > Number(value);
        }
        return rowValueStr > valueStr;
      case '<=':
        if (!isNaN(rowValue) && !isNaN(value)) {
          return Number(rowValue) <= Number(value);
        }
        return rowValueStr <= valueStr;
      case '>=':
        if (!isNaN(rowValue) && !isNaN(value)) {
          return Number(rowValue) >= Number(value);
        }
        return rowValueStr >= valueStr;
      case 'LIKE': {
        // Simple LIKE implementation with % wildcard
        const pattern = valueStr.replace(/%/g, '.*').replace(/_/g, '.');
        const regex = new RegExp(`^${pattern}$`, 'i');
        return regex.test(rowValueStr);
      }
      default:
        return false;
    }
  }

  convertValue(value, type) {
    if (value === 'NULL' || value === null || value === undefined) return null;

    const typeUpper = type.toUpperCase();

    try {
      if (typeUpper.includes('INT')) {
        const parsed = parseInt(value, 10);
        if (isNaN(parsed)) throw new Error(`Invalid integer value: ${value}`);
        return parsed;
      } else if (
        typeUpper.includes('DECIMAL') ||
        typeUpper.includes('FLOAT') ||
        typeUpper.includes('DOUBLE')
      ) {
        const parsed = parseFloat(value);
        if (isNaN(parsed)) throw new Error(`Invalid numeric value: ${value}`);
        return parsed;
      } else if (typeUpper.includes('BOOLEAN') || typeUpper.includes('BOOL')) {
        if (typeof value === 'boolean') return value;
        const lowerValue = String(value).toLowerCase();
        if (lowerValue === 'true' || lowerValue === '1') return true;
        if (lowerValue === 'false' || lowerValue === '0') return false;
        throw new Error(`Invalid boolean value: ${value}`);
      } else if (typeUpper.includes('DATE')) {
        // Basic date validation
        const dateStr = String(value);
        if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
          throw new Error(`Invalid date format: ${value}. Expected YYYY-MM-DD`);
        }
        return dateStr;
      } else {
        return String(value);
      }
    } catch (error) {
      throw new Error(
        `Type conversion error for value '${value}' to type '${type}': ${error.message}`
      );
    }
  }

  addToHistory(query, result) {
    // Create a clean copy of result without circular references
    const cleanResult = {
      success: result.success,
      error: result.error,
      message: result.message,
      affectedRows: result.affectedRows,
      executionTime: result.executionTime,
      timestamp: result.timestamp,
      // Limit data size to prevent memory issues
      dataLength: result.data ? result.data.length : 0,
      columns: result.columns ? result.columns.slice(0, 10) : [] // Limit columns shown in history
    };

    this.queryHistory.unshift({
      id: uuidv4(),
      query: query.length > 1000 ? query.substring(0, 1000) + '...' : query, // Limit query length
      result: cleanResult,
      timestamp: new Date()
    });

    // Keep only last 50 queries to prevent memory issues
    if (this.queryHistory.length > 50) {
      this.queryHistory = this.queryHistory.slice(0, 50);
    }
  }

  getDatabases() {
    return Array.from(this.databases.keys());
  }

  getCurrentDatabase() {
    return this.currentDatabase;
  }

  getTablesInCurrentDatabase() {
    if (!this.currentDatabase) return [];
    const db = this.databases.get(this.currentDatabase);
    return Array.from(db.tables.keys());
  }

  getTableSchema(tableName) {
    if (!this.currentDatabase) return null;
    const db = this.databases.get(this.currentDatabase);
    if (!db.tables.has(tableName)) return null;
    return db.tables.get(tableName);
  }

  getQueryHistory() {
    return this.queryHistory;
  }
}

export default SQLEngine;
