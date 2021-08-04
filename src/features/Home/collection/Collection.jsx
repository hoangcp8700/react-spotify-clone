import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import UserNav from './components/UserNav'
import TabContent from './components/TabContent'
import Spinner from 'components/Spinner/spinner'
import DialogFollows from 'components/DialogFollows/DialogFollows'
import Menus from 'features/Home/collection/data/Menus'

const Collection = () => {
    const user = useSelector(state => state.user.user)
    const playlists = useSelector(state => state.user.playlists)
    const myTracks = useSelector(state => state.user.myTracks)
    const myArtists = useSelector(state => state.user.myArtists)
    const myAlbums = useSelector(state => state.user.myAlbums)
    const loading = useSelector(state => state.play.isLoading)

    const [isOpenDialogFollowers, setIsOpenDialogFollowers] = useState(false)

    const playPlaylist = useSelector(state => state.play.playPlaylist) 

    const handleDialogFollowing = (val) => {
        setIsOpenDialogFollowers(val)
    }
    const {handleDelete} = Menus({playlists:{}, artists:{}, albums:{}, tracks:{}})

    return (
        <div className="collection">
            <UserNav 
                user={user} 
                following={myArtists} 
                handleDialogFollowing={handleDialogFollowing} 
                isOpen={isOpenDialogFollowers}   
                />
            <TabContent 
                playPlaylist={playPlaylist}
                playlists={playlists} 
                artists={myArtists}
                albums={myAlbums}
                tracks={myTracks} />
            <Spinner isStyle loading={loading}/>
            
            <DialogFollows 
                handleFollow={handleDelete}
                handleDialogFollowing={handleDialogFollowing} 
                list={myArtists} 
                isOpen={isOpenDialogFollowers} />
        </div>
    )
}

export default Collection
