import React from 'react'
import SwipperCircle from 'components/SwipperCircle/SwipperCircle'

const ResultArtists = ({artists}) => {
    return (
        <>
            {artists.items &&
                <SwipperCircle 
                    title="Nghễ si" 
                    list={artists.items}/>
            }
        </>
    )
}

export default ResultArtists
