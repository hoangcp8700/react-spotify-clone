import React, {useEffect, useState} from 'react'
import Card from 'components/Card/Card'
import './ListTopics.scss'
import { GetDataSpotify } from 'api/spotifyAPI'
const ListTopics = ({id, infoPlaylist, playlistsOfTopic, handlePlayPlaylist, playPlaylist}) => {
    const [list, setList] = useState([])
    
    useEffect(() => {
        if(infoPlaylist.total <= infoPlaylist.limit) return
        const getListPlaylist = async () => {
            const offset = `offset=${infoPlaylist?.limit}&limit=50` 
            const res =  await GetDataSpotify(`browse/categories/${id}/playlists?${offset}`) 
            await setList([...playlistsOfTopic.items, ...res?.playlists?.items])
        }
        getListPlaylist()
        // eslint-disable-next-line
    },[infoPlaylist])
    return (
        <>
        {list.length && 
            <div className="topic__list__all">
                <div className="topic__title">
                    <h4 >Có {list.length} album được hiển thị</h4>
                </div>
                <div className="topic__list">
                    {list.map(val => (
                        <Card 
                            key={val.id}
                            card={val}
                            handlePlayPlaylist={handlePlayPlaylist}
                            playPlaylist={playPlaylist}
                        />
                    ))}
                </div>
                
            </div>
        }
        </>
       
    )
}

export default ListTopics
