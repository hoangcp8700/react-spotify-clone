import React, { useRef } from 'react';
import Home from 'features/Home'
import Login from 'features/Login'

import 'assets/scss/style.scss'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Footer from 'features/Home/components/Footer/Footer'
import AlbumHaveTrack from 'features/Home/album/AlbumHaveTrack'

import { useSelector } from 'react-redux';

function App() {
  const user = useSelector(state => state.user.user)
 
  const footerVerticalRef = useRef()
  const closeRef = useRef(0)

  const handleFooterVertical = ({val, isClose}) => {
      if(closeRef.current === 1){
        val = true
        closeRef.current  = 0
      }
      
      if(isClose){
        closeRef.current = 1
      }
  
      if(val) {
        footerVerticalRef.current.style.top = '0'
        footerVerticalRef.current.style.zIndex = '9999'
      }else{
        footerVerticalRef.current.style.top = '100%'
        footerVerticalRef.current.style.zIndex = '-1'
      }
      
  }
  return (
    <>
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/" component={Home} />
        </Switch>

        {user?.id && 
        <>
          <div className="footer__vertical" ref={footerVerticalRef}> 
              <AlbumHaveTrack handleFooterVertical={handleFooterVertical} />
          </div>
          <Footer handleFooterVertical={handleFooterVertical}/> 
        </>
        }
      </Router>
      
  
    </>
  );
}

export default App;
