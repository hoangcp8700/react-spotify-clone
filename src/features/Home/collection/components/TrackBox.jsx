import React from 'react'
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import './TrackBox.scss'
import { LoopArtists } from 'utils/LoopArtists';

import PlayOrPause from './PlayOrPause'
const TrackBox = ({saveTracks, handleChangeTag}) => {
    return (
        <>
            <Box component="div" >
                <Card className="cardTrack" onClick={(e) => handleChangeTag(e,2)}>
                    <CardContent>
                        <div className="list">
                            {saveTracks?.items?.length && saveTracks.items.map((val,ind) => (
                                <span 
                                    key={val.id}
                                    className="row" 
                                    >
                                    {ind !== 0 ? '-' : ''}
                                    <span className="artist"> {LoopArtists(val.artists)} </span>
                                    <span className="track"> {val.name} </span>
                                </span>
                            ))}
                        </div>
                        <div className="info">
                            <h4 className="title">Bài hát đã thích</h4>
                            <p>{saveTracks?.items?.length} bài hát đã thích</p>
                            <PlayOrPause />
                        </div>
                    </CardContent>
                </Card>
            </Box>
        </>
    )
}

export default TrackBox
