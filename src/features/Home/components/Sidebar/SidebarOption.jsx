import React from 'react'
import {Link} from 'react-router-dom'
const SidebarOption = ({id, url, Icon, title, active}) => {
    return (
        <>
        {id 
        ? (
            <Link 
                style={{color: active && '#fff' }} 
                to={`/playlists/${id}`}
                className="sidebar-option" >
                    <p>{title}</p>
            </Link>
        ) : (
            <Link 
                className={`sidebar-option parent  ${active ? 'active' : ''}`}
                to={url}>
                    <Icon className="sidebar-option--icon" /> 
                    <h4>{title}</h4>
            </Link>
        )}
    
        </>
        
        
    )
}

export default SidebarOption
