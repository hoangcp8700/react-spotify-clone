import React from 'react'
import Swipper from 'components/Swipper/Swipper'
import { useSetAlbum } from 'hooks/useSetAlbum'
import { useSelector } from 'react-redux'

const ResultAlbums = ({playlists}) => {
    const playPlaylist = useSelector(state => state.play.playPlaylist)

    const { handlePlayPlaylist } = useSetAlbum({artistID: null})

    return (
        <>
             {playlists?.items && 
                <Swipper 
                    handlePlayPlaylist={handlePlayPlaylist}
                    title={`Playlists`}
                    playPlaylist={playPlaylist} 
                    playlistsOfTopic={playlists.items}/>
             }
        </>
    )
}

export default ResultAlbums
