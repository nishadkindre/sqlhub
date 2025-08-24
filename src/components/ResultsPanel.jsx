import React, { useState, useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  Toolbar,
  IconButton,
  Button,
  Chip,
  Alert,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Tooltip,
  CircularProgress,
  Stack
} from '@mui/material';
import { Download, FileJson, BarChart3, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { DataGrid } from '@mui/x-data-grid';
import { useSQL } from '../contexts/SQLContext';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`results-tabpanel-${index}`}
      aria-labelledby={`results-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ height: '100%' }}>{children}</Box>}
    </div>
  );
}

function ResultsPanel() {
  const { lastResult, isLoading, error } = useSQL();
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const exportToCSV = () => {
    if (!lastResult?.data || lastResult.data.length === 0) {
      alert('No data to export');
      return;
    }

    try {
      const headers = lastResult.columns.join(',');
      const rows = lastResult.data.map((row) =>
        lastResult.columns
          .map((col) => {
            const value = row[col];
            // Handle null/undefined values
            if (value === null || value === undefined) return '';
            // Escape commas and quotes in CSV
            if (
              typeof value === 'string' &&
              (value.includes(',') || value.includes('"') || value.includes('\n'))
            ) {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
          })
          .join(',')
      );

      const csvContent = [headers, ...rows].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `query_results_${new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-')}.csv`;

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Clean up
      setTimeout(() => URL.revokeObjectURL(url), 100);
    } catch (error) {
      console.error('Failed to export CSV:', error);
      alert('Failed to export data to CSV');
    }
  };

  const exportToJSON = () => {
    if (!lastResult?.data || lastResult.data.length === 0) {
      alert('No data to export');
      return;
    }

    try {
      const jsonContent = JSON.stringify(lastResult.data, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `query_results_${new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-')}.json`;

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Clean up
      setTimeout(() => URL.revokeObjectURL(url), 100);
    } catch (error) {
      console.error('Failed to export JSON:', error);
      alert('Failed to export data to JSON');
    }
  };

  // Convert data for DataGrid
  const gridData = useMemo(() => {
    if (!lastResult?.data) return [];
    return lastResult.data.map((row, index) => ({
      id: index,
      ...row
    }));
  }, [lastResult?.data]);

  const gridColumns = useMemo(() => {
    if (!lastResult?.columns) return [];
    return lastResult.columns.map((col) => ({
      field: col,
      headerName: col,
      width: 150,
      editable: false,
      sortable: true,
      filterable: true
    }));
  }, [lastResult?.columns]);

  const paginatedData = useMemo(() => {
    if (!lastResult?.data) return [];
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    return lastResult.data.slice(start, end);
  }, [lastResult?.data, page, rowsPerPage]);

  const renderResultsContent = () => {
    if (isLoading) {
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 200
          }}
        >
          <CircularProgress />
          <Typography variant="body1" sx={{ ml: 2 }}>
            Executing query...
          </Typography>
        </Box>
      );
    }

    if (error) {
      return (
        <Alert severity="error" icon={<AlertCircle size={20} />} sx={{ m: 2 }}>
          <Typography variant="h6">Query Error</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {error}
          </Typography>
        </Alert>
      );
    }

    if (!lastResult) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: 200,
            color: 'text.secondary'
          }}
        >
          <Info size={48} style={{ marginBottom: 16 }} />
          <Typography variant="h6">No results yet</Typography>
          <Typography variant="body2">Run a SQL query to see results here</Typography>
        </Box>
      );
    }

    if (!lastResult.success) {
      return (
        <Alert severity="error" icon={<AlertCircle size={20} />} sx={{ m: 2 }}>
          <Typography variant="h6">Query Failed</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {lastResult.error}
          </Typography>
        </Alert>
      );
    }

    if (lastResult.message && (!lastResult.data || lastResult.data.length === 0)) {
      return (
        <Alert severity="success" icon={<CheckCircle size={20} />} sx={{ m: 2 }}>
          <Typography variant="h6">Query Successful</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {lastResult.message}
          </Typography>
          {lastResult.affectedRows > 0 && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Rows affected: {lastResult.affectedRows}
            </Typography>
          )}
        </Alert>
      );
    }

    if (!lastResult.data || lastResult.data.length === 0) {
      return (
        <Alert severity="info" icon={<Info size={20} />} sx={{ m: 2 }}>
          <Typography variant="h6">Empty Result Set</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            The query executed successfully but returned no data.
          </Typography>
        </Alert>
      );
    }

    return (
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Table View" />
          <Tab label="Grid View" />
        </Tabs>

        <TabPanel value={tabValue} index={0} sx={{ flex: 1, overflow: 'hidden' }}>
          <TableContainer sx={{ height: '100%', overflow: 'auto' }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  {lastResult.columns.map((column) => (
                    <TableCell key={column} sx={{ fontWeight: 'bold' }}>
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((row, index) => (
                  <TableRow key={index} hover>
                    {lastResult.columns.map((column) => (
                      <TableCell key={column}>
                        {row[column] === null ? (
                          <Typography variant="body2" color="text.secondary" fontStyle="italic">
                            NULL
                          </Typography>
                        ) : (
                          String(row[column])
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={lastResult.data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TabPanel>

        <TabPanel value={tabValue} index={1} sx={{ flex: 1 }}>
          <Box sx={{ height: '100%', width: '100%' }}>
            <DataGrid
              rows={gridData}
              columns={gridColumns}
              pageSize={rowsPerPage}
              rowsPerPageOptions={[10, 25, 50, 100]}
              disableSelectionOnClick
              density="compact"
              sx={{
                '& .MuiDataGrid-cell': {
                  borderBottom: 'none'
                },
                '& .MuiDataGrid-columnHeaders': {
                  borderBottom: '2px solid',
                  borderBottomColor: 'divider'
                }
              }}
            />
          </Box>
        </TabPanel>
      </Box>
    );
  };

  return (
    <Paper
      sx={{
        height: '100%',
        maxWidth: '100%',
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
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.125rem' }}>
              Query Results
            </Typography>

            {!!lastResult && (
              <Stack direction="row" spacing={1}>
                <Chip
                  icon={<BarChart3 size={14} />}
                  label={`${lastResult.data?.length || 0} rows`}
                  size="small"
                  sx={{
                    background: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)'
                        : 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                    color: 'primary.main',
                    border: (theme) => `1px solid ${theme.palette.primary.main}30`,
                    fontWeight: 600,
                    '& .MuiChip-icon': {
                      color: 'primary.main'
                    }
                  }}
                />
                {!!lastResult.executionTime && (
                  <Chip
                    label={`${lastResult.executionTime}ms`}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: 'text.secondary',
                      color: 'text.secondary',
                      fontWeight: 500
                    }}
                  />
                )}
              </Stack>
            )}
          </Box>

          <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title="Export as CSV" arrow>
              <IconButton
                onClick={exportToCSV}
                disabled={!lastResult?.data || lastResult.data.length === 0}
                sx={{
                  color: 'success.main',
                  background: 'transparent',
                  border: `1px solid`,
                  borderColor: 'success.main',
                  borderRadius: 2,
                  width: 36,
                  height: 36,
                  '&:hover': {
                    background: 'success.main',
                    color: 'white',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
                  },
                  '&:disabled': {
                    borderColor: 'action.disabled',
                    color: 'action.disabled'
                  }
                }}
              >
                <Download size={20} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Export as JSON" arrow>
              <IconButton
                onClick={exportToJSON}
                disabled={!lastResult?.data || lastResult.data.length === 0}
                sx={{
                  color: 'warning.main',
                  background: 'transparent',
                  border: `1px solid`,
                  borderColor: 'warning.main',
                  borderRadius: 2,
                  width: 36,
                  height: 36,
                  '&:hover': {
                    background: 'warning.main',
                    color: 'white',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
                  },
                  '&:disabled': {
                    borderColor: 'action.disabled',
                    color: 'action.disabled'
                  }
                }}
              >
                <FileJson size={20} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Box>

      {/* Results Content */}
      <Box sx={{ flex: 1, overflow: 'hidden' }}>{renderResultsContent()}</Box>
    </Paper>
  );
}

export default ResultsPanel;
