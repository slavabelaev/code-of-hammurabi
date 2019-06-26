import React from "react";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import LanguageIcon from "@material-ui/icons/Language";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import i18n from "./app.i18n";
import availableLanguages from "../../available-languages";
// AppContainer
import ErrorIndicator from '../error-indicator';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { fetchTitles } from '../../actions/titles';
import { changeLanguage } from '../../actions';
import { toggleArticlesTransliteration, fetchArticles } from '../../actions/articles';
import {Container} from "@material-ui/core";
import AppRouter from "../app-router";
import { toHashTitle } from '../../utils';

const drawerWidth = 280;
const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },
    toolbar: {
        minHeight: theme.mixins.toolbar.minHeight / 2,
        [theme.breakpoints.up("sm")]: theme.mixins.toolbar
    },
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(2)
    },
    transliterationControl: {
        marginLeft: 'auto'
    },
    languageButton: {

    }
}));

function App({
     languageCode = 'en',
     listItems = [],
     isCheckedSwitch = false,
     container,
     onSwitchToggle,
     onLanguageChange
}) {
    const language = i18n[languageCode] || i18n['en'];
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen);
    }

    function handleDrawerClose() {
        setMobileOpen(false);
    }

    function handleOpenLanguageMenu(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleCloseLanguageMenu(languageCode) {
        const hasLanguageCode = (typeof languageCode === 'string');
        setAnchorEl(null);
        hasLanguageCode && onLanguageChange(languageCode);
    }

    const renderLanguageMenu = () => {
        const languages = Object.values(availableLanguages);
        return (
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseLanguageMenu}
            >
                {languages.map(({ title, code }) => (
                    <MenuItem
                        key={code}
                        component={RouterLink}
                        disabled={languageCode === code}
                        to={code}
                        onClick={() => handleCloseLanguageMenu(code)}
                    >
                        {title}
                    </MenuItem>
                ))}
            </Menu>
        )
    };

    const drawer = (
        <div>
            <List>
                {listItems.map(({ title, from }, index) => {
                    return (
                        <ListItem
                            button
                            component={Link}
                            href={'#' + toHashTitle(title)}
                            key={title}
                            onClick={handleDrawerClose}
                        >
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={title} />
                        </ListItem>
                    )
                })}
            </List>
        </div>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            {renderLanguageMenu()}
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {language.title}
                    </Typography>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isCheckedSwitch}
                                onChange={onSwitchToggle}
                            />
                        }
                        label={language.transliteration}
                        className={classes.transliterationControl}
                    />
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        edge="start"
                        onClick={handleOpenLanguageMenu}
                        className={classes.languageButton}
                    >
                        <LanguageIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="Navigation">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <SwipeableDrawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === "rtl" ? "right" : "left"}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        onOpen={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        ModalProps={{
                            keepMounted: true // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </SwipeableDrawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <SwipeableDrawer
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        variant="permanent"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        onOpen={handleDrawerToggle}
                    >
                        {drawer}
                    </SwipeableDrawer>
                </Hidden>
            </nav>
            <Container component="main" maxWidth="md" className={classes.content}>
                <div className={classes.toolbar} />
                <AppRouter />
            </Container>
        </div>
    );
}

class AppContainer extends React.Component {

    componentDidMount() {
        const { languageCode, fetchTitles } = this.props;
        fetchTitles(languageCode);
    }

    render() {
        const {
            titles: {
                isLoaded: isLoadedTitles,
                serviceData: titles,
                error: titlesFetchError
            },
            articles: {
                isEnableTransliteration
            },
            languageCode,
            toggleArticlesTransliteration,
            changeLanguage
        } = this.props;

        if (!isLoadedTitles) {
            return <CircularProgress />
        }

        if (titlesFetchError) {
            return <ErrorIndicator error={titlesFetchError} />
        }

        return (
            <App
                languageCode={languageCode}
                listItems={titles}
                isCheckedSwitch={isEnableTransliteration}
                onSwitchToggle={toggleArticlesTransliteration}
                onLanguageChange={changeLanguage}
            />
        )
    }
}

const mapStateToProps = ({ titles, articles, languageCode }) => ({
    titles,
    articles,
    languageCode
});

const mapDispatchToProps = dispatch => ({
    fetchTitles: fetchTitles(dispatch),
    changeLanguage: languageCode => {
        dispatch(changeLanguage(languageCode));
        fetchTitles(dispatch)(languageCode);
        fetchArticles(dispatch)(languageCode)
    },
    toggleArticlesTransliteration: () => dispatch(toggleArticlesTransliteration())
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(AppContainer);

