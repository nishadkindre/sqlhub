import React, { useState, useEffect } from 'react';
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
  Rating,
  Fade,
  Slide,
  Zoom,
  IconButton,
  Paper,
  Divider,
  Tooltip,
  Badge
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
    title: 'AI-Powered Learning',
    description:
      'Intelligent suggestions, query optimization tips, and personalized learning paths to accelerate your SQL mastery.',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    glowColor: 'rgba(255, 154, 158, 0.4)'
  },
  {
    icon: <Globe size={28} />,
    title: 'Cloud-Ready & Offline',
    description:
      'Works completely offline once loaded. No internet required for practicing SQL skills anywhere, anytime.',
    gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    glowColor: 'rgba(161, 196, 253, 0.4)'
  }
];

const stats = [
  {
    icon: <Users size={24} />,
    value: '150K+',
    label: 'Global Users',
    description: 'Active learners worldwide'
  },
  {
    icon: <Star size={24} />,
    value: '4.9/5',
    label: 'User Rating',
    description: 'Based on 10K+ reviews'
  },
  {
    icon: <Rocket size={24} />,
    value: '99.9%',
    label: 'Uptime',
    description: 'Enterprise reliability'
  },
  {
    icon: <Target size={24} />,
    value: '24/7',
    label: 'Available',
    description: 'Learn anytime, anywhere'
  }
];

