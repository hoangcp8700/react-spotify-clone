import React from 'react'

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';
import './TabContent.scss'
import CardPlayer from './CardPlayer'
import TrackBox from './TrackBox'
import { useDispatch, useSelector } from 'react-redux';
import { setTabPanel } from 'features/Home/playTrackSlice';
import TableTracks from './TableTracks'
import { LoopArtists } from 'utils/LoopArtists';
import { useSetAlbum } from 'hooks/useSetAlbum';
import MouseRight from 'components/MouseRight/MouseRight'
import Menus from 'features/Home/collection/data/Menus'
import DialogAlert from 'components/DialogAlert/DialogAlert'
import DialogInfo from 'components/DialogInfo/DialogInfo'

function a11yProps(index, tab) {
    return {
        className: `${index === tab ? 'active' : ''}`,
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const { children, tab, index, table,...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={tab !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {tab === index && (
          <Container maxWidth={false} p={3}>
            {!table 
            ? <div className="grid-container">
                {children}
            </div>
            : children
            }
          </Container>
        )}
      </div>
    );
}

const TabContent = ({playlists, artists, tracks, albums, playPlaylist}) => {
    const dispatch = useDispatch()
    const tab = useSelector(state => state.play.tabPanel)

    const handleChangeTag = (event, newValue) => {
        console.log('handleChangeTag', newValue)
        dispatch(setTabPanel(newValue))
    }
    const { handlePlayPlaylist, handlePlayAlbum } = useSetAlbum({artistID:null})
    
    const {menus, menuArtists, menuTracks,
        isDialog, handleDialog,
        isDialogInfo
    } = Menus({playlists, artists, albums, tracks})

    return (
        <div className="tabPanel" >
            <AppBar position="static" className="navbar">
                <Tabs
                    className="tabs"
                    value={tab} 
                    onChange={handleChangeTag} 
                    aria-label="simple tabs example">
                        <Tab label="Playlists" {...a11yProps(0,tab)} />
                        <Tab label="Albums" {...a11yProps(1,tab)} />
                        <Tab label="Bài hát" {...a11yProps(2,tab)} />
                        <Tab label="Nghệ sĩ" {...a11yProps(3,tab)} />
                </Tabs>
            </AppBar>
            <TabPanel tab={tab} index={0} >
                <div className="grid-items grid__artists">
                    <TrackBox saveTracks={tracks} handleChangeTag={handleChangeTag}/>
                </div>
                
                {playlists?.items?.length && playlists.items.map(val => (
                    <MouseRight 
                        menus={menus}
                        val={val} 
                        className="grid-items"
                        key={val.id}>
                        <CardPlayer 
                            handlePlayPlaylist={handlePlayPlaylist}
                            playPlaylist={playPlaylist}
                            id={val.id}
                            image={val.images[0].url}
                            title={val.name}
                            description={val.description}
                        /> 
                    </MouseRight>
                ))}
            </TabPanel>
            <TabPanel tab={tab} index={1}>
                {albums?.items?.length && albums.items.map(val => (
                    <div className="grid-items" key={`grid ${val.id}`} > 
                        <MouseRight 
                            menus={menus}
                            val={val} 
                            className="grid-items"
                            key={val.id}>
                            <CardPlayer
                                handlePlayAlbum={handlePlayAlbum}
                                playPlaylist={playPlaylist}
                                id={val.id}
                                image={val.images[0].url}
                                title={val.name}
                                description={LoopArtists(val.artists)}
                            />
                        </MouseRight>
                    </div>
                ))}
            </TabPanel>
            <TabPanel tab={tab} index={2} table>
                {tracks?.items?.length && 
                    <TableTracks list={tracks?.items} menus={menuTracks}/> 
                }
            </TabPanel>
            <TabPanel tab={tab} index={3}>
                {artists?.items?.length && artists?.items.map(val => (
                    <MouseRight 
                    menus={menuArtists}
                    val={val} 
                    className="grid-items"
                    key={val.id}>
                        <div className="grid-items" key={val.id} > 
                            <CardPlayer 
                                id={val.id}
                                image={val.images[1].url}
                                title={val.name}
                                artistCard={true}
                            />
                        </div>
                    </MouseRight>
               ))}
            </TabPanel>
            <DialogAlert isDialog={isDialog} handleDialog={handleDialog} />
            <DialogInfo isDialogInfo={isDialogInfo} />
        </div>
    )
}

export default TabContent
