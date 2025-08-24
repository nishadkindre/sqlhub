import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Divider,
  Chip,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Paper,
  Grid,
  Card,
  CardContent,
  Badge,
  Stack,
  alpha
} from '@mui/material';
import {
  Storage as DatabaseIcon,
  TableChart as TableIcon,
  ExpandLess,
  ExpandMore,
  Add as AddIcon,
  Delete as DeleteIcon,
  Info as InfoIcon,
  Refresh as RefreshIcon,
  Key as KeyIcon,
  NotListedLocation as NullIcon,
  AutoFixHigh as AutoIcon,
  TableRows as RowsIcon,
  ViewColumn as ColumnIcon,
  Circle as CircleIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useSQL } from '../contexts/SQLContext';

const DRAWER_WIDTH = 300;

function DatabaseExplorer({ open, onClose, temporary = false }) {
  const { databases, currentDatabase, tables, executeQuery, getTableSchema, refreshState } =
    useSQL();

  const [expandedDbs, setExpandedDbs] = useState(new Set([currentDatabase]));
  const [selectedTable, setSelectedTable] = useState(null);
  const [createDbDialog, setCreateDbDialog] = useState(false);
  const [newDbName, setNewDbName] = useState('');
  const [tableInfoDialog, setTableInfoDialog] = useState(false);
  const [tableInfo, setTableInfo] = useState(null);

  const handleExpandDatabase = (dbName) => {
    const newExpanded = new Set(expandedDbs);
    if (newExpanded.has(dbName)) {
      newExpanded.delete(dbName);
    } else {
      newExpanded.add(dbName);
    }
    setExpandedDbs(newExpanded);
  };

  const handleDatabaseSelect = async (dbName) => {
    if (dbName !== currentDatabase) {
      try {
        await executeQuery(`USE ${dbName}`);
        setExpandedDbs(new Set([dbName]));
      } catch (error) {
        console.error('Failed to select database:', error);
        // Error is handled by the SQL context and displayed to user
      }
    }
  };

  const handleTableSelect = (tableName) => {
    setSelectedTable(tableName);
  };

  const handleCreateDatabase = async () => {
    if (newDbName.trim()) {
      try {
        // Validate database name (basic validation)
        const dbName = newDbName.trim();
        if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(dbName)) {
          alert(
            'Database name must start with a letter and contain only letters, numbers, and underscores.'
          );
          return;
        }

        await executeQuery(`CREATE DATABASE ${dbName}`);
        setCreateDbDialog(false);
        setNewDbName('');
      } catch (error) {
        console.error('Failed to create database:', error);
        // Error is handled by the SQL context
      }
    }
  };

  const handleDeleteDatabase = async (dbName) => {
    if (
      window.confirm(
        `Are you sure you want to delete database '${dbName}'? This action cannot be undone.`
      )
    ) {
      try {
        await executeQuery(`DROP DATABASE ${dbName}`);
      } catch (error) {
        console.error('Failed to delete database:', error);
        alert(`Failed to delete database '${dbName}'. ${error.message || 'Unknown error'}`);
      }
    }
  };

  const handleShowTableInfo = (tableName) => {
    const schema = getTableSchema(tableName);
    setTableInfo(schema);
    setTableInfoDialog(true);
  };

  const drawerContent = (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        animation: open ? 'slideInLeft 0.4s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
        '@keyframes slideInLeft': {
          '0%': {
            transform: 'translateX(-20px)',
            opacity: 0
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: 1
          }
        }
      }}
    >
      {/* Enhanced Header */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          border: 0,
          borderRadius: 0,
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? alpha(theme.palette.primary.main, 0.1)
              : alpha(theme.palette.primary.main, 0.05),
          borderBottom: (theme) =>
            theme.palette.mode === 'dark'
              ? `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
              : `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontWeight: 600,
              color: 'primary.main'
            }}
          >
            {/* <DatabaseIcon sx={{ mr: 1 }} /> */}
            Database Explorer
          </Typography>
          <Stack direction="row" spacing={0.5}>
            <Tooltip title="Refresh">
              <IconButton
                size="small"
                onClick={refreshState}
                sx={{
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                  '&:hover': {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2)
                  }
                }}
              >
                <RefreshIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Create Database">
              <IconButton
                size="small"
                onClick={() => setCreateDbDialog(true)}
                sx={{
                  bgcolor: (theme) => alpha(theme.palette.success.main, 0.1),
                  '&:hover': {
                    bgcolor: (theme) => alpha(theme.palette.success.main, 0.2)
                  }
                }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            {onClose && (
              <Tooltip title="Close Database Explorer">
                <IconButton
                  size="small"
                  onClick={onClose}
                  sx={{
                    bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
                    '&:hover': {
                      bgcolor: (theme) => alpha(theme.palette.error.main, 0.2)
                    }
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        </Box>

        {/* Database Status Card */}
        {/* {currentDatabase ? (
          <Card 
            elevation={0}
            sx={{ 
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
              border: 1,
              borderColor: 'primary.main'
            }}
          >
            <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <DatabaseIcon color="primary" sx={{ mr: 1, fontSize: 18 }} />
                  <Box>
                    <Typography variant="body2" fontWeight={600} color="primary.main">
                      {currentDatabase}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Active Database
                    </Typography>
                  </Box>
                </Box>
                <Badge badgeContent={tables.length} color="primary" max={99}>
                  <TableIcon color="primary" fontSize="small" />
                </Badge>
              </Box>
            </CardContent>
          </Card>
        ) : (
          <Card elevation={0} sx={{ bgcolor: 'action.hover' }}>
            <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Typography variant="body2" color="text.secondary" align="center">
                No database selected
              </Typography>
            </CardContent>
          </Card>
        )} */}
      </Paper>

      {/* Enhanced Database List */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 1 }}>
        {databases.length > 0 ? (
          <List dense sx={{ '& .MuiListItem-root': { mb: 2 } }}>
            {databases.map((dbName) => (
              <React.Fragment key={dbName}>
                <ListItem disablePadding>
                  <Paper
                    elevation={0}
                    sx={{
                      width: '100%',
                      border: 1,
                      borderColor: currentDatabase === dbName ? 'primary.main' : 'divider',
                      bgcolor:
                        currentDatabase === dbName
                          ? (theme) => alpha(theme.palette.primary.main, 0.05)
                          : 'background.paper',
                      borderRadius: 1,
                      overflow: 'hidden'
                    }}
                  >
                    <ListItemButton
                      onClick={() => handleExpandDatabase(dbName)}
                      sx={{
                        '&:hover': {
                          bgcolor:
                            currentDatabase === dbName
                              ? (theme) => alpha(theme.palette.primary.main, 0.1)
                              : 'action.hover'
                        }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <DatabaseIcon
                          color={currentDatabase === dbName ? 'primary' : 'inherit'}
                          sx={{ fontSize: 20 }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            variant="body2"
                            fontWeight={currentDatabase === dbName ? 600 : 400}
                            color={currentDatabase === dbName ? 'primary.main' : 'text.primary'}
                          >
                            {dbName}
                          </Typography>
                        }
                        secondary={
                          currentDatabase === dbName && (
                            <Typography variant="caption" color="primary.main">
                              {tables.length} tables
                            </Typography>
                          )
                        }
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Tooltip title="Delete Database">
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteDatabase(dbName);
                            }}
                            sx={{
                              color: 'error.main',
                              '&:hover': {
                                bgcolor: (theme) => alpha(theme.palette.error.main, 0.1)
                              }
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        {expandedDbs.has(dbName) ? <ExpandLess /> : <ExpandMore />}
                      </Box>
                    </ListItemButton>
                  </Paper>
                </ListItem>

                <Collapse in={expandedDbs.has(dbName)} timeout="auto" unmountOnExit>
                  <Box sx={{ ml: 2, mt: 1, mb: 1 }}>
                    {currentDatabase !== dbName ? (
                      <Paper
                        elevation={0}
                        sx={{
                          border: 1,
                          borderColor: 'divider',
                          borderRadius: 1,
                          overflow: 'hidden'
                        }}
                      >
                        <ListItemButton onClick={() => handleDatabaseSelect(dbName)} sx={{ py: 1 }}>
                          <ListItemText
                            primary={
                              <Typography variant="body2" color="success.main" fontWeight={500}>
                                Connect to Database
                              </Typography>
                            }
                          />
                        </ListItemButton>
                      </Paper>
                    ) : (
                      <>
                        {/* Tables Section */}
                        <Box sx={{ mb: 1 }}>
                          <Typography
                            variant="overline"
                            sx={{
                              px: 1,
                              color: 'text.secondary',
                              fontWeight: 600,
                              letterSpacing: 0.5
                            }}
                          >
                            Tables ({tables.length})
                          </Typography>
                        </Box>

                        {tables.length > 0 ? (
                          <Stack spacing={0.5}>
                            {tables.map((tableName) => (
                              <Paper
                                key={tableName}
                                elevation={0}
                                sx={{
                                  border: 1,
                                  borderColor:
                                    selectedTable === tableName ? 'secondary.main' : 'divider',
                                  borderRadius: 1,
                                  overflow: 'hidden',
                                  bgcolor:
                                    selectedTable === tableName
                                      ? (theme) => alpha(theme.palette.secondary.main, 0.05)
                                      : 'background.paper'
                                }}
                              >
                                <ListItemButton
                                  onClick={() => handleTableSelect(tableName)}
                                  sx={{
                                    py: 0.75,
                                    '&:hover': {
                                      bgcolor:
                                        selectedTable === tableName
                                          ? (theme) => alpha(theme.palette.secondary.main, 0.1)
                                          : 'action.hover'
                                    }
                                  }}
                                >
                                  <ListItemIcon sx={{ minWidth: 32 }}>
                                    <TableIcon
                                      fontSize="small"
                                      color={selectedTable === tableName ? 'secondary' : 'inherit'}
                                    />
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={
                                      <Typography
                                        variant="body2"
                                        fontWeight={selectedTable === tableName ? 500 : 400}
                                        color={
                                          selectedTable === tableName
                                            ? 'secondary.main'
                                            : 'text.primary'
                                        }
                                      >
                                        {tableName}
                                      </Typography>
                                    }
                                  />
                                  <Tooltip title="View Table Schema">
                                    <IconButton
                                      size="small"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleShowTableInfo(tableName);
                                      }}
                                      sx={{
                                        color: 'info.main',
                                        '&:hover': {
                                          bgcolor: (theme) => alpha(theme.palette.info.main, 0.1)
                                        }
                                      }}
                                    >
                                      <InfoIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                </ListItemButton>
                              </Paper>
                            ))}
                          </Stack>
                        ) : (
                          <Paper
                            elevation={0}
                            sx={{
                              p: 2,
                              textAlign: 'center',
                              border: 1,
                              borderColor: 'divider',
                              borderStyle: 'dashed',
                              borderRadius: 1
                            }}
                          >
                            <TableIcon color="disabled" sx={{ mb: 1 }} />
                            <Typography variant="body2" color="text.secondary">
                              No tables found
                            </Typography>
                          </Paper>
                        )}
                      </>
                    )}
                  </Box>
                </Collapse>
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Paper
            elevation={0}
            sx={{
              p: 3,
              textAlign: 'center',
              border: 1,
              borderColor: 'divider',
              borderStyle: 'dashed',
              borderRadius: 1
            }}
          >
            <DatabaseIcon color="disabled" sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="body2" color="text.secondary" gutterBottom>
              No databases available
            </Typography>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={() => setCreateDbDialog(true)}
              sx={{ mt: 1 }}
            >
              Create Database
            </Button>
          </Paper>
        )}
      </Box>

      {/* Enhanced Create Database Dialog */}
      <Dialog
        open={createDbDialog}
        onClose={() => setCreateDbDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AddIcon color="primary" />
            <Typography variant="h6" component="span" fontWeight={600}>
              Create New Database
            </Typography>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Database Name"
            fullWidth
            variant="outlined"
            value={newDbName}
            onChange={(e) => setNewDbName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleCreateDatabase();
              }
            }}
            helperText="Must start with a letter and contain only letters, numbers, and underscores"
            sx={{ mt: 1 }}
          />
        </DialogContent>

        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setCreateDbDialog(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleCreateDatabase} variant="contained" disabled={!newDbName.trim()}>
            Create Database
          </Button>
        </DialogActions>
      </Dialog>

      {/* Enhanced Table Info Dialog */}
      <Dialog
        open={tableInfoDialog}
        onClose={() => setTableInfoDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TableIcon color="primary" />
              <Typography variant="h6" component="span" fontWeight={600}>
                {tableInfo?.name}
              </Typography>
              <Chip label="Table Schema" size="small" color="primary" variant="outlined" />
            </Box>
            <IconButton
              onClick={() => setTableInfoDialog(false)}
              size="small"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'text.primary',
                  bgcolor: 'action.hover'
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          {tableInfo && (
            <Grid container spacing={3}>
              {/* Table Summary Cards - Compact */}
              <Grid size={12} sx={{ mt: 2 }}>
                <Grid container spacing={1.5}>
                  <Grid size={4}>
                    <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
                      <CardContent
                        sx={{ textAlign: 'center', py: 1.5, '&:last-child': { pb: 1.5 } }}
                      >
                        <ColumnIcon color="primary" sx={{ fontSize: 24, mb: 0.5 }} />
                        <Typography variant="h6" fontWeight={600} color="primary.main">
                          {tableInfo.columns.length}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Columns
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid size={4}>
                    <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
                      <CardContent
                        sx={{ textAlign: 'center', py: 1.5, '&:last-child': { pb: 1.5 } }}
                      >
                        <RowsIcon color="secondary" sx={{ fontSize: 24, mb: 0.5 }} />
                        <Typography variant="h6" fontWeight={600} color="secondary.main">
                          {tableInfo.data.length}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Rows
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid size={4}>
                    <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
                      <CardContent
                        sx={{ textAlign: 'center', py: 1.5, '&:last-child': { pb: 1.5 } }}
                      >
                        <KeyIcon color="warning" sx={{ fontSize: 24, mb: 0.5 }} />
                        <Typography variant="h6" fontWeight={600} color="warning.main">
                          {tableInfo.columns.filter((col) => col.primaryKey).length}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Primary Keys
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>

              {/* Column Details */}
              <Grid size={12}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <ColumnIcon color="primary" />
                  Column Details
                </Typography>

                <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
                  <Stack spacing={1}>
                    {tableInfo.columns.map((column, index) => (
                      <Paper
                        key={index}
                        elevation={0}
                        sx={{
                          p: 2,
                          border: 1,
                          borderColor: 'divider',
                          borderRadius: 1,
                          '&:hover': {
                            bgcolor: 'action.hover'
                          }
                        }}
                      >
                        <Grid container alignItems="center" spacing={2}>
                          <Grid size={{ xs: 12, sm: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <CircleIcon
                                sx={{
                                  fontSize: 8,
                                  color: column.primaryKey ? 'warning.main' : 'text.disabled'
                                }}
                              />
                              <Typography variant="body1" fontWeight={600}>
                                {column.name}
                              </Typography>
                            </Box>
                          </Grid>

                          <Grid size={{ xs: 12, sm: 2 }}>
                            <Chip
                              label={column.type}
                              size="small"
                              variant="outlined"
                              color="info"
                              sx={{ fontFamily: 'monospace' }}
                            />
                          </Grid>

                          <Grid size={{ xs: 12, sm: 7 }}>
                            <Stack direction="row" spacing={0.5} flexWrap="wrap">
                              {column.primaryKey && (
                                <Chip
                                  label="PRIMARY KEY"
                                  size="small"
                                  color="warning"
                                  icon={<KeyIcon />}
                                  sx={{ fontSize: '0.75rem' }}
                                />
                              )}
                              {!column.nullable && (
                                <Chip
                                  label="NOT NULL"
                                  size="small"
                                  color="error"
                                  variant="outlined"
                                  sx={{ fontSize: '0.75rem' }}
                                />
                              )}
                              {column.nullable && (
                                <Chip
                                  label="NULLABLE"
                                  size="small"
                                  color="default"
                                  variant="outlined"
                                  icon={<NullIcon />}
                                  sx={{ fontSize: '0.75rem' }}
                                />
                              )}
                              {column.autoIncrement && (
                                <Chip
                                  label="AUTO INCREMENT"
                                  size="small"
                                  color="success"
                                  variant="outlined"
                                  icon={<AutoIcon />}
                                  sx={{ fontSize: '0.75rem' }}
                                />
                              )}
                              {column.defaultValue && (
                                <Chip
                                  label={`Default: ${column.defaultValue}`}
                                  size="small"
                                  variant="outlined"
                                  sx={{ fontSize: '0.75rem' }}
                                />
                              )}
                            </Stack>
                          </Grid>
                        </Grid>
                      </Paper>
                    ))}
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );

  if (temporary) {
    return (
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        variant="temporary"
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? DRAWER_WIDTH : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          border: 0,
          borderRadius: 0,
          boxSizing: 'border-box',
          position: 'relative',
          height: '100%'
        }
      }}
    >
      {drawerContent}
    </Drawer>
  );
}

export default DatabaseExplorer;
