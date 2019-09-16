import { createMuiTheme } from '@material-ui/core';

const overrides = {
  MuiButton: {
    root: {
      userSelect: 'none',
      outline: 'none',
      margin: '8px',
      borderRadius: 0,
      boxShadow: 'none !important',
    },
  },
};

const breakpoints = {
  keys: ['sm', 'md', 'lg', 'xl'],
  values: {
    sm: '540px',
    md: '769px',
    lg: '1024px',
    xl: '1220px',
  },
};

const theme = createMuiTheme({
  spacing: 4,
  palette: {
    secondary: {
      main: '#F5A623',
      light: '#ECB354',
      dark: '#E49A1F',
      contrastText: '#fff',
    }, // Feel free to change this
    primary: {
      main: '#0078FF',
      light: '#3696FF',
      dark: '#0068DD',
      contrastText: '#fff',
    },
  },
  breakpoints,
  overrides,
  typography: {
    useNextVariants: true,
  },
});

export default theme;
