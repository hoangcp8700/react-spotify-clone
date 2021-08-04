import React from 'react'
import { useSelector } from 'react-redux'
import Box from './Box'
import './style.scss'
import Spinner from 'components/Spinner/spinner'

import ResultFirst from './components/ResultFirst'
import TableSearch from './components/TableSearch'
import ResultArtists from './components/ResultArtists'
import ResultAlbums from './components/ResultAlbums'
import ResultPlaylists from './components/ResultPlaylists'

const Search = () => {
    const categories = useSelector(state => state.categories.categories)
    const searchResult = useSelector(state => state.play.searchResult)
    const loading = useSelector(state => state.play.isLoading)
    return (
        <>
            <div className="search__page">
                {searchResult.tracks.items ? 
                <>
                    <ResultFirst tracks={searchResult.tracks} />
                    <TableSearch lists={searchResult.tracks} />
                    <ResultArtists artists={searchResult.artists} />
                    <ResultAlbums albums={searchResult.albums} />
                    <ResultPlaylists playlists={searchResult.playlists} />
                </>
                : <div className="categories__box">  
                    <Box categories={categories.items} />
                </div>
                }
            </div>
            <Spinner isStyle={true} loading={loading} />
        </>
    )
}

export default Search
