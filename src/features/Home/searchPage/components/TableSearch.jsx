import React, {useState} from 'react'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import { LoopArtists } from 'utils/LoopArtists';
import { FormatDuration } from 'utils/FormatDuration';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayPlaylist, setTrack } from 'features/Home/playTrackSlice';  


const TableSearch = ({lists}) => {
    const dispatch = useDispatch()
    const [page, setPage] = useState(0)
    const rowPerPage = 5
    const playPlaylist = useSelector(state => state.play.playPlaylist)
    const trackState = useSelector(state => state.play.track)

    const handlePlayTrack = (track) => {
        dispatch(setPlayPlaylist({isPlay: !playPlaylist.isPlay}))
        if(trackState.id !== track.id){
            dispatch(setTrack(track))
        }
    }
 
    return (
        <>
        {lists.items && 
            <div className="result__tracks__list">
                <div className="title">
                    <h4>Bài hát</h4>
                   
                </div>
                {lists.items
                .slice(0, page * rowPerPage  + rowPerPage)
                .map(row => (
                    <div 
                    onClick={() => handlePlayTrack(row)}
                    className={`row ${trackState.id === row.id ? 'active' : ''}`}
                    key={row.id}>
                        <div className="row__left">
                            <div className="row__poster">
                                <span className="player">
                                    {
                                        playPlaylist.isPlay && trackState.id === row.id
                                        ?  <PauseIcon className="player--icon" /> 
                                        :  <PlayArrowIcon className="player--icon"/>
                                    }
                                   
                                   
                                </span>
                                <img 
                                    src={row?.album?.images[2]?.url} 
                                    alt={row?.name} />
                            </div>
                            <div className="row__info">
                                <p>{row?.name}</p>
                                <span className="artists">{LoopArtists(row?.artists)}</span>
                            </div>
                        </div>
                        <div className="row__right">
                            <span>{FormatDuration(row?.duration_ms)}</span>
                        </div>
                    </div>
                ))}
                { (page * rowPerPage < lists.items.length) && 
                <button onClick={() => setPage(page + 1)}>
                    Xem thêm
                </button>
                }
            </div>  
        }
        </>
    )
}

export default TableSearch
