# SQL Workbench Simulator

A comprehensive web-based SQL workbench that simulates a MySQL database environment entirely in the frontend. Users can create databases, tables, execute SQL queries, and perform all CRUD operations without requiring any backend infrastructure.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/44259149-a484-4fdf-a70e-c26a534694b8" />


## 🚀 Features

### Core Functionality

- **Complete Database Simulation**: Full MySQL-compatible database environment running in your browser
- **Advanced SQL Editor**: Professional code editor with syntax highlighting, auto-completion, and formatting
- **Real-time Query Execution**: Execute SQL queries instantly with realistic response times
- **Database Explorer**: Interactive sidebar to browse databases, tables, and schemas
- **Query History**: Track and manage your SQL query history
- **Results Visualization**: Professional data grids with export functionality

### SQL Operations Supported

- **Database Management**: CREATE/DROP/USE DATABASE, SHOW DATABASES
- **Table Operations**: CREATE/DROP/ALTER TABLE, SHOW TABLES, DESCRIBE
- **Data Manipulation**: INSERT, SELECT, UPDATE, DELETE
- **Advanced Queries**: JOIN operations, GROUP BY, ORDER BY, WHERE clauses
- **Data Types**: INT, VARCHAR, TEXT, DECIMAL, DATE, DATETIME, BOOLEAN
- **Constraints**: PRIMARY KEY, FOREIGN KEY, NOT NULL, UNIQUE

### User Experience

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Material-UI Interface**: Modern, intuitive interface following Material Design principles
- **Query Templates**: Pre-built query examples for learning and reference
- **Error Handling**: Clear, actionable error messages
- **Keyboard Shortcuts**: Efficient workflow with keyboard shortcuts
- **Export Options**: Download query results as CSV or JSON

## 🛠 Technology Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.3
- **UI Library**: Material-UI (MUI) with complete component set
- **Code Editor**: Monaco Editor (VS Code editor)
- **Routing**: React Router DOM
- **State Management**: React Context API with useReducer
- **Data Grid**: MUI X Data Grid
- **SQL Engine**: Custom in-memory SQL parser and executor

## 📦 Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd sqlhub
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:5173`

## 🎯 Getting Started

### Quick Start

1. Open the SQL Workbench by clicking "Open Workbench" from the landing page
2. The application comes with pre-loaded sample databases (`employee_db` and `ecommerce_db`)
3. Use the database explorer on the left to browse tables and schemas
4. Try the sample queries in the SQL editor or use the Templates feature

### Sample Queries

#### Basic Operations

```sql
-- Show all databases
SHOW DATABASES;

-- Select a database
USE employee_db;

-- Show tables in current database
SHOW TABLES;

-- View table structure
DESCRIBE employees;

-- Select all data
SELECT * FROM employees;
```

#### Data Manipulation

```sql
-- Select with conditions
SELECT name, email, department
FROM employees
WHERE department = 'Engineering';

-- Insert new record
INSERT INTO employees VALUES
(6, 'Alice Johnson', 'alice@company.com', 'Engineering', 78000.00, '2023-01-15');

-- Update records
UPDATE employees
SET salary = 85000
WHERE name = 'John Doe';

-- Delete records
DELETE FROM employees
WHERE id = 6;
```

#### Advanced Queries

```sql
-- Group by with aggregates
SELECT department,
       COUNT(*) as employee_count,
       AVG(salary) as avg_salary
FROM employees
GROUP BY department;

-- Join tables
SELECT e.name, e.email, d.name as department_name
FROM employees e
JOIN departments d ON e.department = d.name;

-- Subquery
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);
```

## 🏗 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── DatabaseExplorer.jsx
│   ├── SQLEditor.jsx
│   ├── ResultsPanel.jsx
│   ├── QueryHistory.jsx
│   ├── Header.jsx
│   ├── LoadingSpinner.jsx
│   ├── ErrorBoundary.jsx
│   └── QueryTemplatesDialog.jsx
├── contexts/            # React Context providers
│   └── SQLContext.jsx
├── pages/               # Main application pages
│   ├── LandingPage.jsx
│   └── WorkbenchPage.jsx
├── utils/               # Utility functions and classes
│   ├── SQLEngine.js
│   └── queryTemplates.js
├── theme.js             # Material-UI theme configuration
├── App.jsx              # Main application component
├── main.jsx             # Application entry point
└── index.css            # Global styles
```

## 🔧 Key Components

### SQLEngine

The heart of the application - a custom SQL parser and executor that:

- Parses SQL commands and validates syntax
- Manages in-memory database state
- Executes queries and returns results
- Handles error cases with descriptive messages

### Database Explorer

Interactive sidebar component that:

- Displays database hierarchy
- Shows table schemas and column information
- Provides quick actions for database operations
- Supports database and table creation/deletion

### SQL Editor

Professional code editor featuring:

- Syntax highlighting for SQL
- Auto-completion for keywords and commands
- Multi-query support
- Keyboard shortcuts (Ctrl+Enter to run, Ctrl+Shift+F to format)
- Query templates integration

### Results Panel

Comprehensive results display with:

- Tabular view with pagination
- Advanced data grid with sorting and filtering
- Export functionality (CSV, JSON)
- Query execution metrics
- Error message display

## 🎨 Customization

### Theme Configuration

The application uses Material-UI's theming system. Customize colors, typography, and component styles in `src/theme.js`.

### Adding New Query Templates

Extend the query templates in `src/utils/queryTemplates.js` to add new categories or examples.

### Database Schema

Modify the sample data in `SQLEngine.js` constructor to change the pre-loaded databases and tables.

## 📱 Responsive Design

The application is fully responsive and adapts to different screen sizes:

- **Desktop (1200px+)**: Full three-panel layout with permanent sidebars
- **Tablet (768px-1199px)**: Collapsible sidebars with overlay
- **Mobile (320px-767px)**: Single-panel view with navigation drawer

## 🔍 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

The application requires a modern browser with ES2020+ support.

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

The built application is fully static and can be deployed to any static hosting service like:

- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Firebase Hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- UI components from [Material-UI](https://mui.com/)
- Code editor powered by [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- Icons from [Material Icons](https://mui.com/material-ui/material-icons/)

## 📞 Support

If you encounter any issues or have questions:

1. Check the existing issues in the repository
2. Create a new issue with detailed description
3. Include browser information and steps to reproduce

---

**Made with ❤️ for the SQL learning community**+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
