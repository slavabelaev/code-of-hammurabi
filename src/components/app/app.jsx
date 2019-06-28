import React, { Fragment } from "react";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Tooltip from "@material-ui/core/Tooltip";
import Divider from "@material-ui/core/Divider";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import LanguageIcon from "@material-ui/icons/Language";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import i18n from "./app.i18n";
import availableLanguages from "../../available-languages";
// AppContainer
import ErrorIndicator from '../error-indicator';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { fetchTitles } from '../../actions/titles';
import { changeLanguage } from '../../actions';
import { toggleArticlesTransliteration } from '../../actions/articles';
import {Container} from "@material-ui/core";
import AppRouter from "../app-router";
import { toHashTitle } from '../../utils';
import Head from '../head';

const navigationWidth = 280;
const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    navigation: {
        [theme.breakpoints.up("sm")]: {
            width: navigationWidth,
            flexShrink: 0
        }
    },
    appBar: {
        marginLeft: navigationWidth,
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${navigationWidth}px)`
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
    navigationPaper: {
        width: navigationWidth
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(2)
    },
    transliterationControl: {
        marginLeft: 'auto'
    },
    languageButton: {

    },
    circularProgress: {
    },
    listItemsLoremIpsum: {
        height: 20,
        width: '100%',
        backgroundColor: '#f5f5f5',
        borderRadius: 4
    }
}));

function App({
    languageCode = 'en',
    isLoadedItems,
    listItems = [],
    isCheckedSwitch = false,
    container,
    onSwitchToggle,
    onLanguageChange
}) {
    const language = i18n[languageCode] || i18n['en'];
    const classes = useStyles();
    const theme = useTheme();
    const [navigationOpen, setDrawerOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedNavigationItem, setSelectedNavigationItem] = React.useState(null);

    function handleDrawerToggle() {
        setDrawerOpen(!navigationOpen);
    }

    function handleDrawerClose(selectedNavigationItem) {
        setDrawerOpen(false);
        setSelectedNavigationItem(selectedNavigationItem);
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
                id="language-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseLanguageMenu}
            >
                {languages.map(({ title, code }) => (
                    <MenuItem
                        key={'language-item-' + code}
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

    const fakeContent = (
        <List>
            {Array(40).fill(null).map((value, index) => {
                const width = Math.floor(Math.random() * 70 + 30) + '%';
                return (
                    <ListItem
                        button
                        key={'navigation-item-' + index}
                        onClick={handleDrawerClose}
                    >
                        <ListItemIcon>
                            <FiberManualRecordIcon />
                        </ListItemIcon>
                        <div className={classes.listItemsLoremIpsum} style={{width}} />
                    </ListItem>
                )
            })}
        </List>
    );

    const navigation = isLoadedItems ? (
        <List>
            {listItems.map(({ from, title, icon }, index) => {
                const hashTitle = toHashTitle(title);
                const hashLink = '#' + hashTitle;
                const isFirstItem = index === 0;
                const isPenultimateItem = index === listItems.length - 2;
                return (
                    <Fragment key={hashTitle + from}>
                        <ListItem
                            button
                            selected={selectedNavigationItem === from}
                            component={Link}
                            href={hashLink}
                            onClick={event => {
                                event.preventDefault();
                                document.scrollingElement.scrollTop = document.getElementById(hashTitle).offsetTop - 80;
                                handleDrawerClose(from);
                            }}
                        >
                            <ListItemIcon>
                                <i className="material-icons">
                                    {icon}
                                </i>
                            </ListItemIcon>
                            <ListItemText primary={title} />
                        </ListItem>
                        {(isFirstItem || isPenultimateItem) ? <Divider /> : null}
                    </Fragment>
                )
            })}
        </List>
    ) : fakeContent;

    return (
        <div className={classes.root}>
            <CssBaseline />
            {renderLanguageMenu()}
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label={language.openDrawer}
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
                    <Tooltip title={language.switchLanguage}>
                        <IconButton
                            color="inherit"
                            aria-label={language.switchLanguage}
                            edge="start"
                            onClick={handleOpenLanguageMenu}
                            className={classes.languageButton}
                        >
                            <LanguageIcon />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            <nav className={classes.navigation} aria-label={language.navigation}>
                <Hidden smUp implementation="css">
                    <SwipeableDrawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === "rtl" ? "right" : "left"}
                        open={navigationOpen}
                        onClose={handleDrawerToggle}
                        onOpen={handleDrawerToggle}
                        classes={{
                            paper: classes.navigationPaper
                        }}
                        ModalProps={{
                            keepMounted: true // Better open performance on mobile.
                        }}
                    >
                        {navigation}
                    </SwipeableDrawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <SwipeableDrawer
                        classes={{
                            paper: classes.navigationPaper
                        }}
                        variant="permanent"
                        open={navigationOpen}
                        onClose={handleDrawerToggle}
                        onOpen={handleDrawerToggle}
                    >
                        {navigation}
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

        if (titlesFetchError) {
            return <ErrorIndicator error={titlesFetchError} />
        }

        return (
            <div>
                <App
                    languageCode={languageCode}
                    isLoadedItems={isLoadedTitles}
                    listItems={titles}
                    isCheckedSwitch={isEnableTransliteration}
                    onSwitchToggle={toggleArticlesTransliteration}
                    onLanguageChange={changeLanguage}
                />
                <Head languageCode={languageCode} />
            </div>
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
    changeLanguage: languageCode => changeLanguage(dispatch)(languageCode),
    toggleArticlesTransliteration: () => dispatch(toggleArticlesTransliteration())
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(AppContainer);

