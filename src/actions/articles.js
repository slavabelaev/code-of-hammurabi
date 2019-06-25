//import articles from '../content/articles_ru-RU';
import transliterationArticles from '../content/articles_transliteration';

const FETCH_ARTICLES_REQUEST = 'FETCH_ARTICLES_REQUEST';
const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
const FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE';
const TOGGLE_ARTICLES_TRANSLITERATION = 'TOGGLE_ARTICLES_TRANSLITERATION';

const articlesRequested = () => ({
    type: FETCH_ARTICLES_REQUEST,
    payload: []
});

const articlesLoaded = articles => ({
    type: FETCH_ARTICLES_SUCCESS,
    payload: articles
});

const articlesFetchError = error => ({
    type: FETCH_ARTICLES_FAILURE,
    payload: error
});

const toggleArticlesTransliteration = isEnable => ({
    type: TOGGLE_ARTICLES_TRANSLITERATION,
    payload: isEnable
});

const fetchArticles = dispatch => languageCode => {
    dispatch(articlesRequested());
    import(`../content/articles_${languageCode}`)
        .then(items => {
            const articlesWithTransliteration = Object.values(items).map(item => {
                const transliterationItem = transliterationArticles
                    .find(({ orderNumber }) => orderNumber === item.orderNumber);
                return {
                    ...item,
                    transliterationText: transliterationItem ? transliterationItem.transliterationText : null
                };
            });
            dispatch(articlesLoaded(articlesWithTransliteration));
        })
        .catch(error => dispatch(articlesFetchError(error)));
};

export {
    FETCH_ARTICLES_REQUEST,
    FETCH_ARTICLES_SUCCESS,
    FETCH_ARTICLES_FAILURE,
    TOGGLE_ARTICLES_TRANSLITERATION,
    fetchArticles,
    toggleArticlesTransliteration
}
