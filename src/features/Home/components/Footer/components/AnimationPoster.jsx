import React from 'react'
import MusicNote from 'components/MusicNote/MusicNote'

const AnimationPoster = ({isPlay}) => {
    return (
        <>
             <div className={`footer__amination`}>
                    <div className={`music__amination ${isPlay && 'active'} ${!isPlay && 'pause'} `}>
                        <MusicNote />
                    </div>
                    <div className="overflow__amination__end"></div>
                </div>
        </>
    )
}

export default AnimationPoster
