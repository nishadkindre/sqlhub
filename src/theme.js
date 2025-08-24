import { createTheme } from '@mui/material/styles';

// Elite Light Theme - Sophisticated and Modern
const lightTheme = {
  palette: {
    mode: 'light',
    primary: {
      main: '#6366f1', // Modern indigo
      dark: '#4f46e5',
      light: '#818cf8',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#f59e0b', // Warm amber
      dark: '#d97706',
      light: '#fbbf24',
      contrastText: '#ffffff'
    },
    success: {
      main: '#10b981', // Emerald
      dark: '#059669',
      light: '#34d399'
    },
    error: {
      main: '#ef4444', // Modern red
      dark: '#dc2626',
      light: '#f87171'
    },
    warning: {
      main: '#f59e0b', // Amber
      dark: '#d97706',
      light: '#fbbf24'
    },
    info: {
      main: '#3b82f6', // Blue
      dark: '#2563eb',
      light: '#60a5fa'
    },
    background: {
      default: '#fafbfc', // Ultra light gray
      paper: '#ffffff',
      elevated: '#f8fafc' // Slightly elevated surfaces
    },
    text: {
      primary: '#0f172a', // Slate 900
      secondary: '#64748b', // Slate 500
      disabled: '#cbd5e1' // Slate 300
    },
    divider: '#e2e8f0', // Slate 200
    action: {
      hover: 'rgba(99, 102, 241, 0.04)',
      selected: 'rgba(99, 102, 241, 0.08)',
      disabled: 'rgba(100, 116, 139, 0.26)',
      disabledBackground: 'rgba(100, 116, 139, 0.12)',
      focus: 'rgba(99, 102, 241, 0.12)'
    },
    grey: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a'
    }
  }
};

// Elite Dark Theme - Professional and Elegant
const darkTheme = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#818cf8', // Lighter indigo for dark mode
      dark: '#6366f1',
      light: '#a5b4fc',
      contrastText: '#0f172a'
    },
    secondary: {
      main: '#fbbf24', // Lighter amber for dark mode
      dark: '#f59e0b',
      light: '#fcd34d',
      contrastText: '#0f172a'
    },
    success: {
      main: '#34d399', // Lighter emerald
      dark: '#10b981',
      light: '#6ee7b7'
    },
    error: {
      main: '#f87171', // Lighter red
      dark: '#ef4444',
      light: '#fca5a5'
    },
    warning: {
      main: '#fbbf24', // Amber
      dark: '#f59e0b',
      light: '#fcd34d'
    },
    info: {
      main: '#60a5fa', // Lighter blue
      dark: '#3b82f6',
      light: '#93c5fd'
    },
    background: {
      default: '#0a0f1c', // Deep navy
      paper: '#111827', // Gray 900
      elevated: '#1f2937' // Gray 800 for elevated surfaces
    },
    text: {
      primary: '#f8fafc', // Slate 50
      secondary: '#cbd5e1', // Slate 300
      disabled: '#64748b' // Slate 500
    },
    divider: '#374151', // Gray 700
    action: {
      hover: 'rgba(129, 140, 248, 0.08)',
      selected: 'rgba(129, 140, 248, 0.12)',
      disabled: 'rgba(203, 213, 225, 0.3)',
      disabledBackground: 'rgba(203, 213, 225, 0.12)',
      focus: 'rgba(129, 140, 248, 0.16)'
    },
    grey: {
      50: '#0a0f1c',
      100: '#111827',
      200: '#1f2937',
      300: '#374151',
      400: '#4b5563',
      500: '#6b7280',
      600: '#9ca3af',
      700: '#d1d5db',
      800: '#e5e7eb',
      900: '#f9fafb'
    }
  }
};

