import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
const Context = createContext();

export const useAuth = () => useContext(Context);

export default function AuthContext({ children }) {

    // set false initially
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            
            if (user) {
                const newUser = {
                    ...user,
                    role: "admin" //change overall logic to get this user from backend
                }
                setUser(newUser);
                setLogin();
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);


    const setLogin = () => {
        setIsAuthenticated(true);
        setLoading(false);
        //add code to save session
    }
    const setLogout = () => {
        setIsAuthenticated(false);
        // setLoading(false);
        //add code to delete session
    }

    // Context value
    const value = {
        isAuthenticated,
        loading,
        setLogin,
        setLogout, 
        user, 
        setUser
    };

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}
