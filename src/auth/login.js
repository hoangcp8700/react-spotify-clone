import { GetDataSpotify } from 'api/spotifyAPI'
import {getTokenFromCallback} from 'features/Login/authencation'
import SpotifyWebApi from 'spotify-web-api-js'

const spotify = new SpotifyWebApi()

export const  CheckLogin = async () =>{ 
    try{
        const token = await RedirectCallBack()
        console.log("🚀 ~ file: login.js ~ line 10 ~ CheckLogin ~ token", token)
        const setToken = await spotify.setAccessToken(token)
        const user = await spotify.getMe()
        console.log(' zzzz user', user)
        const playlists = await GetDataSpotify(`users/${user?.id}/playlists` )
        console.log('zzzz', user , playlists)
        return {user, playlists}
    }catch(err){
        console.log('err', err)

        // window.location = "/login"
    }
}
export const RedirectCallBack = () => { 
    // const {access_token, expires_in, token_type} = getTokenFromCallback()
    const {access_token} = getTokenFromCallback()
  
    if(!access_token) {
        if(localStorage.getItem('jwt') !== undefined ) return localStorage.getItem('jwt')
        return window.location = '/login'
    }
    localStorage.setItem('jwt', access_token)
    sessionStorage.setItem('jwt', access_token)
    window.location.hash = ""

    return access_token
}