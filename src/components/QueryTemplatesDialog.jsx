import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Tabs,
  Tab,
  Box,
  Chip,
  Tooltip,
  Paper,
  useTheme,
  useMediaQuery,
  Stack,
  Divider,
  Card,
  CardContent,
  Grid,
  InputBase,
  Fade,
  Backdrop
} from '@mui/material';
import {
  Code,
  Copy,
  Play,
  X,
  Search,
  Database,
  Zap,
  FileCode,
  Settings,
  Sparkles,
  ChevronRight,
  Edit3,
  BarChart3
} from 'lucide-react';
import { queryTemplates } from '../utils/queryTemplates';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`template-tabpanel-${index}`}
      aria-labelledby={`template-tab-${index}`}
      style={{ height: '100%', display: value === index ? 'block' : 'none' }}
      {...other}
    >
      {value === index && <Box sx={{ height: '100%' }}>{children}</Box>}
    </div>
  );
}

function QueryTemplatesDialog({ open, onClose, onSelectQuery }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuery, setSelectedQuery] = useState(null);

  // Handle escape key
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape' && open) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [open, onClose]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCopyQuery = async (query) => {
    try {
      await navigator.clipboard.writeText(query);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy query:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = query;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
      } catch (fallbackErr) {
        console.error('Fallback copy also failed:', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  const handleUseQuery = (query) => {
    onSelectQuery(query);
    onClose();
  };

  const categories = Object.entries(queryTemplates);

  // Filter queries based on search term
  const filteredCategories = categories
    .map(([key, category]) => ({
      key,
      ...category,
      queries: category.queries.filter(
        (query) =>
          query.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          query.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          query.query.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))
    .filter((category) => category.queries.length > 0);

  const getCategoryIcon = (key) => {
    switch (key) {
      case 'basic':
        return <Database size={20} color="white" />;
      case 'crud':
        return <Edit3 size={20} color="white" />;
      case 'advanced':
        return <Zap size={20} color="white" />;
      case 'analytics':
        return <BarChart3 size={20} color="white" />;
      default:
        return <Code size={20} color="white" />;
    }
  };

  const getCategoryIconForTab = (key) => {
    switch (key) {
      case 'basic':
        return <Database size={20} />;
      case 'crud':
        return <Edit3 size={20} />;
      case 'advanced':
        return <Zap size={20} />;
      case 'analytics':
        return <BarChart3 size={20} />;
      default:
        return <Code size={20} />;
    }
  };

  const getCategoryGradient = (key) => {
    switch (key) {
      case 'basic':
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      case 'crud':
        return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
      case 'advanced':
        return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
      case 'analytics':
        return 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
      default:
        return 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)';
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      PaperProps={{
        sx: {
          background:
            theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, rgba(15, 15, 35, 0.98) 0%, rgba(26, 26, 46, 0.98) 50%, rgba(22, 33, 62, 0.98) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.98) 100%)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'hidden'
        }
      }}
      BackdropComponent={Backdrop}
      BackdropProps={{
        sx: {
          background: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(12px)'
        }
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 4,
          background:
            theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)'
              : 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)',
          borderBottom: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)'
              }}
            >
              <Code size={28} color="white" />
            </Box>
            <Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  background:
                    theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)'
                      : 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                SQL Templates
              </Typography>
              <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                Ready-to-use query examples for every situation
              </Typography>
            </Box>
          </Box>

          <IconButton
            onClick={onClose}
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              background:
                theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
                  : 'linear-gradient(135deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.02) 100%)',
              border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
              color: 'text.primary',
              '&:hover': {
                background: 'error.light',
                color: 'error.main'
              }
            }}
          >
            <X size={24} />
          </IconButton>
        </Box>

        {/* Search Bar */}
        <Box
          sx={{
            position: 'relative',
            borderRadius: 3,
            background:
              theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.8)',
            border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
            backdropFilter: 'blur(20px)'
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'text.secondary'
            }}
          >
            <Search size={20} />
          </Box>
          <InputBase
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: '100%',
              pl: 6,
              pr: 2,
              py: 2,
              fontSize: '1rem',
              fontWeight: 500
            }}
          />
        </Box>
      </Box>

      {/* Navigation Tabs */}
      <Box
        sx={{
          px: 4,
          background:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.5)',
          borderBottom: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant={isMobile ? 'scrollable' : 'fullWidth'}
          scrollButtons="auto"
          sx={{
            minHeight: 64,
            '& .MuiTab-root': {
              minHeight: 64,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              color: 'text.secondary',
              transition: 'all 0.2s ease-in-out',
              '&.Mui-selected': {
                color: 'primary.main',
                background:
                  theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)'
                    : 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)'
              },
              '&:hover': {
                background:
                  theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'
              }
            },
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: '3px 3px 0 0',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }
          }}
        >
          {filteredCategories.map((category, index) => (
            <Tab
              key={category.key}
              icon={
                <Box sx={{ display: 'flex', alignItems: 'center', color: 'inherit' }}>
                  {getCategoryIconForTab(category.key)}
                </Box>
              }
              label={category.title}
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Box>

      {/* Content */}
      <DialogContent
        sx={{ p: 0, flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
      >
        {filteredCategories.map((category, categoryIndex) => (
          <TabPanel key={category.key} value={tabValue} index={categoryIndex}>
            <Box
              sx={{
                p: 4,
                height: '100%',
                overflow: 'auto',
                maxHeight: 'calc(100vh - 300px)' // Account for header and tabs
              }}
            >
              <Grid container spacing={3}>
                {category.queries.map((queryItem, queryIndex) => (
                  <Grid item xs={12} md={6} lg={4} key={queryIndex}>
                    <Card
                      sx={{
                        height: '100%',
                        background:
                          theme.palette.mode === 'dark'
                            ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)'
                            : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
                        backdropFilter: 'blur(20px)',
                        border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.6)'}`,
                        borderRadius: 4,
                        transition: 'all 0.3s ease-in-out',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow:
                            theme.palette.mode === 'dark'
                              ? '0 20px 40px rgba(0,0,0,0.3)'
                              : '0 20px 40px rgba(0,0,0,0.1)',
                          border: `1px solid ${theme.palette.primary.main}40`
                        }
                      }}
                      onClick={() =>
                        setSelectedQuery(selectedQuery === queryIndex ? null : queryIndex)
                      }
                    >
                      <CardContent sx={{ p: 3 }}>
                        {/* Header */}
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                          <Box
                            sx={{
                              width: 48,
                              height: 48,
                              borderRadius: 2,
                              background: getCategoryGradient(category.key),
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mr: 2,
                              flexShrink: 0
                            }}
                          >
                            {getCategoryIcon(category.key)}
                          </Box>
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                              {queryItem.name}
                            </Typography>
                            <Chip
                              label={category.title}
                              size="small"
                              sx={{
                                background: getCategoryGradient(category.key),
                                color: 'white',
                                fontWeight: 600
                              }}
                            />
                          </Box>
                        </Box>

                        {/* Description */}
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'text.secondary',
                            mb: 3,
                            lineHeight: 1.6
                          }}
                        >
                          {queryItem.description}
                        </Typography>

                        {/* Query Preview */}
                        <Paper
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            background:
                              theme.palette.mode === 'dark'
                                ? 'rgba(0,0,0,0.3)'
                                : 'rgba(0,0,0,0.03)',
                            border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                            fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                            fontSize: '0.75rem',
                            overflow: 'hidden',
                            maxHeight: 100,
                            mb: 3,
                            position: 'relative',
                            '&::after': {
                              content: '""',
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              right: 0,
                              height: 20,
                              background:
                                theme.palette.mode === 'dark'
                                  ? 'linear-gradient(transparent, rgba(0,0,0,0.3))'
                                  : 'linear-gradient(transparent, rgba(0,0,0,0.03))',
                              pointerEvents: 'none'
                            }
                          }}
                        >
                          <Typography
                            sx={{
                              color: theme.palette.mode === 'dark' ? '#86efac' : '#16a34a',
                              whiteSpace: 'pre-wrap',
                              wordBreak: 'break-all'
                            }}
                          >
                            {queryItem.query.length > 120
                              ? queryItem.query.substring(0, 120) + '...'
                              : queryItem.query}
                          </Typography>
                        </Paper>

                        {/* Actions */}
                        <Stack direction="row" spacing={2}>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<Copy size={16} />}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyQuery(queryItem.query);
                            }}
                            sx={{
                              borderRadius: 2,
                              textTransform: 'none',
                              fontWeight: 600
                            }}
                          >
                            Copy
                          </Button>

                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<Play size={16} />}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUseQuery(queryItem.query);
                            }}
                            sx={{
                              borderRadius: 2,
                              textTransform: 'none',
                              fontWeight: 600,
                              background: getCategoryGradient(category.key),
                              '&:hover': {
                                background: getCategoryGradient(category.key),
                                filter: 'brightness(1.1)'
                              }
                            }}
                          >
                            Use
                          </Button>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {category.queries.length === 0 && (
                <Box
                  sx={{
                    textAlign: 'center',
                    py: 8,
                    color: 'text.secondary'
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    No templates found
                  </Typography>
                  <Typography variant="body2">Try adjusting your search terms</Typography>
                </Box>
              )}
            </Box>
          </TabPanel>
        ))}
      </DialogContent>
    </Dialog>
  );
}

export default QueryTemplatesDialog;
