import React, {useRef} from 'react'
import { LoopArtists } from 'utils/LoopArtists'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayPlaylist, setTrack } from 'features/Home/playTrackSlice';

const ResultFirst = ({tracks}) => {
    const dispatch = useDispatch()
    const resultFirstRef = useRef()

    const playPlaylist = useSelector(state => state.play.playPlaylist)
    const trackState = useSelector(state => state.play.track)

    const replaceTrack =  tracks.items[0]

    const handlePlay = () => {
        if(trackState.id !== replaceTrack.id )  dispatch(setTrack(replaceTrack))
        dispatch(setPlayPlaylist({isPlay: !playPlaylist.isPlay}))
    }
    return (
       <>
        {tracks.items && 
            <div className="result__first" >
                <div className="title">
                    <h4>Kết quả hàng đầu</h4>
                </div>
                <div 
                    className={`box ${trackState.id === replaceTrack?.id ? 'active' : ''}`}  
                    ref={resultFirstRef}
                    >
                    <div className="player__poster">
                        <span 
                            className="player" 
                            onClick={() => handlePlay()}>
                            {playPlaylist.isPlay && trackState.id === replaceTrack?.id 
                            ? <PauseCircleFilledIcon className="player--icon" />
                            : <PlayCircleFilledIcon className="player--icon"/>
                            }
                        </span>
                        <img 
                            src={replaceTrack?.album?.images[1]?.url} 
                            alt={replaceTrack?.name} />
                    </div>
                    
                    <h3>{replaceTrack.name}</h3>
                    <div className="album">
                        <span className="artists">{LoopArtists(replaceTrack?.artists)}</span>
                        <span className="badges"> {replaceTrack?.album?.album_type}</span>
                    </div>
                    
                </div>
            </div>
        }
       </>
    )
}

export default ResultFirst
