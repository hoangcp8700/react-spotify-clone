import React, {useState} from 'react'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Avatar from '@material-ui/core/Avatar';
import { useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'
import DehazeIcon from '@material-ui/icons/Dehaze';
import SearchOfHeader from './SearchOfHeader'
const Header = ({handleShowSidebar}) => {
    const user = useSelector(state => state.user.user)
    const history = useHistory()

    const [toggleSidebar, setToggleSidebar] = useState(false)
    const [toggleLogout, setToggleLogout] = useState(false)

    const handleSidebar = () => {
        setToggleSidebar(!toggleSidebar)
        handleShowSidebar(!toggleSidebar)
    }
   
    const handleLogout = () => {
        localStorage.removeItem('jwt')
        localStorage.removeItem('rftk')
        window.location = "/login"
    }   
    return (
        user?.id && <div className="header">
            <div className="header__left">
                <DehazeIcon 
                    className="header__icon show" 
                    style={{padding: 6}}
                    onClick={handleSidebar} />
                <NavigateBeforeIcon className="header__icon" onClick={() => history.goBack()}/>
                <NavigateNextIcon className="header__icon" onClick={() => history.go(1)}/>
                { history.location.pathname === "/search" && <SearchOfHeader /> }
            </div>
            <div className="header__right">
                <div 
                className="header__main" 
                >
                    <Avatar
                        onClick={() => setToggleLogout(!toggleLogout)}
                        alt="avatar" 
                        src={user?.images[0]?.url}
                    />
                    <div 
                        className="header__info"
                        onClick={() => setToggleLogout(!toggleLogout)}
                    >
                        <h4>{user?.display_name} </h4>
                        <span>
                            {toggleLogout 
                            ? <ArrowDropDownIcon />
                            : <ArrowDropUpIcon />
                            }
                        </span>
                    </div>
                    {toggleLogout && 
                    <div className="header__dropdown">
                        <div><button onClick={handleLogout}>Logout</button></div>
                    </div>
                    }
                   
                </div>
                
            </div>
           
        </div>
    )
}

export default Header
