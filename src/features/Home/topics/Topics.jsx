import React, {useEffect, useState} from 'react'
import {Link, Route, Switch,  useParams, useRouteMatch } from "react-router-dom"
import { GetDataSpotify } from 'api/spotifyAPI'
import './style.scss'
import Swipper from 'components/Swipper/Swipper'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../playTrackSlice'
import Spinner from 'components/Spinner/spinner'
import {useSetAlbum} from 'hooks/useSetAlbum'

const Topics = () => {
    //components
    const ListTopic = React.lazy(() => import('./components/ListTopics'))
    const match = useRouteMatch()
    let {id} = useParams();
    const dispatch = useDispatch()
    //state

    const [topic, setTopic] = useState({})
    const [playlistsOfTopic, setPlaylistsOfTopic] = useState({})
    const [infoPlaylist, setInfoPlaylist ] = useState({limit: 0, total: 0})
    
    // redux
    const categories = useSelector(state => state.categories.categories)
    const playPlaylist = useSelector(state => state.play.playPlaylist)
    const loading = useSelector(state => state.play.isLoading)

    // CUSTOM HOOK
    const { handlePlayPlaylist} = useSetAlbum({artistID: null})
    
    useEffect(() => {
        dispatch(setLoading(true))
        const getPlaylist = async () => {
            const result = categories.items.filter(val => val.id === id)
            if(result.length){
                const {playlists} = await GetDataSpotify(`browse/categories/${result[0].id}/playlists`)
                
                await setTopic(result[0]) 
                await setPlaylistsOfTopic(playlists) 
                await setInfoPlaylist({limit: playlists.limit, total: playlists.total})

            }
            await dispatch(setLoading(false))
             
        }  
        getPlaylist()
        // eslint-disable-next-line
    },[id])

    return (
        <>
            {topic?.name && <div className="topics__page" >
                <div className="topic__title">
                    <h1>{topic?.name }</h1>
                </div>
                <div className="topic__content">
                    <div className="playlist__of__topic" >
                        <div className="playlist__title">
                            <h4>Danh sách phát thịnh hành</h4>
                            {match.url !== window.location.pathname
                                ? <Link to={`${match.url}`} className="link__topic"> Quay về </Link>
                                : <Link to={`${match.url}/all`} className="link__topic"> Xem tất cả </Link>
                            }
                        </div>
                        <Switch>
                            <Route 
                                path={`${match.path}`} 
                                exact 
                                render={() => 
                                    <Swipper  
                                        handlePlayPlaylist={handlePlayPlaylist}
                                        playPlaylist={playPlaylist} 
                                        playlistsOfTopic={playlistsOfTopic.items}/>
                                }>
                            </Route>
                            <Route  
                                path={`${match.path}/all`} 
                                render={() => <ListTopic
                                    playPlaylist={playPlaylist}
                                    handlePlayPlaylist={handlePlayPlaylist}
                                    id={id}
                                    playlistsOfTopic={playlistsOfTopic} 
                                    infoPlaylist={infoPlaylist}/>} ></Route>
                        </Switch> 
                    </div> 
                </div>
                
            </div>
            }
            <Spinner isStyle={true} loading={loading} /> 
        </>
    )
}

export default Topics
