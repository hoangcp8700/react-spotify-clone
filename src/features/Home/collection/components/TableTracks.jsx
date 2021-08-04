import React from 'react'
import {Link, useHistory, useRouteMatch} from 'react-router-dom'
import {
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableRow} 
from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

import MouseRight from 'components/MouseRight/MouseRight'

import { LoopArtists } from 'utils/LoopArtists';
import {FormatDuration} from 'utils/FormatDuration';
import { useDispatch, useSelector } from 'react-redux';
import { playlistsIsPlay, setTrack, setIsPlay} from 'features/Home/playTrackSlice';

import './TableTracks.scss'
const TableComponent = ({list, menus}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const match = useRouteMatch()
    const trackState = useSelector(state => state.play.track)
    const playPlaylist = useSelector(state => state.play.playPlaylist)

    const compare = history.location.pathname === match.path ? true : false

    const handlePlayerTrack = (e,track) => {
        console.log(e)
        if(e.target.attributes.href || e.target.parentNode?.classList[1] === "favorite--icon") {
            // click tr except to tag a
            return
        }
        dispatch(setIsPlay(!playPlaylist.isPlay))

        if(trackState.id !== track.id ){
            console.log('track click table', track, trackState)
            dispatch(playlistsIsPlay(list))
        }
        dispatch(setTrack(track))
    }
    const handlePlay = () => {
        dispatch(playlistsIsPlay(list)) // set playlist muon nghe
        dispatch(setTrack(list[0])) // set track dau tien cua playlist
    }

    return (
        <>
            {list && 
                <TableContainer className="table__tracks" >
                    <div className="table__title">
                        <h4>Bài hát đã thích</h4>
                        <button onClick={() => handlePlay()}>Phát tất cả</button>
                    </div>
                <Table aria-label="simple table">
                    <TableBody>
                    {list
                    .map((row, ind) => (
                        <MouseRight
                            menus={menus}
                            val={row}
                            key={row.id} 
                        >
                            <TableRow 
                                onClick={(e) => handlePlayerTrack(e,row)}
                                className={`row__track ${compare && trackState?.id === row.id ? 'active' : ''}`} >
                                <TableCell className="track__same track__ind" component="th" scope="row">
                                    {
                                        trackState?.id === row.id 
                                        ?  <span className="compare">
                                            {
                                                playPlaylist?.isPlay 
                                                ? <PauseIcon />
                                                : <PlayArrowIcon />
                                            }
                                            
                                        </span>
                                        : ind + 1
                                    }
                                </TableCell>
                                <TableCell className="track__name" align="left" >
                                    <div className="poster">
                                        <img src={row?.album?.images[2].url} alt={row?.album?.name} />
                                    </div>
                                    <div className="info">
                                        <p className="track__same">{row.name}</p>
                                        <div 
                                            className="track__same" 
                                            style={{display: 'block'}}>{LoopArtists(row.artists)}</div>
                                    </div>
                                </TableCell>
                                <TableCell className="track__same track__album" align="right">
                                    <Link to="/" >{row.album.name}</Link> 
                                </TableCell>
                                
                                <TableCell className="track__same" align="right">{FormatDuration(row.duration_ms)}</TableCell>
                            </TableRow>
                        </MouseRight>
                        
                        )
                    )}
                    </TableBody>
                </Table>
                
            </TableContainer>
            }
        </>
        
    )
}

export default TableComponent
