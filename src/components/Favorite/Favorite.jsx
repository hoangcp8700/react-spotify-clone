import React from 'react'
// import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import './Favorite.scss'
const Favorite = ({track, position, myFavorite, handleFavorite, className}) => {
    const handleToggleFavorite = () => {
        handleFavorite(!myFavorite, track.id)
    }
    return (
        <span 
            className={`favorite ${position ? 'position' : '' } ${className || "" }`} 
            onClick={handleToggleFavorite}>
            <FavoriteIcon className={`icon ${myFavorite ? 'active' : ''} `}/>      
        </span>
        
    )
}

export default Favorite
