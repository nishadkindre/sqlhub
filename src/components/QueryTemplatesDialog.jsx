import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  Button,
  IconButton,
  Typography,
  Tabs,
  Tab,
  Box,
  Paper,
  useTheme,
  useMediaQuery,
  Stack,
  Card,
  CardContent,
  Grid,
  InputBase,
  Backdrop,
  Tooltip,
  Slide
} from '@mui/material';
import {
  Code,
  Copy,
  Play,
  X,
  Search,
  Database,
  Zap,
  Edit3,
  BarChart3
} from 'lucide-react';
import { queryTemplates } from '../utils/queryTemplates';

const SlideUpTransition = React.forwardRef(function Transition(props, ref) {
  return (
    <Slide 
      direction="up" 
      ref={ref} 
      timeout={400}
      easing={{
        enter: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        exit: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)'
      }}
      {...props} 
    />
  );
});

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
        return <Database size={18} />;
      case 'crud':
        return <Edit3 size={18} />;
      case 'advanced':
        return <Zap size={18} />;
      case 'analytics':
        return <BarChart3 size={18} />;
      default:
        return <Code size={18} />;
    }
  };

  const getCategoryColor = (key) => {
    switch (key) {
      case 'basic':
        return theme.palette.primary.main;
      case 'crud':
        return theme.palette.success.main;
      case 'advanced':
        return theme.palette.warning.main;
      case 'analytics':
        return theme.palette.info.main;
      default:
        return theme.palette.secondary.main;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      TransitionComponent={SlideUpTransition}
      transitionDuration={400}
      PaperProps={{
        sx: {
          backgroundColor: theme.palette.background.default,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'hidden'
        }
      }}
      BackdropComponent={Backdrop}
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          transition: 'opacity 400ms cubic-bezier(0.4, 0, 0.2, 1)'
        }
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: theme.palette.background.paper
        }}
      >
        {/* Title and Close Button */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                backgroundColor: theme.palette.primary.main,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}
            >
              <Code size={20} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
                SQL Query Templates
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Choose from ready-to-use SQL queries for common operations
              </Typography>
            </Box>
          </Box>

          <IconButton
            onClick={onClose}
            sx={{
              '&:hover': {
                backgroundColor: theme.palette.error.light,
                color: theme.palette.error.main
              }
            }}
          >
            <X size={24} />
          </IconButton>
        </Box>

        {/* Search Bar */}
        <Paper
          sx={{
            p: 1,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: theme.palette.background.default,
            border: 1,
            borderColor: 'divider'
          }}
        >
          <Box sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
            <Search size={20} color={theme.palette.text.secondary} />
          </Box>
          <InputBase
            placeholder="Search templates by name, description, or SQL content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              ml: 1,
              flex: 1,
              fontSize: '0.95rem'
            }}
          />
        </Paper>
      </Box>

      {/* Navigation Tabs */}
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: theme.palette.background.paper
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant={isMobile ? 'scrollable' : 'standard'}
          scrollButtons="auto"
          sx={{
            px: 3,
            '& .MuiTab-root': {
              textTransform: 'none',
              fontSize: '0.95rem',
              fontWeight: 500,
              minHeight: 48,
              '&.Mui-selected': {
                fontWeight: 600
              }
            }
          }}
        >
          {filteredCategories.map((category, index) => (
            <Tab
              key={category.key}
              icon={getCategoryIcon(category.key)}
              label={category.title}
              iconPosition="start"
              sx={{
                color: getCategoryColor(category.key),
                '&.Mui-selected': {
                  color: getCategoryColor(category.key)
                }
              }}
            />
          ))}
        </Tabs>
      </Box>

      {/* Content */}
      <DialogContent
        sx={{ 
          p: 0, 
          flex: 1, 
          overflow: 'hidden', 
          display: 'flex', 
          flexDirection: 'column',
          backgroundColor: theme.palette.background.default
        }}
      >
        {filteredCategories.map((category, categoryIndex) => (
          <TabPanel key={category.key} value={tabValue} index={categoryIndex}>
            <Box
              sx={{
                p: 3,
                height: '100%',
                overflow: 'auto'
              }}
            >
              {category.queries.length === 0 ? (
                <Box
                  sx={{
                    textAlign: 'center',
                    py: 8,
                    color: 'text.secondary'
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    No templates found
                  </Typography>
                  <Typography variant="body2">
                    Try adjusting your search terms
                  </Typography>
                </Box>
              ) : (
                <Grid container spacing={3}>
                  {category.queries.map((queryItem, queryIndex) => (
                    <Grid item xs={12} md={6} lg={4} key={queryIndex}>
                      <Card
                        sx={{
                          height: '100%',
                          border: 1,
                          borderColor: 'divider',
                          transition: 'all 0.2s ease-in-out',
                          '&:hover': {
                            borderColor: getCategoryColor(category.key),
                            boxShadow: theme.shadows[4],
                            transform: 'translateY(-2px)'
                          }
                        }}
                      >
                        <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                          {/* Header */}
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                            <Box
                              sx={{
                                width: 32,
                                height: 32,
                                borderRadius: 1,
                                backgroundColor: `${getCategoryColor(category.key)}15`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mr: 2,
                                flexShrink: 0,
                                color: getCategoryColor(category.key)
                              }}
                            >
                              {getCategoryIcon(category.key)}
                            </Box>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, fontSize: '1.1rem' }}>
                                {queryItem.name}
                              </Typography>
                              {/* <Typography 
                                variant="caption" 
                                sx={{ 
                                  color: getCategoryColor(category.key),
                                  fontWeight: 500,
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.5px'
                                }}
                              >
                                {category.title}
                              </Typography> */}
                            </Box>
                          </Box>

                          {/* Description */}
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'text.secondary',
                              mb: 2,
                              lineHeight: 1.5
                            }}
                          >
                            {queryItem.description}
                          </Typography>

                          {/* Query Preview */}
                          <Paper
                            sx={{
                              p: 2,
                              backgroundColor: theme.palette.mode === 'dark' ? 'black' : 'grey.50',
                              border: 1,
                              borderColor: 'divider',
                              borderRadius: 1,
                              fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                              fontSize: '0.8rem',
                              mb: 3,
                              flex: 1,
                              display: 'flex',
                              alignItems: 'flex-start'
                            }}
                          >
                            <Typography
                              sx={{
                                color: theme.palette.mode === 'dark' ? 'primary.light' : 'primary.dark',
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word',
                                lineHeight: 1.4,
                                overflow: 'hidden',
                                display: '-webkit-box',
                                WebkitLineClamp: 4,
                                WebkitBoxOrient: 'vertical'
                              }}
                            >
                              {queryItem.query}
                            </Typography>
                          </Paper>

                          {/* Actions */}
                          <Stack direction="row" spacing={2}>
                            <Tooltip title="Copy to clipboard">
                              <Button
                                variant="outlined"
                                size="small"
                                startIcon={<Copy size={16} />}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopyQuery(queryItem.query);
                                }}
                                sx={{
                                  textTransform: 'none',
                                  borderColor: 'divider',
                                  color: 'text.secondary',
                                  '&:hover': {
                                    borderColor: getCategoryColor(category.key),
                                    color: getCategoryColor(category.key)
                                  }
                                }}
                              >
                                Copy
                              </Button>
                            </Tooltip>

                            <Button
                              variant="contained"
                              size="small"
                              startIcon={<Play size={16} />}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleUseQuery(queryItem.query);
                              }}
                              sx={{
                                textTransform: 'none',
                                backgroundColor: getCategoryColor(category.key),
                                '&:hover': {
                                  backgroundColor: getCategoryColor(category.key),
                                  filter: 'brightness(0.9)'
                                }
                              }}
                            >
                              Use Query
                            </Button>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          </TabPanel>
        ))}
      </DialogContent>
    </Dialog>
  );
}

export default QueryTemplatesDialog;
