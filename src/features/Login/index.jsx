import React, {useEffect} from 'react'
import {loginURI} from 'features/Login/authencation'
import logoBlack from 'assets/images/logo-black.png'
import Spinner from 'components/Spinner/spinner'
import { useHistory } from 'react-router-dom'

const Login = () => {
    const token = localStorage.getItem('jwt')
    const history = useHistory()
    useEffect(() => {
        if(token){
            history.push('/dashboard')
        } 
        // eslint-disable-next-line
    },[token])
    const style = {
        maxWidth: '400px',
        marginBottom: '1rem'
    }
    console.log('user', token)
    
    return (
        !token ?
        <div className="login" >
            <img className="logo__login" src={logoBlack} alt="preview logo" style={style}/>    
            <a href={loginURI} className="nav-login" >Login with Spotify</a>
        </div>
        : <Spinner loading={true} />
        
    )
}

export default Login