const createAppTheme = (mode = 'light') => {
  const themeConfig = mode === 'light' ? lightTheme : darkTheme;

  return createTheme({
    ...themeConfig,
    typography: {
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightSemiBold: 600,
      fontWeightBold: 700,
      h1: {
        fontSize: '3rem',
        fontWeight: 700,
        letterSpacing: '-0.04em',
        lineHeight: 1.167,
        fontFamily: '"Inter", sans-serif'
      },
      h2: {
        fontSize: '2.25rem',
        fontWeight: 700,
        letterSpacing: '-0.03em',
        lineHeight: 1.2,
        fontFamily: '"Inter", sans-serif'
      },
      h3: {
        fontSize: '1.875rem',
        fontWeight: 600,
        letterSpacing: '-0.025em',
        lineHeight: 1.267,
        fontFamily: '"Inter", sans-serif'
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
        letterSpacing: '-0.02em',
        lineHeight: 1.334,
        fontFamily: '"Inter", sans-serif'
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
        letterSpacing: '-0.015em',
        lineHeight: 1.4,
        fontFamily: '"Inter", sans-serif'
      },
      h6: {
        fontSize: '1.125rem',
        fontWeight: 600,
        letterSpacing: '-0.01em',
        lineHeight: 1.5,
        fontFamily: '"Inter", sans-serif'
      },
      subtitle1: {
        fontSize: '1rem',
        fontWeight: 500,
        lineHeight: 1.75,
        letterSpacing: '0.00938em',
        fontFamily: '"Inter", sans-serif'
      },
      subtitle2: {
        fontSize: '0.875rem',
        fontWeight: 500,
        lineHeight: 1.57,
        letterSpacing: '0.00714em',
        fontFamily: '"Inter", sans-serif'
      },
      body1: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.75,
        letterSpacing: '0.00938em',
        fontFamily: '"Inter", sans-serif'
      },
      body2: {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: 1.6,
        letterSpacing: '0.01071em',
        fontFamily: '"Inter", sans-serif'
      },
      button: {
        fontSize: '0.875rem',
        fontWeight: 500,
        letterSpacing: '0.02857em',
        textTransform: 'none',
        fontFamily: '"Inter", sans-serif'
      },
      caption: {
        fontSize: '0.75rem',
        fontWeight: 400,
        lineHeight: 1.66,
        letterSpacing: '0.03333em',
        fontFamily: '"Inter", sans-serif'
      },
      overline: {
        fontSize: '0.75rem',
        fontWeight: 500,
        lineHeight: 2.66,
        letterSpacing: '0.08333em',
        textTransform: 'uppercase',
        fontFamily: '"Inter", sans-serif'
      },
      code: {
        fontFamily:
          '"JetBrains Mono", "Fira Code", "SF Mono", "Monaco", "Cascadia Code", "Roboto Mono", "Consolas", "Courier New", monospace',
        fontSize: '0.875rem',
        fontWeight: 400,
        fontFeatureSettings: '"calt", "liga"',
        fontVariantLigatures: 'common-ligatures'
      }
    },
    shape: {
      borderRadius: 12
    },
    shadows: [
      'none',
      // Sophisticated shadows based on theme mode
      mode === 'light'
        ? '0px 1px 3px rgba(99, 102, 241, 0.05), 0px 1px 2px rgba(99, 102, 241, 0.1)'
        : '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)',
      mode === 'light'
        ? '0px 2px 6px rgba(99, 102, 241, 0.08), 0px 2px 4px rgba(99, 102, 241, 0.12)'
        : '0px 2px 6px rgba(0, 0, 0, 0.16), 0px 2px 4px rgba(0, 0, 0, 0.24)',
      mode === 'light'
        ? '0px 4px 12px rgba(99, 102, 241, 0.1), 0px 4px 8px rgba(99, 102, 241, 0.15)'
        : '0px 4px 12px rgba(0, 0, 0, 0.18), 0px 4px 8px rgba(0, 0, 0, 0.32)',
      mode === 'light'
        ? '0px 8px 24px rgba(99, 102, 241, 0.12), 0px 8px 16px rgba(99, 102, 241, 0.18)'
        : '0px 8px 24px rgba(0, 0, 0, 0.2), 0px 8px 16px rgba(0, 0, 0, 0.36)',
      // Continue with standard shadows
      '0px 10px 30px rgba(0, 0, 0, 0.15)',
      '0px 12px 36px rgba(0, 0, 0, 0.18)',
      '0px 14px 42px rgba(0, 0, 0, 0.2)',
      '0px 16px 48px rgba(0, 0, 0, 0.22)',
      '0px 18px 54px rgba(0, 0, 0, 0.24)',
      '0px 20px 60px rgba(0, 0, 0, 0.26)',
      '0px 22px 66px rgba(0, 0, 0, 0.28)',
      '0px 24px 72px rgba(0, 0, 0, 0.3)',
      '0px 26px 78px rgba(0, 0, 0, 0.32)',
      '0px 28px 84px rgba(0, 0, 0, 0.34)',
      '0px 30px 90px rgba(0, 0, 0, 0.36)',
      '0px 32px 96px rgba(0, 0, 0, 0.38)',
      '0px 34px 102px rgba(0, 0, 0, 0.4)',
      '0px 36px 108px rgba(0, 0, 0, 0.42)',
      '0px 38px 114px rgba(0, 0, 0, 0.44)',
      '0px 40px 120px rgba(0, 0, 0, 0.46)',
      '0px 42px 126px rgba(0, 0, 0, 0.48)',
      '0px 44px 132px rgba(0, 0, 0, 0.5)',
      '0px 46px 138px rgba(0, 0, 0, 0.52)',
      '0px 48px 144px rgba(0, 0, 0, 0.54)'
    ],
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '@import':
            'url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap")',
          body: {
            fontFamily: '"Inter", sans-serif',
            fontOpticalSizing: 'auto',
            fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"',
            fontVariationSettings: '"slnt" 0'
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 12,
            fontWeight: 500,
            letterSpacing: '0.01em',
            fontFamily: '"Inter", sans-serif',
            padding: '10px 24px',
            fontSize: '0.875rem',
            boxShadow: 'none',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              boxShadow:
                mode === 'light'
                  ? '0 4px 12px rgba(99, 102, 241, 0.15)'
                  : '0 4px 12px rgba(129, 140, 248, 0.25)',
              transform: 'translateY(-1px)'
            },
            '&:focus': {
              outline: 'none'
            }
          },
          contained: {
            background:
              mode === 'light'
                ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                : 'linear-gradient(135deg, #818cf8 0%, #a78bfa 100%)',
            '&:hover': {
              background:
                mode === 'light'
                  ? 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)'
                  : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
            }
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            border:
              mode === 'light'
                ? '1px solid rgba(99, 102, 241, 0.08)'
                : '1px solid rgba(129, 140, 248, 0.12)',
            backgroundImage:
              mode === 'dark'
                ? 'linear-gradient(rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02))'
                : 'linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8))',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            border:
              mode === 'light'
                ? '1px solid rgba(99, 102, 241, 0.08)'
                : '1px solid rgba(129, 140, 248, 0.12)',
            boxShadow:
              mode === 'light'
                ? '0 8px 32px rgba(99, 102, 241, 0.08)'
                : '0 8px 32px rgba(0, 0, 0, 0.3)',
            backgroundImage:
              mode === 'dark'
                ? 'linear-gradient(rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02))'
                : 'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9))',
            backdropFilter: 'blur(16px)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow:
                mode === 'light'
                  ? '0 12px 40px rgba(99, 102, 241, 0.15)'
                  : '0 12px 40px rgba(0, 0, 0, 0.4)'
            }
          }
        }
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor:
              mode === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(17, 24, 39, 0.9)',
            backdropFilter: 'blur(20px)',
            borderBottom:
              mode === 'light'
                ? '1px solid rgba(99, 102, 241, 0.08)'
                : '1px solid rgba(129, 140, 248, 0.12)',
            boxShadow:
              mode === 'light'
                ? '0 4px 20px rgba(99, 102, 241, 0.08)'
                : '0 4px 20px rgba(0, 0, 0, 0.3)',
            color: mode === 'light' ? '#0f172a' : '#f8fafc'
          }
        }
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            fontFamily: '"JetBrains Mono", "Fira Code", monospace',
            fontSize: '0.8125rem',
            fontVariantNumeric: 'tabular-nums',
            borderColor: mode === 'light' ? '#e2e8f0' : '#374151',
            padding: '16px'
          },
          head: {
            fontWeight: 600,
            backgroundColor:
              mode === 'light' ? 'rgba(99, 102, 241, 0.04)' : 'rgba(129, 140, 248, 0.08)',
            fontSize: '0.875rem'
          }
        }
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: '"Inter", sans-serif'
          },
          code: {
            fontFamily: '"JetBrains Mono", "Fira Code", monospace',
            backgroundColor:
              mode === 'light' ? 'rgba(99, 102, 241, 0.06)' : 'rgba(129, 140, 248, 0.12)',
            padding: '4px 8px',
            borderRadius: '6px',
            fontSize: '0.875rem',
            fontWeight: 500
          }
        }
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            borderRadius: '12px !important',
            border:
              mode === 'light'
                ? '1px solid rgba(99, 102, 241, 0.08)'
                : '1px solid rgba(129, 140, 248, 0.12)',
            backgroundColor: mode === 'light' ? '#fafbfc' : '#1f2937',
            '&:before': {
              display: 'none'
            },
            '&.Mui-expanded': {
              margin: '8px 0'
            }
          }
        }
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            backgroundColor:
              mode === 'light' ? 'rgba(99, 102, 241, 0.03)' : 'rgba(129, 140, 248, 0.06)',
            borderRadius: '12px 12px 0 0',
            fontWeight: 500,
            '&:hover': {
              backgroundColor:
                mode === 'light' ? 'rgba(99, 102, 241, 0.06)' : 'rgba(129, 140, 248, 0.1)'
            }
          }
        }
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '0.875rem',
            fontFamily: '"Inter", sans-serif',
            minHeight: 48,
            padding: '12px 24px',
            borderRadius: '8px',
            margin: '0 4px',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            '&.Mui-selected': {
              color: mode === 'light' ? '#6366f1' : '#818cf8',
              backgroundColor:
                mode === 'light' ? 'rgba(99, 102, 241, 0.08)' : 'rgba(129, 140, 248, 0.12)'
            },
            '&:focus': {
              outline: 'none'
            }
          }
        }
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            '& .MuiTabs-indicator': {
              display: 'none'
            }
          }
        }
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 12,
              fontFamily: '"Inter", sans-serif',
              '& fieldset': {
                borderColor: mode === 'light' ? '#e2e8f0' : '#374151',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
              },
              '&:hover fieldset': {
                borderColor: mode === 'light' ? '#6366f1' : '#818cf8'
              },
              '&.Mui-focused fieldset': {
                borderColor: mode === 'light' ? '#6366f1' : '#818cf8',
                borderWidth: 2
              },
              '&:focus': {
                outline: 'none'
              }
            }
          }
        }
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontFamily: '"Inter", sans-serif',
            fontWeight: 500,
            fontSize: '0.75rem'
          }
        }
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              backgroundColor:
                mode === 'light' ? 'rgba(99, 102, 241, 0.08)' : 'rgba(129, 140, 248, 0.12)',
              transform: 'scale(1.05)'
            },
            '&:focus': {
              outline: 'none'
            }
          }
        }
      }
    },
    spacing: 8
  });
};

export default createAppTheme;
