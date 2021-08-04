import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';

import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';

const TracksTable = ({lists}) => {

    const trackState = useSelector(state => state.play.track)
    const handlePlay = () => {

    }
    const handlePlayerTrack = () => {
        
    }
    return (
        <>
            <TableContainer className="table__tracks" >
                    <div className="table__title">
                        <h4>Bài hát đã thích</h4>
                        <button onClick={() => handlePlay()}>Phát tất cả</button>
                    </div>
                <Table aria-label="simple table">
                    <TableBody>
                    {lists
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
        </>
    )
}

export default TracksTable
