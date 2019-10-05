import { createMuiTheme } from '@material-ui/core';

const palette = {
  secondary: {
    main: '#F5A623',
    light: '#ECB354',
    dark: '#E49A1F',
    contrastText: '#fff',
  }, // Feel free to change this
  primary: {
    main: '#435d7d',
    contrastText: '#fff',
  },
};

const overrides = {
  MuiButton: {
    root: {
      userSelect: 'none',
      outline: 'none',
      margin: '0px',
      borderRadius: 0,
      boxShadow: 'none !important',
    },
  },
  MuiInputBase: {
    input: {
      background: '#f7f7f7 !important',
      padding: '12px !important',
    },
    root: {
      margin: '0 0 10px 0',
    },
  },
  MuiCard: {
    root: {
      borderRadius: 0,
      boxShadow: '0px 0px 2px 1px #eaeaea',
      overflow: 'visible',
    },
  },
  MuiCardHeader: {
    root: {
      background: [palette.primary.main],
      padding: '12px 16px',
      boxShadow: '0px 8px 16px -8px #bbb, 0 8px 16px 0 #ddd',
    },
    title: {
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
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
  palette,
  breakpoints,
  overrides,
  typography: {
    useNextVariants: true,
  },
});

export default theme;
