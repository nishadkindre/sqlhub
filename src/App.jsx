import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Toolbar } from '@mui/material';
import createAppTheme from './theme';
import { SQLProvider } from './contexts/SQLContext';
import { ThemeModeProvider, useThemeMode } from './contexts/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import WorkbenchPage from './pages/WorkbenchPage';
import GuidelinesPage from './pages/GuidelinesPage';
import NewLandingPage from './pages/newkasl';

function AppContent() {
  const { mode } = useThemeMode();
  const theme = createAppTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SQLProvider>
        <Router>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Toolbar /> {/* This provides the proper spacing for fixed AppBar */}
            <Box
              sx={{
                flex: 1,
                overflow: 'auto',
                position: 'relative'
              }}
            >
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/new" element={<NewLandingPage />} />
                <Route path="/workbench" element={<WorkbenchPage />} />
                <Route path="/guidelines" element={<GuidelinesPage />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </SQLProvider>
    </ThemeProvider>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeModeProvider>
        <AppContent />
      </ThemeModeProvider>
    </ErrorBoundary>
  );
}

export default App;
