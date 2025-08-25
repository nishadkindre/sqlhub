import React, { useState } from 'react';
import {
  Box,
  Grid,
  useTheme,
  useMediaQuery,
  IconButton,
  Fab,
  Drawer,
  Paper,
  Tooltip,
  Divider,
  Typography,
  Stack
} from '@mui/material';
import {
  Menu as MenuIcon,
  History as HistoryIcon,
  ChevronLeft,
  ChevronRight,
  Database,
  Terminal,
  BarChart3,
  X
} from 'lucide-react';
import DatabaseExplorer from '../components/DatabaseExplorer';
import EnhancedSQLEditor from '../components/EnhancedSQLEditor';
import EnhancedResultsPanel from '../components/EnhancedResultsPanel';
import QueryHistory from '../components/QueryHistory';

const DRAWER_WIDTH = 320;
const HISTORY_DRAWER_WIDTH = 400;

function WorkbenchPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const [leftDrawerOpen, setLeftDrawerOpen] = useState(!isMobile);
  const [historyDrawerOpen, setHistoryDrawerOpen] = useState(false);
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false);

  const handleLeftDrawerToggle = () => {
    setLeftDrawerOpen(!leftDrawerOpen);
  };

  const handleHistoryToggle = () => {
    setHistoryDrawerOpen(!historyDrawerOpen);
  };

  const handleRightPanelToggle = () => {
    setRightPanelCollapsed(!rightPanelCollapsed);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: 'calc(100vh - 64px)', // Account for header height
        overflow: 'auto',
        background:
          theme.palette.mode === 'dark'
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
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            '& .MuiDrawer-paper': {
              // width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              background:
                theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
                  : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'}`
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
            // width: leftDrawerOpen ? DRAWER_WIDTH : 0,
            transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            overflow: 'hidden',
            background:
              theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
                : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            borderRight: leftDrawerOpen
              ? `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'}`
              : 'none',
            borderRadius: 0,
            opacity: leftDrawerOpen ? 1 : 0,
            transform: leftDrawerOpen ? 'translateX(0)' : 'translateX(-100%)',
            '& .MuiBox-root': {
              transition: 'opacity 0.3s ease-in-out 0.1s'
            }
          }}
        >
          <DatabaseExplorer
            open={leftDrawerOpen}
            onClose={handleLeftDrawerToggle}
            temporary={false}
          />
        </Paper>
      )}

      {/* Main Content Area with Grid System */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
          minWidth: 0
        }}
      >
        {/* Main Grid Layout */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 2, position: 'relative' }}>
          <Grid container spacing={2} sx={{ height: '100%' }}>
            {/* SQL Editor */}
            <Grid size={{ xs: 12, md: 6 }}>
              <EnhancedSQLEditor
                onHistoryToggle={handleHistoryToggle}
                historyDrawerOpen={historyDrawerOpen}
                onExplorerToggle={handleLeftDrawerToggle}
                explorerOpen={leftDrawerOpen}
              />
            </Grid>

            {/* Results Panel */}
            {!rightPanelCollapsed && (
              <Grid
                size={{ xs: 12, md: 6 }}
              >
                <EnhancedResultsPanel />
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
            // width: isMobile ? '100%' : HISTORY_DRAWER_WIDTH,
            boxSizing: 'border-box',
            background:
              theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
                : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'}`
          }
        }}
      >
        {/* History Drawer Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            borderBottom: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                p: 1,
                height: 36,
                width: 36,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: 'white'
              }}
            >
              <HistoryIcon size={18} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Query History
            </Typography>
          </Box>
          <IconButton
            onClick={handleHistoryToggle}
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              '&:hover': {
                background: 'error.light',
                color: 'error.main'
              }
            }}
          >
            <X size={18} />
          </IconButton>
        </Box>
        <QueryHistory />
      </Drawer>
    </Box>
  );
}

export default WorkbenchPage;
