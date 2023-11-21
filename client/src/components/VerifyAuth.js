import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import axios from 'axios';

export const useAuthCheck = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [userName, setUserName] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true); // Introduce a loading state

    useEffect(() => {
        const fetchAuthenticationStatus = async () => {
            try {
                const response = await axios.get('/check-auth');
                setAuthenticated(response.data.authenticated);
                if (response.data.authenticated) {
                    setUserName(response.data.username);
                    setName(response.data.name);
                    setEmail(response.data.email);
                }
            } catch (error) {
                console.log('Error fetching authentication status:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAuthenticationStatus();
    }, []);

    const setAuthenticatedStatus = (status) => {
        setAuthenticated(status);
    };

    return { authenticated, userName, name, email, setAuthenticatedStatus, loading };
};

const AuthWrapper = () => {
    const { authenticated, loading } = useAuthCheck();

    if (loading) {
        return <div class='loading'>
            <p>
                Loading...
            </p>
        </div>;
    }

    if (!authenticated) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

const UnAuthWrapper = () => {
    const { authenticated, loading } = useAuthCheck();

    if (loading) {
        return <div class='loading'>
            <p>
                Loading...
            </p>
        </div>;
    }

    if (authenticated) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export const ProtectedRoutes = () => {
    return <AuthWrapper />;
};

export const LoggedInRoutes = () => {
    return <UnAuthWrapper />
}