import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from '../pages/home-page';
import NotFoundPage from '../pages/not-found-page';
import availableLanguages from '../../available-languages';

const languageCode = navigator.language.substring(0, 2);
const siteLanguage = availableLanguages[languageCode] ? availableLanguages[languageCode].code : 'en';

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
