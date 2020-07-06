import hash from '../hash';

export const FETCH_INIT = 'FETCH_INIT';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const GET_PLAYLIST = 'GET_PLAYLIST';

// Data fetch reducer to manage state during API calls
function reducer(state, action) {
    switch (action.type) {
        case FETCH_INIT:
            return {
                ...state,
                token: hash.access_token,
                no_data: true,
                is_error: false,
                is_loading: true,
            };
        case FETCH_SUCCESS:
            return {
                ...state,
                token: hash.access_token,
                item: action.payload.item,
                no_data: false,
                is_error: false,
                is_loading: false
            };
        case FETCH_FAILURE:
            return {
                ...state,
                no_data: true,
                is_error: true,
                is_loading: false,
            };
        case GET_PLAYLIST:
            return {
                ...state,
                playlistId: action.payload.playlistId,
            };
        default:
            throw new Error();
    }
}

export default reducer