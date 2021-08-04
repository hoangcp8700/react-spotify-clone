import React from 'react'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import './PlayOrPause.scss'
const PlayOrPause = ({id, playPlaylist}) => {
    return (
        <div className="isPlay">
            <span >
                { playPlaylist?.isPlay && (playPlaylist?.id === id || playPlaylist?.albumID === id )
                    ? <PauseCircleFilledIcon className="icon"/>
                    : <PlayCircleFilledIcon className="icon"/>
                }
            </span>
        </div>
    )
}

export default PlayOrPause
