import { GetDataSpotify } from 'api/spotifyAPI'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {FormatNumberComma} from 'utils/FormatNumberComma'
import './Artists.scss'

import SwipperCircle from 'components/SwipperCircle/SwipperCircle'
import Swipper from 'components/Swipper/Swipper'

import Spinner from 'components/Spinner/spinner'
import TableComponent from './components/Table'
import { useDispatch, useSelector } from 'react-redux'
import { useSetAlbum } from 'hooks/useSetAlbum'
import { setLoading } from '../playTrackSlice'
import Button from '@material-ui/core/Button';
import { useArtistFollower } from 'hooks/useArtistFollower'
const Artists = () => {
    const dispatch = useDispatch()
    const {artistID} = useParams()
    // redux
    const myArtists = useSelector(state => state.user.myArtists)
    const loading = useSelector(state => state.play.isLoading)
    const albumList = useSelector(state => state.play.album_lists)
    const playPlaylist = useSelector(state => state.play.playPlaylist)

    // state
    const [artist, setArtist] = useState({}) 
    const [topTracks, setTopTracks] = useState([]) 
    const [relatedArtists, setRelatedArtists] = useState([]) 
    const [recommendations, setRecommendations] = useState([]) 
    const [albumOfArtist, setAlbumOfArtist] = useState({}) 
    const [follow, setFollow] = useState(false)
 
    //custom hook
    const { handlePlayAlbum } = useSetAlbum({artistID})
    const { handleFollow } = useArtistFollower()
    
    useEffect(() => {
        const checkFollow = myArtists?.items.findIndex(val => val.id === artistID)
        if(checkFollow !== -1) setFollow(true)
        
        return () => {
            setFollow(false)
        }
        // eslint-disable-next-line
    },[myArtists])

    useEffect(() => {
        if(!artistID) return
        dispatch(setLoading(true))
        const getAPI = async () => {
            const getArtist = await GetDataSpotify(`artists/${artistID}`)
            const getArtistTopTracks = await GetDataSpotify(`artists/${artistID}/top-tracks?market=VN`)
            const getArtistRelatedArtists = await GetDataSpotify(`artists/${artistID}/related-artists`)
            const getArtistAlbums = await GetDataSpotify(`artists/${artistID}/albums?market=VN&limit=20`)
            const recommendations = await GetDataSpotify(`recommendations?market=VN&limit=20&seed_artists=${artistID}&min_energy=0.4&min_popularity=20`)     
            console.log('recommendations', recommendations)
            
            await setArtist(getArtist)
            await setTopTracks(getArtistTopTracks.tracks)
            await setRelatedArtists(getArtistRelatedArtists.artists)
            await setAlbumOfArtist(getArtistAlbums)
            await setRecommendations(recommendations.tracks)
            
            await dispatch(setLoading(false))                         
        }
        getAPI()
    // eslint-disable-next-line
    },[artistID])

   

    const compareAlbumAndArtist =  albumList?.id && playPlaylist.artistID === artistID
    const titleAlbum = `Album bạn đang nghe ${!playPlaylist?.albumID ? 'gần đây' : `của ${artist?.name}`} `
    return (
        <>
            {albumOfArtist?.items
            ? <div className="artists" >
                {artist?.id && <div className="artists__nav">
                    <div className="nav__poster">
                        <img src={artist?.images && artist?.images[0]?.url} alt={artist.name} />
                    </div>
                    <div className="nav__info">
                        <h4>{artist?.name}</h4>
                        <p>{artist?.followers && FormatNumberComma(artist?.followers?.total) } <span>followers</span></p>
                        <Button 
                            onClick={() => handleFollow(artist?.id, myArtists, !follow)}
                            variant="outlined" 
                            className="btn-follow"> {follow ? 'Đang theo dõi' :  'Theo dõi'} </Button>
                    </div>
                </div>
                }
                <div className="artists__content">
                    <div className={`album__and__toptracks ${compareAlbumAndArtist ? 'flex' : ''}`} >
                        {topTracks?.length && <TableComponent
                            playlistID={artistID} // playlist of artists
                            playPlaylist={playPlaylist}
                            title="Phổ biến" 
                            list={topTracks} 
                            classTable="top__tracks"/> }
                        {compareAlbumAndArtist && <TableComponent
                            playPlaylist={playPlaylist}
                            title={titleAlbum} 
                            albumID={albumList.id} // id of album
                            list={albumList.list}
                            classTable="album__player"/> }
                    </div>
                    <div className="album__of__artists">
                        {relatedArtists.length && <SwipperCircle 
                            title="Danh sách nghệ sĩ bạn cũng thích" 
                            list={relatedArtists}/>}
                    </div>
                    <div className="recommendations">
                        {recommendations && recommendations.length && <Swipper 
                            isTrack
                            handlePlayPlaylist={handlePlayAlbum}
                            title={`Đề xuất cho bạn`}
                            playPlaylist={playPlaylist} 
                            playlistsOfTopic={recommendations}/>}
                    </div>
                    <div className="release__artists">
                        {albumOfArtist?.items.length && <Swipper 
                            isAlbums
                            handlePlayPlaylist={handlePlayAlbum}
                            title={`Danh sách album của ${artist?.name}`}
                            playPlaylist={playPlaylist} 
                            playlistsOfTopic={albumOfArtist.items}/>}
                    </div>
                </div>
            </div>
            : <Spinner isStyle={true} loading={true}/>   
            }
            
            <Spinner isStyle={true} loading={loading}/>   
        </>
    )
}

export default Artists
