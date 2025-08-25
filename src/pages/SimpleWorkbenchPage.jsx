import React, { useState } from 'react';
import {
  Box,
  Grid,
  useTheme,
  useMediaQuery,
  IconButton,
  Drawer,
  Paper,
  Typography,
  Stack,
  Button
} from '@mui/material';
import {
  Menu as MenuIcon,
  History as HistoryIcon,
  X,
  Database
} from 'lucide-react';
import DatabaseExplorer from '../components/DatabaseExplorer';
import SQLEditor from '../components/SQLEditor';
import ResultsPanel from '../components/ResultsPanel';
import QueryHistory from '../components/QueryHistory';

const DRAWER_WIDTH = 320;
const HISTORY_DRAWER_WIDTH = 400;

function SimpleWorkbenchPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [leftDrawerOpen, setLeftDrawerOpen] = useState(!isMobile);
  const [historyDrawerOpen, setHistoryDrawerOpen] = useState(false);
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false);

  const handleLeftDrawerToggle = () => {
    setLeftDrawerOpen(!leftDrawerOpen);
  };

  const handleHistoryToggle = () => {
    setHistoryDrawerOpen(!historyDrawerOpen);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: 'calc(100vh - 64px)',
        overflow: 'hidden',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, rgba(15, 15, 35, 0.3) 0%, rgba(26, 26, 46, 0.3) 50%, rgba(22, 33, 62, 0.3) 100%)'
          : 'linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.8) 100%)'
      }}
    >
      {/* Left Sidebar - Database Explorer */}
      {isMobile ? (
        <Drawer
          anchor="left"
          open={leftDrawerOpen}
          onClose={handleLeftDrawerToggle}
          variant="temporary"
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box'
            }
          }}
        >
          <DatabaseExplorer
            open={leftDrawerOpen}
            onClose={handleLeftDrawerToggle}
            temporary={true}
          />
        </Drawer>
      ) : (
        <Paper
          elevation={0}
          sx={{
            width: leftDrawerOpen ? DRAWER_WIDTH : 0,
            transition: 'width 0.3s ease',
            overflow: 'hidden',
            borderRadius: 0
          }}
        >
          <DatabaseExplorer
            open={leftDrawerOpen}
            onClose={handleLeftDrawerToggle}
            temporary={false}
          />
        </Paper>
      )}

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Box sx={{ flex: 1, p: 2, overflow: 'hidden' }}>
          <Grid container spacing={2} sx={{ height: '100%' }}>
            {/* SQL Editor */}
            <Grid size={{ xs: 12, md: rightPanelCollapsed ? 12 : 6 }} sx={{ height: '100%' }}>
              <Paper
                elevation={1}
                sx={{
                  height: '100%',
                  overflow: 'hidden',
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`
                }}
              >
                <SQLEditor
                  onHistoryToggle={handleHistoryToggle}
                  historyDrawerOpen={historyDrawerOpen}
                  onExplorerToggle={handleLeftDrawerToggle}
                  explorerOpen={leftDrawerOpen}
                />
              </Paper>
            </Grid>

            {/* Results Panel */}
            {!rightPanelCollapsed && (
              <Grid size={{ xs: 12, md: 6 }} sx={{ height: '100%' }}>
                <Paper
                  elevation={1}
                  sx={{
                    height: '100%',
                    overflow: 'hidden',
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.divider}`
                  }}
                >
                  <ResultsPanel />
                </Paper>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>

      {/* Query History Drawer */}
      <Drawer
        anchor="right"
        open={historyDrawerOpen}
        onClose={handleHistoryToggle}
        variant="temporary"
        sx={{
          '& .MuiDrawer-paper': {
            width: isMobile ? '100%' : HISTORY_DRAWER_WIDTH,
            boxSizing: 'border-box'
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            borderBottom: 1,
            borderColor: 'divider'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <HistoryIcon size={18} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Query History
            </Typography>
          </Box>
          <IconButton onClick={handleHistoryToggle}>
            <X size={18} />
          </IconButton>
        </Box>
        <QueryHistory />
      </Drawer>
    </Box>
  );
}

export default SimpleWorkbenchPage;
