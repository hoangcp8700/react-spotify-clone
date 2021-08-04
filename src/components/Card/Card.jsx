import React from 'react'
import { Link } from 'react-router-dom'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import './Card.scss'
// import EllipsisFade from 'components/EllipsisFade/EllipsisFade';

const imgDefault = 'https://play-lh.googleusercontent.com/O0078sRCWcSj48e2PThnW_2PCMMU_3VsG4VwUQY_7zoTJHZYQ43qJc0hYExDw5eFMzJE'

const Card = ({isAlbums, isTrack, card, playPlaylist,  handlePlayPlaylist}) => {
    const link = isAlbums ? 'albums' : 'playlists'
    return (
        <div className="card">
            <div className="card__poster">
                {!isTrack 
                ? <Link to={`/${link}/${card.id}`} >
                    <img src={card?.images ? card?.images[0]?.url : imgDefault} alt={card.name} />
                </Link>
                : <img src={card?.album?.images[0]?.url || imgDefault} alt={card.name} />
                }
                <span 
                className="card__icon" 
                onClick={() => handlePlayPlaylist(isTrack ? card.album.id : card.id, isTrack ? card : '')}>
                    {
                        playPlaylist.isPlay && (playPlaylist.id === card.id || playPlaylist.albumID === card.id )
                        ?  <PauseCircleFilledIcon className="card__icon--icon" />
                        :  <PlayCircleFilledIcon className="card__icon--icon"/>
                    }
                 
                    </span>
            </div>
            <div className="card__info">
                <h4>{card.name}</h4>
                {/* {card?.description && <EllipsisFade> <p>{card.description}</p> </EllipsisFade> } */}
            </div>
        </div>
    )
}

export default Card
