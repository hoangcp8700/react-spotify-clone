
import {useEffect} from 'react'
export const useFocus = ({track, album}, focusTrackRef) => {

    useEffect(() => {
        if(!track?.id) return
        focusTrackRef.current && focusTrackRef.current.focus()
        // eslint-disable-next-line
    },[track])

    useEffect(() => {
        if(!album) return
        setTimeout(() => {
            focusTrackRef.current && focusTrackRef.current.focus()
        }, 1000)
        // eslint-disable-next-line
    },[album])
}