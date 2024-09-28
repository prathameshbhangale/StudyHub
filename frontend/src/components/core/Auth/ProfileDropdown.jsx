import React, { useState } from 'react'
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux'

function ProfileDropdown() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const profile = useSelector((state) => state.profile)
    // console.log(profile.user)
    const user = profile.user
    let image = `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName} ${user?.lastName}`
    // if(!user.image){
        // image = user.image
    // }
    const handleLogout = () => {
        logout(navigate, dispatch)
    }
    return (
        <div className='flex items-center gap-5'>
            <Link to="/dashboard/my-profile">
            <img
                src={image}
                alt={`profile-${user?.firstName}`}
                className="aspect-square w-[30px] rounded-full object-cover"
            /></Link>
            
            <VscDashboard className="text-lg text-white" />
            <Link to="/" onClick={handleLogout}>
                <VscSignOut className="text-lg text-white" />
            </Link>

        </div>
    )
}

export default ProfileDropdown
