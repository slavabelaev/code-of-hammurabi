const FETCH_TITLES_REQUEST = 'FETCH_TITLES_REQUEST';
const FETCH_TITLES_SUCCESS = 'FETCH_TITLES_SUCCESS';
const FETCH_TITLES_FAILURE = 'FETCH_TITLES_FAILURE';

const titlesRequested = () => ({
    type: FETCH_TITLES_REQUEST,
    payload: []
});

const titlesLoaded = titles => ({
    type: FETCH_TITLES_SUCCESS,
    payload: titles
});

const titlesFetchError = error => ({
    type: FETCH_TITLES_FAILURE,
    payload: error
});

const fetchTitles = dispatch => (languageCode = 'en-US') => {
    dispatch(titlesRequested());
    import(`../content/titles_${languageCode}`)
        .then(items => {
            console.log('items', dispatch(titlesLoaded(items.default)));
        })
        .catch(error => dispatch(titlesFetchError(error)));
};

export {
    FETCH_TITLES_REQUEST,
    FETCH_TITLES_SUCCESS,
    FETCH_TITLES_FAILURE,
    fetchTitles
}
