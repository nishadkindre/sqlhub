import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Stack,
  useTheme,
  useMediaQuery,
  Tooltip
} from '@mui/material';
import { Database, Moon, Sun, Github, BookOpen, Home, Code, Sparkles } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useThemeMode } from '../contexts/ThemeContext';

function Header() {
  const { mode, toggleTheme } = useThemeMode();
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { path: '/', label: 'Home', icon: <Home size={18} /> },
    { path: '/guidelines', label: 'Guidelines', icon: <BookOpen size={18} /> },
    { path: '/workbench', label: 'Workbench', icon: <Code size={18} /> }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        borderRadius: 0,
        background: scrolled
          ? theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(15, 15, 35, 0.9) 0%, rgba(26, 26, 46, 0.9) 50%, rgba(22, 33, 62, 0.9) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)'
          : theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(15, 15, 35, 0.8) 0%, rgba(26, 26, 46, 0.8) 50%, rgba(22, 33, 62, 0.8) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 0.8) 100%)',
        backdropFilter: scrolled ? 'blur(12px)' : 'blur(24px)',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'blur(24px)', // Safari support
        borderBottom: scrolled
          ? `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)'}`
          : `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}`,
        boxShadow: scrolled
          ? theme.palette.mode === 'dark'
            ? '0 12px 40px rgba(0,0,0,0.5)'
            : '0 12px 40px rgba(0,0,0,0.15)'
          : theme.palette.mode === 'dark'
            ? '0 4px 20px rgba(0,0,0,0.3)'
            : '0 4px 20px rgba(0,0,0,0.08)',
        zIndex: theme.zIndex.appBar + 1,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: scrolled
            ? theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.04) 0%, rgba(118, 75, 162, 0.04) 100%)'
              : 'linear-gradient(135deg, rgba(102, 126, 234, 0.03) 0%, rgba(118, 75, 162, 0.03) 100%)'
            : theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.02) 0%, rgba(118, 75, 162, 0.02) 100%)'
              : 'linear-gradient(135deg, rgba(102, 126, 234, 0.01) 0%, rgba(118, 75, 162, 0.01) 100%)',
          pointerEvents: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            theme.palette.mode === 'dark'
              ? 'radial-gradient(circle at 50% 0%, rgba(102, 126, 234, 0.1), transparent 70%)'
              : 'radial-gradient(circle at 50% 0%, rgba(102, 126, 234, 0.05), transparent 70%)',
          opacity: scrolled ? 1 : 0,
          transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: 'none'
        }
      }}
    >
      <Toolbar
        sx={{
          px: { xs: 2, md: 4 },
          py: 1,
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Logo and Brand */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            mr: 4
          }}
          onClick={() => navigate('/')}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: 2,
                borderRadius: 2,
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
                backdropFilter: 'blur(10px)'
              }
            }}
          >
            <Database size={24} color="white" style={{ position: 'relative', zIndex: 1 }} />
          </Box>
          <Box>
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: 800,
                fontSize: '1.5rem',
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
              SQLHub
            </Typography>
            {/* {!isMobile && (
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'text.secondary',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
                }}
              >
                SQL Learning Platform
              </Typography>
            )} */}
          </Box>
        </Box>

        {/* Navigation Links */}
        {!isMobile && (
          <Stack direction="row" spacing={1} sx={{ flexGrow: 1 }}>
            {navigationItems.map((item) => (
              <Button
                key={item.path}
                startIcon={item.icon}
                onClick={() => navigate(item.path)}
                sx={{
                  color: isActive(item.path) ? 'primary.main' : 'text.primary',
                  fontWeight: isActive(item.path) ? 700 : 500,
                  px: 2.5,
                  py: 1,
                  borderRadius: 2,
                  background: isActive(item.path)
                    ? theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)'
                      : 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)'
                    : 'transparent',
                  border: isActive(item.path)
                    ? `1px solid ${theme.palette.primary.main}30`
                    : '1px solid transparent',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    background:
                      theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)'
                        : 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)',
                    transform: 'translateY(-1px)',
                    color: 'primary.main'
                  }
                }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        )}

        {/* Right Side Actions */}
        <Stack direction="row" spacing={1} alignItems="center">
          {/* New Version Badge */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 0.5,
              px: 2,
              py: 0.5,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
              color: '#1a1a1a',
              fontSize: '0.75rem',
              fontWeight: 700,
              mr: 2
            }}
          >
            <Sparkles size={14} />
            v2.0
          </Box>

          {/* Theme Toggle */}
          <Tooltip title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`} arrow>
            <IconButton
              onClick={toggleTheme}
              sx={{
                width: 44,
                height: 44,
                borderRadius: 2,
                background:
                  theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
                    : 'linear-gradient(135deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.02) 100%)',
                border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                color: theme.palette.mode === 'dark' ? '#fbbf24' : '#f59e0b',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  background:
                    theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)'
                      : 'linear-gradient(135deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.04) 100%)',
                  transform: 'scale(1.05)',
                  boxShadow:
                    theme.palette.mode === 'dark'
                      ? '0 4px 20px rgba(251, 191, 36, 0.3)'
                      : '0 4px 20px rgba(245, 158, 11, 0.2)'
                }
              }}
            >
              {mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </IconButton>
          </Tooltip>

          {/* GitHub Link */}
          <Tooltip title="View on GitHub" arrow>
            <IconButton
              component="a"
              href="https://github.com/nishad-kindre-medtigo/sqlhub"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                width: 44,
                height: 44,
                borderRadius: 2,
                background:
                  theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
                    : 'linear-gradient(135deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.02) 100%)',
                border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                color: 'text.primary',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  background:
                    theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)'
                      : 'linear-gradient(135deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.04) 100%)',
                  transform: 'scale(1.05)',
                  color: 'primary.main'
                }
              }}
            >
              <Github size={20} />
            </IconButton>
          </Tooltip>

          {/* Mobile Menu Button */}
          {/* {isMobile && (
            <IconButton
              sx={{
                width: 44,
                height: 44,
                borderRadius: 2,
                background:
                  theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
                    : 'linear-gradient(135deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.02) 100%)',
                border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                color: 'text.primary'
              }}
            >
              <Code size={20} />
            </IconButton>
          )} */}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
