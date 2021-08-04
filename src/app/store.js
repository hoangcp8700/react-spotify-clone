import { configureStore } from '@reduxjs/toolkit'
import userReducer from 'features/Home/userSlice'
import playTrackReducer from 'features/Home/playTrackSlice'
import categoriesReducer from 'features/Home/categoriesSlice'

import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './rootSaga'
const sagaMiddleware = createSagaMiddleware()

const rootReducer = {
    user: userReducer,
    play: playTrackReducer,
    categories: categoriesReducer,
}

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})
sagaMiddleware.run(rootSaga)