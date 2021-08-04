import {useState, useEffect} from 'react'
import { GetDataSpotify } from 'api/spotifyAPI'

export const usePlaylistAndTrack = (playlistID) => {
    const [listTracks, setListTracks] = useState([])
    const [isPlaylist, setIsPlayList] = useState(false)
    const [playlist, setPlaylist] = useState({})
    const [durationMs, setDurationMs] = useState(0)
    const [totalTrack, setTotalTrack] = useState(0)
    
    useEffect(() => {
        if(!playlistID) return
        setIsPlayList(false)
        const getPlaylistAndTracks = async () => {
            try{
                const res = await GetDataSpotify(`playlists/${playlistID}`)
                const {tracks, ...rest} = await res
                const newTracks = await tracks?.items.map(val => val.track)
                
                const ms = await tracks.items?.reduce((acc, cur) => acc + cur.track.duration_ms , 0)
                
                setListTracks(newTracks)
                setPlaylist(rest)
                setDurationMs(ms)
                setIsPlayList(true)
                setTotalTrack(tracks?.total)

            }catch(err){
                console.log('err playlist', err)
                // window.location = "/login"
            }
        }
        getPlaylistAndTracks()
        // eslint-disable-next-line
    },[playlistID])

    return {
        isPlaylist,
        playlist,
        durationMs,
        totalTrack,
        listTracks
    }
}