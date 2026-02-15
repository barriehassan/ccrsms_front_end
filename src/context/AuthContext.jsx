import { createContext, useContext, useState, useEffect } from 'react';
import { ROLES } from '../utils/constants';
import AxiosInstance from '../components/Axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('Token');
    };

    // Initialization Effect
    useEffect(() => {
        // Check for stored token/user on mount
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // Monitoring & Interceptor Effect
    useEffect(() => {
        // Setup Axios Interceptor to handle 401s globally
        const interceptorId = AxiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && error.response.status === 401) {
                    logout();
                }
                return Promise.reject(error);
            }
        );

        // Verify token if user exists (optional, could move to init or keep here if we want to re-verify on user change)
        if (user) {
            AxiosInstance.get('wards/') // Keep simple keep-alive check
                .catch(err => {
                    console.log("Token verification failed", err);
                });
        }

        // Active Token Monitoring
        const handleStorageChange = (e) => {
            if (e.key === 'Token' && !e.newValue) {
                logout();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        // Interval check for same-tab token removal
        const tokenCheckInterval = setInterval(() => {
            const token = localStorage.getItem('Token');
            // Only logout if we have a user in state BUT no token in storage
            if (user && !token) {
                logout();
            }
        }, 1000);

        // Cleanup
        return () => {
            AxiosInstance.interceptors.response.eject(interceptorId);
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(tokenCheckInterval);
        };
    }, [user]); // Logic here depends on 'user' state for the interval check


    const login = async (userData, token) => {
        // Map backend user_type to frontend role expected by ProtectedRoute
        // Backend user_type: "CITIZEN", "STAFF", "ADMIN"
        // Frontend ROLES: CITIZEN, OFFICER (which seems to use STAFF role check in App.jsx), ADMIN

        const userWithRole = {
            ...userData,
            role: userData.user_type.toLowerCase() // Normalize: Backend returns CAPS, frontend uses lowercase
        };

        setUser(userWithRole);
        localStorage.setItem('user', JSON.stringify(userWithRole));
        localStorage.setItem('Token', token);
    };

    // logout is defined above

    const value = {
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
        isCitizen: user?.role === ROLES.CITIZEN,
        isAdmin: user?.role === ROLES.ADMIN || user?.role === ROLES.STAFF,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
