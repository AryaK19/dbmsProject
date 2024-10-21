
import { Outlet } from 'react-router-dom';


export default function AdminLayout() {

    

    return (
        <div className="p-4 bg-black min-h-screen text-white">

            {/* {isAuthenticated && <Navbar />} */}

            <main>
                <Outlet />
            </main>
        </div>
    );

}
