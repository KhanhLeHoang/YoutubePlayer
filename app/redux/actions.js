import { getData } from '../library/AsyncStore';
import { postServiceRefreshToken } from '../services';

export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const SET_USER_DATA = 'SET_USER_DATA';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILURE = 'REFRESH_TOKEN_FAILURE';

export const setAccess_token = token => dispatch => {
    dispatch({
        type: SET_ACCESS_TOKEN,
        payload: token
    })
};

export const setUserData = data => dispatch => {
    dispatch({
        type: SET_USER_DATA,
        payload: data
    })
};

export const refreshToken = () => (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
        getData('refresh_token').then(async (refresh_token) => {
            const reduxState = getState().reducer;
            console.log('refresh-token: ', refresh_token)
            const { data } = await postServiceRefreshToken(refresh_token);
            console.log(data)
            if (data && data.access_token && data.access_token !== reduxState.access_token) {
                dispatch({
                    type: REFRESH_TOKEN_SUCCESS,
                    payload: data.access_token
                })
                resolve(data.access_token);
            }
            else {
                dispatch({
                    type: REFRESH_TOKEN_FAILURE
                })
                reject('Refresh token fail');
            }
        }).catch(e => { console.log('Error get AsyncStorage refresh_token (actions.js)'); console.log(e) })
    })
}
