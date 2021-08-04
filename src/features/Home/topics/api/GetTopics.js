import { GetDataSpotify } from "api/spotifyAPI"

export const GetTopics = async ({id, limit = 20, total = 0}) => {  
    try{
        if(total > 0){
            // const offset = `offset=${limit}&limit=${total-limit}`  
            const offset = `offset=${limit}&limit=50` 
            const playlistsOfTopic =  await GetDataSpotify(`browse/categories/${id}/playlists?${offset}`) 
            return  playlistsOfTopic
        }
        const topic =  await GetDataSpotify(`browse/categories/${id}`)
        const {playlists} =  await GetDataSpotify(`browse/categories/${id}/playlists`)
        return {topic, playlists}
    }catch(err){ 
        console.log(err)
    }

}