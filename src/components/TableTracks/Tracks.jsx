import React, {useRef} from 'react'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import {FormatDuration} from 'utils/FormatDuration';
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow} 
from '@material-ui/core';
import  './style.scss'
import ToolsPlayer from 'components/ToolsPlayer/ToolsPlayer'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

import {setTrack, playlistsIsPlay, setIDPlaylist, setIDAlbum,  setIsPlay} from 'features/Home/playTrackSlice'
import { LoopArtists } from 'utils/LoopArtists';
import {useFocus} from 'hooks/useFocus'


const Track = ({tracks, playlistID, albumID, playlist, album}) => {
    const dispatch = useDispatch()
    // redux
    const trackState = useSelector(state => state.play.track)
    const playPlaylist = useSelector(state => state.play.playPlaylist) 
  
    const focusTrackRef = useRef(null)

    // custom hook
    useFocus({track: trackState}, focusTrackRef)

    const PlaylistIdOrAlbumID = playlistID ? playlistID : albumID
    const playPlaylistState = playlistID ? playPlaylist.id : playPlaylist.albumID

    const handleNewTrack = (e, track) => {
        console.log(e)
        if(e.target.attributes.href) {
            // click tr except to tag a
            return
        }
        if(PlaylistIdOrAlbumID !== playPlaylistState){
            playlistID 
            ? dispatch(setIDPlaylist(PlaylistIdOrAlbumID)) 
            : dispatch(setIDAlbum(PlaylistIdOrAlbumID))
           
            dispatch(playlistsIsPlay(tracks))
            dispatch(setTrack(track))
        }else{
            if(track.id ===  trackState.id){
                return dispatch(setIsPlay(!playPlaylist.isPlay))
            }
            dispatch(setTrack(track))

        }
       
    }

    return (
        <div className="tracks">
            { tracks && <ToolsPlayer
                album={album}
                playlist={playlist}
                playPlaylist={playPlaylist}
                list={tracks}
                albumID={albumID} 
                id={playlistID} /> }
            { tracks ? (
            <TableContainer className="track__table" >
                <Table aria-label="simple table" >
                    <TableHead>
                        <TableRow>
                            <TableCell className="opacity__white">#</TableCell>
                            <TableCell className="opacity__white" align="left">Tiêu đề</TableCell>
                            {!albumID && <TableCell className="opacity__white" align="right">Album</TableCell>}
                
                            <TableCell className="opacity__white" align="right"><QueryBuilderIcon/></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {tracks.map((row,ind) => (
                        <TableRow 
                            onClick={(e) => handleNewTrack(e, row)}
                            id={`row-${row.id}`}
                            key={row.id}
                            className={`track__row ${albumID ? 'track__row__albums' : ''} ${trackState?.id === row.id && PlaylistIdOrAlbumID ===  playPlaylistState ? 'active' : ''}`}>
                            <TableCell className="opacity__white" component="th" scope="row">
                            {   trackState?.id === row.id && PlaylistIdOrAlbumID ===  playPlaylistState
                                ? <div className="playOrPause">
                                        {playPlaylist.isPlay 
                                            ? <PauseIcon />
                                            : <PlayArrowIcon />
                                        }
                                        <input ref={focusTrackRef} />
                                    </div>
                                : ind + 1
                            }
                            
                            </TableCell>
                            <TableCell className="opacity__white" align="left">
                                <div className="track__info">
                                    <div className="track__image">
                                    <img 
                                       
                                        className="track__info__img" 
                                        src={row.album.images[2].url} 
                                        alt="preview" />
                                    </div>
                                    <div className="track__info__name">
                                        <span 
                                            className="track__info__name--track">
                                            {row.name} 
                                        </span>
                                        <div className="track__info__name--artists">
                                            {LoopArtists(row.artists)}
                                        </div>
                                    </div>
                                </div>
                            </TableCell>
                           
                            {!albumID && <TableCell className="opacity__white" style={{cursor: "pointer"}} align="right">
                                <Link className="track__of__album" to={`/albums/${row.album.id}`}>{row.album.name}</Link>
                            </TableCell>}
                            <TableCell className="opacity__white" align="right" style={{width: 0}}>
                                {FormatDuration(row.duration_ms)}
                            </TableCell>
                        </TableRow>
                    ))}
                    
                    </TableBody>
                </Table>
            </TableContainer>
            ) : <h1>loading</h1> }
        </div>
    )
}

export default Track
