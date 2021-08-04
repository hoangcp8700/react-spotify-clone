import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { GetDataSpotify } from 'api/spotifyAPI';
import {setTypeAPI} from './api/TypeTrackOrAlbumAPI'

import Spinner from 'components/Spinner/spinner'

import Nav from 'features/Home/components/Navbar/Nav'
import Tracks from 'components/TableTracks/Tracks'
import Swipper from 'components/Swipper/Swipper'
import { useDispatch, useSelector } from 'react-redux';
import './Album.scss'
import randomColor from 'randomcolor'
import { useSetAlbum } from 'hooks/useSetAlbum';
import { setLoading } from '../playTrackSlice';

const Album = () => {
    const {albumID} = useParams()
    const dispatch = useDispatch()

    //redux
    const loading = useSelector(state => state.play.isLoading)
    const playPlaylist = useSelector(state => state.play.playPlaylist)
    
    // state
    const [playlistOfAlbum, setPlaylistOfAlbum] = useState({})
    const [tracks, setTracks] = useState([])
    const [albumOfArtists, setAlbumOfArtists] = useState({})
    const [infoAlbum, setInfoAlbum] = useState({total: 0, ms: 0})
    // refs
    const albumRef = useRef()

    useEffect(() => {
        const color = randomColor()
        albumRef.current.style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0) 70%, ${color} 130%)`
    },[])

    useEffect(() => {
        dispatch(setLoading(true))
        const getTypeAPI = async () => {
            try{
                const res = await setTypeAPI('albums', albumID)
                const {tracks, images, ...albumNew} = await res // remove tracks of album
                const AlbumOfArtists = await GetDataSpotify(`artists/${res.artists[0].id}/albums`)
                
                const newTracks = await tracks.items.map(val => ({...val, album: {images}}))
                const ms = await tracks.items.reduce((acc, cur) => acc + cur.duration_ms , 0)
                
                await setPlaylistOfAlbum({...albumNew, images})
                await setTracks(newTracks)
                await setAlbumOfArtists({name: albumNew?.artists[0].name, result: AlbumOfArtists.items})
                await setInfoAlbum({total: albumNew?.total_tracks, ms})
                setTimeout(() => {
                    dispatch(setLoading(false))
                    
                }, 1000)

            }catch(err) {
                console.log('err', err)
            }
        }
        getTypeAPI()  
        // eslint-disable-next-line
    },[albumID])

    const { handlePlayAlbum } = useSetAlbum({artistID: playlistOfAlbum.artists && playlistOfAlbum?.artists[0]?.id})

    return (
        <div  ref={albumRef} className="pt-3">
            {albumOfArtists?.name ?
            <>
                <div className="playlists__nav">
                    <Nav 
                    albums={playlistOfAlbum} 
                    playlistMs={infoAlbum.ms} 
                    totalTrackPlaylist={infoAlbum.total}
                    />
                </div>
                <div className="playlists__content mt-3">
                    <div className="albums" >
                        <Tracks tracks={tracks} albumID={albumID} album={playlistOfAlbum} /> 

                        {playlistOfAlbum?.copyrights && <div className="copyright">
                            {playlistOfAlbum?.copyrights.map((val, ind) => (
                                <span key={ind}>{val.text}</span>
                            ))}
                        </div>
                        }
                        {albumOfArtists &&
                            <div className="album__playlists">
                                <Swipper
                                    isAlbums
                                    title={`Album khác của ${albumOfArtists?.name}`}
                                    playPlaylist={playPlaylist}
                                    handlePlayPlaylist={handlePlayAlbum}
                                    playlistsOfTopic={albumOfArtists?.result}/>
                            </div>
                        
                        }
                    </div>

                </div>
            </>
            : <Spinner isStyle loading={true} />
            }
            <Spinner isStyle loading={loading} />
                    
        </div>
    )
}

export default Album
