import React, { useState, useMemo, useCallback } from 'react';
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
  Tooltip,
  CircularProgress,
  Stack,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { 
  Download, 
  FileJson, 
  BarChart3, 
  AlertCircle, 
  CheckCircle, 
  Info, 
  FileText,
  FileSpreadsheet,
  Copy,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  MoreVertical
} from 'lucide-react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
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

function EnhancedResultsPanel() {
  const { lastResult, isLoading, error } = useSQL();
  const [tabValue, setTabValue] = useState(0);
  const [exportMenuAnchor, setExportMenuAnchor] = useState(null);
  const [chartDialogOpen, setChartDialogOpen] = useState(false);
  const [statsDialogOpen, setStatsDialogOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filterModel, setFilterModel] = useState({ items: [] });
  const [sortModel, setSortModel] = useState([]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Transform data for DataGrid
  const gridData = useMemo(() => {
    if (!lastResult?.data || !Array.isArray(lastResult.data) || lastResult.data.length === 0) {
      return { rows: [], columns: [] };
    }

    // Create columns with enhanced features
    const columns = lastResult.columns.map((col, index) => ({
      field: col,
      headerName: col,
      minWidth: 120,
      flex: 1,
      sortable: true,
      filterable: true,
      resizable: true,
      renderCell: (params) => {
        const value = params.value;
        if (value === null || value === undefined) {
          return <em style={{ color: '#999' }}>NULL</em>;
        }
        if (typeof value === 'string' && value.length > 100) {
          return (
            <Tooltip title={value}>
              <span>{value.substring(0, 100)}...</span>
            </Tooltip>
          );
        }
        return value;
      }
    }));

    // Create rows with IDs
    const rows = lastResult.data.map((row, index) => ({
      id: index,
      ...row
    }));

    return { rows, columns };
  }, [lastResult]);

  // Calculate column statistics
  const columnStats = useMemo(() => {
    if (!lastResult?.data || !Array.isArray(lastResult.data) || lastResult.data.length === 0) {
      return {};
    }

    const stats = {};
    lastResult.columns.forEach(col => {
      const values = lastResult.data.map(row => row[col]).filter(val => val !== null && val !== undefined);
      const numericValues = values.filter(val => !isNaN(val) && val !== '').map(Number);
      
      stats[col] = {
        count: values.length,
        nullCount: lastResult.data.length - values.length,
        uniqueCount: new Set(values).size,
        min: numericValues.length > 0 ? Math.min(...numericValues) : null,
        max: numericValues.length > 0 ? Math.max(...numericValues) : null,
        avg: numericValues.length > 0 ? numericValues.reduce((a, b) => a + b, 0) / numericValues.length : null,
        dataType: inferDataType(values)
      };
    });

    return stats;
  }, [lastResult]);

  const inferDataType = (values) => {
    if (values.length === 0) return 'unknown';
    
    const sample = values.slice(0, 100); // Sample first 100 values
    const numericCount = sample.filter(val => !isNaN(val) && val !== '').length;
    const dateCount = sample.filter(val => !isNaN(Date.parse(val))).length;
    
    if (numericCount / sample.length > 0.8) return 'numeric';
    if (dateCount / sample.length > 0.8) return 'date';
    return 'text';
  };

  // Export functions
  const exportToCSV = useCallback(() => {
    if (!lastResult?.data || lastResult.data.length === 0) {
      alert('No data to export');
      return;
    }

    try {
      const csv = Papa.unparse({
        fields: lastResult.columns,
        data: lastResult.data.map(row => lastResult.columns.map(col => row[col] ?? ''))
      });

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
      const filename = `query_results_${new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-')}.csv`;
      saveAs(blob, filename);
    } catch (error) {
      console.error('Error exporting CSV:', error);
      alert('Error exporting CSV file');
    }
  }, [lastResult]);

  const exportToJSON = useCallback(() => {
    if (!lastResult?.data || lastResult.data.length === 0) {
      alert('No data to export');
      return;
    }

    try {
      const jsonData = JSON.stringify(lastResult.data, null, 2);
      const blob = new Blob([jsonData], { type: 'application/json' });
      const filename = `query_results_${new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-')}.json`;
      saveAs(blob, filename);
    } catch (error) {
      console.error('Error exporting JSON:', error);
      alert('Error exporting JSON file');
    }
  }, [lastResult]);

  const exportToExcel = useCallback(() => {
    if (!lastResult?.data || lastResult.data.length === 0) {
      alert('No data to export');
      return;
    }

    try {
      const worksheet = XLSX.utils.json_to_sheet(lastResult.data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Query Results');
      
      // Add some styling
      const range = XLSX.utils.decode_range(worksheet['!ref']);
      for (let R = range.s.r; R <= range.e.r; ++R) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const cell_address = { c: C, r: R };
          const cell_ref = XLSX.utils.encode_cell(cell_address);
          if (!worksheet[cell_ref]) continue;
          
          // Style header row
          if (R === 0) {
            worksheet[cell_ref].s = {
              font: { bold: true },
              fill: { fgColor: { rgb: "CCCCCC" } }
            };
          }
        }
      }

      const filename = `query_results_${new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-')}.xlsx`;
      XLSX.writeFile(workbook, filename);
    } catch (error) {
      console.error('Error exporting Excel:', error);
      alert('Error exporting Excel file');
    }
  }, [lastResult]);

  const copyToClipboard = useCallback(async (format = 'csv') => {
    if (!lastResult?.data || lastResult.data.length === 0) {
      alert('No data to copy');
      return;
    }

    try {
      let textToCopy = '';
      
      if (format === 'csv') {
        textToCopy = Papa.unparse({
          fields: lastResult.columns,
          data: lastResult.data.map(row => lastResult.columns.map(col => row[col] ?? ''))
        });
      } else if (format === 'json') {
        textToCopy = JSON.stringify(lastResult.data, null, 2);
      } else if (format === 'tsv') {
        const headers = lastResult.columns.join('\t');
        const rows = lastResult.data.map(row => 
          lastResult.columns.map(col => row[col] ?? '').join('\t')
        );
        textToCopy = [headers, ...rows].join('\n');
      }

      await navigator.clipboard.writeText(textToCopy);
      // You could add a snackbar notification here
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      alert('Error copying to clipboard');
    }
  }, [lastResult]);

  // Filter data based on search text
  const filteredRows = useMemo(() => {
    if (!searchText.trim() || !gridData.rows.length) {
      return gridData.rows;
    }

    const searchLower = searchText.toLowerCase();
    return gridData.rows.filter(row => 
      Object.values(row).some(value => 
        value && value.toString().toLowerCase().includes(searchLower)
      )
    );
  }, [gridData.rows, searchText]);

  const renderResultsContent = () => {
    if (isLoading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <CircularProgress />
          <Typography variant="body1" sx={{ ml: 2 }}>
            Executing query...
          </Typography>
        </Box>
      );
    }

    if (error) {
      return (
        <Alert severity="error" sx={{ m: 2 }}>
          <Typography variant="h6">Query Error</Typography>
          <Typography variant="body2">{error}</Typography>
        </Alert>
      );
    }

    if (!lastResult) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <Typography variant="body1" color="text.secondary">
            Execute a query to see results here
          </Typography>
        </Box>
      );
    }

    if (lastResult.success === false) {
      return (
        <Alert severity="error" sx={{ m: 2 }}>
          <Typography variant="h6">Query Failed</Typography>
          <Typography variant="body2">{lastResult.error}</Typography>
        </Alert>
      );
    }

    if (!lastResult.data || lastResult.data.length === 0) {
      return (
        <Box sx={{ p: 2 }}>
          <Alert severity="info">
            <Typography variant="h6">Query Executed Successfully</Typography>
            <Typography variant="body2">
              {lastResult.message || 'No rows returned'}
            </Typography>
            {lastResult.rowsAffected !== undefined && (
              <Typography variant="body2">
                Rows affected: {lastResult.rowsAffected}
              </Typography>
            )}
          </Alert>
        </Box>
      );
    }

    return (
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Search and Filter Bar */}
        <Box sx={{ p: 1, borderBottom: 1, borderColor: 'divider', flexShrink: 0 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              size="small"
              placeholder="Search in results..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              InputProps={{
                startAdornment: <Search size={16} style={{ marginRight: 8 }} />
              }}
              sx={{ minWidth: 200 }}
            />
            
            <Typography variant="body2" color="text.secondary">
              {filteredRows.length} of {gridData.rows.length} rows
            </Typography>
            
            <Box sx={{ flex: 1 }} />
            
            <Button
              size="small"
              startIcon={<BarChart3 size={16} />}
              onClick={() => setStatsDialogOpen(true)}
            >
              Statistics
            </Button>
          </Stack>
        </Box>

        {/* Data Grid */}
        <Box sx={{ flex: 1 }}>
          <DataGrid
            rows={filteredRows}
            columns={gridData.columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 25 }
              }
            }}
            pageSizeOptions={[10, 25, 50, 100]}
            checkboxSelection
            disableRowSelectionOnClick
            filterModel={filterModel}
            onFilterModelChange={setFilterModel}
            sortModel={sortModel}
            onSortModelChange={setSortModel}
            slots={{
              toolbar: GridToolbar,
            }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            sx={{
              '& .MuiDataGrid-cell': {
                borderRight: 1,
                borderColor: 'divider',
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: 'grey.50',
                borderBottom: 2,
                borderColor: 'divider',
              },
            }}
          />
        </Box>
      </Box>
    );
  };

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: 2,
        border: theme => `1px solid ${theme.palette.divider}`
      }}
    >
      {/* Header */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', flexShrink: 0 }}>
        <Toolbar sx={{ minHeight: '48px !important', px: 2 }}>
          <Typography variant="h6" component="div" sx={{ flex: 1 }}>
            Query Results
          </Typography>
          
          {lastResult?.data && lastResult.data.length > 0 && (
            <Stack direction="row" spacing={1}>
              <Button
                size="small"
                startIcon={<Download size={16} />}
                onClick={(e) => setExportMenuAnchor(e.currentTarget)}
              >
                Export
              </Button>
              
              <Button
                size="small"
                startIcon={<Copy size={16} />}
                onClick={() => copyToClipboard('csv')}
              >
                Copy
              </Button>
            </Stack>
          )}
        </Toolbar>
      </Box>

      {/* Results Content */}
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        {renderResultsContent()}
      </Box>

      {/* Export Menu */}
      <Menu
        anchorEl={exportMenuAnchor}
        open={Boolean(exportMenuAnchor)}
        onClose={() => setExportMenuAnchor(null)}
      >
        <MenuItem onClick={() => { exportToCSV(); setExportMenuAnchor(null); }}>
          <FileText size={16} style={{ marginRight: 8 }} />
          Export as CSV
        </MenuItem>
        <MenuItem onClick={() => { exportToJSON(); setExportMenuAnchor(null); }}>
          <FileJson size={16} style={{ marginRight: 8 }} />
          Export as JSON
        </MenuItem>
        <MenuItem onClick={() => { exportToExcel(); setExportMenuAnchor(null); }}>
          <FileSpreadsheet size={16} style={{ marginRight: 8 }} />
          Export as Excel
        </MenuItem>
        <MenuItem onClick={() => { copyToClipboard('tsv'); setExportMenuAnchor(null); }}>
          <Copy size={16} style={{ marginRight: 8 }} />
          Copy as TSV
        </MenuItem>
      </Menu>

      {/* Statistics Dialog */}
      <Dialog 
        open={statsDialogOpen} 
        onClose={() => setStatsDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Column Statistics</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {Object.entries(columnStats).map(([column, stats]) => (
              <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={column}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {column}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Type: {stats.dataType}
                    </Typography>
                    <Typography variant="body2">
                      Count: {stats.count}
                    </Typography>
                    <Typography variant="body2">
                      Null: {stats.nullCount}
                    </Typography>
                    <Typography variant="body2">
                      Unique: {stats.uniqueCount}
                    </Typography>
                    {stats.min !== null && (
                      <>
                        <Typography variant="body2">
                          Min: {stats.min}
                        </Typography>
                        <Typography variant="body2">
                          Max: {stats.max}
                        </Typography>
                        <Typography variant="body2">
                          Avg: {stats.avg?.toFixed(2)}
                        </Typography>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatsDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default EnhancedResultsPanel;
