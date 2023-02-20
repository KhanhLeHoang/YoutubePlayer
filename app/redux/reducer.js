import { REFRESH_TOKEN_FAILURE, REFRESH_TOKEN_SUCCESS, SET_ACCESS_TOKEN, SET_USER_DATA } from "./actions";

const initialState = {
    access_token: '',
    userData: null
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_ACCESS_TOKEN:
            return { ...state, access_token: action.payload };
        case SET_USER_DATA:
            return { ...state, userData: action.payload };
        case REFRESH_TOKEN_SUCCESS:
            return { ...state, access_token: action.payload };
        case REFRESH_TOKEN_FAILURE:
            return { ...state };
        default:
            return state;
    }
}

export default reducer;