import React from 'react'
import EditIcon from '@material-ui/icons/Edit';
import './UserNav.scss'
import { useDispatch } from 'react-redux';
import { setMessage } from 'features/Home/playTrackSlice';

const UserNav = ({user, following, isOpen , handleDialogFollowing}) => {
    const dispatch = useDispatch()
    const handleEditAvatar = () => {
        dispatch(setMessage({severity: 'warning', mes: `Hiện tại không có chức năng edit avatar`}))
    }
    return (
        <>
        {user?.id && <div className="user__nav">
            <div className="nav__left">
                <div className="avatar" onClick={() => handleEditAvatar()} >
                    <img src={user?.images[0]?.url} alt={user?.display_name}/>
                    <div className="edit">
                        <EditIcon className="edit--icon"/>
                    </div>
                </div>
            </div>
            <div className="nav__right">
                <span className="type">Hồ sơ</span>
                <h3 className="username"> {user?.display_name} </h3>
                <div className="follower">
                    <span onClick={() => {handleDialogFollowing(!isOpen)}} >
                        Đang theo dõi {following?.items?.length} nghệ sĩ
                    </span>

                </div>
            </div>
        </div>
        }
        </>
    )
}

export default UserNav
