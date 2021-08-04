import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import {
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableRow} 
from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { LoopArtists } from 'utils/LoopArtists';
import {FormatDuration} from 'utils/FormatDuration';
import { useDispatch, useSelector } from 'react-redux';
import { playlistsIsPlay, setIDPlaylist, setTrack, setIsPlay , setIDAlbum, setPlayPlaylist} from 'features/Home/playTrackSlice';

import './Table.scss'
const TableComponent = ({list, classTable, title, playPlaylist, playlistID, albumID}) => {
    const dispatch = useDispatch()
    //state
    const [page, setPage] = useState(0)
    const rowPerPage = 5

    const trackState = useSelector(state => state.play.track)

    const handlePlayerTrack = (track) => {
        dispatch(setIsPlay(!playPlaylist.isPlay))
        console.log('paly tyrack', track, trackState)
        // compare track when click and track state 
        // if compare then return not set track new
        if(trackState?.id === track.id) return

        // playlistID is params use for top tracks
        if(!playlistID) {
            // check have albumID and albumlist exists
            console.log('handlePlayerTrack album', playPlaylist)
            if(!playPlaylist?.albumID && !albumID) return
            // if not albumID then set albumID
            if(playPlaylist?.albumID !== albumID){
                dispatch(setIDAlbum(albumID))
                dispatch(playlistsIsPlay(list))
            } 
            return dispatch(setTrack(track))
        }
        if(playPlaylist.id !== playlistID ){
            console.log('track click table', track, list, playlistID)
            dispatch(setIDPlaylist(playlistID))
            dispatch(playlistsIsPlay(list))
        }
        dispatch(setTrack(track))
    }
    const handlePlay = () => {
        // const idProps = playlistID ? playlistID : albumID
        // playlist(top-track) or album of artists
        const add = playlistID 
        ? {...playPlaylist, albumID: null, playlistID} 
        : {...playPlaylist, id: null, albumID}
        dispatch(setPlayPlaylist(add)) // set idplaylist theo param
        dispatch(playlistsIsPlay(list)) // set playlist muon nghe
        dispatch(setTrack(list[0])) // set track dau tien cua playlist
    }
    const emptyRows =  (page + 1) * rowPerPage - list.length

    
    return (
        <>
            {list && 
                <TableContainer className={`table__tracks ${classTable}`} >
                    <div className="table__title">
                        <h4>{title}</h4>
                        <button onClick={() => handlePlay()}>Phát tất cả</button>
                    </div>
                <Table aria-label="simple table">
                    <TableBody>
                    {list.slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                    .map((row, ind) => (
                        <TableRow 
                            onClick={() => handlePlayerTrack(row)}
                            key={row.id} 
                            className={`row__track ${trackState?.id === row.id ? 'active' : ''}`} >
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
                                   
                                    : ind  + 1 + (page * rowPerPage)
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
                            {row.album.name && <TableCell className="track__same track__album" align="right">
                                <Link to="/" >{row.album.name}</Link> 
                            </TableCell>
                            }
                            <TableCell className="track__same" align="right">{FormatDuration(row.duration_ms)}</TableCell>
                        </TableRow>
                        )
                    )}
                    </TableBody>
                </Table>
                <div className="paginate">
                    {page > 0 && <span className="paginate--icon" onClick={() => setPage(page - 1)}><ChevronLeftIcon /> </span>}
                    {emptyRows < 0 && <span className="paginate--icon" onClick={() => setPage(page + 1)}><ChevronRightIcon /></span>}
                </div>
            </TableContainer>
            }
        </>
        
    )
}

export default TableComponent
