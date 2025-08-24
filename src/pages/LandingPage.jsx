import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Avatar,
  Stack,
  Chip,
  Rating
} from '@mui/material';
import {
  Database,
  Code,
  Zap,
  Shield,
  Play,
  CheckCircle2,
  GraduationCap,
  WifiOff,
  BookOpen,
  Sparkles,
  Star,
  Users,
  TrendingUp,
  Clock,
  Terminal,
  GitBranch,
  Coffee,
  ArrowRight,
  Layers,
  Gauge,
  Heart,
  Award,
  ChevronDown,
  MousePointer,
  Cpu,
  Globe,
  Lock,
  Rocket,
  Brain,
  Target,
  Zap as Lightning
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: <Database size={28} />,
    title: 'Full Database Simulation',
    description:
      'Complete MySQL-compatible database environment running entirely in your browser with advanced query capabilities.',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    glowColor: 'rgba(102, 126, 234, 0.4)'
  },
  {
    icon: <Code size={28} />,
    title: 'Advanced SQL Editor',
    description:
      'Professional-grade code editor with syntax highlighting, auto-completion, formatting, and real-time error detection.',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    glowColor: 'rgba(240, 147, 251, 0.4)'
  },
  {
    icon: <Lightning size={28} />,
    title: 'Lightning Fast Execution',
    description:
      'Execute complex queries instantly with our optimized in-browser SQL engine. No waiting, no delays.',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    glowColor: 'rgba(252, 182, 159, 0.4)'
  },
  {
    icon: <Shield size={28} />,
    title: 'Safe Learning Environment',
    description:
      'Practice SQL commands safely in an isolated environment without risking real data or production systems.',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    glowColor: 'rgba(168, 237, 234, 0.4)'
  },
  {
    icon: <Brain size={28} />,
    title: 'Educational Excellence',
    description:
      'Comprehensive learning resources with pre-loaded datasets, interactive tutorials, and guided exercises.',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    glowColor: 'rgba(255, 154, 158, 0.4)'
  },
  {
    icon: <Globe size={28} />,
    title: 'Offline Capable',
    description:
      'Works completely offline once loaded. No internet required for practicing SQL skills anywhere, anytime.',
    gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    glowColor: 'rgba(161, 196, 253, 0.4)'
  }
];

const stats = [
  { icon: <Users size={24} />, value: '50K+', label: 'Active Users' },
  { icon: <Star size={24} />, value: '4.9/5', label: 'User Rating' },
  { icon: <TrendingUp size={24} />, value: '99.9%', label: 'Uptime' },
  { icon: <Clock size={24} />, value: '24/7', label: 'Available' }
];

const sampleQueries = [
  {
    category: 'Data Exploration',
    icon: <Database size={28} />,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    glowColor: 'rgba(102, 126, 234, 0.4)',
    queries: [
      'SHOW DATABASES;',
      'USE employee_db;',
      'DESCRIBE employees;',
      'SELECT COUNT(*) FROM employees;'
    ]
  },
  {
    category: 'Data Analysis',
    icon: <TrendingUp size={28} />,
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    glowColor: 'rgba(240, 147, 251, 0.4)',
    queries: [
      'SELECT department, AVG(salary) FROM employees GROUP BY department;',
      "SELECT * FROM employees WHERE hire_date > '2020-01-01';",
      'SELECT name, salary FROM employees ORDER BY salary DESC LIMIT 5;',
      'SELECT department, COUNT(*) as employee_count FROM employees GROUP BY department;'
    ]
  },
  {
    category: 'Data Management',
    icon: <Terminal size={28} />,
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    glowColor: 'rgba(252, 182, 159, 0.4)',
    queries: [
      "UPDATE employees SET salary = 85000 WHERE name = 'John Doe';",
      "INSERT INTO employees (name, email, department, salary, hire_date) VALUES ('Alice Johnson', 'alice@company.com', 'Engineering', 90000, '2024-01-15');",
      'DELETE FROM employees WHERE id = 6;',
      'CREATE INDEX idx_department ON employees(department);'
    ]
  },
  {
    category: 'Advanced Analytics',
    icon: <GitBranch size={28} />,
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    glowColor: 'rgba(168, 237, 234, 0.4)',
    queries: [
      'SELECT department, AVG(salary) as avg_salary, MAX(salary) as max_salary FROM employees GROUP BY department HAVING AVG(salary) > 70000;',
      'SELECT e.name, d.name as department_name FROM employees e JOIN departments d ON e.department = d.name;',
      'WITH salary_ranks AS (SELECT name, salary, RANK() OVER (ORDER BY salary DESC) as rank FROM employees) SELECT * FROM salary_ranks WHERE rank <= 3;',
      'CREATE VIEW high_earners AS SELECT * FROM employees WHERE salary > 80000;'
    ]
  }
];

