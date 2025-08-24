import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Chip,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Card,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  useMediaQuery,
  Stack,
  Avatar
} from '@mui/material';
import {
  ArrowLeft,
  BookOpen,
  Code,
  Database,
  Zap,
  Shield,
  GraduationCap,
  Lightbulb,
  Play,
  Save,
  History,
  Download,
  Search,
  CheckCircle2,
  ChevronDown,
  Terminal,
  FileCode,
  HelpCircle,
  Sparkles,
  Trophy,
  Target,
  Users,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`guidelines-tabpanel-${index}`}
      aria-labelledby={`guidelines-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function GuidelinesPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [tabValue, setTabValue] = useState(0);
  const [expandedAccordion, setExpandedAccordion] = useState('getting-started');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedAccordion(isExpanded ? panel : false);
  };

  const sqlCommands = [
    {
      command: 'SHOW DATABASES',
      description: 'List all available databases',
      example: 'SHOW DATABASES;',
      icon: <Database size={20} />,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      command: 'USE database_name',
      description: 'Select a database to work with',
      example: 'USE employee_db;',
      icon: <Target size={20} />,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      command: 'SHOW TABLES',
      description: 'List all tables in current database',
      example: 'SHOW TABLES;',
      icon: <FileCode size={20} />,
      gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    },
    {
      command: 'DESCRIBE table_name',
      description: 'Show table structure',
      example: 'DESCRIBE employees;',
      icon: <HelpCircle size={20} />,
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    },
    {
      command: 'SELECT',
      description: 'Query data from tables',
      example: 'SELECT * FROM employees;',
      icon: <Search size={20} />,
      gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
    },
    {
      command: 'INSERT INTO',
      description: 'Add new records',
      example: "INSERT INTO employees VALUES (1, 'John', 'john@email.com');",
      icon: <Zap size={20} />,
      gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)'
    },
    {
      command: 'UPDATE',
      description: 'Modify existing records',
      example: 'UPDATE employees SET salary = 75000 WHERE id = 1;',
      icon: <Save size={20} />,
      gradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)'
    },
    {
      command: 'DELETE FROM',
      description: 'Remove records',
      example: 'DELETE FROM employees WHERE id = 1;',
      icon: <Shield size={20} />,
      gradient: 'linear-gradient(135deg, #fdbb2d 0%, #22c1c3 100%)'
    },
    {
      command: 'CREATE TABLE',
      description: 'Create new table',
      example: 'CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(100));',
      icon: <Terminal size={20} />,
      gradient: 'linear-gradient(135deg, #ee9ca7 0%, #ffdde1 100%)'
    },
    {
      command: 'DROP TABLE',
      description: 'Delete table',
      example: 'DROP TABLE users;',
      icon: <Code size={20} />,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }
  ];

  const tips = [
    {
      icon: <Code size={24} />,
      title: 'Use Templates',
      content:
        'Click the Templates button to access pre-built query examples for common operations.',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      icon: <Play size={24} />,
      title: 'Execute Selected Text',
      content:
        'Select part of your query to execute only that portion instead of the entire editor content.',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      icon: <Save size={24} />,
      title: 'Save Queries',
      content:
        'Use Ctrl+S or the Save button to download your queries as .sql files for later use.',
      gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    },
    {
      icon: <History size={24} />,
      title: 'Query History',
      content: 'Access your previous queries in the History panel to rerun or modify them.',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    },
    {
      icon: <Download size={24} />,
      title: 'Export Results',
      content: 'Export query results to CSV or JSON format for external analysis.',
      gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
    },
    {
      icon: <Search size={24} />,
      title: 'Search Tables',
      content: 'Use the Database Explorer to browse tables and view their structure.',
      gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)'
    }
  ];

  const guidelineStats = [
    { icon: <BookOpen size={24} />, value: '25+', label: 'SQL Commands' },
    { icon: <Trophy size={24} />, value: '100%', label: 'Success Rate' },
    { icon: <Users size={24} />, value: '10K+', label: 'Students Helped' },
    { icon: <Clock size={24} />, value: '24/7', label: 'Support Available' }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #0c0f1a 0%, #1a1b23 25%, #16213e 50%, #0f172a 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 25%, #f1f5f9 50%, #e2e8f0 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            theme.palette.mode === 'dark'
              ? 'radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.1), transparent 50%), radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.1), transparent 50%)'
              : 'radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.05), transparent 50%), radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.05), transparent 50%)',
          pointerEvents: 'none'
        }
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          py: { xs: 6, md: 10 },
          background:
            theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)'
              : 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)',
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            {/* Main Title */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: 2,
                mb: 3
              }}
            >
              <Box
                sx={{
                  width: 72,
                  height: 72,
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 3,
                  position: 'relative',
                  boxShadow: '0 12px 40px rgba(102, 126, 234, 0.3)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 2,
                    borderRadius: 3,
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
                    backdropFilter: 'blur(10px)'
                  }
                }}
              >
                <BookOpen size={36} color="white" style={{ position: 'relative', zIndex: 1 }} />
              </Box>
              <Typography
                variant={isMobile ? 'h3' : 'h1'}
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  background:
                    theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #cbd5e1 100%)'
                      : 'linear-gradient(135deg, #1e293b 0%, #475569 50%, #64748b 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1
                }}
              >
                SQL Guidelines
              </Typography>
            </Box>

            <Typography
              variant="h4"
              sx={{
                color: 'text.secondary',
                fontWeight: 500,
                mb: 4,
                fontSize: { xs: '1.25rem', md: '1.75rem' },
                lineHeight: 1.4,
                maxWidth: '800px',
                mx: 'auto'
              }}
            >
              Master SQL with our comprehensive guide to the
              <Box
                component="span"
                sx={{
                  color: 'primary.main',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mx: 1
                }}
              >
                SQLHub Workbench
              </Box>
              simulator
            </Typography>

            {/* Stats */}
            <Grid container spacing={3} sx={{ maxWidth: '600px', mx: 'auto' }}>
              {guidelineStats.map((stat, index) => (
                <Grid size={{ xs: 6, md: 3 }} key={index}>
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      background:
                        theme.palette.mode === 'dark'
                          ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)'
                          : 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)',
                      backdropFilter: 'blur(20px)',
                      border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.6)'}`,
                      textAlign: 'center',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow:
                          theme.palette.mode === 'dark'
                            ? '0 12px 40px rgba(0,0,0,0.3)'
                            : '0 12px 40px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                        color: 'white'
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 6, position: 'relative' }}>
        {/* Navigation Tabs */}
        <Box
          sx={{
            mb: 6,
            borderRadius: 4,
            background:
              theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)'
                : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.6)'}`,
            boxShadow:
              theme.palette.mode === 'dark'
                ? '0 8px 32px rgba(0,0,0,0.3)'
                : '0 8px 32px rgba(0,0,0,0.08)',
            overflow: 'hidden'
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant={isMobile ? 'scrollable' : 'fullWidth'}
            scrollButtons="auto"
            sx={{
              minHeight: 72,
              '& .MuiTabs-flexContainer': {
                height: '100%'
              },
              '& .MuiTab-root': {
                minHeight: 72,
                textTransform: 'none',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: 'text.secondary',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '12px 12px 0 0',
                margin: '0 2px',
                '&.Mui-selected': {
                  color: 'primary.main',
                  background:
                    theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)'
                      : 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow:
                    theme.palette.mode === 'dark'
                      ? '0 4px 20px rgba(102, 126, 234, 0.2)'
                      : '0 4px 20px rgba(102, 126, 234, 0.15)'
                },
                '&:hover': {
                  background:
                    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.03)',
                  transform: 'translateY(-1px)'
                }
              },
              '& .MuiTabs-indicator': {
                height: 4,
                borderRadius: '4px 4px 0 0',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
              }
            }}
          >
            <Tab icon={<GraduationCap size={20} />} label="Getting Started" iconPosition="start" />
            <Tab icon={<Code size={20} />} label="SQL Commands" iconPosition="start" />
            <Tab icon={<HelpCircle size={20} />} label="Interface Guide" iconPosition="start" />
            <Tab icon={<Lightbulb size={20} />} label="Tips & Tricks" iconPosition="start" />
            <Tab icon={<AlertTriangle size={20} />} label="Limitations" iconPosition="start" />
          </Tabs>
        </Box>

        {/* Getting Started Tab */}
        <TabPanel value={tabValue} index={0}>
          {/* Welcome Alert */}
          <Box
            sx={{
              mb: 6,
              p: 4,
              borderRadius: 4,
              background:
                theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)'
                  : 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(147, 51, 234, 0.08) 100%)',
              border:
                theme.palette.mode === 'dark'
                  ? '1px solid rgba(59, 130, 246, 0.2)'
                  : '1px solid rgba(59, 130, 246, 0.15)',
              backdropFilter: 'blur(20px)',
              position: 'relative'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #3b82f6 0%, #9333ea 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)'
                }}
              >
                <Sparkles size={28} color="white" />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                  Welcome to SQL Workbench Simulator!
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                  This is a complete SQL learning environment that runs entirely in your browser. No
                  installation required - start practicing SQL immediately with our advanced
                  simulator.
                </Typography>
              </Box>
            </Box>
          </Box>

          <Grid container spacing={4}>
            {/* Quick Start Card */}
            <Grid size={{ xs: 12, md: 6 }}>
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
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow:
                      theme.palette.mode === 'dark'
                        ? '0 20px 40px rgba(0,0,0,0.3)'
                        : '0 20px 40px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2
                      }}
                    >
                      <Zap size={24} color="white" />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      🚀 Quick Start
                    </Typography>
                  </Box>
                  <List sx={{ p: 0 }}>
                    {[
                      "Click 'Launch Workbench' to start",
                      'Sample databases are pre-loaded',
                      'Try the example queries first',
                      'Explore the database structure'
                    ].map((item, index) => (
                      <ListItem key={index} sx={{ px: 0, py: 1 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckCircle2 size={20} color="#10b981" />
                        </ListItemIcon>
                        <ListItemText
                          primary={item}
                          primaryTypographyProps={{
                            fontWeight: 500,
                            color: 'text.primary'
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Features Card */}
            <Grid size={{ xs: 12, md: 6 }}>
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
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow:
                      theme.palette.mode === 'dark'
                        ? '0 20px 40px rgba(0,0,0,0.3)'
                        : '0 20px 40px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2
                      }}
                    >
                      <Database size={24} color="white" />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      ✨ Key Features
                    </Typography>
                  </Box>
                  <List sx={{ p: 0 }}>
                    {[
                      'Full MySQL-compatible environment',
                      'Advanced code editor with highlighting',
                      'Real-time query execution',
                      'Export results to CSV/JSON',
                      'Built-in query templates',
                      'Comprehensive learning resources'
                    ].map((item, index) => (
                      <ListItem key={index} sx={{ px: 0, py: 1 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <Sparkles size={16} color="#667eea" />
                        </ListItemIcon>
                        <ListItemText
                          primary={item}
                          primaryTypographyProps={{
                            fontWeight: 500,
                            color: 'text.primary'
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* CTA Button */}
            <Grid size={12}>
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/workbench')}
                  startIcon={<Play size={24} />}
                  sx={{
                    py: 2,
                    px: 6,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 40px rgba(102, 126, 234, 0.5)'
                    }
                  }}
                >
                  Launch SQL Workbench
                </Button>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        {/* SQL Commands Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                mb: 2,
                background:
                  theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)'
                    : 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              SQL Command Reference
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4 }}>
              Complete guide to SQL commands supported in the workbench simulator
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {sqlCommands.map((cmd, index) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index}>
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
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow:
                        theme.palette.mode === 'dark'
                          ? '0 20px 40px rgba(0,0,0,0.3)'
                          : '0 20px 40px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          background: cmd.gradient,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2,
                          color: 'white'
                        }}
                      >
                        {cmd.icon}
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {cmd.command}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.6 }}
                    >
                      {cmd.description}
                    </Typography>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        background:
                          theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.03)',
                        border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                        fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                        fontSize: '0.875rem'
                      }}
                    >
                      <Typography
                        sx={{ color: theme.palette.mode === 'dark' ? '#86efac' : '#16a34a' }}
                      >
                        {cmd.example}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Interface Guide Tab */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                mb: 2,
                background:
                  theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)'
                    : 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Interface Guide
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4 }}>
              Master the SQLHub workbench interface and maximize your productivity
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {/* Editor Features */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                sx={{
                  height: '100%',
                  background:
                    theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)'
                      : 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(5, 150, 105, 0.08) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.15)'}`,
                  borderRadius: 4
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2
                      }}
                    >
                      <Code size={24} color="white" />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      SQL Editor
                    </Typography>
                  </Box>
                  <List sx={{ p: 0 }}>
                    {[
                      'Syntax highlighting for SQL',
                      'Auto-completion and suggestions',
                      'Error detection and warnings',
                      'Multiple query execution',
                      'Query formatting tools',
                      'Keyboard shortcuts support'
                    ].map((item, index) => (
                      <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckCircle2 size={16} color="#10b981" />
                        </ListItemIcon>
                        <ListItemText
                          primary={item}
                          primaryTypographyProps={{ fontWeight: 500, fontSize: '0.95rem' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Database Explorer */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                sx={{
                  height: '100%',
                  background:
                    theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)'
                      : 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(37, 99, 235, 0.08) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.15)'}`,
                  borderRadius: 4
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2
                      }}
                    >
                      <Database size={24} color="white" />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      Database Explorer
                    </Typography>
                  </Box>
                  <List sx={{ p: 0 }}>
                    {[
                      'Browse database structure',
                      'View table schemas',
                      'Inspect column details',
                      'Preview table data',
                      'Navigate relationships',
                      'Search tables and columns'
                    ].map((item, index) => (
                      <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckCircle2 size={16} color="#3b82f6" />
                        </ListItemIcon>
                        <ListItemText
                          primary={item}
                          primaryTypographyProps={{ fontWeight: 500, fontSize: '0.95rem' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Results Panel */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                sx={{
                  height: '100%',
                  background:
                    theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(245, 101, 101, 0.1) 0%, rgba(239, 68, 68, 0.1) 100%)'
                      : 'linear-gradient(135deg, rgba(245, 101, 101, 0.08) 0%, rgba(239, 68, 68, 0.08) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(245, 101, 101, 0.2)' : 'rgba(245, 101, 101, 0.15)'}`,
                  borderRadius: 4
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #f56565 0%, #ef4444 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2
                      }}
                    >
                      <Terminal size={24} color="white" />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      Results Panel
                    </Typography>
                  </Box>
                  <List sx={{ p: 0 }}>
                    {[
                      'Tabular data display',
                      'Export to CSV/JSON',
                      'Pagination for large results',
                      'Column sorting and filtering',
                      'Query execution time',
                      'Error messages and warnings'
                    ].map((item, index) => (
                      <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckCircle2 size={16} color="#f56565" />
                        </ListItemIcon>
                        <ListItemText
                          primary={item}
                          primaryTypographyProps={{ fontWeight: 500, fontSize: '0.95rem' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Keyboard Shortcuts */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                sx={{
                  height: '100%',
                  background:
                    theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)'
                      : 'linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(147, 51, 234, 0.08) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(168, 85, 247, 0.15)'}`,
                  borderRadius: 4
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2
                      }}
                    >
                      <Zap size={24} color="white" />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      Keyboard Shortcuts
                    </Typography>
                  </Box>
                  <Stack spacing={2}>
                    {[
                      { key: 'Ctrl + Enter', action: 'Execute Query' },
                      { key: 'Ctrl + S', action: 'Save Query' },
                      { key: 'Ctrl + A', action: 'Select All' },
                      { key: 'Ctrl + /', action: 'Toggle Comment' },
                      { key: 'F5', action: 'Refresh Data' },
                      { key: 'Esc', action: 'Clear Selection' }
                    ].map((shortcut, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <Chip
                          label={shortcut.key}
                          size="small"
                          sx={{
                            fontFamily: 'monospace',
                            background:
                              theme.palette.mode === 'dark'
                                ? 'rgba(255,255,255,0.1)'
                                : 'rgba(0,0,0,0.06)'
                          }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {shortcut.action}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Tips & Tricks Tab */}
        <TabPanel value={tabValue} index={3}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                mb: 2,
                background:
                  theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)'
                    : 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Tips & Tricks
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4 }}>
              Expert tips to boost your productivity and become a SQL master
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {tips.map((tip, index) => (
              <Grid size={{ xs: 12, md: 6 }} key={index}>
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
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow:
                        theme.palette.mode === 'dark'
                          ? '0 20px 40px rgba(0,0,0,0.3)'
                          : '0 20px 40px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: 3,
                          background: tip.gradient,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 3,
                          color: 'white',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                        }}
                      >
                        {tip.icon}
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {tip.title}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.7,
                        fontSize: '1rem'
                      }}
                    >
                      {tip.content}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Limitations Tab */}
        <TabPanel value={tabValue} index={4}>
          {/* Header Section */}
          <Box
            sx={{
              mb: 6,
              p: 4,
              borderRadius: 4,
              background:
                theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, rgba(245, 101, 101, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%)'
                  : 'linear-gradient(135deg, rgba(245, 101, 101, 0.08) 0%, rgba(220, 38, 38, 0.08) 100%)',
              border:
                theme.palette.mode === 'dark'
                  ? '1px solid rgba(245, 101, 101, 0.2)'
                  : '1px solid rgba(245, 101, 101, 0.15)',
              backdropFilter: 'blur(20px)',
              position: 'relative'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #f56565 0%, #dc2626 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 8px 24px rgba(245, 101, 101, 0.3)'
                }}
              >
                <AlertTriangle size={28} color="white" />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                  Project Limitations
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                  Understanding the current limitations helps set proper expectations and guides
                  future development priorities.
                </Typography>
              </Box>
            </Box>
          </Box>

          <Grid container spacing={4}>
            {/* Database Limitations */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                sx={{
                  height: '100%',
                  background:
                    theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
                      : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.6)'}`,
                  borderRadius: 4,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow:
                      theme.palette.mode === 'dark'
                        ? '0 12px 40px rgba(0,0,0,0.3)'
                        : '0 12px 40px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2
                      }}
                    >
                      <Database size={24} color="white" />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      Database & Storage
                    </Typography>
                  </Box>
                  <List sx={{ '& .MuiListItem-root': { px: 0 } }}>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <AlertTriangle size={16} color="#f56565" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Browser-based storage only"
                        secondary="Data is stored in browser's localStorage and may be cleared"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <AlertTriangle size={16} color="#f56565" />
                      </ListItemIcon>
                      <ListItemText
                        primary="No real database connection"
                        secondary="Simulated SQL environment without persistent server storage"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <AlertTriangle size={16} color="#f56565" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Limited database size"
                        secondary="Performance may degrade with very large datasets"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* SQL Feature Limitations */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                sx={{
                  height: '100%',
                  background:
                    theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
                      : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.6)'}`,
                  borderRadius: 4,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow:
                      theme.palette.mode === 'dark'
                        ? '0 12px 40px rgba(0,0,0,0.3)'
                        : '0 12px 40px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2
                      }}
                    >
                      <Code size={24} color="white" />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      SQL Features
                    </Typography>
                  </Box>
                  <List sx={{ '& .MuiListItem-root': { px: 0 } }}>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <AlertTriangle size={16} color="#f56565" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Limited SQL dialect support"
                        secondary="Basic SQL commands only, advanced features may not work"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <AlertTriangle size={16} color="#f56565" />
                      </ListItemIcon>
                      <ListItemText
                        primary="No stored procedures or functions"
                        secondary="Complex database programming features not available"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <AlertTriangle size={16} color="#f56565" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Limited transaction support"
                        secondary="Basic transaction simulation only"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Performance Limitations */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                sx={{
                  height: '100%',
                  background:
                    theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
                      : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.6)'}`,
                  borderRadius: 4,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow:
                      theme.palette.mode === 'dark'
                        ? '0 12px 40px rgba(0,0,0,0.3)'
                        : '0 12px 40px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2
                      }}
                    >
                      <Zap size={24} color="white" />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      Performance
                    </Typography>
                  </Box>
                  <List sx={{ '& .MuiListItem-root': { px: 0 } }}>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <AlertTriangle size={16} color="#f56565" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Browser memory constraints"
                        secondary="Large datasets may cause browser slowdown"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <AlertTriangle size={16} color="#f56565" />
                      </ListItemIcon>
                      <ListItemText
                        primary="No query optimization"
                        secondary="Complex queries may run slower than real databases"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <AlertTriangle size={16} color="#f56565" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Single-threaded execution"
                        secondary="Cannot leverage multi-core processing"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Platform Limitations */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                sx={{
                  height: '100%',
                  background:
                    theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
                      : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.6)'}`,
                  borderRadius: 4,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow:
                      theme.palette.mode === 'dark'
                        ? '0 12px 40px rgba(0,0,0,0.3)'
                        : '0 12px 40px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2
                      }}
                    >
                      <Shield size={24} color="white" />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      Platform & Security
                    </Typography>
                  </Box>
                  <List sx={{ '& .MuiListItem-root': { px: 0 } }}>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <AlertTriangle size={16} color="#f56565" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Browser compatibility"
                        secondary="Some features may not work in older browsers"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <AlertTriangle size={16} color="#f56565" />
                      </ListItemIcon>
                      <ListItemText
                        primary="No user authentication"
                        secondary="All data is local to the browser session"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <AlertTriangle size={16} color="#f56565" />
                      </ListItemIcon>
                      <ListItemText
                        primary="No data sharing"
                        secondary="Cannot share databases between users or devices"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Future Improvements Section */}
          <Box sx={{ mt: 6 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}>
              Future Improvements
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background:
                      theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(21, 128, 61, 0.1) 100%)'
                        : 'linear-gradient(135deg, rgba(34, 197, 94, 0.08) 0%, rgba(21, 128, 61, 0.08) 100%)',
                    border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.15)'}`,
                    textAlign: 'center'
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2
                    }}
                  >
                    <Database size={24} color="white" />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Enhanced SQL Support
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Support for more SQL dialects and advanced features
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background:
                      theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)'
                        : 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(37, 99, 235, 0.08) 100%)',
                    border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.15)'}`,
                    textAlign: 'center'
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2
                    }}
                  >
                    <Users size={24} color="white" />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Collaboration Features
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Share queries and databases with team members
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background:
                      theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)'
                        : 'linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(147, 51, 234, 0.08) 100%)',
                    border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(168, 85, 247, 0.15)'}`,
                    textAlign: 'center'
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2
                    }}
                  >
                    <Zap size={24} color="white" />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Performance Optimization
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Better query execution and memory management
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>
      </Container>
    </Box>
  );
}

export default GuidelinesPage;
