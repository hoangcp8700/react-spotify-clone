const { createSlice } = require("@reduxjs/toolkit");

const user = createSlice({
    name: 'user',
    initialState: { 
        topicDashboard: {} ,
        user: {},
        playlists: [],
        myTracks: {},
        myArtists: {},
        myAlbums: {}
    },
    reducers: {
        checkIsLogin: (state, action) => {},
        setTopicDashboard: (state, action) => {state.topicDashboard = action.topic},setUser: (state, action) => {state.user = action.user},
        
        setPlaylists: (state, action) => {state.playlists = action.playlists},
        setPlaylistsNew: (state, action) => {state.playlists = action.payload},
       
        setMyTracks: (state, action) => {state.myTracks = action.newMyTracks},
        setMyTracksNew: (state, action) => {state.myTracks = action.payload},
        
        setMyArtists: (state, action) => {state.myArtists = action.newMyArtists},
        setMyArtistsNew: (state, action) => {state.myArtists = action.payload},

        setMyAlbums: (state, action) => {state.myAlbums = action.newMyAlbums},
        setMyAlbumsNew: (state, action) => {state.myAlbums = action.payload}

    },
})

const { reducer, actions } = user

export const { 
    setUser,
    setPlaylists,
    setPlaylistsNew,
    setMyTracks,
    setMyTracksNew,
    setMyArtists,
    setMyArtistsNew,
    setMyAlbums,
    setMyAlbumsNew,
    checkIsLogin,
    setTopicDashboard } = actions

export default reducer