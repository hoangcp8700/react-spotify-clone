import { GetDataSpotify } from "api/spotifyAPI"

export const setTypeAPI = async(type, id) => { 
    try{
        const res = await GetDataSpotify(`${type}/${id}`)
        return res
    }catch(err) {
        console.log('err', err)
    }  
}