import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

import '../styles/profileArea.scss'

export function ProfileArea() {

    const { user } = useAuth()

    return (
        <div className='profileArea'>
            <div className='infoLoguin'>
                <img src={user?.avatar} alt="" />
                <p>{user?.name}</p>
            </div>

            <small><Link id='lnk' to='/Home/logOut'>LogOut</Link></small>
        </div>
    )
}