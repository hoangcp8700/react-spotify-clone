import EllipsisFade from 'components/EllipsisFade/EllipsisFade';
import React from 'react'
import { Link } from 'react-router-dom';
import { LoopArtists } from 'utils/LoopArtists';
import Favorite from 'components/Favorite/Favorite'

const SongInfo = ({track, playPlaylist, handleFooterVertical, footerVertical, myFavorite, handleFavorite}) => {
    
    const link = playPlaylist.id ? `/playlists/${playPlaylist.id}` : `/albums/${playPlaylist.albumID}`
    
    return (
        <EllipsisFade className="ellipsis__songinfo">
            <div className="footer__songInfo">
                <div className="footer__songInfo--song">
                    <Link 
                    onClick={() => handleFooterVertical(footerVertical, 'songinfo')}
                    to={link}>
                        {track?.name}
                    </Link> 
                </div>
                <div className="footer__songInfo--artists">
                    {LoopArtists(track?.artists)}
                </div>
                <Favorite 
                    track={track} 
                    handleFavorite={handleFavorite} 
                    myFavorite={myFavorite} />
            </div>
        </EllipsisFade>
    )
}

export default SongInfo
