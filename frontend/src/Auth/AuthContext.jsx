import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
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
                setUser(user);
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
        setLogout
    };

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}
