const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';

const changeLanguage = languageCode => ({
    type: CHANGE_LANGUAGE,
    payload: languageCode
});

export {
    CHANGE_LANGUAGE,
    changeLanguage
}
