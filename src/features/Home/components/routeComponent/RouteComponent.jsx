import React, { useRef, Suspense} from 'react'

import Sidebar from 'features/Home/components/Sidebar/Sidebar'
import Spinner from 'components/Spinner/spinner'
import {
    Switch,
    Route,
    useHistory,
    Redirect
  } from "react-router-dom"

const RouteComponent = () => {
    // component
    const Playlist = React.lazy(() => import('features/Home/playlist/Playlist'))
    const Collection = React.lazy(() => import('features/Home/collection/Collection'))
    const Album = React.lazy(() => import('features/Home/album/Album'))
    const Dashboard = React.lazy(() => import('features/Home/dashboard/Dashboard'))
    const SearchPage = React.lazy(() => import('features/Home/searchPage/Search'))
    const Topics = React.lazy(() => import('features/Home/topics/Topics'))
    const Artists = React.lazy(() => import('features/Home/artists/Artists'))
    // refs
    const history = useHistory()
    const headerRef = useRef()
    //state
   
    const changeBackGround = () => {
        let bgObj = {
            bg: '',
            cls: ''
        }
        if(history.location.pathname.search('collection') !== -1)  {bgObj.cls = 'pt-0'}
        if(history.location.pathname.search('playlists') !== -1)  {bgObj.bg = ' linear-gradient( 135deg, #006450 0%, #19e68c 100%)'}
        if(history.location.pathname.search('artists') !== -1)  {bgObj.cls = 'pt-0'}
        if(history.location.pathname.search('albums') !== -1)  {bgObj.cls = 'album__active'}
 
        return bgObj
    }

    return (
        <div 
            className={`main ${changeBackGround().cls}`} 
            style={{background: changeBackGround().bg}}
            ref={headerRef} 
            >
                <div className="main__component">
                    <Suspense fallback={<Spinner isStyle="true" loading={true}/>}>
                        <Switch>   
                            <Route path="/search">
                                <SearchPage />
                            </Route>
                            <Route path="/topics/:id" >
                                <Topics />
                            </Route>
                            <Route path={`/playlists/:playlistID`}>
                                <Playlist /> 
                            </Route>
                            <Route path="/collection">
                                <Collection />
                            </Route>
                         
                            <Route exact path="/albums/:albumID">
                                <Album />
                            </Route>
                            <Route exact path="/artists/:artistID">
                                <Artists />
                            </Route>
                            <Route path="/dashboard">
                                <Dashboard />
                            </Route>
                            <Redirect from="/" to="/dashboard"/>
                        </Switch> 
                    </Suspense>

                </div>
                <div className="sidebar__mobile">
                    <Sidebar />
                </div> 
        </div>
    )
}

export default RouteComponent
