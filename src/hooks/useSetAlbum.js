import { GetDataSpotify } from "api/spotifyAPI"
import { playlistsIsPlay, setIsPlay, setPlayPlaylist, setTrack, setLoading, setAlbumList} from "features/Home/playTrackSlice"
// import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export const useSetAlbum = ({artistID = null}) => {
    const dispatch = useDispatch()
    const playPlaylist = useSelector(state => state.play.playPlaylist)
    // const [albumIsPlay, setAlbumIsPlay] = useState({})
    
    const handlePlayPlaylist = async (id) => {
        if(playPlaylist.id !== id) {
            dispatch(setLoading(true))
            dispatch(setPlayPlaylist({...playPlaylist, isPlay:playPlaylist.isPlay, id: id, albumID: null}))
            try{
                const {tracks} = await GetDataSpotify(`playlists/${id}`)
                const newTracks = await tracks.items.map(val => val.track)

                console.log('newTracks', newTracks)
                setTimeout(() => {
                    dispatch(playlistsIsPlay(newTracks)) // set playlist muon nghe
                    dispatch(setTrack(newTracks[0])) // set track dau tien cua playlist
                    dispatch(setLoading(false))
                }, 1000)
            }catch(err){
                console.log('err', err)
            }
            return
        } 
        dispatch(setIsPlay(!playPlaylist.isPlay))
    }

    const handlePlayAlbum = async (id, track) => {
        if(playPlaylist.albumID !== id) {
            dispatch(setLoading(true))
            dispatch(setPlayPlaylist({isPlay:playPlaylist.isPlay, id: null, albumID: id, artistID: track ? track.artists[0].id : artistID}))
            try{
                const res = await GetDataSpotify(`albums/${id}`)
                const {images, ...album} = await res
                const tracks = await album.tracks.items.map(val => (
                    {...val, album: 
                        { id: album.id, name: album.name, images} 
                    }
                ))
                console.log('reszzz', res ,tracks)
                setTimeout(() => {
                    // setAlbumIsPlay(res) // set album de show in page
                    dispatch(playlistsIsPlay(tracks)) // set playlist muon nghe
                    dispatch(setTrack(track ? track : tracks[0] )) // set track dau tien cua playlist
                    dispatch(setLoading(false))
                    dispatch(setAlbumList({id: id, list: tracks})) // set track in album dang nghe
                }, 2000);
               
            }catch(err){
                console.log('err', err)
            }
            return
        }
        dispatch(setIsPlay(!playPlaylist.isPlay))
    }
    return {
        handlePlayPlaylist,
        handlePlayAlbum}
}