import { createTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
/*
#5ca4a9 
#47aad5
#7e90d0 ///somtehing?
*/
// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: '#5ca4a9 ', ///turqoise
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
