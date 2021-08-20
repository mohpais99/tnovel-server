import useAuth from 'helpers/Context';
import Loader from "components/Loader";
import React from 'react'

const withAuthAdmin = WrappedComponent => {
    return (props) => {
        var {isAuthenticated, loading, user, isExpired} = useAuth()
        var userlocal = localStorage.getItem('user')

        if (userlocal) var {role} = JSON.parse(userlocal)

        React.useEffect(() => {
            if (!isAuthenticated && !loading && !isExpired) {
                props.history.push('/auth/sign-in')
            } else if (!loading && role === 'member') {
                props.history.push('/')
            }
        }, [isAuthenticated, loading, role, isExpired, props])

        if (loading) return <Loader />

        return isAuthenticated && role !== 'member' ? <WrappedComponent {...props} user={user} /> : null
    }
};

export default withAuthAdmin
