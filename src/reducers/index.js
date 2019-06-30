import { FETCH_TITLES_REQUEST, FETCH_TITLES_SUCCESS, FETCH_TITLES_FAILURE } from '../actions/titles';
import { FETCH_COMMENTS_REQUEST, FETCH_COMMENTS_SUCCESS, FETCH_COMMENTS_FAILURE } from '../actions/comments';
import { FETCH_ARTICLES_REQUEST, FETCH_ARTICLES_SUCCESS, FETCH_ARTICLES_FAILURE, TOGGLE_ARTICLES_TRANSLITERATION } from '../actions/articles';
import {CHANGE_LANGUAGE} from "../actions";
import availableLanguages from "../available-languages";

let languageCode = window.location.pathname.replace(/\//, '');
languageCode = availableLanguages[languageCode] ? availableLanguages[languageCode].code : navigator.language.substring(0, 2);

const initialState = {
    titles: {
        isLoaded: false,
        serviceData: [],
        error: null
    },
    comments: {
        isLoaded: false,
        serviceData: [],
        error: null
    },
    articles: {
        isLoaded: false,
        serviceData: [],
        error: null,
        isEnableTransliteration: false
    },
    languageCode: languageCode
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case FETCH_COMMENTS_REQUEST: return {
            ...state,
            comments: {
                isLoaded: false,
                serviceData: [],
                error: null
            }
        };
        case FETCH_COMMENTS_SUCCESS: return {
            ...state,
            comments: {
                isLoaded: true,
                serviceData: action.payload,
                error: null
            }
        };
        case FETCH_COMMENTS_FAILURE: return {
            ...state,
            comments: {
                isLoaded: true,
                serviceData: [],
                error: action.payload
            }
        };

        case FETCH_TITLES_REQUEST: return {
            ...state,
            titles: {
                isLoaded: false,
                serviceData: [],
                error: null
            }
        };
        case FETCH_TITLES_SUCCESS: return {
            ...state,
            titles: {
                isLoaded: true,
                serviceData: action.payload,
                error: null
            }
        };
        case FETCH_TITLES_FAILURE: return {
            ...state,
            titles: {
                isLoaded: true,
                serviceData: [],
                error: action.payload
            }
        };

        case FETCH_ARTICLES_REQUEST: return {
            ...state,
            articles: {
                ...state.articles,
                isLoaded: false,
                serviceData: [],
                error: null
            }
        };
        case FETCH_ARTICLES_SUCCESS: return {
            ...state,
            articles: {
                ...state.articles,
                isLoaded: true,
                serviceData: action.payload,
                error: null
            }
        };
        case FETCH_ARTICLES_FAILURE: return {
            ...state,
            articles: {
                ...state.articles,
                isLoaded: true,
                serviceData: [],
                error: action.payload
            }
        };
        case TOGGLE_ARTICLES_TRANSLITERATION: return {
            ...state,
            articles: {
                ...state.articles,
                isEnableTransliteration: !state.articles.isEnableTransliteration
            }
        };
        case CHANGE_LANGUAGE: return {
            ...state,
            languageCode: action.payload
        };
        default: return state;
    }
};

export default rootReducer;
