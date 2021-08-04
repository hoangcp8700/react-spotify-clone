import React from 'react'
import { useParams } from 'react-router-dom'

import Spinner from 'components/Spinner/spinner'
import Nav from 'features/Home/components/Navbar/Nav'
import Tracks from 'components/TableTracks/Tracks'
import { usePlaylistAndTrack } from 'hooks/usePlaylistAndTrack'


const Playlist = () => {
    const {playlistID} = useParams()

    //custom hook
    const {
        playlist, 
        durationMs, 
        totalTrack, 
        isPlaylist,
        listTracks
    } = usePlaylistAndTrack(playlistID)

    return (
        
        isPlaylist ? 
        <>  
            <div className="playlists__nav">
                <Nav 
                    playlist={playlist} 
                    playlistMs={durationMs} 
                    totalTrackPlaylist={totalTrack}/>
            </div>
            <div className="playlists__content mt-3">
                <Tracks tracks={listTracks} playlistID={playlistID} playlist={playlist} /> 
            </div>  
        </> 
        : <Spinner isStyle={true} loading={true}/> 
        
    )
}

export default Playlist
