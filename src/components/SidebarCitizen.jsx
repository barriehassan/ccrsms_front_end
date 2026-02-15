import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaPlusCircle, FaList, FaUser, FaBell, FaSignOutAlt, FaMoneyBillWave, FaBars, FaTimes, FaFileContract } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import clsx from 'clsx';

const SidebarCitizen = ({ isCollapsed, toggleSidebar }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const navItems = [
        { path: '/citizen/dashboard', label: 'Dashboard', icon: FaHome },
        { path: '/citizen/complaints/create', label: 'Report Issue', icon: FaPlusCircle },
        { path: '/citizen/complaints', label: 'My Complaints', icon: FaList },
        { path: '/citizen/payments', label: 'Payments', icon: FaMoneyBillWave },
        { path: '/citizen/permits', label: 'Licenses & Permits', icon: FaFileContract },
        { path: '/citizen/notifications', label: 'Notifications', icon: FaBell },
        { path: '/citizen/profile', label: 'Profile', icon: FaUser },
    ];

    const handleLogout = () => {
        Swal.fire({
            title: 'Logout?',
            text: "Are you sure you want to sign out?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, Sign Out'
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
                navigate('/auth/login');
            }
        });
    }

    return (
        <aside className={`bg-white shadow-lg h-screen flex flex-col sticky top-0 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                {!isCollapsed && (
                    <h2 className="text-xl font-bold text-primary flex items-center gap-2 whitespace-nowrap overflow-hidden">
                        <span className="bg-primary text-white p-1 rounded text-sm">CP</span>
                        Citizen Portal
                    </h2>
                )}
                <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-100 text-gray-600">
                    {isCollapsed ? <FaBars /> : <FaTimes />}
                </button>
            </div>

            <nav className="flex-1 p-3 space-y-2 overflow-y-auto overflow-x-hidden">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            title={isCollapsed ? item.label : ''}
                            className={clsx(
                                'flex items-center gap-3 px-3 py-3 rounded-lg transition-colors font-medium whitespace-nowrap',
                                isActive
                                    ? 'bg-primary text-white shadow-md'
                                    : 'text-gray-600 hover:bg-secondary hover:text-primary',
                                isCollapsed && 'justify-center'
                            )}
                        >
                            <Icon className={clsx("text-xl flex-shrink-0", isActive ? 'text-white' : 'text-gray-400 group-hover:text-primary')} />
                            {!isCollapsed && <span>{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <button
                    onClick={handleLogout}
                    title={isCollapsed ? 'Logout' : ''}
                    className={clsx(
                        "flex items-center gap-3 px-3 py-3 w-full text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium whitespace-nowrap",
                        isCollapsed && 'justify-center'
                    )}
                >
                    <FaSignOutAlt className="text-xl flex-shrink-0" />
                    {!isCollapsed && <span>Logout</span>}
                </button>
            </div>
        </aside>
    );
};

export default SidebarCitizen;
