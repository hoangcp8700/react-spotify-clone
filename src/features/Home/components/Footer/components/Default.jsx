import React from 'react'
import ImgLazy from 'features/Home/components/Navbar/components/ImgLazy/ImgLazy';

const Default = () => {
    const link = "https://ss-images.saostar.vn/2019/01/18/4465255/rs_1080x1080-190117134343-ariana-grande-7-rings-music-video-instagram-photos-cc-11719-1.jpg"
    return (
        <>
            <ImgLazy img={link}/>
            <div className="footer__songInfo">
                <p>Chọn bài hát</p>    
            </div>
        </>
    )
}

export default Default
