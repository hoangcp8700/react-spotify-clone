import { all } from 'redux-saga/effects'
import playlistSaga from 'features/Home/playlistSaga'

// tong hop lai cac saga 
export default function* rootSaga() {
    yield all([playlistSaga()])
    
}