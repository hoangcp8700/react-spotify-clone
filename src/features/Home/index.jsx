import React, {useLayoutEffect, useRef, useEffect} from 'react'
import {  useDispatch, useSelector } from 'react-redux'

import SnackBarAlert from 'components/Snackbar/Snackbar'
import Header from 'features/Home/components/Header/Header'
import Spinner from 'components/Spinner/spinner'
import Sidebar from 'features/Home/components/Sidebar/Sidebar'
import RouteComponent from 'features/Home/components/routeComponent/RouteComponent'
import './style.scss'
import { checkIsLogin } from './userSlice'
import { useHistory } from 'react-router-dom'
import queryString from 'query-string'
// import SplitPane from 'react-split-pane'
// import 'assets/css/Split.scss'
const Home = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const history = useHistory()

    useEffect(() => {
        dispatch(checkIsLogin(true))
        // eslint-disable-next-line
    },[])

    useEffect(() => {
        const queryParams = queryString.parse(history.location.search)
        if(queryParams.code){
            history.replace({
                code: '',
            })
        }
        // eslint-disable-next-line
    },[])
    const fullMainRef = useRef()

    const handleShowHideSidebarAndMain = (val) => {
        console.log('fullMainRef.current.children[3]', fullMainRef)
        if(val){
            fullMainRef.current.children[2].classList.add('fullscreen') //main
            fullMainRef.current.lastChild.firstChild.lastChild.classList.add('fullscreen') // spinner
            fullMainRef.current.children[0].classList.add('fullscreen') //header
        }else{
            fullMainRef.current.children[2].classList.remove('fullscreen') //
            fullMainRef.current.lastChild.firstChild.lastChild.classList.remove('fullscreen') // spinner
            fullMainRef.current.children[0].classList.remove('fullscreen') //header
        }
    }
    const handleShowSidebar = (val) => {
        fullMainRef.current.children[2].lastChild.style.width = val ? '200px' : '0'
    }

    useLayoutEffect(() => {
        const handleScroll = (e) => {
            if(e.path[1].scrollY >= 500) {
                return fullMainRef.current.firstChild.classList.add('active') 
            }
            fullMainRef.current.firstChild.classList.remove('active') 
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
      })
 
    return (
        <>
            {user?.id 
            ?  <div className="player" ref={fullMainRef}>
                    <Header handleShowSidebar={handleShowSidebar}/>
                    <Sidebar handleShowHideSidebarAndMain={handleShowHideSidebarAndMain}/>
                    <RouteComponent />
                    <SnackBarAlert />
                </div> 
            : <Spinner loading={true}/>}
        </>
    )
}


export default Home
