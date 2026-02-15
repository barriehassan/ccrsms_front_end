import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaClipboardList, FaUsers, FaChartBar, FaSignOutAlt, FaCog, FaBars, FaTimes, FaUserShield } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import clsx from 'clsx';

const SidebarAdmin = ({ isCollapsed, toggleSidebar }) => {
    const location = useLocation();
    const { logout } = useAuth();

    const navItems = [
        { path: '/admin/dashboard', label: 'Dashboard', icon: FaTachometerAlt },
        { path: '/admin/complaints', label: 'Complaints', icon: FaClipboardList },
        { path: '/admin/permits', label: 'Permits', icon: FaClipboardList },
        { path: '/admin/assign', label: 'Assign Staff', icon: FaUserShield },
        { path: '/admin/users', label: 'Users', icon: FaUsers },
        { path: '/admin/analytics', label: 'Analytics', icon: FaChartBar },
        { path: '/admin/settings', label: 'Settings', icon: FaCog },
    ];

    const handleLogout = () => {
        Swal.fire({
            title: 'Logout?',
            text: "Are you sure you want to end your admin session?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, Logout'
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
            }
        });
    }

    return (
        <aside className={`bg-dark text-white shadow-xl h-screen flex flex-col sticky top-0 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
            <div className="p-6 border-b border-gray-700 flex items-center justify-between">
                {!isCollapsed && (
                    <h2 className="text-xl font-bold flex items-center gap-2 whitespace-nowrap overflow-hidden">
                        <span className="bg-accent text-dark p-1 rounded text-sm font-extrabold">AP</span>
                        Admin Portal
                    </h2>
                )}
                <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-800 text-gray-400">
                    {isCollapsed ? <FaBars /> : <FaTimes />}
                </button>
            </div>

            <nav className="flex-1 p-3 space-y-2 overflow-y-auto overflow-x-hidden">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname.startsWith(item.path);
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            title={isCollapsed ? item.label : ''}
                            className={clsx(
                                'flex items-center gap-3 px-3 py-3 rounded-lg transition-colors font-medium whitespace-nowrap',
                                isActive
                                    ? 'bg-primary text-white shadow-md'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                isCollapsed && 'justify-center'
                            )}
                        >
                            <Icon className={clsx("text-xl flex-shrink-0", isActive ? 'text-white' : 'text-gray-500 group-hover:text-white')} />
                            {!isCollapsed && <span>{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-700">
                <button
                    onClick={handleLogout}
                    title={isCollapsed ? 'Logout' : ''}
                    className={clsx(
                        "flex items-center gap-3 px-3 py-3 w-full text-red-400 hover:bg-red-900/20 rounded-lg transition-colors font-medium whitespace-nowrap",
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

export default SidebarAdmin;
