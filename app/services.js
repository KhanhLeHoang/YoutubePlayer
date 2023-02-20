import axios from 'axios';
import * as VARIABLE from './variables';

export const postServiceRefreshToken = (refresh_token) => {
    if (refresh_token)
        return axios.post('https://oauth2.googleapis.com/token', {
            client_id: VARIABLE.CLIENT_ID,
            client_secret: VARIABLE.SLIENT_SECRET,
            grant_type: 'refresh_token',
            refresh_token
        })
}

export const getServicePlaylist = (access_token, maxResults = 6) => {
    console.log('get request playlist')
    return axios.get(`https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&maxResults=${maxResults}`
        + `&mine=true&key=${VARIABLE.API_KEY}&`
        + 'access_token=' + access_token);
}

export const getServiceUserData = (access_token) => {
    return axios.get('https://www.googleapis.com/userinfo/v2/me', { headers: { Authorization: `Bearer ${access_token}` } })
}

export const getServiceVideosPlaylist = (playlistId, access_token) => {
    return axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${VARIABLE.API_KEY}&playlistId=${playlistId}&maxResults=50`, { headers: { Authorization: `Bearer ${access_token}` } })
}

export const postServiceCodeForToken = (code) => {
    return axios.post(`https://oauth2.googleapis.com/token`, {
        code,
        client_id: VARIABLE.CLIENT_ID,
        client_secret: VARIABLE.SLIENT_SECRET,
        redirect_uri: 'https://redirect-myapp.surge.sh',
        grant_type: 'authorization_code'
    })
}

export const postServiceRevokeToken = (access_token) => {
    return axios.post(`https://oauth2.googleapis.com/revoke?token=${access_token}`)
}

export const getServiceSearchVideo = (search, pageToken = '') => {
    return axios.get(`https://www.googleapis.com/youtube/v3/search?key=${VARIABLE.API_KEY}&q=${search}&part=snippet&maxResults=200&pageToken=${pageToken}`)
}