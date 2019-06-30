const FETCH_COMMENTS_REQUEST = 'FETCH_COMMENTS_REQUEST';
const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE';

const commentsRequested = () => ({
    type: FETCH_COMMENTS_REQUEST,
    payload: []
});

const commentsLoaded = comments => ({
    type: FETCH_COMMENTS_SUCCESS,
    payload: comments
});

const commentsFetchError = error => ({
    type: FETCH_COMMENTS_FAILURE,
    payload: error
});

const fetchComments = dispatch => (languageCode = 'en') => {
    dispatch(commentsRequested());
    import(`../content/comments_${languageCode}`)
        .then(items => dispatch(commentsLoaded(items.default)))
        .catch(error => dispatch(commentsFetchError(error)));
};

export {
    FETCH_COMMENTS_REQUEST,
    FETCH_COMMENTS_SUCCESS,
    FETCH_COMMENTS_FAILURE,
    fetchComments
}
