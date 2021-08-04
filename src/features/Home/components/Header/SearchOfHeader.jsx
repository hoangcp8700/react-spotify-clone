import React, { useCallback, useRef } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import { GetDataSpotify } from 'api/spotifyAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchResult } from 'features/Home/playTrackSlice';
import _ from 'lodash'
import { useEffect } from 'react';
const SearchOfHeader = () => {
    const dispatch = useDispatch()
    const searchState = useSelector(state => state.play.searchResult)
    const searchRef = useRef()

    useEffect(() => {
        searchRef.current.value = searchState?.search || ""
    },[searchState])

    const callSearchApi = async (e) => {
        if(!e.target.value) return  dispatch(setSearchResult({tracks: {}, albums: {}, playlists: {}, artists: {}}))
        const {tracks, albums, playlists, artists} = await GetDataSpotify(`search?q=${e.target.value}&type=album,artist,playlist,track&market=VN`)
        dispatch(setSearchResult({search: e.target.value, tracks, albums, playlists, artists}))
    }
    // eslint-disable-next-line
    const debounceHandleSearch = useCallback(
        _.debounce(callSearchApi, 300)
      , [])
    
    return (
        <div className="header__search">
            <SearchIcon/>
                <input
                    ref={searchRef}
                    type="text" 
                    placeholder="Search" 
                    onChange={debounceHandleSearch} />
        </div>
    )
}

export default SearchOfHeader
