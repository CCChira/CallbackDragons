import { createTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
/*
#8dd6ff
#87c8ff
#66d1ff ///gradient colors
*/
// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#8dd6ff', ///blue
    },
    secondary: {
      main: '#47aad5', ///blue
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
