import React, { useRef } from 'react'
import {LoopArtists} from 'utils/LoopArtists'
import './AlbumHaveTrack.scss'

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { useDispatch, useSelector } from 'react-redux';
import { setIsPlay } from 'features/Home/playTrackSlice'
import { Link } from 'react-router-dom';

const AlbumHaveTrack = ({handleFooterVertical}) => {
    const dispatch = useDispatch()
    const playPlaylist = useSelector(state => state.play.playPlaylist)
    const track = useSelector(state => state.play.track)

    const showPlayerRef = useRef()
   
    const handlePlayer = () => {
        dispatch(setIsPlay(!playPlaylist?.isPlay))
    }
    return (
        <div 
            className="album__have__track" 
            style={{backgroundImage: `url(${track?.album?.images[0].url})`}}>
                <div className="close">
                    <ExpandMoreIcon 
                        className="close--icon" 
                        onClick={() => handleFooterVertical({val: false, isClose: true})}/>
                </div>
                <div 
                    className="circle" 
                    style={{backgroundImage: `url(${track?.album?.images[0].url})`}}>
                </div>
                <div className="container">
                    <div className="card__player">
                        <div className="card__poster" ref={showPlayerRef}>
                            
                            <img
                                className={`${playPlaylist?.isPlay ? 'active' : ''}`}
                                src={track?.album?.images[0].url}
                                alt={track?.name} />
                            <div 
                                onMouseEnter={() => {
                                    showPlayerRef.current.children[1].children[0].style.opacity = 1
                                }}
                                onMouseLeave={() => {
                                    showPlayerRef.current.children[1].children[0].style.opacity = 0
                                }}
                                className="player">
                                    <div className="player__background"></div>
                                    <span onClick={handlePlayer}>
                                        {playPlaylist?.isPlay 
                                            ? <PauseCircleFilledIcon className="player--icon"/>
                                            : <PlayCircleFilledIcon className="player--icon"/>
                                        }
                                    </span>
                            </div>
                        </div>
                        <div className="card__info">
                            <h1>{track?.name} 
                            
                            <Link 
                                onClick={() => handleFooterVertical({val: false, isClose: true})}
                                to={`/albums/${track?.album?.id}`}>
                                <span>album.</span> {track?.album?.name}
                            </Link>
                            
                            </h1>
                            <span
                                onClick={() => handleFooterVertical({val: false, isClose: true})}
                            >{LoopArtists(track?.artists)}</span>
                        </div>
                    </div>
                </div>  
          

        </div>
    )
}

export default AlbumHaveTrack
