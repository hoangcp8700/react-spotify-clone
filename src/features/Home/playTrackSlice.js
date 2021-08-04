const { createSlice } = require("@reduxjs/toolkit");

const playTrack = createSlice({
    name: 'playTrack',
    initialState: {
      message: {severity: 'success', mes: null},
      isLoading: false,
      track: {},
      playPlaylist: {isPlay: false, id: null, albumID: null, artistsID: null},
      playlists: [],
      album_lists: {id: null, list: []},
      hideFooter: false,
      searchResult: {search: null, tracks: {}, albums: {}, playlists:  {}, artists: {}},
      tabPanel: 0
    },
    reducers: {
      setMessage: (state, action) => {
        state.message = action.payload
      },
      setTabPanel: (state, action) => {
        state.tabPanel = action.payload
      },
      setSearchResult: (state, action) => {
        state.searchResult = action.payload
      },
      setLoading: (state, action) => {
        state.isLoading = action.payload
      },
      setTrack: (state, action) => {
        state.track = action.payload
      },
      setIsPlay: (state, action) => {
        state.playPlaylist.isPlay = action.payload
      },
      setIDAlbum: (state, action) => {
        state.playPlaylist.albumID = action.payload
        state.playPlaylist.id = null
      },
      setIDPlaylist: (state, action) => {
        state.playPlaylist.id = action.payload
        state.playPlaylist.albumID = null
      },
      setPlayPlaylist: (state, action) => {
        state.playPlaylist = action.payload
      },
      playlistsIsPlay: (state, action) => {
        state.playlists = action.payload
      },
      setAlbumList: (state, action) => {
        state.album_lists = action.payload
      },
      setHideFooter: (state, action) => {
        state.hideFooter = action.payload
      },
        
    },
})
// get actions
// const { setLoading,...}  = playTrack.actions

const { reducer, actions } = playTrack

export const {
  setMessage,
  setTabPanel,
  setLoading,
  setTrack, 
  setIsPlay, 
  setPlayPlaylist, 
  playlistsIsPlay, 
  setIDPlaylist,
  setHideFooter,
  setIDAlbum,
  setAlbumList,
  setSearchResult} = actions

export default reducer