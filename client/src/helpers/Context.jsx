import React, { createContext, useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';    
import { post } from 'services/api';
import { rndStr, enc } from 'services/global';
import jwt from 'jwt-decode';
import {ModalLogout} from 'adm/components';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [tokenify, setToken] = useState(null)
    const [isExpired, setExpired] = useState(false)
    const [show, setShow] = useState(false)
    
    React.useEffect(() => {
        async function loadUserFromCookies() {
            const token = localStorage.getItem('token')
            if (token) {
                var {user_id, email, fullname, role, exp} = jwt(token);
                var timeNow = new Date().getTime();
                if(exp * 1000 < timeNow) {
                    localStorage.removeItem("token")
                    setExpired(true)
                    setToken(null)
                } else {
                    if (!tokenify) setToken(token)
                    setUser({user_id, fullname, email, role})
                }
            } 
            setLoading(false)
        }
        loadUserFromCookies()
    }, [tokenify])

    /**
     * Function to alert using notify
     * @param {Str} msg 
     * @param {Int} status [0, 1, 2, 3]
     */
    const notify = (msg, status) => {
        switch (status) {
            case 0:
                toast.error(msg, {autoClose: 2000 })
                break;
            case 1:
                toast.success(msg, {autoClose: 2000 })
                break;
            case 2:
                toast.info(msg, {autoClose: 2000 })
                break;
            case 3:
                toast.warning(msg, {autoClose: 2000 })
                break;
            default:
                toast.success(msg, {autoClose: 2000 })
                break;
        }
    }

    /**
     * 
     * @param {*Str} email 
     * @param {*Str} password 
     * @returns success ? Object : false
     */
    const login = async (email, password) => {
        // Encrip data parameter
        var log = enc(JSON.stringify({ email, password }), 1, 6)
        // Giving parameter with rndStr for security
        var d = {
            us: log,
            ps: rndStr(log.length, 1, 6)
                .substring(0, log.length)
                .replace(/\W/g, ""),
        };
        // Do Login
        var {message, data} = await post('auth/do-login', d)
        setLoading(false)
        if (data) {
            var { id, fullname, token, role } = data
            setToken(token)
            setUser({id, fullname, role})
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify({id, fullname, role}))
            return {
                message,
                role
            }
        }

        return false
    }

    const logout = () => setShow(true)

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout, loading, notify, setLoading, isExpired }}>
            <ToastContainer />
            {show ? <ModalLogout show={show} setToken={setToken} setUser={setUser} setShow={setShow} /> : null}
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext)

export default useAuth;

