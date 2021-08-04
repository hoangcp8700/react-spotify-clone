import React, { useEffect, useState } from 'react'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import './style.scss'
import {  useDispatch, useSelector } from 'react-redux';
import { setTrack, playlistsIsPlay,  setPlayPlaylist, setIsPlay, setMessage} from 'features/Home/playTrackSlice'
import { GetDataSpotify } from 'api/spotifyAPI';
import { setMyAlbumsNew, setPlaylistsNew } from 'features/Home/userSlice';
const ToolsPlayer = ({list, playPlaylist, id = null, albumID = null, playlist, album}) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const playlistsState = useSelector(state => state.user.playlists)
    const albumsState = useSelector(state => state.user.myAlbums)

    const [isFollow, setIsFollow] = useState(false)

    useEffect(() => {
        if(!id) return
        const call = async () => {
            const checkFollowerPlaylist = await GetDataSpotify(`playlists/${id}/followers/contains?ids=${user.id}`)
            setIsFollow(checkFollowerPlaylist[0])
        }
        call()
         // eslint-disable-next-line
    },[id])

    useEffect(() => {
        if(!albumID) return
        const call = async () => {
            const checkFollowerAlbum = await GetDataSpotify(`me/albums/contains?ids=${albumID}`)
            setIsFollow(checkFollowerAlbum[0])
        }
        call()
    },[albumID])

    const handleIsPlay = () => {
        // if albumID or playlsitID exist then return isPlay
        console.log(playPlaylist.id, id)
        if((playPlaylist.albumID && playPlaylist.albumID === albumID) || (playPlaylist.id && playPlaylist.id === id)){
            return dispatch(setIsPlay(!playPlaylist.isPlay))
        }
        //  playlist(top-track) or album of artists
        const add = id 
        ? {...playPlaylist, albumID: null, id} 
        : {...playPlaylist, id: null, albumID}
       
        dispatch(setPlayPlaylist(add)) // set idplaylist theo param
        dispatch(playlistsIsPlay(list)) // set playlist muon nghe
        dispatch(setTrack(list[0])) // set track dau tien cua playlist
    }

    const compare = id 
                ? (playPlaylist.id === id ? true : false) 
                : (playPlaylist.albumID === albumID ? true : false)
    
    // const 
    const handleFavorite = async () => {
        if(!isFollow){
            if(id){
                const newPlaylists = [playlist,...playlistsState.items ]
                dispatch(setPlaylistsNew({...playlistsState, items: newPlaylists}))
                dispatch(setMessage({severity: 'success', mes: `Đã thêm playlist ${playlist?.name} vào bộ sưu tập`}))
                await GetDataSpotify(`playlists/${playlist.id}/followers`, "PUT")
            }else{
                const newAlbums = [album,...albumsState.items ]
                dispatch(setMyAlbumsNew({...albumsState, items: newAlbums}))
                dispatch(setMessage({severity: 'success', mes: `Đã thêm album ${album?.name} vào bộ sưu tập`}))
                await GetDataSpotify(`me/albums?ids=${albumID}`, "PUT")
            }
        }else{
            if(id){
                const newPlaylists = playlistsState.items.filter(val => val.id !== playlist.id)
                dispatch(setPlaylistsNew({...playlistsState, items: newPlaylists}))
                dispatch(setMessage({severity: 'success', mes: `Đã xóa playlist ${playlist?.name} khỏi bộ sưu tập`}))
                await GetDataSpotify(`playlists/${playlist.id}/followers`, "DELETE")
            }else{
                const newAlbums = albumsState.items.filter(val => val.id !== albumID)
                dispatch(setMyAlbumsNew({...albumsState, items: newAlbums}))
                dispatch(setMessage({severity: 'success', mes: `Đã xóa album ${album?.name} khỏi bộ sưu tập`}))
                await GetDataSpotify(`me/albums?ids=${albumID}`, "DELETE")
            }
           
        
        }
        setIsFollow(!isFollow)
    }
    return (
        <div className="tools__player">
            <span onClick={handleIsPlay}>
                {playPlaylist.isPlay && compare
                    ? <PauseCircleFilledIcon className="tools__player--icon active" style={{fontSize: '3rem'}}/>
                    : <PlayCircleFilledIcon className="tools__player--icon active" style={{fontSize: '3rem'}}/>
                }
            </span>
            <span onClick={() => handleFavorite(isFollow)}>
                {isFollow
                    ? <FavoriteIcon className="tools__player--icon active" />
                    : <FavoriteBorderIcon className="tools__player--icon" />
                }
            </span>
                <MoreHorizIcon className="tools__player--icon" />
        </div> 
    )
}
export default ToolsPlayer