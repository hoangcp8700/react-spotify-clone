import React, {useEffect, useState} from "react";

import {  useSelector } from "react-redux";
import Spinner from 'components/Spinner/spinner'
import Swipper from 'components/Swipper/Swipper'
import { useSetAlbum } from "hooks/useSetAlbum";

import _ from 'lodash'
export default function Dashboard() {

  const [topics, setTopics] = useState([])

  const topicDashboard = useSelector(state => state.user.topicDashboard)
  const playPlaylist = useSelector(state => state.play.playPlaylist)
  const loading = useSelector(state => state.play.isLoading)

  useEffect(() => {
    let arr = []
    _.forEach(topicDashboard, (val, key) => {
        arr.push(val)
    })
    setTopics(arr)
    
  }, [topicDashboard])

  const { handlePlayAlbum, handlePlayPlaylist } = useSetAlbum({artistID:null})

  return (
    <>
        {topics.length && 
        topics.map((topic,ind) => (
            <Swipper 
                key={ind}
                isAlbums={topic?.albums ? true : false}
                handlePlayPlaylist={topic?.albums ? handlePlayAlbum : handlePlayPlaylist}
                title={topic?.title }
                playPlaylist={playPlaylist} 
                playlistsOfTopic={topic?.albums ? topic?.albums?.items : topic?.playlists?.items}/>
            ))
        }
      
        <Spinner isStyle loading={loading}/>
    </>
  )
}
