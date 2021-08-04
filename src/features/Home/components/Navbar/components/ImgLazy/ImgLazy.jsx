import React, { useState } from 'react'
import MusicNoteIcon from '@material-ui/icons/MusicNote';

const ImgLazy = ({img}) => {
    const [imgNotFound, setImgNotFound] = useState(false)

    return (
        <>
            {
                !imgNotFound
                ? <img 
                    className="nav__poster" 
                    src={img} 
                    onError={() => setImgNotFound(true)} 
                    alt="album" />  
                : <div 
                    className="nav__poster notfound"> 
                        <MusicNoteIcon style={{fontSize: 80}} />
                    </div>
            }
        </>
    )
}

export default ImgLazy
