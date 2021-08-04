import React, {useState, useEffect, useRef} from 'react'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import RepeatOneIcon from '@material-ui/icons/RepeatOne';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import CircularProgress from '@material-ui/core/CircularProgress';

import { setTrack, setIsPlay, setMessage } from 'features/Home/playTrackSlice'
import { useSelector, useDispatch } from 'react-redux';
import { LoopArtists } from 'utils/LoopArtists';

import './Footer.scss'
import {FormatDuration} from 'utils/FormatDuration'
import AnimationPoster from './components/AnimationPoster'
import SongInfo from './components/SongInfo'
import Favorite from 'components/Favorite/Favorite'
import { GetDataSpotify } from 'api/spotifyAPI';
import { setMyTracksNew } from 'features/Home/userSlice';

const Footer = ({handleFooterVertical}) => {
    const dispatch = useDispatch()
    
    // const playlist = useSelector(state => state.user.playlist)
    const myTracks = useSelector(state => state.user.myTracks)
    const track = useSelector(state => state.play.track)
    const tracks = useSelector(state => state.play.playlists)
    const playPlaylist = useSelector(state => state.play.playPlaylist)

    // state
    const [spinPlay, setSpinPlay] = useState(false)
    const [isVolume, setIsVolume] = useState(false)
    const [shuffle, setShuffle] = useState(false)
    const [repeat, setRepeat] = useState(0)
    const [duration, setDuration] = useState(0) 
    const [currentTime, setCurrentTime] = useState(0) 
    const [footerVertical, setFooterVertical] = useState(false)
    
    const [isFavoriteTrack, setIsFavoriteTrack] = useState(false)
    // refs
    const audioRef = useRef()
    const progress = useRef()
    const volumeRef = useRef()
    const bubbleVolumeRef = useRef()
    const countRepeat = useRef(0)
    const nextRef = useRef()

    useEffect(() => {
        progress.current.value =  (currentTime * 100) / duration
        progress?.current?.style?.setProperty('--seek-before-width', `${progress?.current?.value}%`)
        if(currentTime >= duration) {
            setSpinPlay(true)
            if(shuffle){
                return handleShuffle()
            }
            if(repeat === 2){
                return setTimeout(() => {
                    progress.current.value = 0
                    audioRef.current.play() 
                    setSpinPlay(false)
                }, 1000)
            }
            if(repeat === 1){
                if(countRepeat.current > 0){
                    countRepeat.current = 0
                    handleNextOrPreTrack('next')
                    return
                }
                return setTimeout(() => {
                    progress.current.value = 0
                    audioRef.current.play()
                    countRepeat.current++
                    setSpinPlay(false)
                }, 1000);   
               
            }
            return setTimeout(() => {
                handleNextOrPreTrack('next')
            }, 1000); 
        }
        // eslint-disable-next-line
    },[currentTime])

    useEffect(() => {
        if(!track?.id) return
        setSpinPlay(false)
        dispatch(setIsPlay(true))
        audioRef.current.src = track?.preview_url
        audioRef.current.volume = volumeRef.current.value / 100
        PlayOrPause(true)

        const checkMyTracks = () => {
            const compare = myTracks.items.findIndex(val => val.id === track.id)
            if(compare !== -1) setIsFavoriteTrack(true)
            else setIsFavoriteTrack(false)
        }
        checkMyTracks()
      // eslint-disable-next-line
    }, [track])

    useEffect(() => {
        if(!audioRef?.current?.src) return
        playPlaylist.isPlay ? audioRef?.current.play() : audioRef?.current.pause()
    },[playPlaylist?.isPlay])
    
    
    const setUpMediaSession = () => {
        if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new window.MediaMetadata({
              title: track?.name,
              artist: LoopArtists(track?.artists,'',true),
              album: track?.album?.name,
              artwork: [
                { src: track?.album?.images[0].url},
              ]
            });
          
            navigator.mediaSession.setActionHandler('play', function() {
                dispatch(setIsPlay(true))      
                audioRef.current.play() 
            });
            navigator.mediaSession.setActionHandler('pause', function() { 
                dispatch(setIsPlay(false))      
                audioRef.current.pause() 
            });
            navigator.mediaSession.setActionHandler('previoustrack', function() { handleNextOrPreTrack('pre') });
            navigator.mediaSession.setActionHandler('nexttrack', function() { handleNextOrPreTrack('next') });
          }
    }

    // pause or play audio
    const togglePlayPause = () => {   
        dispatch(setIsPlay(!playPlaylist.isPlay))      
        PlayOrPause(!playPlaylist.isPlay)     
    }

    const PlayOrPause = (play) => {
        if(audioRef?.current?.duration <= 0) return
        if(!track?.preview_url){
            setSpinPlay(true)
            const next = () => {
                dispatch(setIsPlay(false))   
                setSpinPlay(false)
                handleNextOrPreTrack('next')
            }
            if(playPlaylist.isPlay) {
                // click stop then clear event next track
                return clearTimeout(nextRef.current)
            }
            nextRef.current = setTimeout(next, 2000);
        }else{
            clearTimeout(nextRef.current)
           
        }
        
        play  
        ? audioRef.current.play().then(_ => setUpMediaSession()) 
        : audioRef.current.pause()
    }

    const handleProgress = (e) => {
        let value = (e.target.value * duration) / 100
        setCurrentTime(value)
        if(audioRef.current.currentTime) audioRef.current.currentTime = value
        progress.current.value = e.target.value
        progress.current.style.setProperty('--seek-before-width', `${e.target.value}%`)
    }
    
    // volume 
    const handleSetVolume = (e) => {
        if(audioRef?.current?.src) audioRef.current.volume = volumeRef.current.value / 100
        volumeRef.current.value = e.target.value
        bubbleVolumeRef.current.style.left = e.target.value >= 95 ? '95%' : `${e.target.value}%`
        bubbleVolumeRef.current.innerHTML = e.target.value
        if(isVolume) setIsVolume(false)
    }

    const handleSetVolumeClick = (value) => {
        if(audioRef?.current?.src) audioRef.current.volume = value / 100
        volumeRef.current.value = value
        bubbleVolumeRef.current.style.left = `${value}%`
        bubbleVolumeRef.current.innerHTML = value
       
    }

    const handleRepeat = () => {
        const preRepeat = repeat
        preRepeat === 2 ? setRepeat(0) : setRepeat(preRepeat+1)
    }

    const handleNextOrPreTrack = (type) => {
        if(!tracks) return
        const index = tracks.findIndex(val => val.id === track?.id )
        let num = type === 'next' ? index+1 : index-1
        if(num < 0 || index === -1 || num >= tracks.length) return
        dispatch(setTrack(tracks[num]))
    }
    
    const handleShuffle = () => {
        if(!tracks) return
        const random = Math.floor(Math.random() * tracks.length);
        dispatch(setTrack(tracks[random]))
    }

    const handleClickFooterVertical = (val, type) => {
        if(type === 'songinfo' && !val ) return
        setFooterVertical(!val)
        handleFooterVertical({val: !val})
    }

    const handleFavorite = async (val, id) => {
        setIsFavoriteTrack(val)
        try{
            if(val){
                const newTracks = [track,...myTracks.items ]
                dispatch(setMyTracksNew({...myTracks, items: newTracks}))
                dispatch(setMessage({severity: 'success', mes: `Bài hát '${track?.name}' đã được thêm vào bộ sưu tập `}))
                await GetDataSpotify(`me/tracks?ids=${id}`, "PUT")

            }else{
                const newPlaylists = myTracks.items.filter(val => val.id !== track.id)
                dispatch(setMyTracksNew({...myTracks, items: newPlaylists}))
                dispatch(setMessage({severity: 'success', mes: `Bài hát '${track?.name}' đã xóa khỏi bộ sưu tập `}))
                await GetDataSpotify(`me/tracks?ids=${id}`, "DELETE")

            }

        }catch(error) {
            console.log(error)
        }   
    }

    return (
        <div className="footer" >
            <div className="footer__position__relative">
                <div className="footer__left">
                    {track?.album &&
                        <>
                            <AnimationPoster isPlay={playPlaylist.isPlay}/>
                            <span 
                                onClick={() => handleClickFooterVertical(footerVertical)} 
                                className="poster__link">
                                <img 
                                    className={`footer__poster ${playPlaylist.isPlay && 'active'}`} 
                                    src={track?.album?.images[2]?.url} 
                                    alt="preview" />
                               
                            </span>
                            <Favorite 
                                className="footer__favorite"
                                track={track} 
                                handleFavorite={handleFavorite} 
                                myFavorite={isFavoriteTrack} />
                            <SongInfo
                                handleFavorite={handleFavorite}
                                myFavorite={isFavoriteTrack}
                                track={track}
                                playPlaylist={playPlaylist} 
                                footerVertical={footerVertical}
                                handleFooterVertical={handleClickFooterVertical}/>
                        </>
                    }
                    {/* )} */}
                </div>
                <div className="footer__center">
                    <audio 
                        onCanPlay={(e) => setDuration(e.target.duration)}
                        onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
                        ref={audioRef} 
                        preload="metadata"></audio>
                    <div className="center__top">
                        <span className="footer__icon">
                            <ShuffleIcon 
                                onClick={() => setShuffle(!shuffle)}
                                className={`footer__icon--icon ${shuffle && 'footer__green'} }`} />
                        </span>
                        <span className="footer__icon">
                            <SkipPreviousIcon 
                                onClick={() => handleNextOrPreTrack('pre')} 
                                className="footer__icon--icon"/>
                        </span>
                        <span 
                            onClick={() => togglePlayPause()} 
                            className="footer__icon">
                            { !playPlaylist.isPlay 
                                ? <PlayCircleFilledIcon className="footer__icon--large" /> 
                                : (
                                    <>  
                                        { !spinPlay 
                                        ? <PauseCircleFilledIcon  className="footer__icon--large" /> 
                                        : <CircularProgress className="footer__icon--circle"/>}
                                    </>
                                ) 
                            }
                          
                        </span>
                        <span className="footer__icon">
                            <SkipNextIcon 
                                onClick={() => handleNextOrPreTrack('next')} 
                                className="footer__icon--icon"/>
                        </span>   
                        <span 
                            onClick={handleRepeat} 
                            className="footer__icon">
                            {repeat === 0 && (<RepeatIcon className="footer__icon--icon" /> )}
                            {repeat === 1 && (<RepeatOneIcon className="footer__icon--icon footer__green"/> )}
                            {repeat === 2 && (<RepeatIcon className="footer__icon--icon footer__green" /> )}
                        </span>
                    </div>
                    {track && (<div className="center__bottom">
                        <span className="duration__ms">{ FormatDuration(currentTime) }</span>
                        <input 
                            className="progressBar"
                            ref={progress}
                            type="range" 
                            onChange={handleProgress} />
                        <span className="duration__ms">{ FormatDuration(Math.floor(duration)) }</span>
                    </div>
                    )}
                </div>
                <div className="footer__right">
                    <span 
                        onClick={() => setIsVolume(!isVolume)} 
                        >
                        {isVolume 
                            ? <VolumeOffIcon className="footer__icon--icon" onClick={() => handleSetVolumeClick(50)} />
                            : <VolumeUpIcon className="footer__icon--icon" onClick={() => handleSetVolumeClick(0)} />
                        }
                    </span>
                    <div className="range-wrap">
                        <input 
                            onMouseLeave={() => {bubbleVolumeRef.current.style.opacity = 0}}
                            onMouseEnter={() => {bubbleVolumeRef.current.style.opacity = 1}}
                            className="progressBar"
                            ref={volumeRef}
                            type="range" 
                            onChange={handleSetVolume} />
                        <output className="bubble" ref={bubbleVolumeRef}>
                            {volumeRef?.current?.value}
                        </output>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
