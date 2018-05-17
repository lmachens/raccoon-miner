import { createMuiTheme } from '@material-ui/core/styles';

export const light = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      light: '#ffa140',
      main: '#ef7102',
      dark: '#b54200',
      contrastText: '#fff'
    }
  }
});
