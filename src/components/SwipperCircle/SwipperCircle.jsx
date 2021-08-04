import React from 'react'
import {Link} from 'react-router-dom'

// swiper
import {BreakPoints} from 'data/BreakPoints'

import { Swiper, SwiperSlide } from 'swiper/react';
import './SwipperCircle.scss';
import 'swiper/swiper.scss';

import "swiper/components/navigation/navigation.min.css"
import SwiperCore, {
    Navigation
  } from 'swiper/core';
SwiperCore.use([Navigation]);

const SwipperCircle = ({list, title}) => {
    // console.log('list SwipperCircle', list)
    const img = 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg'
    return (
        <div className="playlist__content">
            <div className="swiper__title">
                <h4>{title}</h4>
            </div>
            <div className="c__swiper">
            <Swiper
                spaceBetween={10}
                slidesPerView={5}
                navigation={true}
                breakpoints={BreakPoints()} 
                >
                    {list.length && list.map(val => (
                        <SwiperSlide key={val.id}>
                            <div className="circle">
                                <div className="poster">
                                    <Link to={`/artists/${val.id}`}>
                                        <img src={val?.images[1]?.url ?? img } alt={val?.name}/>
                                    </Link>
                                </div>
                                <div className="info">
                                    <p>{val?.name}</p>
                                </div>
                            </div>
                        </SwiperSlide>             
                    ))}
                    
            </Swiper>
            </div>
        </div>
       
    )
}

export default SwipperCircle
