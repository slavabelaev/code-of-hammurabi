import {fetchTitles} from "./titles";
import {fetchArticles} from "./articles";

const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';

const changeLanguage = dispatch => languageCode => {
    fetchTitles(dispatch)(languageCode);
    fetchArticles(dispatch)(languageCode);
    dispatch({
        type: CHANGE_LANGUAGE,
        payload: languageCode
    })
};

export {
    CHANGE_LANGUAGE,
    changeLanguage
}
