import { storeData, getData } from './Library/AsyncStore';

export default function refreshToken(refresh_token) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://oauth2.googleapis.com/token', true)
    // console.log(paramsUrl)
    let res = {};
    const params = `client_id=850495118825-fqhk6ub7t74vgtsd0ii3orkf088m505n.apps.googleusercontent.com&client_secret=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&grant_type=refresh_token&refresh_token=${refresh_token}`;
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState === 4 && xhr.status === 200) {
            res = JSON.parse(xhr.response);
            console.log('response from refresh token: ', res);
            storeData('access_token', res.access_token);
        } else if (xhr.readyState === 4 && xhr.status === 401) {
            // Token invalid, so prompt for user permission.
            console.log("Error from refresh token")
        }
    };
    xhr.send(params);
}