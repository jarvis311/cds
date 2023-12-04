import React, {useState} from 'react';
import { Link, NavLink } from 'react-router-dom'
import Logo from '../Component/Logo';
import LogoMini from '../Component/Logo-mini';

const Sidebar = ({ sidebar }) => {
    return (
        <>
            <div className={sidebar ? "sidebar-wrapper active" : "sidebar-wrapper"}>
                <div className="sidebar-header">
                    <div className="d-flex justify-content-between">
                        <div className='sidebar-logo'>
                            <Link to="/Home">
                                <Logo />
                                <LogoMini />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="sidebar-menu">
                    <ul className="menu">
                        <li className="sidebar-item">
                            <NavLink to="/Home" className='sidebar-link'>
                                <i className='bx bxs-home'></i>
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li className="sidebar-item">
                            <NavLink to="/Categories" className='sidebar-link'>
                                <i class='bx bxs-category-alt'></i>
                                <span>Categories</span>
                            </NavLink>
                        </li>
                        <li className="sidebar-item">
                            <NavLink to="/Reels" className='sidebar-link'>
                                <i className='bx bxs-camera-movie'></i>
                                <span>Reels</span>
                            </NavLink>
                        </li>
                        <li className="sidebar-item">
                            <NavLink to="/Celebrity-Voice" className='sidebar-link'>
                                <i className='bx bxs-microphone'></i>
                                <span>Celebrity Voice</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar