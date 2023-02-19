import React, { useState } from 'react'
import AuthContext from './AuthContext'

const AuthProvider = ({children}) => {
    const token = localStorage.getItem('auth-token');
    const role = localStorage.getItem('role');
    const [auth, setAuth] = useState({token: token || "", role: role || ""});
    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
