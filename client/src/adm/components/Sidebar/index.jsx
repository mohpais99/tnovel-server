import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import userphoto from 'assets/images/devin.jpg';
import './sidebar.css';
import useAuth from 'helpers/Context';

function Sidebar(props) {
    const {logout, user} = useAuth();
    const active = props.show ? 'active' : ''
    const history = useHistory()
    const path = history.location.pathname.split('/')
    
    const fetchRoute = (routes) => {
        return routes.filter(x => x.status === 0).map((route, key) => {
            return (
                <li key={key} className={path.includes(route.path) ? 'active' : ''}>
                    <Link className="item" to={`/${route.layout}/${route.path}`}>
                        <i className={route.icon}></i>
                        <span className="links-name">{route.name}</span>
                    </Link>
                    <span className="tooltip-custom">{route.name}</span>
                </li>
            )
        })
    }
    return (
        <div className={`sidebar--adm ${active}`} data-device={props.device} >
            <div className="logo-details">
                <i className="bx bxs-book-reader"></i>
                <div className="logo-name font-rhd-bold">TNovel ID</div>
            </div>
            <ul className="nav-list">
                {fetchRoute(props.routes)}
            </ul>
            <div className="profile-content">
                <div className="profile">
                    <div className="profile-detail">
                        <img src={userphoto} alt="user"/>
                        <div className="name-job">
                            <div className="name">{user.fullname}</div>
                            <div className="job">TNovel {user.role[0].toUpperCase() + user.role.substring(1)}</div>
                        </div>
                    </div>
                    <i onClick={logout} className="bx bx-power-off" id="log-out"></i>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;