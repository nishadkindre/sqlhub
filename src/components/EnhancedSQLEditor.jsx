import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  Box,
  Paper,
  Button,
  IconButton,
  Typography,
  Tooltip,
  CircularProgress,
  Chip,
  Stack,
  Divider,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Menu,
  MenuItem,
  Alert
} from '@mui/material';
import {
  Play,
  Trash2,
  AlignLeft,
  Save,
  History,
  Code,
  Zap,
  Database,
  Settings,
  FileText,
  FolderTree,
  Plus,
  X,
  Download,
  Upload,
  Palette
} from 'lucide-react';
import Editor from '@monaco-editor/react';
import { format } from 'sql-formatter';
import { useSQL } from '../contexts/SQLContext';
import { useThemeMode } from '../contexts/ThemeContext';
import QueryTemplatesDialog from './QueryTemplatesDialog';

const defaultQuery = `-- Welcome to SQLHub - Advanced SQL Learning Platform!
-- Try these sample queries to get started:

-- View all databases
SHOW DATABASES;

-- Use a database
USE employee_db;

-- View all tables
SHOW TABLES;

-- Select data from employees table
SELECT * FROM employees LIMIT 10;

-- Select specific columns with WHERE clause
SELECT name, email, department, salary 
FROM employees 
WHERE department = 'Engineering'
ORDER BY salary DESC;

-- Advanced analytics query
SELECT 
    department,
    COUNT(*) as employee_count,
    ROUND(AVG(salary), 2) as avg_salary,
    MAX(salary) as max_salary
FROM employees 
GROUP BY department 
HAVING COUNT(*) > 2
ORDER BY avg_salary DESC;
`;

// SQL Keywords and Functions for enhanced autocomplete
const SQL_KEYWORDS = [
  'SELECT', 'FROM', 'WHERE', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'DROP', 'ALTER',
  'TABLE', 'DATABASE', 'INDEX', 'VIEW', 'PROCEDURE', 'FUNCTION', 'TRIGGER',
  'JOIN', 'INNER', 'LEFT', 'RIGHT', 'OUTER', 'FULL', 'CROSS', 'ON', 'USING',
  'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'OFFSET', 'DISTINCT', 'ALL',
  'UNION', 'INTERSECT', 'EXCEPT', 'EXISTS', 'NOT', 'NULL', 'IS', 'LIKE',
  'IN', 'BETWEEN', 'AND', 'OR', 'AS', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END',
  'SHOW', 'DESCRIBE', 'EXPLAIN', 'USE', 'SET', 'COMMIT', 'ROLLBACK', 'BEGIN',
  'TRANSACTION', 'SAVEPOINT', 'GRANT', 'REVOKE', 'PRIMARY KEY', 'FOREIGN KEY',
  'UNIQUE', 'CHECK', 'DEFAULT', 'AUTO_INCREMENT', 'NOT NULL'
];

const SQL_FUNCTIONS = [
  'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'ROUND', 'FLOOR', 'CEIL', 'ABS',
  'UPPER', 'LOWER', 'TRIM', 'SUBSTRING', 'LENGTH', 'CONCAT', 'REPLACE',
  'NOW', 'CURDATE', 'CURTIME', 'DATE', 'TIME', 'YEAR', 'MONTH', 'DAY',
  'COALESCE', 'NULLIF', 'ISNULL', 'IFNULL', 'CAST', 'CONVERT'
];

