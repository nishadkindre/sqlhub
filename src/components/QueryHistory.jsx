import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  InputAdornment,
  Collapse,
  Alert
} from '@mui/material';
import {
  History as HistoryIcon,
  PlayArrow as RunIcon,
  ContentCopy as CopyIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Error as ErrorIcon,
  CheckCircle as SuccessIcon,
  Clear as ClearIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { useSQL } from '../contexts/SQLContext';

function QueryHistory() {
  const { queryHistory, executeQuery } = useSQL();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [detailDialog, setDetailDialog] = useState(false);
  const [expandedItems, setExpandedItems] = useState(new Set());

  const filteredHistory = queryHistory.filter((item) =>
    item.query.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRunQuery = async (query) => {
    await executeQuery(query);
  };

  const handleCopyQuery = (query) => {
    navigator.clipboard.writeText(query);
  };

  const handleToggleExpand = (itemId) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const getQueryPreview = (query, maxLength = 100) => {
    const singleLine = query.replace(/\s+/g, ' ').trim();
    return singleLine.length > maxLength ? singleLine.substring(0, maxLength) + '...' : singleLine;
  };

  const getStatusChip = (result) => {
    if (result.success) {
      return <Chip label="Success" color="success" size="small" icon={<SuccessIcon />} />;
    } else {
      return <Chip label="Error" color="error" size="small" icon={<ErrorIcon />} />;
    }
  };

  return (
    <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ p: { xs: 1.5, sm: 2 }, borderBottom: 1, borderColor: 'divider' }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search queries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize={searchTerm ? 'small' : 'medium'} />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setSearchTerm('')}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Box>

      {/* History List */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {filteredHistory.length === 0 ? (
          <Box
            sx={{
              p: { xs: 2, sm: 3 },
              textAlign: 'center',
              color: 'text.secondary',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1
            }}
          >
            <HistoryIcon sx={{ fontSize: { xs: 40, sm: 48 }, opacity: 0.5 }} />
            {queryHistory.length === 0 ? (
              <Typography variant="body1">No queries executed yet</Typography>
            ) : (
              <Typography variant="body1">No queries match your search</Typography>
            )}
            {queryHistory.length === 0 && (
              <Typography variant="body2" sx={{ mt: 1, maxWidth: 300 }}>
                Start by executing SQL queries in the editor above. They will appear here for easy
                access.
              </Typography>
            )}
          </Box>
        ) : (
          <List dense>
            {filteredHistory.map((item, index) => {
              const isExpanded = expandedItems.has(item.id);

              return (
                <React.Fragment key={item.id}>
                  <ListItem
                    sx={{
                      flexDirection: 'column',
                      alignItems: 'stretch',
                      py: 1,
                      borderBottom: index < filteredHistory.length - 1 ? 1 : 0,
                      borderColor: 'divider'
                    }}
                  >
                    {/* Main row */}
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', width: '100%', gap: 1 }}>
                      {/* Content area with proper spacing for actions */}
                      <Box sx={{ flex: 1, minWidth: 0, pr: { xs: 1, sm: 2 } }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mb: 0.5,
                            flexWrap: 'wrap'
                          }}
                        >
                          {getStatusChip(item.result)}
                          <Typography variant="body2" color="text.secondary">
                            {formatTimestamp(item.timestamp)}
                          </Typography>
                        </Box>

                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily:
                              '"JetBrains Mono", "SF Mono", "Monaco", "Cascadia Code", "Roboto Mono", "Consolas", "Courier New", monospace',
                            p: 1,
                            borderRadius: 1,
                            cursor: 'pointer',
                            backgroundColor: 'grey.50',
                            border: '1px solid',
                            borderColor: 'grey.200',
                            wordBreak: 'break-word',
                            '&:hover': {
                              backgroundColor: 'grey.100'
                            }
                          }}
                          onClick={() => handleToggleExpand(item.id)}
                        >
                          {isExpanded ? item.query : getQueryPreview(item.query)}
                        </Typography>
                      </Box>

                      {/* Action buttons area */}
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: { xs: 'column', sm: 'row' },
                          gap: 0.5,
                          flexShrink: 0,
                          alignItems: 'flex-start'
                        }}
                      >
                        <Tooltip title="Run Query">
                          <IconButton
                            size="small"
                            onClick={() => handleRunQuery(item.query)}
                            sx={{ minWidth: { xs: 32, sm: 'auto' } }}
                          >
                            <RunIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Copy Query">
                          <IconButton
                            size="small"
                            onClick={() => handleCopyQuery(item.query)}
                            sx={{ minWidth: { xs: 32, sm: 'auto' } }}
                          >
                            <CopyIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title={isExpanded ? 'Show Less' : 'Show More'}>
                          <IconButton
                            size="small"
                            onClick={() => handleToggleExpand(item.id)}
                            sx={{ minWidth: { xs: 32, sm: 'auto' } }}
                          >
                            {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Details">
                          <IconButton
                            size="small"
                            onClick={() => {
                              setSelectedQuery(item);
                              setDetailDialog(true);
                            }}
                            sx={{ minWidth: { xs: 32, sm: 'auto' } }}
                          >
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>

                    {/* Expanded details */}
                    <Collapse in={isExpanded}>
                      <Box
                        sx={{
                          mt: 1,
                          pl: { xs: 1, sm: 2 },
                          borderLeft: 3,
                          borderColor: 'primary.main',
                          ml: { xs: 0, sm: 0 }
                        }}
                      >
                        {item.result.success ? (
                          <Box>
                            {item.result.message && (
                              <Typography variant="body2" color="success.main" gutterBottom>
                                {item.result.message}
                              </Typography>
                            )}

                            {item.result.data && item.result.data.length > 0 && (
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                Returned {item.result.data.length} row(s)
                              </Typography>
                            )}

                            {item.result.affectedRows > 0 && (
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                Affected {item.result.affectedRows} row(s)
                              </Typography>
                            )}

                            <Typography variant="body2" color="text.secondary">
                              Execution time: {item.result.executionTime}ms
                            </Typography>
                          </Box>
                        ) : (
                          <Alert
                            severity="error"
                            size="small"
                            sx={{
                              fontSize: { xs: '0.75rem', sm: '0.875rem' },
                              '& .MuiAlert-message': {
                                wordBreak: 'break-word'
                              }
                            }}
                          >
                            {item.result.error}
                          </Alert>
                        )}
                      </Box>
                    </Collapse>
                  </ListItem>
                </React.Fragment>
              );
            })}
          </List>
        )}
      </Box>

      {/* Detail Dialog */}
      <Dialog
        open={detailDialog}
        onClose={() => setDetailDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            m: { xs: 0, sm: 2 },
            maxHeight: { xs: '100vh', sm: '90vh' }
          }
        }}
        sx={{
          '& .MuiDialog-paper': {
            width: { xs: '100%', sm: 'auto' },
            height: { xs: '100%', sm: 'auto' },
            maxWidth: { xs: '100%', sm: '768px' }
          }
        }}
      >
        <DialogTitle>Query Details</DialogTitle>
        <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
          {selectedQuery && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Query
              </Typography>
              <Box
                sx={{
                  fontFamily:
                    '"JetBrains Mono", "SF Mono", "Monaco", "Cascadia Code", "Roboto Mono", "Consolas", "Courier New", monospace',
                  p: { xs: 1.5, sm: 2 },
                  borderRadius: 1,
                  mb: 2,
                  whiteSpace: 'pre-wrap',
                  backgroundColor: 'grey.50',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  wordBreak: 'break-all'
                }}
              >
                {selectedQuery.query}
              </Box>

              <Typography variant="h6" gutterBottom>
                Execution Details
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  <strong>Timestamp:</strong> {formatTimestamp(selectedQuery.timestamp)}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  <strong>Status:</strong> {selectedQuery.result.success ? 'Success' : 'Error'}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  <strong>Execution Time:</strong> {selectedQuery.result.executionTime}ms
                </Typography>
                {selectedQuery.result.affectedRows > 0 && (
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    <strong>Affected Rows:</strong> {selectedQuery.result.affectedRows}
                  </Typography>
                )}
                {selectedQuery.result.data && (
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    <strong>Returned Rows:</strong> {selectedQuery.result.data.length}
                  </Typography>
                )}
              </Box>

              {selectedQuery.result.message && (
                <>
                  <Typography variant="h6" gutterBottom>
                    Message
                  </Typography>
                  <Alert
                    severity={selectedQuery.result.success ? 'success' : 'error'}
                    sx={{
                      mb: 2,
                      '& .MuiAlert-message': {
                        wordBreak: 'break-word',
                        fontSize: { xs: '0.75rem', sm: '0.875rem' }
                      }
                    }}
                  >
                    {selectedQuery.result.message || selectedQuery.result.error}
                  </Alert>
                </>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions
          sx={{
            p: { xs: 2, sm: 3 },
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 1, sm: 0 }
          }}
        >
          <Button onClick={() => setDetailDialog(false)} sx={{ width: { xs: '100%', sm: 'auto' } }}>
            Close
          </Button>
          {selectedQuery && (
            <>
              <Button
                onClick={() => handleCopyQuery(selectedQuery.query)}
                startIcon={<CopyIcon />}
                sx={{ width: { xs: '100%', sm: 'auto' } }}
              >
                Copy Query
              </Button>
              <Button
                onClick={() => {
                  handleRunQuery(selectedQuery.query);
                  setDetailDialog(false);
                }}
                variant="contained"
                startIcon={<RunIcon />}
                sx={{ width: { xs: '100%', sm: 'auto' } }}
              >
                Run Again
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default QueryHistory;