const benefits = [
  { icon: <CheckCircle2 size={20} />, text: 'Learn SQL without complex database setup' },
  {
    icon: <CheckCircle2 size={20} />,
    text: 'Practice with realistic enterprise-grade sample data'
  },
  { icon: <CheckCircle2 size={20} />, text: 'Instant feedback and intelligent error handling' },
  { icon: <CheckCircle2 size={20} />, text: 'Zero risk to production systems' },
  { icon: <CheckCircle2 size={20} />, text: 'Accessible from any modern browser, anywhere' },
  { icon: <CheckCircle2 size={20} />, text: 'Completely free, open-source, and privacy-focused' }
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Data Analyst',
    avatar: 'SC',
    rating: 5,
    comment:
      'SQLHub transformed how I practice SQL. The interface is intuitive and the instant feedback is invaluable.'
  },
  {
    name: 'Michael Rodriguez',
    role: 'Software Engineer',
    avatar: 'MR',
    rating: 5,
    comment:
      "Best SQL learning platform I've used. The offline capability means I can practice anywhere."
  },
  {
    name: 'Emily Watson',
    role: 'Database Administrator',
    avatar: 'EW',
    rating: 5,
    comment: "Professional-grade environment that doesn't compromise on features. Highly recommend!"
  }
];

function LandingPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleGetStarted = () => {
    navigate('/workbench');
  };

  const handleViewGuidelines = () => {
    navigate('/guidelines');
  };

  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background:
            theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)'
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          position: 'relative',
          color: 'white',
          py: { xs: 8, md: 16 },
          textAlign: 'center',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="white" fill-opacity="0.05"%3E%3Cpath d="M20 20c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8zm10 0c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8z"/%3E%3C/g%3E%3C/svg%3E")'
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ mb: 4 }}>
            <Chip
              // icon={<Sparkles size={18} />}
              label="✨ New Version 2.0 Available"
              sx={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                mb: 3,
                fontSize: '0.875rem',
                fontWeight: 600
              }}
            />
          </Box>

          <Typography
            variant={isMobile ? 'h3' : 'h1'}
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '4rem' },
              lineHeight: 1.1,
              background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}
          >
            Master SQL with
            <br />
            <Box component="span" sx={{ color: '#fbbf24' }}>
              SQLHub
            </Box>
          </Typography>

          <Typography
            variant={isMobile ? 'body1' : 'h5'}
            sx={{
              mb: 6,
              opacity: 0.9,
              maxWidth: '700px',
              mx: 'auto',
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              lineHeight: 1.6
            }}
          >
            The most advanced SQL learning platform that runs entirely in your browser. Practice
            with real databases, execute complex queries, and master SQL without any setup or
            backend dependencies.
          </Typography>

          {/* Stats Section */}
          <Box sx={{ mb: 6 }}>
            <Grid container spacing={4} justifyContent="center">
              {stats.map((stat, index) => (
                <Grid size={{ xs: 6, sm: 3 }} key={index}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        p: 1.5,
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(10px)',
                        mb: 1
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              startIcon={<Play size={20} />}
              onClick={handleGetStarted}
              sx={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                color: '#1a1a1a',
                fontWeight: 700,
                fontSize: '1.1rem',
                px: 4,
                py: 1.5,
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(251, 191, 36, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 48px rgba(251, 191, 36, 0.4)'
                }
              }}
            >
              Launch Workbench
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<BookOpen size={20} />}
              onClick={handleViewGuidelines}
              sx={{
                borderColor: 'rgba(255, 255, 255, 0.3)',
                color: 'white',
                fontWeight: 600,
                fontSize: '1.1rem',
                px: 4,
                py: 1.5,
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  background: 'rgba(255, 255, 255, 0.2)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Learning Guide
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: '2rem', md: '3rem' }
              }}
            >
              Powerful Features
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                maxWidth: '600px',
                mx: 'auto',
                fontSize: { xs: '1rem', md: '1.125rem' },
                lineHeight: 1.6
              }}
            >
              Everything you need to master SQL in a modern, intuitive environment designed for
              learning and productivity
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    background:
                      theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)'
                        : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
                    backdropFilter: 'blur(20px)',
                    border:
                      theme.palette.mode === 'dark'
                        ? '1px solid rgba(255,255,255,0.1)'
                        : '1px solid rgba(255,255,255,0.3)',
                    borderRadius: 5,
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      // transform: 'translateY(-12px) scale(1.02)',
                      boxShadow:
                        theme.palette.mode === 'dark'
                          ? `0 25px 50px rgba(0,0,0,0.4), 0 0 0 1px ${feature.glowColor}`
                          : `0 25px 50px rgba(0,0,0,0.15), 0 0 0 1px ${feature.glowColor}`,
                      '&::before': {
                        opacity: 1
                      }
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `radial-gradient(circle at 50% 0%, ${feature.glowColor} 0%, transparent 70%)`,
                      opacity: 0,
                      transition: 'opacity 0.4s ease'
                    }
                  }}
                >
                  <CardContent sx={{ p: 5, position: 'relative', zIndex: 1 }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 4,
                        background: feature.gradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 4,
                        color: 'white',
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          top: -2,
                          left: -2,
                          right: -2,
                          bottom: -2,
                          background: feature.gradient,
                          borderRadius: 4,
                          zIndex: -1,
                          filter: 'blur(8px)',
                          opacity: 0.3
                        }
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{
                        fontWeight: 800,
                        mb: 3,
                        fontSize: '1.4rem',
                        color: theme.palette.mode === 'dark' ? '#ffffff' : '#1e293b'
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        lineHeight: 1.7,
                        color:
                          theme.palette.mode === 'dark'
                            ? 'rgba(255,255,255,0.8)'
                            : 'rgba(0,0,0,0.7)',
                        fontSize: '1rem'
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Sample Queries Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          backgroundColor: theme.palette.mode === 'dark' ? 'background.paper' : 'background.default'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: '2rem', md: '3rem' }
              }}
            >
              Try Sample Queries
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                maxWidth: '700px',
                mx: 'auto',
                fontSize: { xs: '1rem', md: '1.125rem' },
                lineHeight: 1.6
              }}
            >
              Explore our curated collection of SQL queries ranging from basic operations to
              advanced analytics
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {sampleQueries.map((category, index) => (
              <Grid size={{ xs: 12, md: 6 }} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    background:
                      theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)'
                        : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
                    backdropFilter: 'blur(20px)',
                    border:
                      theme.palette.mode === 'dark'
                        ? '1px solid rgba(255,255,255,0.1)'
                        : '1px solid rgba(255,255,255,0.3)',
                    borderRadius: 5,
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      // transform: 'translateY(-12px) scale(1.02)',
                      boxShadow:
                        theme.palette.mode === 'dark'
                          ? `0 25px 50px rgba(0,0,0,0.4), 0 0 0 1px ${category.glowColor}`
                          : `0 25px 50px rgba(0,0,0,0.15), 0 0 0 1px ${category.glowColor}`,
                      '&::before': {
                        opacity: 1
                      }
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `radial-gradient(circle at 50% 0%, ${category.glowColor} 0%, transparent 70%)`,
                      opacity: 0,
                      transition: 'opacity 0.4s ease'
                    }
                  }}
                >
                  <CardContent sx={{ p: 5, position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: 4,
                          background: category.gradient,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 3,
                          color: 'white',
                          position: 'relative',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: -2,
                            left: -2,
                            right: -2,
                            bottom: -2,
                            background: category.gradient,
                            borderRadius: 4,
                            zIndex: -1,
                            filter: 'blur(8px)',
                            opacity: 0.3
                          }
                        }}
                      >
                        {category.icon}
                      </Box>
                      <Typography
                        variant="h5"
                        component="h3"
                        sx={{
                          fontWeight: 800,
                          fontSize: '1.4rem',
                          color: theme.palette.mode === 'dark' ? '#ffffff' : '#1e293b'
                        }}
                      >
                        {category.category}
                      </Typography>
                    </Box>
                    <List sx={{ p: 0 }}>
                      {category.queries.map((query, queryIndex) => (
                        <ListItem
                          key={queryIndex}
                          sx={{
                            px: 0,
                            py: 1.5,
                            borderRadius: 2,
                            '&:hover': {
                              backgroundColor:
                                theme.palette.mode === 'dark'
                                  ? 'rgba(255,255,255,0.05)'
                                  : 'rgba(0,0,0,0.03)'
                            }
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <Terminal
                              size={16}
                              color={
                                theme.palette.mode === 'dark'
                                  ? 'rgba(255,255,255,0.6)'
                                  : 'rgba(0,0,0,0.6)'
                              }
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography
                                variant="body2"
                                sx={{
                                  fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                                  fontSize: '0.875rem',
                                  color:
                                    theme.palette.mode === 'dark'
                                      ? 'rgba(255,255,255,0.9)'
                                      : 'rgba(0,0,0,0.8)',
                                  lineHeight: 1.5
                                }}
                              >
                                {query}
                              </Typography>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  fontSize: { xs: '2rem', md: '3rem' }
                }}
              >
                Why Choose SQLHub?
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                  mb: 4,
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  lineHeight: 1.6
                }}
              >
                The perfect environment for learning SQL, whether you're a beginner or looking to
                practice advanced concepts in a professional setting.
              </Typography>
              <List sx={{ p: 0 }}>
                {benefits.map((benefit, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Box
                        sx={{
                          p: 0.5,
                          borderRadius: '50%',
                          backgroundColor: 'success.main',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {benefit.icon}
                      </Box>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {benefit.text}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                  alignItems: 'center'
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    maxWidth: 400,
                    height: 300,
                    background:
                      theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
                        : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '"SQL"',
                      position: 'absolute',
                      fontSize: '6rem',
                      fontWeight: 900,
                      color:
                        theme.palette.mode === 'dark'
                          ? 'rgba(255,255,255,0.05)'
                          : 'rgba(0,0,0,0.05)',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 0
                    }
                  }}
                >
                  <Box
                    sx={{
                      zIndex: 1,
                      textAlign: 'center',
                      p: 3
                    }}
                  >
                    <Coffee size={64} color={theme.palette.primary.main} />
                    <Typography variant="h6" sx={{ mt: 2, fontWeight: 700 }}>
                      Code. Learn. Master.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: '2rem', md: '3rem' }
              }}
            >
              What Developers Say
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                maxWidth: '600px',
                mx: 'auto',
                fontSize: { xs: '1rem', md: '1.125rem' },
                lineHeight: 1.6
              }}
            >
              Join thousands of developers who have transformed their SQL skills with SQLHub
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    background:
                      theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
                        : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
                    borderRadius: 4,
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow:
                        theme.palette.mode === 'dark'
                          ? '0 12px 32px rgba(0,0,0,0.2)'
                          : '0 12px 32px rgba(0,0,0,0.08)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Avatar
                        sx={{
                          width: 56,
                          height: 56,
                          backgroundColor: 'primary.main',
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          mr: 2
                        }}
                      >
                        {testimonial.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                    <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />
                    <Typography
                      variant="body1"
                      sx={{
                        fontStyle: 'italic',
                        lineHeight: 1.6,
                        color: 'text.secondary'
                      }}
                    >
                      "{testimonial.comment}"
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box
        sx={{
          background:
            theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)'
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 800,
              mb: 3,
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            Ready to Master SQL?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 6,
              opacity: 0.9,
              fontSize: { xs: '1rem', md: '1.125rem' },
              lineHeight: 1.6
            }}
          >
            Join thousands of developers already using SQLHub to enhance their database skills.
            Start your journey today—no setup required, just pure learning.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              startIcon={<Play size={20} />}
              onClick={handleGetStarted}
              sx={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                color: '#1a1a1a',
                fontWeight: 700,
                fontSize: '1.1rem',
                px: 4,
                py: 1.5,
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(251, 191, 36, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 48px rgba(251, 191, 36, 0.4)'
                }
              }}
            >
              Start Learning Now
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<BookOpen size={20} />}
              onClick={handleViewGuidelines}
              sx={{
                borderColor: 'rgba(255, 255, 255, 0.3)',
                color: 'white',
                fontWeight: 600,
                fontSize: '1.1rem',
                px: 4,
                py: 1.5,
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  background: 'rgba(255, 255, 255, 0.2)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              View Documentation
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

export default LandingPage;
