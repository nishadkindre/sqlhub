import React, { useState, useRef } from 'react';
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
  Divider
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
  FolderTree
} from 'lucide-react';
import Editor from '@monaco-editor/react';
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

function SQLEditor({ onHistoryToggle, historyDrawerOpen, onExplorerToggle, explorerOpen }) {
  const { executeQuery, lastResult, currentDatabase } = useSQL();
  const { isDark } = useThemeMode();
  const [query, setQuery] = useState(defaultQuery);
  const [isExecuting, setIsExecuting] = useState(false);
  const [templatesDialogOpen, setTemplatesDialogOpen] = useState(false);
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;

    // Configure SQL language support
    monaco.languages.registerCompletionItemProvider('sql', {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn
        };

        return {
          suggestions: [
            // SQL Keywords
            {
              label: 'SELECT',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'SELECT',
              range: range
            },
            {
              label: 'FROM',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'FROM',
              range: range
            },
            {
              label: 'WHERE',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'WHERE',
              range: range
            },
            {
              label: 'INSERT INTO',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'INSERT INTO',
              range: range
            },
            {
              label: 'UPDATE',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'UPDATE',
              range: range
            },
            {
              label: 'DELETE FROM',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'DELETE FROM',
              range: range
            },
            {
              label: 'CREATE TABLE',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'CREATE TABLE',
              range: range
            },
            {
              label: 'SHOW TABLES',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'SHOW TABLES',
              range: range
            },
            {
              label: 'SHOW DATABASES',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'SHOW DATABASES',
              range: range
            },
            // Data Types
            {
              label: 'INT',
              kind: monaco.languages.CompletionItemKind.TypeParameter,
              insertText: 'INT',
              range: range
            },
            {
              label: 'VARCHAR',
              kind: monaco.languages.CompletionItemKind.TypeParameter,
              insertText: 'VARCHAR(255)',
              range: range
            },
            {
              label: 'TEXT',
              kind: monaco.languages.CompletionItemKind.TypeParameter,
              insertText: 'TEXT',
              range: range
            },
            {
              label: 'DECIMAL',
              kind: monaco.languages.CompletionItemKind.TypeParameter,
              insertText: 'DECIMAL(10,2)',
              range: range
            },
            {
              label: 'DATE',
              kind: monaco.languages.CompletionItemKind.TypeParameter,
              insertText: 'DATE',
              range: range
            },
            {
              label: 'DATETIME',
              kind: monaco.languages.CompletionItemKind.TypeParameter,
              insertText: 'DATETIME',
              range: range
            },
            {
              label: 'BOOLEAN',
              kind: monaco.languages.CompletionItemKind.TypeParameter,
              insertText: 'BOOLEAN',
              range: range
            },
            // Constraints
            {
              label: 'PRIMARY KEY',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'PRIMARY KEY',
              range: range
            },
            {
              label: 'FOREIGN KEY',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'FOREIGN KEY',
              range: range
            },
            {
              label: 'NOT NULL',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'NOT NULL',
              range: range
            },
            {
              label: 'UNIQUE',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'UNIQUE',
              range: range
            },
            // Functions
            {
              label: 'COUNT',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'COUNT(*)',
              range: range
            },
            {
              label: 'SUM',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'SUM(${1:column})',
              range: range
            },
            {
              label: 'AVG',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'AVG(${1:column})',
              range: range
            },
            {
              label: 'MAX',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'MAX(${1:column})',
              range: range
            },
            {
              label: 'MIN',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'MIN(${1:column})',
              range: range
            }
          ]
        };
      }
    });

    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      handleRunQuery();
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyF, () => {
      handleFormatQuery();
    });
  };

  const handleRunQuery = async () => {
    if (!query.trim()) return;

    setIsExecuting(true);
    try {
      await executeQuery(query);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleFormatQuery = () => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument').run();
    }
  };

  const handleClearEditor = () => {
    setQuery('');
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleSaveQuery = () => {
    // Implementation for saving query
  };

  return (
    <Paper
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: (theme) =>
          `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
        borderRadius: 3,
        overflow: 'hidden'
      }}
    >
      {/* Modern Toolbar */}
      <Box
        sx={{
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
              : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          borderBottom: (theme) =>
            `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
          px: 3,
          py: 1.5
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={2}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.125rem' }}>
              SQL Editor
            </Typography>

            {onExplorerToggle && (
              <Tooltip
                title={explorerOpen ? 'Hide Database Explorer' : 'Show Database Explorer'}
                arrow
              >
                <IconButton
                  onClick={onExplorerToggle}
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 2,
                    background: explorerOpen
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                    color: explorerOpen ? 'white' : '#667eea',
                    border: explorerOpen ? 'none' : '1px solid #667eea',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      transform: 'scale(1.05)',
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                    },
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  <FolderTree size={16} />
                </IconButton>
              </Tooltip>
            )}
          </Box>

          <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title="Format Query (Ctrl+Shift+F)" arrow>
              <IconButton
                onClick={handleFormatQuery}
                disabled={!query.trim()}
                sx={{
                  color: 'text.primary',
                  '&:hover': {
                    background: 'action.hover',
                    transform: 'scale(1.1)'
                  }
                }}
              >
                <AlignLeft size={20} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Clear Editor" arrow>
              <IconButton
                onClick={handleClearEditor}
                disabled={!query.trim()}
                sx={{
                  color: 'text.primary',
                  '&:hover': {
                    background: 'error.light',
                    color: 'error.main',
                    transform: 'scale(1.1)'
                  }
                }}
              >
                <Trash2 size={20} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Save Query" arrow>
              <IconButton
                onClick={handleSaveQuery}
                disabled={!query.trim()}
                sx={{
                  color: 'text.primary',
                  '&:hover': {
                    background: 'success.light',
                    color: 'success.main',
                    transform: 'scale(1.1)'
                  }
                }}
              >
                <Save size={20} />
              </IconButton>
            </Tooltip>

            <Tooltip title="SQL Templates" arrow>
              <IconButton
                onClick={() => setTemplatesDialogOpen(true)}
                sx={{
                  color: 'primary.main',
                  background: 'transparent',
                  border: `1px solid`,
                  borderColor: 'primary.main',
                  borderRadius: 2,
                  width: 36,
                  height: 36,
                  '&:hover': {
                    background: 'primary.main',
                    color: 'white',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                  }
                }}
              >
                <FileText size={20} />
              </IconButton>
            </Tooltip>

            {onHistoryToggle && (
              <Tooltip
                title={historyDrawerOpen ? 'Hide Query History' : 'Show Query History'}
                arrow
              >
                <IconButton
                  onClick={onHistoryToggle}
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 2,
                    background: historyDrawerOpen
                      ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                      : 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.1) 100%)',
                    color: historyDrawerOpen ? 'white' : '#f59e0b',
                    border: historyDrawerOpen ? 'none' : '1px solid #f59e0b',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                      color: 'white',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
                    }
                  }}
                >
                  <History size={20} />
                </IconButton>
              </Tooltip>
            )}

            <Tooltip
              title={isExecuting ? 'Executing Query...' : 'Execute Query (Ctrl+Enter)'}
              arrow
            >
              <IconButton
                onClick={handleRunQuery}
                disabled={isExecuting || !query.trim()}
                sx={{
                  background: isExecuting
                    ? 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)'
                    : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  width: 36,
                  height: 36,
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                  '&:hover': {
                    background: isExecuting
                      ? 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)'
                      : 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 6px 20px rgba(16, 185, 129, 0.4)'
                  },
                  '&:disabled': {
                    background: 'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)',
                    color: 'text.disabled'
                  }
                }}
              >
                {isExecuting ? <CircularProgress size={20} color="inherit" /> : <Play size={20} />}
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Box>

      {/* Code Editor */}
      <Box sx={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <Editor
          height="100%"
          defaultLanguage="sql"
          value={query}
          onChange={(value) => setQuery(value || '')}
          onMount={handleEditorDidMount}
          theme={isDark ? 'vs-dark' : 'light'}
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            fontFamily: '"Fira Code", "Inter", "Consolas", "Monaco", "Courier New", monospace',
            lineNumbers: 'on',
            renderLineHighlight: 'all',
            selectOnLineNumbers: true,
            scrollbar: {
              vertical: 'visible',
              horizontal: 'visible',
              useShadows: false,
              verticalHasArrows: false,
              horizontalHasArrows: false,
              verticalScrollbarSize: 12,
              horizontalScrollbarSize: 12
            },
            padding: { top: 16, bottom: 16 },
            wordWrap: 'on',
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            bracketPairColorization: { enabled: true },
            suggest: {
              showKeywords: true,
              showSnippets: true,
              showFunctions: true
            },
            quickSuggestions: {
              other: true,
              comments: false,
              strings: false
            },
            parameterHints: {
              enabled: true
            },
            folding: true,
            foldingHighlight: true,
            foldingStrategy: 'indentation',
            showFoldingControls: 'mouseover'
          }}
        />
      </Box>

      {/* Status Bar */}
      <Box
        sx={{
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)'
              : 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
          borderTop: (theme) =>
            `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
          px: 3,
          py: 1.5,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Zap size={16} color="#10b981" />
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
              {lastResult
                ? lastResult.success
                  ? `Last query: Success (${lastResult.executionTime}ms)`
                  : `Last query: Error`
                : 'Ready to execute'}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          {/* <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
            Press <strong>Ctrl+Enter</strong> to run query
          </Typography> */}
          <Chip
            size="small"
            label={`${query.split('\n').length} lines`}
            sx={{
              fontSize: '0.75rem',
              height: 24,
              backgroundColor: 'action.hover',
              color: 'text.secondary'
            }}
          />
          <Chip
            size="small"
            label={`${query.length} chars`}
            sx={{
              fontSize: '0.75rem',
              height: 24,
              backgroundColor: 'action.hover',
              color: 'text.secondary'
            }}
          />
        </Stack>
      </Box>

      {/* Query Templates Dialog */}
      <QueryTemplatesDialog
        open={templatesDialogOpen}
        onClose={() => setTemplatesDialogOpen(false)}
        onSelectQuery={(template) => {
          setQuery(template);
          setTemplatesDialogOpen(false);
        }}
      />
    </Paper>
  );
}

export default SQLEditor;
