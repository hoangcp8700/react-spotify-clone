import React from 'react'
import './swipper.scss'
import Card from 'components/Card/Card'
// swiper
import {BreakPoints} from 'data/BreakPoints'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import "swiper/components/navigation/navigation.min.css"
import SwiperCore, {
    Navigation
  } from 'swiper/core';
SwiperCore.use([Navigation]);

const Swipper = ({isTrack, isAlbums, title, playlistsOfTopic, handlePlayPlaylist, playPlaylist}) => {
    return (
        <div className="playlist__content">
            {title && <div className="swiper__title">
                <h4>{title}</h4>
            </div>
            }
            <div className="c__swiper">
            <Swiper
                spaceBetween={10}
                slidesPerView={5}
                loop={true}
                // onSwiper={(swiper) => console.log(swiper)}
                // onSlideChange={() => console.log('slide change')}
                navigation={true}
                breakpoints={BreakPoints()} 
                >
                    {playlistsOfTopic && playlistsOfTopic.map(val => (
                        <SwiperSlide key={val.id}>
                            <Card 
                                card={val}
                                handlePlayPlaylist={handlePlayPlaylist}
                                playPlaylist={playPlaylist}
                                isAlbums={isAlbums}
                                isTrack={isTrack}
                            />
                        </SwiperSlide>             
                    ))}
                    
            </Swiper>
            </div>
        </div>
       
    )
}

export default Swipper
