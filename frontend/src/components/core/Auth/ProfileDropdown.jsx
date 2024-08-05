import React from 'react'
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../../services/operations/authAPI'
import { useDispatch } from 'react-redux'

function ProfileDropdown() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const handleLogout = () => {
        logout(navigate, dispatch)
    }

    return (
        <div className='flex items-center gap-5'>
            <AiOutlineCaretDown className="text-sm text-richblack-100" />
            <VscDashboard className="text-lg text-white" />
            <Link to="/" onClick={handleLogout}>
                <VscSignOut className="text-lg text-white" />
            </Link>
        </div>
    )
}

export default ProfileDropdown
