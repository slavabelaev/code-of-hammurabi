import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import blueGrey from '@material-ui/core/colors/blueGrey';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: grey[900],
            ...grey
        },
        secondary: blueGrey,
    },
    status: {
        danger: 'red',
    },
});

export default theme;
