import React from 'react'

import ImgLazy from 'features/Home/components/Navbar/components/ImgLazy/ImgLazy';
import NavInfo from 'features/Home/components/Navbar/components/NavInfo/NavInfo';
import './Nav.scss'
const Nav = ({totalTrackPlaylist, playlistMs, playlist, albums}) => {
    return (
        <>
            {playlist && <div className="nav__body">
                <ImgLazy img={playlist?.images[0].url}/>
                <NavInfo 
                    type="Playlist"
                    name={playlist?.name}
                    description={playlist?.description}
                    followers={playlist?.followers.total}
                    total_ms={playlistMs}
                    total_tracks={totalTrackPlaylist}
                />
            </div>
            }
            {albums?.id && <div className="nav__body">
                    <ImgLazy img={albums?.images[1].url}/>
                    <NavInfo   
                        type={albums?.album_type}
                        name={albums?.name}
                        artists={albums?.artists}
                        release={albums?.release_date}
                        total_ms={playlistMs}
                        total_tracks={totalTrackPlaylist}
                    />
            </div>
            }
            {/* {tracks && <div className="nav__body">
                    <ImgLazy img={tracks?.album?.images[1].url}/>
                    <NavInfo   
                        type={tracks?.album?.album_type}
                        name={tracks?.name}
                        artists={tracks?.artists}
                        total_ms={tracks?.duration_ms}
                    />
            </div>
            } */}
        </>
    )
}

export default Nav
