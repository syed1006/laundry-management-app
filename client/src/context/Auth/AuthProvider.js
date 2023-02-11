import React, { useState } from 'react'
import AuthContext from './AuthContext'

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(null);
  return (
    <AuthContext.Provider value={{auth, setAuth}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
