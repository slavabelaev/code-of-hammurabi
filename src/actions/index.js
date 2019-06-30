import {fetchTitles} from "./titles";
import {fetchArticles} from "./articles";
import {fetchComments} from "./comments";

const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';

const changeLanguage = dispatch => languageCode => {
    fetchTitles(dispatch)(languageCode);
    fetchArticles(dispatch)(languageCode);
    fetchComments(dispatch)(languageCode);
    dispatch({
        type: CHANGE_LANGUAGE,
        payload: languageCode
    })
};

export {
    CHANGE_LANGUAGE,
    changeLanguage
}