const SQL_DATA_TYPES = [
  'INT', 'INTEGER', 'BIGINT', 'SMALLINT', 'TINYINT', 'DECIMAL', 'NUMERIC',
  'FLOAT', 'DOUBLE', 'REAL', 'CHAR', 'VARCHAR', 'TEXT', 'LONGTEXT',
  'DATE', 'TIME', 'DATETIME', 'TIMESTAMP', 'YEAR', 'BOOLEAN', 'BOOL',
  'BINARY', 'VARBINARY', 'BLOB', 'LONGBLOB', 'JSON', 'ENUM', 'SET'
];

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`editor-tabpanel-${index}`}
      aria-labelledby={`editor-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ height: '100%' }}>{children}</Box>}
    </div>
  );
}

function EnhancedSQLEditor({ onHistoryToggle, historyDrawerOpen, onExplorerToggle, explorerOpen }) {
  const { executeQuery, lastResult, currentDatabase, tables } = useSQL();
  const { isDark } = useThemeMode();
  
  // Tab management
  const [tabs, setTabs] = useState([
    { id: 1, name: 'Query 1', query: defaultQuery, saved: false }
  ]);
  const [activeTab, setActiveTab] = useState(0);
  const [nextTabId, setNextTabId] = useState(2);
  
  // Editor states
  const [isExecuting, setIsExecuting] = useState(false);
  const [templatesDialogOpen, setTemplatesDialogOpen] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [newTabName, setNewTabName] = useState('');
  const [formatMenuAnchor, setFormatMenuAnchor] = useState(null);
  
  const editorRef = useRef(null);

  // Get table and column names for autocomplete
  const getTableNames = useCallback(() => {
    return tables.map(table => table.name) || [];
  }, [tables]);

  const getColumnNames = useCallback(() => {
    const columns = [];
    tables.forEach(table => {
      if (table.columns) {
        table.columns.forEach(column => {
          columns.push(column.name);
          columns.push(`${table.name}.${column.name}`);
        });
      }
    });
    return columns;
  }, [tables]);

  // Enhanced autocomplete provider
  const createCompletionProvider = useCallback((monaco) => {
    return {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn
        };

        const suggestions = [];

        // Add SQL Keywords
        SQL_KEYWORDS.forEach(keyword => {
          suggestions.push({
            label: keyword,
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: keyword,
            range: range,
            detail: 'SQL Keyword'
          });
        });

        // Add SQL Functions
        SQL_FUNCTIONS.forEach(func => {
          suggestions.push({
            label: func,
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: `${func}($0)`,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
            detail: 'SQL Function'
          });
        });

        // Add Data Types
        SQL_DATA_TYPES.forEach(type => {
          suggestions.push({
            label: type,
            kind: monaco.languages.CompletionItemKind.TypeParameter,
            insertText: type,
            range: range,
            detail: 'Data Type'
          });
        });

        // Add Table Names
        getTableNames().forEach(tableName => {
          suggestions.push({
            label: tableName,
            kind: monaco.languages.CompletionItemKind.Class,
            insertText: tableName,
            range: range,
            detail: 'Table'
          });
        });

        // Add Column Names
        getColumnNames().forEach(columnName => {
          suggestions.push({
            label: columnName,
            kind: monaco.languages.CompletionItemKind.Field,
            insertText: columnName,
            range: range,
            detail: 'Column'
          });
        });

        return { suggestions };
      }
    };
  }, [getTableNames, getColumnNames]);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;

    // Register enhanced completion provider
    monaco.languages.registerCompletionItemProvider('sql', createCompletionProvider(monaco));

    // Configure editor options
    editor.updateOptions({
      suggestOnTriggerCharacters: true,
      quickSuggestions: true,
      quickSuggestionsDelay: 100,
      parameterHints: { enabled: true },
      autoClosingBrackets: 'always',
      autoClosingQuotes: 'always',
      bracketPairColorization: { enabled: true },
      formatOnPaste: true,
      formatOnType: true
    });

    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      handleExecuteQuery();
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyF, () => {
      handleFormatQuery();
    });
  };

  const handleExecuteQuery = async () => {
    const currentQuery = tabs[activeTab]?.query;
    if (!currentQuery?.trim()) return;

    setIsExecuting(true);
    try {
      await executeQuery(currentQuery);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleQueryChange = (value) => {
    setTabs(prev => prev.map((tab, index) => 
      index === activeTab 
        ? { ...tab, query: value || '', saved: false }
        : tab
    ));
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const addNewTab = () => {
    const newTab = {
      id: nextTabId,
      name: `Query ${nextTabId}`,
      query: '-- New query\n',
      saved: false
    };
    setTabs(prev => [...prev, newTab]);
    setActiveTab(tabs.length);
    setNextTabId(prev => prev + 1);
  };

  const closeTab = (indexToClose) => {
    if (tabs.length === 1) return; // Don't close the last tab
    
    setTabs(prev => prev.filter((_, index) => index !== indexToClose));
    if (activeTab >= indexToClose && activeTab > 0) {
      setActiveTab(prev => prev - 1);
    }
  };

  const saveQuery = () => {
    const currentTab = tabs[activeTab];
    if (!currentTab) return;

    // Save to localStorage
    const savedQueries = JSON.parse(localStorage.getItem('sqlhub_saved_queries') || '[]');
    const queryToSave = {
      id: Date.now(),
      name: newTabName || currentTab.name,
      query: currentTab.query,
      timestamp: new Date().toISOString()
    };

    savedQueries.push(queryToSave);
    localStorage.setItem('sqlhub_saved_queries', JSON.stringify(savedQueries));

    // Update tab as saved
    setTabs(prev => prev.map((tab, index) => 
      index === activeTab 
        ? { ...tab, name: newTabName || tab.name, saved: true }
        : tab
    ));

    setSaveDialogOpen(false);
    setNewTabName('');
  };

  const handleFormatQuery = () => {
    const currentQuery = tabs[activeTab]?.query;
    if (!currentQuery?.trim() || !editorRef.current) return;

    try {
      const formatted = format(currentQuery, {
        language: 'mysql',
        indent: '  ',
        uppercase: true,
        linesBetweenQueries: 2
      });
      
      editorRef.current.setValue(formatted);
      handleQueryChange(formatted);
    } catch (error) {
      console.error('Error formatting query:', error);
    }
  };

  const clearQuery = () => {
    if (editorRef.current) {
      editorRef.current.setValue('');
      handleQueryChange('');
    }
  };

  const currentTab = tabs[activeTab];

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: 2,
        border: theme => `1px solid ${theme.palette.divider}`
      }}
    >
      {/* Header with Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', flexShrink: 0 }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ px: 2, py: 1 }}>
          <Box sx={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ 
                minHeight: 40,
                '& .MuiTabs-scrollButtons': {
                  '&.Mui-disabled': {
                    opacity: 0.3
                  }
                }
              }}
            >
              {tabs.map((tab, index) => (
                <Tab
                  key={tab.id}
                  label={
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="body2" noWrap>
                        {tab.name} {!tab.saved && '*'}
                      </Typography>
                      {tabs.length > 1 && (
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            closeTab(index);
                          }}
                          sx={{ ml: 1, p: 0.5 }}
                        >
                          <X size={12} />
                        </IconButton>
                      )}
                    </Stack>
                  }
                  sx={{ minHeight: 40, textTransform: 'none' }}
                />
              ))}
            </Tabs>
          </Box>
          
          <IconButton onClick={addNewTab} size="small">
            <Plus size={16} />
          </IconButton>
        </Stack>
      </Box>

      {/* Toolbar */}
      <Box sx={{ p: 1.5, borderBottom: 1, borderColor: 'divider', flexShrink: 0 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Button
            variant="contained"
            startIcon={isExecuting ? <CircularProgress size={16} /> : <Play size={16} />}
            onClick={handleExecuteQuery}
            disabled={isExecuting || !currentTab?.query?.trim()}
            size="small"
          >
            {isExecuting ? 'Executing...' : 'Execute'}
          </Button>

          <Button
            variant="outlined"
            startIcon={<AlignLeft size={16} />}
            onClick={handleFormatQuery}
            disabled={!currentTab?.query?.trim()}
            size="small"
          >
            Format
          </Button>

          <Button
            variant="outlined"
            startIcon={<Save size={16} />}
            onClick={() => setSaveDialogOpen(true)}
            disabled={!currentTab?.query?.trim()}
            size="small"
          >
            Save
          </Button>

          <Divider orientation="vertical" flexItem />

          <Tooltip title="Query Templates">
            <IconButton onClick={() => setTemplatesDialogOpen(true)} size="small">
              <FileText size={16} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Clear Query">
            <IconButton onClick={clearQuery} size="small">
              <Trash2 size={16} />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem />

          <Tooltip title={`${historyDrawerOpen ? 'Hide' : 'Show'} Query History`}>
            <IconButton onClick={onHistoryToggle} size="small">
              <History size={16} />
            </IconButton>
          </Tooltip>

          <Tooltip title={`${explorerOpen ? 'Hide' : 'Show'} Database Explorer`}>
            <IconButton onClick={onExplorerToggle} size="small">
              <Database size={16} />
            </IconButton>
          </Tooltip>

          {currentDatabase && (
            <Chip
              label={`Database: ${currentDatabase}`}
              size="small"
              color="primary"
              variant="outlined"
            />
          )}
        </Stack>
      </Box>

      {/* Editor */}
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        {tabs.map((tab, index) => (
          <TabPanel key={tab.id} value={activeTab} index={index}>
            <Editor
              height="100%"
              language="sql"
              theme={isDark ? 'vs-dark' : 'vs-light'}
              value={tab.query}
              onChange={handleQueryChange}
              onMount={handleEditorDidMount}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: 'on',
                wrappingIndent: 'indent',
                suggest: {
                  showKeywords: true,
                  showFunctions: true,
                  showClasses: true,
                  showFields: true
                }
              }}
            />
          </TabPanel>
        ))}
      </Box>

      {/* Query Templates Dialog */}
      <QueryTemplatesDialog
        open={templatesDialogOpen}
        onClose={() => setTemplatesDialogOpen(false)}
        onSelectTemplate={(template) => {
          handleQueryChange(template);
          setTemplatesDialogOpen(false);
        }}
      />

      {/* Save Query Dialog */}
      <Dialog open={saveDialogOpen} onClose={() => setSaveDialogOpen(false)}>
        <DialogTitle>Save Query</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Query Name"
            fullWidth
            variant="outlined"
            value={newTabName}
            onChange={(e) => setNewTabName(e.target.value)}
            placeholder={currentTab?.name}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveDialogOpen(false)}>Cancel</Button>
          <Button onClick={saveQuery} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default EnhancedSQLEditor;
