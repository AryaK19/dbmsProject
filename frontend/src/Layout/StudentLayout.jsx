
import { Outlet } from 'react-router-dom';
import Navbar from '../pages/Navbar';
import { useAuth } from '../Auth/AuthContext';

export default function StudentLayout() {

    const { isAuthenticated } = useAuth();

    return (
        <div className="p-4 bg-black min-h-screen text-white">

            {isAuthenticated && <Navbar />}

            <main>
                <Outlet />
            </main>
        </div>
    );

}
