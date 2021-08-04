import queryString from 'query-string'
import { Base64 } from 'js-base64';
import {ProductionURLEnv} from 'app/production'

const authEndPoint = 'https://accounts.spotify.com/authorize'
const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-read-private",
    "user-library-modify",
    "user-library-read",
    "user-read-email",
    "user-top-read",
    "user-follow-read",
    "user-follow-modify",
    "user-modify-playback-state",
    "playlist-modify-public",
    "playlist-modify-private",
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify user-read-private"
]
const values = {
    response_type: 'code',
    client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
    scope: scopes.join("%20"),
    redirect_uri: `${ProductionURLEnv()}/dashboard`,
    show_dialog: true
}
const merge = queryString.stringify(values)

export const getTokenFromCallback = () => {
    return queryString.parse(window.location.search)
}

export const authorizationToken = async (payload) => {
    const tokenLink = "https://accounts.spotify.com/api/token"
    const clientIDSecret = Base64.encode(`${process.env.REACT_APP_SPOTIFY_CLIENT_ID}:${process.env.REACT_APP_SPOTIFY_CLIENT_SECRET}`)
    try{
        const spotify = await fetch(tokenLink,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${clientIDSecret}`
            },
            body: payload
        })
        const data = await spotify.json()
        return data
    }catch(err){
        console.log('err getAccessToken', err)
    }
}

export const loginURI = `${authEndPoint}?${merge}`
