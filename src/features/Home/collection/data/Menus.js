import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import InfoIcon from '@material-ui/icons/Info';
import AlbumIcon from '@material-ui/icons/Album';
import ShareIcon from '@material-ui/icons/Share';
import { useSetAlbum } from 'hooks/useSetAlbum';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setMessage } from 'features/Home/playTrackSlice';
import { setMyAlbumsNew, setMyArtistsNew, setMyTracksNew, setPlaylistsNew } from 'features/Home/userSlice';
import { useState } from 'react';
import { ProductionURLEnv } from 'app/production';
import { GetDataSpotify } from 'api/spotifyAPI';

const Menus = ({playlists, artists, albums, tracks}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    
    const [isDialog, setIsDialog] = useState({bool: false})
    const [isDialogInfo, setIsDialogInfo] = useState({bool: false})

    const {
        handlePlayPlaylist,
        handlePlayAlbum} = useSetAlbum({artistID:null})
    
    const handlePlay = ({id, type}) => {
        console.log('HANDLE PLAY', id, type)
        type === "playlist" 
        ? handlePlayPlaylist(id)
        : handlePlayAlbum(id)
    }
    const handleRedirect = ({id, type}) => {
        console.log('HANDLE REDIRECT',`/${type}s/${id}`, id, type)
        history.push(`/${type}s/${id}`)
    }
    const compactDelete = (id, lists) => {
        const value = lists.items.filter(val => val.id === id)
        const newList = lists.items.filter(val => val.id !== id)
        return {value, newList}
    }
    const handleDelete = async ({id, type, trackID}) => {
        if(type === "playlist"){
            const {value, newList} = await compactDelete(id, playlists)
            dispatch(setPlaylistsNew({...playlists, items: newList}))
            dispatch(setMessage({severity: 'success', mes: `???? x??a playlist. '${value[0].name}' ra kh???i b??? s??u t???p`}))
            await GetDataSpotify(`playlists/${id}/followers`, "DELETE")
        }else if(type === "album" && !trackID){
            const {value, newList} = await compactDelete(id, albums)
            dispatch(setMyAlbumsNew({...albums, items: newList}))
            dispatch(setMessage({severity: 'success', mes: `???? x??a album. '${value[0].name}' ra kh???i b??? s??u t???p ` }))
            await GetDataSpotify(`me/albums?ids=${id}`, "DELETE")
        }else if(type === "artist"){
            const {value, newList} = await compactDelete(id, artists)
            dispatch(setMyArtistsNew({...artists, items: newList}))
            dispatch(setMessage({severity: 'success', mes: `???? h???y theo d??i '${value[0].name}' `}))
            await GetDataSpotify(`me/following?type=artist&ids=${id}`, "DELETE")
        }else {
            const {value, newList} = await compactDelete(trackID, tracks)
            dispatch(setMyTracksNew({...tracks, items: newList}))
            dispatch(setMessage({severity: 'success', mes: `???? x??a b??i h??t ' ${value[0].name} ' ra kh???i b??? s??u t???p ` }))
            await GetDataSpotify(`me/tracks?ids=${trackID}`, "DELETE")
        }
        await setIsDialog({bool: false})
    }

    const handleShare = ({id, type, trackID}) => {
        if(type === "track") type = "album"
        const link = `${ProductionURLEnv()}/${type}s/${id}`
        navigator.clipboard.writeText(link)
        dispatch(setMessage({severity: 'success', mes: '???? sao ch??p li??n k???t'}))
    }

    const handleOpenShare = ({id, type}) => {
        const url = `https://open.spotify.com/${type}/${id}`
        window.open(url, '_blank').focus();
    }

    const handleInfo =  async ({id, type, trackID}) => {
        const {value} = await compactDelete(trackID, tracks)
        setIsDialogInfo({bool: true, value: value[0]})

    }
    const handleDialog = (props) => {
        if(props.continue) return handleDelete({id: props.id, type: props.type, trackID: props.trackID})
        setIsDialog({bool: true, ...props})
    }
    const menus = [
        {
            label: 'Ph??t ngay',
            icon: <PlayCircleFilledWhiteIcon />,
            handle: handlePlay
        },
        {
            label: 'Chuy???n ?????n danh s??ch ph??t',
            icon: <QueueMusicIcon />,
            handle: handleRedirect
        },
        {
            label: 'X??a kh???i b??? s??u t???p',
            icon: <DeleteOutlineIcon />,
            handle: handleDialog
        },
        {
            label: 'Chia s???',
            icon: <ShareIcon />,
            subMenu: [
                { 
                    label: 'Sao ch??p li??n k???t',
                    handle: handleShare
                },
                { 
                    label: 'M??? li??n k???t b???ng Spotify',
                    handle: handleOpenShare
                },

            ],
        }
    ]
    const menuTracks = [
        {
            label: 'Hi???n th??? th??ng tin b??i h??t',
            icon: <InfoIcon />,
            handle: handleInfo
        },
        {
            label: 'X??a b??i h??t kh???i b??? s??u t???p',
            icon: <DeleteOutlineIcon />,
            handle: handleDialog
        },
        {
            label: 'Chuy???n ?????n album',
            icon: <AlbumIcon />,
            handle: handleRedirect
        },
        {
            label: 'Chuy???n ?????n trang th??ng tin ngh??? s??',
            handle: handleRedirect,
            subMenu: [],
        },
        {
            label: 'Chia s???',
            icon: <ShareIcon />,
            subMenu: [
                { 
                    label: 'Sao ch??p li??n k???t',
                    handle: handleShare
                },
                { 
                    label: 'M??? li??n k???t b???ng Spotify',
                    handle: handleOpenShare
                },

            ],
        }
    ]

    const menuArtists = [
        {
            label: 'X??a kh???i b??? s??u t???p',
            icon: <DeleteOutlineIcon />,
            handle: handleDialog
        },
        {
            label: 'Chuy???n ?????n trang th??ng tin ngh??? s??',
            iconL: <PermIdentityIcon />,
            handle: handleRedirect
        },
        {
            label: 'Chia s???',
            subMenu: [
                { 
                    label: 'Sao ch??p li??n k???t',
                    handle: handleShare
                },
                { 
                    label: 'M??? li??n k???t b???ng Spotify',
                    handle: handleOpenShare
                },

            ],
        }
    ]
    return {menus, menuArtists, menuTracks,
        isDialog, handleDialog,
        isDialogInfo, handleDelete
        }
}

export default Menus