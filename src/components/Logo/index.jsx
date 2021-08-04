import React from 'react'
// import PropTypes from 'prop-types'
import logoBlack from 'assets/images/logo-black.png'

const Logo = props => {
    const {url} = props
    return (
        <>  
            <img className="logo" src={logoBlack} alt="preview logo" />    
            <a href={url} className="nav-login" >Login with Spotify</a>
        </>
    )
}

export default Logo
