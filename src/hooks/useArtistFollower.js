import { GetDataSpotify } from "api/spotifyAPI"
import { setMessage } from "features/Home/playTrackSlice"
import { setMyArtistsNew } from "features/Home/userSlice"
import { useDispatch } from "react-redux"

export const useArtistFollower = () => {
    const dispatch = useDispatch()
   
    const handleFollow = async (artistID, list) => {
        const value = list.items.filter(val => val.id === artistID)

        if(!value.length){
            const res = await GetDataSpotify(`artists/${artistID}`)
            const newList = [res, ...list.items]
            dispatch(setMyArtistsNew({...list, items: newList}))
            dispatch(setMessage({severity: 'success', mes: `Bạn đang theo dõi '${res.name}'`}))
            await GetDataSpotify(`me/following?type=artist&ids=${artistID}`, "PUT")
        }else{
            const newList = list.items.filter(val => val.id !== artistID)
            dispatch(setMyArtistsNew({...list, items: newList}))
            dispatch(setMessage({severity: 'success', mes: `Bạn đã hủy theo dõi '${value[0].name}'`}))
            await GetDataSpotify(`me/following?type=artist&ids=${artistID}`, "DELETE")
            
        }
    }
    return { handleFollow}
}