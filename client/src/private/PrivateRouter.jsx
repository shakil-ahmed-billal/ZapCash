import useAuth from '@/hooks/useAuth';
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const PrivateRouter = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>
    }

    if (user) {
        return children
    }

    return (
        <Navigate to="/auth/login" state={{ from: location }} />
    )
}

export default PrivateRouter