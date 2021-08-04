import React from 'react'
import Swipper from 'components/Swipper/Swipper'
import { useSetAlbum } from 'hooks/useSetAlbum'
import { useSelector } from 'react-redux'

const ResultAlbums = ({albums}) => {
    const playPlaylist = useSelector(state => state.play.playPlaylist)
    const { handlePlayAlbum } = useSetAlbum({artistID: null})

    return (
        <>
             {albums?.items && 
                <Swipper 
                    isAlbums
                    handlePlayPlaylist={handlePlayAlbum}
                    title={`Albums`}
                    playPlaylist={playPlaylist} 
                    playlistsOfTopic={albums.items}/>
             }
        </>
    )
}

export default ResultAlbums