const sampleQueries = [
  {
    category: 'Data Exploration',
    icon: <Database size={20} />,
    queries: [
      'SHOW DATABASES;',
      'USE employee_db;',
      'DESCRIBE employees;',
      'SELECT COUNT(*) FROM employees;'
    ]
  },
  {
    category: 'Data Analysis',
    icon: <TrendingUp size={20} />,
    queries: [
      'SELECT department, AVG(salary) FROM employees GROUP BY department;',
      "SELECT * FROM employees WHERE hire_date > '2020-01-01';",
      'SELECT name, salary FROM employees ORDER BY salary DESC LIMIT 5;',
      'SELECT department, COUNT(*) as employee_count FROM employees GROUP BY department;'
    ]
  },
  {
    category: 'Data Management',
    icon: <Terminal size={20} />,
    queries: [
      "UPDATE employees SET salary = 85000 WHERE name = 'John Doe';",
      "INSERT INTO employees (name, email, department, salary, hire_date) VALUES ('Alice Johnson', 'alice@company.com', 'Engineering', 90000, '2024-01-15');",
      'DELETE FROM employees WHERE id = 6;',
      'CREATE INDEX idx_department ON employees(department);'
    ]
  },
  {
    category: 'Advanced Analytics',
    icon: <GitBranch size={20} />,
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
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    // Trigger initial animations
    setTimeout(() => setIsVisible({ hero: true }), 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const parallaxOffset = scrollY * 0.5;

  const handleGetStarted = () => {
    navigate('/workbench');
  };

  const handleViewGuidelines = () => {
    navigate('/guidelines');
  };

  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', position: 'relative' }}>
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 0,
          '&::before': {
            content: '""',
            position: 'absolute',
            width: '200px',
            height: '200px',
            background:
              theme.palette.mode === 'dark'
                ? 'radial-gradient(circle, rgba(102,126,234,0.15) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(102,126,234,0.08) 0%, transparent 70%)',
            borderRadius: '50%',
            left: mousePosition.x - 100,
            top: mousePosition.y - 100,
            transition: 'all 0.3s ease',
            transform: `translate(${parallaxOffset}px, ${parallaxOffset * 0.5}px)`
          }
        }}
      />

      {/* Hero Section */}
      <Box
        sx={{
          background:
            theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 25%, #16213e 50%, #0f3460 75%, #0e4b99 100%)'
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #896cd6 50%, #a855f7 75%, #c084fc 100%)',
          position: 'relative',
          color: 'white',
          py: { xs: 10, md: 20 },
          textAlign: 'center',
          overflow: 'hidden',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 50%, ${theme.palette.mode === 'dark' ? 'rgba(102,126,234,0.3)' : 'rgba(255,255,255,0.1)'} 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, ${theme.palette.mode === 'dark' ? 'rgba(168,85,247,0.3)' : 'rgba(255,255,255,0.1)'} 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, ${theme.palette.mode === 'dark' ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.1)'} 0%, transparent 50%)
            `,
            animation: 'float 20s ease-in-out infinite'
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="white" fill-opacity="0.03"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.5
          },
          '@keyframes float': {
            '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
            '33%': { transform: 'translate(30px, -30px) rotate(120deg)' },
            '66%': { transform: 'translate(-20px, 20px) rotate(240deg)' }
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Fade in={isVisible.hero} timeout={1000}>
            <Box>
              <Slide direction="up" in={isVisible.hero} timeout={800}>
                <Box sx={{ mb: 4 }}>
                  <Chip
                    icon={<Sparkles size={18} />}
                    label="🚀 New v2.0 - AI-Powered SQL Learning"
                    sx={{
                      background:
                        theme.palette.mode === 'dark'
                          ? 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)'
                          : 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 100%)',
                      backdropFilter: 'blur(20px)',
                      color: 'white',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      mb: 4,
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      px: 2,
                      py: 0.5,
                      '&:hover': {
                        background:
                          'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.2) 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 32px rgba(255,255,255,0.2)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  />
                </Box>
              </Slide>

              <Zoom in={isVisible.hero} timeout={1200}>
                <Typography
                  variant={isMobile ? 'h2' : 'h1'}
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: '3rem', md: '5rem', lg: '6rem' },
                    lineHeight: 0.9,
                    background:
                      theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #e0e0e0 100%)'
                        : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 3,
                    textShadow:
                      theme.palette.mode === 'dark'
                        ? '0 0 40px rgba(255,255,255,0.1)'
                        : '0 0 40px rgba(0,0,0,0.1)',
                    letterSpacing: '-0.02em'
                  }}
                >
                  Master SQL with
                  <br />
                  <Box
                    component="span"
                    sx={{
                      background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textShadow: '0 0 60px rgba(251, 191, 36, 0.5)',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: '-10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '80%',
                        height: '4px',
                        background:
                          'linear-gradient(90deg, transparent 0%, #fbbf24 50%, transparent 100%)',
                        borderRadius: '2px'
                      }
                    }}
                  >
                    SQLHub
                  </Box>
                </Typography>
              </Zoom>

              <Slide direction="up" in={isVisible.hero} timeout={1400}>
                <Typography
                  variant={isMobile ? 'h6' : 'h4'}
                  sx={{
                    mb: 8,
                    opacity: 0.95,
                    maxWidth: '800px',
                    mx: 'auto',
                    fontSize: { xs: '1.2rem', md: '1.5rem', lg: '1.75rem' },
                    lineHeight: 1.5,
                    fontWeight: 300,
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  The world's most advanced SQL learning platform powered by AI.
                  <Box component="span" sx={{ fontWeight: 500, color: '#fbbf24' }}>
                    {' '}
                    Execute, learn, and master{' '}
                  </Box>
                  database skills in minutes, not months.
                </Typography>
              </Slide>
            </Box>
          </Fade>

          {/* Enhanced Stats Section */}
          <Fade in={isVisible.hero} timeout={1600}>
            <Box sx={{ mb: 8 }}>
              <Grid container spacing={3} justifyContent="center">
                {stats.map((stat, index) => (
                  <Grid size={{ xs: 6, sm: 3 }} key={index}>
                    <Zoom in={isVisible.hero} timeout={1800 + index * 200}>
                      <Paper
                        elevation={0}
                        sx={{
                          textAlign: 'center',
                          background:
                            theme.palette.mode === 'dark'
                              ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
                              : 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: 4,
                          p: 3,
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          '&:hover': {
                            transform: 'translateY(-8px) scale(1.02)',
                            background:
                              theme.palette.mode === 'dark'
                                ? 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)'
                                : 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.15) 100%)',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                          }
                        }}
                      >
                        <Box
                          sx={{
                            display: 'inline-flex',
                            p: 2,
                            borderRadius: '50%',
                            background:
                              'linear-gradient(135deg, rgba(251,191,36,0.2) 0%, rgba(245,158,11,0.2) 100%)',
                            backdropFilter: 'blur(10px)',
                            mb: 2,
                            border: '1px solid rgba(251,191,36,0.3)'
                          }}
                        >
                          {stat.icon}
                        </Box>
                        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: '#fbbf24' }}>
                          {stat.value}
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {stat.label}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8, fontSize: '0.8rem' }}>
                          {stat.description}
                        </Typography>
                      </Paper>
                    </Zoom>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Fade>

          <Slide direction="up" in={isVisible.hero} timeout={2000}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={4}
              justifyContent="center"
              sx={{ mb: 6 }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<Play size={24} />}
                endIcon={<ArrowRight size={20} />}
                onClick={handleGetStarted}
                sx={{
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
                  color: '#000',
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  px: 6,
                  py: 2,
                  borderRadius: 4,
                  boxShadow: '0 8px 32px rgba(251, 191, 36, 0.4)',
                  textTransform: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 12px 48px rgba(251, 191, 36, 0.6)'
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background:
                      'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                    transition: 'left 0.5s ease'
                  },
                  '&:hover::before': {
                    left: '100%'
                  }
                }}
              >
                Launch SQLHub Pro
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<BookOpen size={24} />}
                onClick={handleViewGuidelines}
                sx={{
                  borderColor: 'rgba(255, 255, 255, 0.4)',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '1.2rem',
                  px: 6,
                  py: 2,
                  borderRadius: 4,
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  textTransform: 'none',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    borderColor: 'rgba(255, 255, 255, 0.6)',
                    background: 'rgba(255, 255, 255, 0.2)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 12px 32px rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                Learning Guide
              </Button>
            </Stack>
          </Slide>

          {/* Scroll Indicator */}
          <Fade in={isVisible.hero} timeout={2500}>
            <Box
              sx={{
                position: 'absolute',
                bottom: 40,
                left: '50%',
                transform: 'translateX(-50%)',
                animation: 'bounce 2s infinite',
                '@keyframes bounce': {
                  '0%, 20%, 50%, 80%, 100%': {
                    transform: 'translateX(-50%) translateY(0)'
                  },
                  '40%': {
                    transform: 'translateX(-50%) translateY(-10px)'
                  },
                  '60%': {
                    transform: 'translateX(-50%) translateY(-5px)'
                  }
                }
              }}
            >
              <IconButton
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  '&:hover': {
                    color: 'rgba(255,255,255,1)',
                    background: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                <ChevronDown size={32} />
              </IconButton>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Enhanced Features Section */}
      <Box
        sx={{
          py: { xs: 12, md: 20 },
          background:
            theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #16213e 100%)'
              : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              theme.palette.mode === 'dark'
                ? 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="white" fill-opacity="0.02"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
                : 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="black" fill-opacity="0.02"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', mb: 12 }}>
            <Fade in timeout={1000}>
              <Box>
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{
                    fontWeight: 900,
                    mb: 3,
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    background:
                      theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)'
                        : 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.02em'
                  }}
                >
                  Revolutionary Features
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    maxWidth: '700px',
                    mx: 'auto',
                    fontSize: { xs: '1.1rem', md: '1.3rem' },
                    lineHeight: 1.6,
                    color:
                      theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)',
                    fontWeight: 300
                  }}
                >
                  Experience the future of SQL learning with cutting-edge technology designed for
                  <Box component="span" sx={{ fontWeight: 600, color: '#fbbf24' }}>
                    {' '}
                    modern developers{' '}
                  </Box>
                  and data professionals.
                </Typography>
              </Box>
            </Fade>
          </Box>

          <Grid container spacing={5}>
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index}>
                <Zoom in timeout={1000 + index * 200}>
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
                        transform: 'translateY(-12px) scale(1.02)',
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
                          width: 80,
                          height: 80,
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
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Enhanced Sample Queries Section */}
      <Box
        sx={{
          py: { xs: 12, md: 20 },
          background:
            theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #16213e 0%, #0f3460 50%, #0e4b99 100%)'
              : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%)',
          position: 'relative'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 12 }}>
            <Fade in timeout={1000}>
              <Box>
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{
                    fontWeight: 900,
                    mb: 3,
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    background:
                      theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)'
                        : 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.02em'
                  }}
                >
                  Interactive Query Examples
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    maxWidth: '800px',
                    mx: 'auto',
                    fontSize: { xs: '1.1rem', md: '1.3rem' },
                    lineHeight: 1.6,
                    color:
                      theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)',
                    fontWeight: 300
                  }}
                >
                  Explore our curated collection of SQL queries from basic operations to
                  <Box component="span" sx={{ fontWeight: 600, color: '#fbbf24' }}>
                    {' '}
                    advanced analytics{' '}
                  </Box>
                  - all executable in real-time
                </Typography>
              </Box>
            </Fade>
          </Box>

          <Grid container spacing={5}>
            {sampleQueries.map((category, index) => (
              <Grid size={{ xs: 12, md: 6 }} key={index}>
                <Slide direction="up" in timeout={1000 + index * 300}>
                  <Card
                    sx={{
                      height: '100%',
                      background:
                        theme.palette.mode === 'dark'
                          ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)'
                          : 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
                      backdropFilter: 'blur(20px)',
                      border:
                        theme.palette.mode === 'dark'
                          ? '1px solid rgba(255,255,255,0.12)'
                          : '1px solid rgba(255,255,255,0.3)',
                      borderRadius: 5,
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        transform: 'translateY(-8px) scale(1.01)',
                        boxShadow:
                          theme.palette.mode === 'dark'
                            ? '0 20px 40px rgba(0,0,0,0.3)'
                            : '0 20px 40px rgba(0,0,0,0.12)',
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
                        height: '4px',
                        background: 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
                        opacity: 0,
                        transition: 'opacity 0.4s ease'
                      }
                    }}
                  >
                    <CardContent sx={{ p: 5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                        <Box
                          sx={{
                            p: 2,
                            borderRadius: 3,
                            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                            color: 'white',
                            mr: 3,
                            boxShadow: '0 8px 24px rgba(251, 191, 36, 0.3)'
                          }}
                        >
                          {category.icon}
                        </Box>
                        <Typography
                          variant="h5"
                          component="h3"
                          sx={{
                            fontWeight: 800,
                            color: theme.palette.mode === 'dark' ? '#ffffff' : '#1e293b',
                            fontSize: '1.4rem'
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
                              py: 2,
                              borderRadius: 3,
                              mb: 1,
                              transition: 'all 0.3s ease',
                              cursor: 'pointer',
                              '&:hover': {
                                backgroundColor:
                                  theme.palette.mode === 'dark'
                                    ? 'rgba(255,255,255,0.05)'
                                    : 'rgba(251,191,36,0.08)',
                                transform: 'translateX(8px)',
                                '& .MuiTypography-root': {
                                  color: '#fbbf24'
                                }
                              }
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                              <Box
                                sx={{
                                  p: 1,
                                  borderRadius: '50%',
                                  background:
                                    theme.palette.mode === 'dark'
                                      ? 'rgba(255,255,255,0.1)'
                                      : 'rgba(251,191,36,0.1)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                <Terminal
                                  size={16}
                                  color={theme.palette.mode === 'dark' ? '#ffffff' : '#fbbf24'}
                                />
                              </Box>
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography
                                  variant="body1"
                                  sx={{
                                    fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                                    fontSize: '0.95rem',
                                    fontWeight: 500,
                                    color:
                                      theme.palette.mode === 'dark'
                                        ? 'rgba(255,255,255,0.9)'
                                        : 'rgba(0,0,0,0.8)',
                                    transition: 'color 0.3s ease',
                                    lineHeight: 1.4
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
                </Slide>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Enhanced Benefits Section */}
      <Box
        sx={{
          py: { xs: 12, md: 20 },
          background:
            theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #16213e 100%)'
              : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
          position: 'relative'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Slide direction="right" in timeout={1000}>
                <Box>
                  <Typography
                    variant="h2"
                    component="h2"
                    sx={{
                      fontWeight: 900,
                      mb: 4,
                      fontSize: { xs: '2.5rem', md: '4rem' },
                      background:
                        theme.palette.mode === 'dark'
                          ? 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)'
                          : 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.1
                    }}
                  >
                    Why Choose SQLHub?
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 6,
                      fontSize: { xs: '1.1rem', md: '1.3rem' },
                      lineHeight: 1.6,
                      color:
                        theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)',
                      fontWeight: 300
                    }}
                  >
                    The perfect environment for learning SQL, whether you're a beginner or looking
                    to practice advanced concepts in a
                    <Box component="span" sx={{ fontWeight: 600, color: '#fbbf24' }}>
                      {' '}
                      professional setting{' '}
                    </Box>
                    with enterprise-grade tools.
                  </Typography>
                  <List sx={{ p: 0 }}>
                    {benefits.map((benefit, index) => (
                      <Zoom in timeout={1000 + index * 150} key={index}>
                        <ListItem
                          sx={{
                            px: 0,
                            py: 2,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateX(12px)',
                              '& .benefit-icon': {
                                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                                boxShadow: '0 8px 24px rgba(251, 191, 36, 0.4)'
                              }
                            }
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 50 }}>
                            <Box
                              className="benefit-icon"
                              sx={{
                                p: 1,
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)',
                                transition: 'all 0.3s ease'
                              }}
                            >
                              {benefit.icon}
                            </Box>
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography
                                variant="body1"
                                sx={{
                                  fontWeight: 600,
                                  fontSize: '1.1rem',
                                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#1e293b'
                                }}
                              >
                                {benefit.text}
                              </Typography>
                            }
                          />
                        </ListItem>
                      </Zoom>
                    ))}
                  </List>
                </Box>
              </Slide>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Slide direction="left" in timeout={1200}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                    alignItems: 'center'
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      maxWidth: 500,
                      height: 400,
                      background:
                        theme.palette.mode === 'dark'
                          ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)'
                          : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
                      backdropFilter: 'blur(20px)',
                      borderRadius: 6,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border:
                        theme.palette.mode === 'dark'
                          ? '1px solid rgba(255,255,255,0.12)'
                          : '1px solid rgba(255,255,255,0.3)',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow:
                        theme.palette.mode === 'dark'
                          ? '0 25px 50px rgba(0,0,0,0.3)'
                          : '0 25px 50px rgba(0,0,0,0.1)',
                      '&::before': {
                        content: '"{ SQL }"',
                        position: 'absolute',
                        fontSize: '8rem',
                        fontWeight: 900,
                        color:
                          theme.palette.mode === 'dark'
                            ? 'rgba(255,255,255,0.03)'
                            : 'rgba(0,0,0,0.03)',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 0,
                        fontFamily: 'Monaco, Consolas, "Courier New", monospace'
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `
                          radial-gradient(circle at 30% 30%, rgba(251,191,36,0.1) 0%, transparent 50%),
                          radial-gradient(circle at 70% 70%, rgba(59,130,246,0.1) 0%, transparent 50%)
                        `,
                        zIndex: 1
                      }
                    }}
                  >
                    <Box
                      sx={{
                        zIndex: 2,
                        textAlign: 'center',
                        p: 4
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          mb: 3,
                          position: 'relative'
                        }}
                      >
                        <Box
                          sx={{
                            p: 3,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                            color: 'white',
                            boxShadow: '0 12px 32px rgba(251, 191, 36, 0.4)',
                            animation: 'pulse 3s ease-in-out infinite',
                            '@keyframes pulse': {
                              '0%, 100%': {
                                transform: 'scale(1)',
                                boxShadow: '0 12px 32px rgba(251, 191, 36, 0.4)'
                              },
                              '50%': {
                                transform: 'scale(1.05)',
                                boxShadow: '0 16px 40px rgba(251, 191, 36, 0.6)'
                              }
                            }
                          }}
                        >
                          <Coffee size={80} />
                        </Box>
                      </Box>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 800,
                          mb: 2,
                          color: theme.palette.mode === 'dark' ? '#ffffff' : '#1e293b'
                        }}
                      >
                        Code. Learn. Master.
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color:
                            theme.palette.mode === 'dark'
                              ? 'rgba(255,255,255,0.7)'
                              : 'rgba(0,0,0,0.6)',
                          fontSize: '1.1rem',
                          fontWeight: 300
                        }}
                      >
                        Join the future of SQL education
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Slide>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Enhanced Testimonials Section */}
      <Box
        sx={{
          py: { xs: 12, md: 20 },
          background:
            theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #16213e 0%, #0f3460 50%, #0e4b99 100%)'
              : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%)',
          position: 'relative'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 12 }}>
            <Fade in timeout={1000}>
              <Box>
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{
                    fontWeight: 900,
                    mb: 3,
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    background:
                      theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)'
                        : 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.02em'
                  }}
                >
                  Trusted by Developers
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    maxWidth: '700px',
                    mx: 'auto',
                    fontSize: { xs: '1.1rem', md: '1.3rem' },
                    lineHeight: 1.6,
                    color:
                      theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)',
                    fontWeight: 300
                  }}
                >
                  Join thousands of developers who have transformed their SQL skills with
                  <Box component="span" sx={{ fontWeight: 600, color: '#fbbf24' }}>
                    {' '}
                    SQLHub Pro{' '}
                  </Box>
                  and accelerated their career growth
                </Typography>
              </Box>
            </Fade>
          </Box>

          <Grid container spacing={5}>
            {testimonials.map((testimonial, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Zoom in timeout={1000 + index * 300}>
                  <Card
                    sx={{
                      height: '100%',
                      background:
                        theme.palette.mode === 'dark'
                          ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)'
                          : 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
                      backdropFilter: 'blur(20px)',
                      border:
                        theme.palette.mode === 'dark'
                          ? '1px solid rgba(255,255,255,0.12)'
                          : '1px solid rgba(255,255,255,0.3)',
                      borderRadius: 5,
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        transform: 'translateY(-12px) scale(1.02)',
                        boxShadow:
                          theme.palette.mode === 'dark'
                            ? '0 25px 50px rgba(0,0,0,0.4)'
                            : '0 25px 50px rgba(0,0,0,0.15)',
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
                        height: '4px',
                        background: 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
                        opacity: 0,
                        transition: 'opacity 0.4s ease'
                      }
                    }}
                  >
                    <CardContent sx={{ p: 5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                        <Avatar
                          sx={{
                            width: 70,
                            height: 70,
                            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                            fontSize: '1.5rem',
                            fontWeight: 800,
                            mr: 3,
                            boxShadow: '0 8px 24px rgba(251, 191, 36, 0.3)'
                          }}
                        >
                          {testimonial.avatar}
                        </Avatar>
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 800,
                              mb: 0.5,
                              color: theme.palette.mode === 'dark' ? '#ffffff' : '#1e293b'
                            }}
                          >
                            {testimonial.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color:
                                theme.palette.mode === 'dark'
                                  ? 'rgba(255,255,255,0.7)'
                                  : 'rgba(0,0,0,0.6)',
                              fontWeight: 500
                            }}
                          >
                            {testimonial.role}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Rating
                          value={testimonial.rating}
                          readOnly
                          sx={{
                            mr: 2,
                            '& .MuiRating-iconFilled': {
                              color: '#fbbf24'
                            }
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 700,
                            color: '#fbbf24'
                          }}
                        >
                          {testimonial.rating}/5
                        </Typography>
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{
                          fontStyle: 'italic',
                          lineHeight: 1.7,
                          color:
                            theme.palette.mode === 'dark'
                              ? 'rgba(255,255,255,0.8)'
                              : 'rgba(0,0,0,0.7)',
                          fontSize: '1.05rem',
                          position: 'relative',
                          '&::before': {
                            content: '"',
                            fontSize: '3rem',
                            color: '#fbbf24',
                            position: 'absolute',
                            top: '-10px',
                            left: '-10px',
                            fontFamily: 'serif',
                            opacity: 0.3
                          }
                        }}
                      >
                        {testimonial.comment}
                      </Typography>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Enhanced Call to Action Section */}
      <Box
        sx={{
          background:
            theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 25%, #16213e 50%, #0f3460 75%, #0e4b99 100%)'
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #896cd6 50%, #a855f7 75%, #c084fc 100%)',
          color: 'white',
          py: { xs: 12, md: 20 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 50%, ${theme.palette.mode === 'dark' ? 'rgba(251,191,36,0.15)' : 'rgba(255,255,255,0.1)'} 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, ${theme.palette.mode === 'dark' ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.1)'} 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, ${theme.palette.mode === 'dark' ? 'rgba(168,85,247,0.15)' : 'rgba(255,255,255,0.1)'} 0%, transparent 50%)
            `,
            animation: 'ctaFloat 25s ease-in-out infinite',
            '@keyframes ctaFloat': {
              '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
              '33%': { transform: 'translate(20px, -20px) rotate(90deg)' },
              '66%': { transform: 'translate(-15px, 15px) rotate(180deg)' }
            }
          }
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Fade in timeout={1000}>
            <Box>
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontWeight: 900,
                  mb: 4,
                  fontSize: { xs: '2.5rem', md: '4.5rem' },
                  lineHeight: 1.1,
                  background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.02em',
                  textShadow: '0 0 40px rgba(255,255,255,0.1)'
                }}
              >
                Ready to Master SQL?
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 8,
                  opacity: 0.95,
                  fontSize: { xs: '1.2rem', md: '1.4rem' },
                  lineHeight: 1.6,
                  fontWeight: 300,
                  maxWidth: '800px',
                  mx: 'auto'
                }}
              >
                Join thousands of developers already using SQLHub to enhance their database skills.
                <br />
                <Box component="span" sx={{ fontWeight: 600, color: '#fbbf24' }}>
                  Start your journey today
                </Box>
                —no setup required, just pure learning and innovation.
              </Typography>
            </Box>
          </Fade>

          <Slide direction="up" in timeout={1500}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={4}
              justifyContent="center"
              sx={{ mb: 8 }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<Rocket size={24} />}
                endIcon={<ArrowRight size={20} />}
                onClick={handleGetStarted}
                sx={{
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
                  color: '#000',
                  fontWeight: 800,
                  fontSize: '1.3rem',
                  px: 8,
                  py: 2.5,
                  borderRadius: 4,
                  boxShadow: '0 12px 40px rgba(251, 191, 36, 0.5)',
                  textTransform: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)',
                    transform: 'translateY(-4px) scale(1.02)',
                    boxShadow: '0 16px 56px rgba(251, 191, 36, 0.7)'
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background:
                      'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    transition: 'left 0.6s ease'
                  },
                  '&:hover::before': {
                    left: '100%'
                  }
                }}
              >
                Start Learning Now
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<BookOpen size={24} />}
                onClick={handleViewGuidelines}
                sx={{
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '1.3rem',
                  px: 8,
                  py: 2.5,
                  borderRadius: 4,
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  textTransform: 'none',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  '&:hover': {
                    borderColor: 'rgba(255, 255, 255, 0.7)',
                    background: 'rgba(255, 255, 255, 0.2)',
                    transform: 'translateY(-4px) scale(1.02)',
                    boxShadow: '0 16px 40px rgba(255, 255, 255, 0.15)'
                  }
                }}
              >
                View Documentation
              </Button>
            </Stack>
          </Slide>

          {/* Additional CTA Elements */}
          <Fade in timeout={2000}>
            <Box sx={{ mt: 8 }}>
              <Typography
                variant="body1"
                sx={{
                  opacity: 0.8,
                  mb: 4,
                  fontSize: '1.1rem'
                }}
              >
                Trusted by developers at top companies worldwide
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 4,
                  flexWrap: 'wrap'
                }}
              >
                {['Microsoft', 'Google', 'Amazon', 'Meta', 'Netflix'].map((company, index) => (
                  <Typography
                    key={index}
                    sx={{
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      opacity: 0.6,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        opacity: 1,
                        color: '#fbbf24',
                        transform: 'scale(1.1)'
                      }
                    }}
                  >
                    {company}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Fade>
        </Container>
      </Box>
    </Box>
  );
}

export default LandingPage;
