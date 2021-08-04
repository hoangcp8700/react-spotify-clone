import React, {useState, useEffect} from 'react'
import {FormatDuration} from 'utils/FormatDuration'
import {FormatNumberComma} from 'utils/FormatNumberComma'
import {Link} from 'react-router-dom'
import { GetDataSpotify } from 'api/spotifyAPI'

import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EventIcon from '@material-ui/icons/Event';
const NavInfo = ({artists, type, name, total_ms, followers, description, total_tracks, release}) => {
    const [artist, setArtist] = useState(artists)
    
    useEffect(() => {
        if(!artists ) return
        if(artists.length <= 1) {
            GetDataSpotify(`artists/${artists[0].id}`)
            .then(val =>  setArtist(val))
            .catch(err => console.log('err', err)) 
        }     
    },[artists])
    
    const Artists = () => {
        const OneArtist = () => {
            return (
                <>
                    {artist?.images ? (
                        <div className="info__artists">
                            <Link to={`/artists/${artist.id}`} className="artists">
                                <img src={artist.images[2].url} alt="preview" /> 
                                <span>{artist.name}</span>
                            </Link>
                        </div> 
                    ) : `<h1>loading</h1>`} 
                </>
            )
        }
        const MulArtist = () => {
            return artist.map(val => (
                <Link to={`/artists/${val.id}`} className="mul__artists" key={val.id}>
                    <span> <AccountCircleIcon className="mul__artists--icon"/> {val.name}</span>
                </Link>  
            ))
        }

        return (
            <div className="info__artists">
                {artist.length ? <MulArtist /> : <OneArtist />}
            </div>
        )
        
    }
    return (
        <div className="nav__info">
            <h4>{type}</h4>
            <h2 >{name}</h2>
            <div className="mt-1"></div>
            {description && <p>{description}</p> }  
            <div className="nav__info_bottom">
                {artists ? <Artists /> : ''}
                <div className="info__album"> 
                    { followers && followers > 0 ? <span> <FavoriteIcon className="info__album--icon" /> {FormatNumberComma(followers)} quan tâm</span> : ''}
                    { total_ms && total_ms > 0 && <span> <LibraryMusicIcon className="info__album--icon" /> { total_tracks && `${total_tracks} bài hát, `} {FormatDuration(total_ms, true)} </span> } 
                    { release && <span> <EventIcon className="info__album--icon" /> Ngày phát hành: <span className="info__album--release">{release} </span> </span>}
                </div>
            </div>
                   
           
        </div>
)
}

export default NavInfo
