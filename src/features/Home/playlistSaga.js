// import { CheckLogin } from "auth/login"
import { getTokenFromCallback , authorizationToken } from "features/Login/authencation"
import { put, call, takeLatest } from "redux-saga/effects"
import { checkIsLogin } from "./userSlice"
import { GetDataSpotify } from 'api/spotifyAPI'
import { ProductionURLEnv } from "app/production"

function* fetchData(){
    try{
        const user = yield call(GetDataSpotify, `me`) 
        const {categories} = yield call(GetDataSpotify,`browse/categories?country=VN&limit=40`)
        const playlists = yield call(GetDataSpotify,`users/${user?.id}/playlists`)
        const {artists} = yield GetDataSpotify(`me/following?type=artist`)
        const myAlbums = yield GetDataSpotify(`me/albums?limit=50`)
        const myTracks = yield GetDataSpotify(`me/tracks?limit=50`)
        const newMyTracks =  {...myTracks, items: myTracks.items.map(val => val.track)} 
        const newMyAlbums =  {...myAlbums, items: myAlbums.items.map(val => val.album)} 
        const newMyArtists =  artists

        //topic
        const browsNewReleasesAPIOld = yield call(GetDataSpotify,`browse/new-releases?country=VN&limit=40`)
        const browsNewReleasesAPI = {albums: {items: browsNewReleasesAPIOld.albums.items.map(val => ({...val, album: {id: val.id, images: val.images}} )) }}
        const browseFeaturedPlaylistsAPI = yield call(GetDataSpotify,`browse/featured-playlists?country=VN`)
        const topicPopAPI =  yield call(GetDataSpotify,`browse/categories/pop/playlists?country=VN`)
        const topicKPOPAPI =  yield call(GetDataSpotify,`browse/categories/kpop/playlists?country=VN`)
        const topicChillAPI =  yield call(GetDataSpotify,`browse/categories/chill/playlists?country=VN`)
        const topicEdmAPI =  yield call(GetDataSpotify,`browse/categories/edm_dance/playlists?country=VN`)
        
        browsNewReleasesAPI.title = "Những bản nhạc mới ra mắt"
        browseFeaturedPlaylistsAPI.title = "Những playlists nổi bật"
        topicPopAPI.title = "Pop pop pop"
        topicKPOPAPI.title = "Kpop"
        topicChillAPI.title = "Nhạc này để child"
        topicEdmAPI.title = "Quẩy quên lối về"
    
        return {
            user, 
            playlists ,
            categories,
            browsNewReleasesAPI,
            browseFeaturedPlaylistsAPI,
            topicPopAPI,
            topicKPOPAPI,
            topicChillAPI,
            topicEdmAPI,
            newMyTracks,
            newMyArtists,
            newMyAlbums
        }
    }catch(error){
        localStorage.removeItem('jwt')
        localStorage.removeItem('rftk')
        window.location = '/login'
    }
}

function* getAccessToken(code) {
    const redirectURI = yield `${ProductionURLEnv()}/dashboard`
    console.log('redirectURI',redirectURI)
    const payload = yield `grant_type=authorization_code&code=${code}&redirect_uri=${redirectURI}`
    const getToken = yield call(authorizationToken, payload)
    return getToken
}

function* login(action) {
    let {code} = yield getTokenFromCallback()
    if(!code){
        if(!localStorage.getItem('jwt')) return window.location = "/login"
        yield call(workerSaga,localStorage.getItem('jwt'))
        return
    }
    // doi code cho den khi co result moi this execute
    // call: blocked until return result
    const spotify = yield call(getAccessToken, code)
    yield localStorage.setItem('rftk', spotify.refresh_token)
    yield localStorage.setItem('jwt', spotify.access_token)
    yield workerSaga(spotify.access_token)

}
function* workerSaga({access_token}) {
    try {
        const res = yield call(fetchData, access_token);
        const {user, playlists, categories,
            newMyTracks,
            newMyAlbums,
            newMyArtists,...topic} = res

        yield put({type: 'user/setUser', user})
        yield put({type: 'user/setMyTracks', newMyTracks})
        yield put({type: 'user/setMyAlbums', newMyAlbums})
        yield put({type: 'user/setMyArtists', newMyArtists})
        yield put({type: 'user/setPlaylists', playlists})
        yield put({type: 'user/setTopicDashboard', topic})
        yield put({type: 'categories/setCategories',  categories});
        
        // yield put({type: 'user/setAuthentication', authorization })

      } catch (error) {
          console.log('err workerSaga', error)
        //   alert('err playlistsaga 107')
        
      }
}
export default function* playlistSaga() {
    yield takeLatest(checkIsLogin.toString(), login)
}