import React from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LazyLoad from 'react-lazyload'

import './CardPlayer.scss'
import PlayOrPause from './PlayOrPause'
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles({
    root: {
    //   maxWidth: 230,
      width:'100%',
      height: '100%',
      margin: '0 auto',
      padding: '1rem'
    },
    media: {
      height: 140,
    },
    ellipsis: {
        display:'-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        pointerEvents: 'none'
    },
    title:{
        fontSize: 20,
        lineHeight: 1.2,
        color: '#fff',
        WebkitLineClamp: 1,
        pointerEvents: 'none'
    },
    cardMedia: {
        position: 'relative',
    },
    artist:{
        textAlign: 'center'
    }
  });


const CardPlayer = ({id, image, title, description, artistCard, playPlaylist, handlePlayPlaylist ,handlePlayAlbum}) => {
    const classes = useStyles();
    const history = useHistory()

    const handleCard = (id) => {
        if(artistCard) return  history.push(`/artists/${id}`)
        // if co truyen handleplayplaylist thi run nguoc lai la album
        handlePlayPlaylist ? handlePlayPlaylist(id) : handlePlayAlbum(id)
    }


    const imgError = "https://www.scdn.co/i/_global/twitter_card-default.jpg"
    return (
        <Card 
            onClick={() => handleCard(id)}
            className={`${classes.root} cardPlayer ${!description ? 'noDes' : '' } `}
            >
            <CardActionArea>
                <div className={classes.cardMedia}>
                    <LazyLoad height={300}>
                        <img 
                            className={`poster ${artistCard ? 'circle' : ''}`}
                            src={image}
                            title={title}
                            onError={(e) => e.target.src=imgError}
                            alt={title}
                        />
                    </LazyLoad>
                    {!artistCard && 
                    <PlayOrPause
                        id={id}
                        playPlaylist={playPlaylist} /> }
                </div>
                <CardContent>
                    <Typography 
                        className={`
                            ${classes.ellipsis} 
                            ${classes.title} 
                            ${artistCard ? classes.artist : ''}
                        `}
                        gutterBottom 
                        variant="h6" 
                        component="h4">
                        {title}
                    </Typography>
                    { description && <Typography 
                        className={classes.ellipsis}
                        variant="body2" 
                        color="textSecondary" 
                        component="p">
                        {description}
                    </Typography>
                    }
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default CardPlayer
