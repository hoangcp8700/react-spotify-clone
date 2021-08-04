import React, {useRef} from 'react'
import logoBlack from 'assets/images/logo-black.png'

import SidebarOption from './SidebarOption'
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import { useSelector } from 'react-redux'

import {
    useHistory,
    Link
  } from "react-router-dom";

import './Sidebar.scss'
// import SplitPane from 'react-split-pane'
// import 'assets/css/Split.scss'

const Sidebar = ({handleShowHideSidebarAndMain}) => {
    const history = useHistory()
    const playlists = useSelector(state => state.user.playlists) 
    const splitRef = useRef()
    const hideShowSidebar = useRef()
    const SidebarTop = () => {
        return (
            <>
                <div className="sidebar-top">
                    <div className="sidebar__logo">
                        <Link to="/dashboard">
                            <img src={logoBlack} alt="preview logo" />
                        </Link>
                    </div>
                    <SidebarOption active={history.location.pathname === "/dashboard"} Icon={HomeIcon} title="Home" url="/dashboard"/>
                    <SidebarOption active={history.location.pathname === "/search"} Icon={SearchIcon} title="Search" url="/search"/>
                    <SidebarOption active={history.location.pathname === "/collection"} Icon={LibraryMusicIcon} title="Your Library" url="/collection"/>
                </div>

                <span className="sidebar-title">Playlist</span>
            </>
        )
    }
    const SidebarContent = () => {
        return (
            <>
                <div className="sidebar-content" ref={splitRef}>
                    {playlists?.items?.map((player,ind) => (
                        <SidebarOption
                            key={ind} 
                            id={player?.id}
                            title={player?.name} 
                            active={history.location.pathname.search(player.id) !== -1}
                            />
                    ))}
                </div>
            </>
            
        )
    }

    const handleShowHideSidebar = () => {
        if(hideShowSidebar.current.dataValue){
            handleShowHideSidebarAndMain(false)
            hideShowSidebar.current.classList.remove('hide')
            hideShowSidebar.current.children[1].children[0].classList.remove('active')
            hideShowSidebar.current.dataValue = false
        }else{ 
            handleShowHideSidebarAndMain(true)
            hideShowSidebar.current.classList.add('hide') // WIDTH SIDEBAR
            hideShowSidebar.current.children[1].children[0].classList.add('active') // SMALL LOGO
            hideShowSidebar.current.dataValue = true // CONDITION
        }
    }
    return (
        <div className="sidebar" ref={hideShowSidebar}>
            <div 
                onClick={handleShowHideSidebar }
                className="sidebar__split__ver">  
                <div>
                </div>
            </div>
                <SidebarTop />
                <SidebarContent/> 
        
        </div>
    )
}

export default Sidebar
