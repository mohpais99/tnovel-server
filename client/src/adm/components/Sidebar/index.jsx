import React from 'react';
import { Link } from 'react-router-dom';
import user from 'assets/images/devin.jpg';
import './sidebar.css';

function Sidebar(props) {
    const active = props.show ? 'active' : ''

    return (
        <div className={`sidebar--adm ${active}`} data-device={props.device} >
            <div className="logo-details">
                <i className="bx bxs-book-reader"></i>
                <div className="logo-name font-rhd-bold">TNovel ID</div>
            </div>
            <ul className="nav-list">
                <li className={`active`}>
                    <Link className="item" to="/admpanel/dashboard">
                        <i className="bx bxs-dashboard"></i>
                        <span className="links-name">Dashboard</span>
                    </Link>
                    <span className="tooltip-custom">Dashboard</span>
                </li>
                <li className="">
                    <Link className="item" to="/admpanel/users">
                        <i className="bx bxs-user-account"></i>
                        <span className="links-name">User</span>
                    </Link>
                    <span className="tooltip-custom">User</span>
                </li>
                <li className="">
                    <Link className="item" to="/admpanel/novel">
                        <i className="bx bx-folder"></i>
                        <span className="links-name">Novel Archive</span>
                    </Link>
                    <span className="tooltip-custom">Novel Archive</span>
                </li>
                <li className="">
                    <Link className="item" to="/admpanel/comment">
                        <i className="bx bx-chat"></i>
                        <span className="links-name">Comment</span>
                    </Link>
                    <span className="tooltip-custom">Comment</span>
                </li>
                <li className="">
                    <Link className="item" to="/admpanel/setting">
                        <i className="bx bx-cog"></i>
                        <span className="links-name">Settings</span>
                    </Link>
                    <span className="tooltip-custom">Settings</span>
                </li>
            </ul>
            <div className="profile-content">
                <div className="profile">
                    <div className="profile-detail">
                        <img src={user} alt="user"/>
                        <div className="name-job">
                            <div className="name">Devin Liu</div>
                            <div className="job">Fullstact Developer</div>
                        </div>
                    </div>
                    <i className="bx bx-power-off" id="log-out"></i>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;