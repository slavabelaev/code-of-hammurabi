import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from '../pages/home-page';
import NotFoundPage from '../pages/not-found-page';

const availableLanguages = ['ru-RU', 'en-US'];
const languageCode = navigator.language;
const siteLanguage = availableLanguages.includes(languageCode) ? languageCode : 'en-US';

function AppRouter() {
    return (
        <Switch>
            <Redirect from="/" exact to={`/${siteLanguage}`} />
            <Route path='/:languageCode' exact component={HomePage} />
            <Route component={NotFoundPage} />
        </Switch>
    )
}

export default AppRouter;
