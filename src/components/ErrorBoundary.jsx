import React from 'react';
import { Box, Paper, Typography, Button, Alert, Container } from '@mui/material';
import { RefreshRounded as RefreshIcon } from '@mui/icons-material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log the error to console for debugging
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="error" sx={{ mb: 3 }}>
              <Typography variant="h5" gutterBottom>
                Something went wrong
              </Typography>
              <Typography variant="body1" color="text.secondary">
                An unexpected error occurred while running the SQL Workbench Simulator.
              </Typography>
            </Alert>

            <Box sx={{ mb: 3 }}>
              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={this.handleReload}
                size="large"
              >
                Reload Application
              </Button>
            </Box>

            {/* eslint-disable-next-line no-undef */}
            {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
              <Box sx={{ textAlign: 'left', mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Error Details (Development Mode):
                </Typography>
                <Paper
                  sx={{
                    p: 2,
                    fontFamily:
                      '"JetBrains Mono", "SF Mono", "Monaco", "Cascadia Code", "Roboto Mono", "Consolas", "Courier New", monospace',
                    fontSize: '0.875rem',
                    maxHeight: 300,
                    overflow: 'auto'
                  }}
                >
                  <pre>{this.state.error && this.state.error.toString()}</pre>
                  <pre>{this.state.errorInfo.componentStack}</pre>
                </Paper>
              </Box>
            )}
          </Paper>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
