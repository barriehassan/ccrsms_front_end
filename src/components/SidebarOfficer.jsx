import { Link, useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { FaTachometerAlt, FaClipboardList, FaTasks, FaBell, FaUser, FaSignOutAlt, FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const SidebarOfficer = ({ isCollapsed, toggleSidebar }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        Swal.fire({
            title: 'Logout?',
            text: "Are you sure you want to end your session?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, Logout'
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
                navigate('/auth/staff-login');
            }
        });
    };

    const links = [
        { name: 'Dashboard', path: '/officer/dashboard', icon: FaTachometerAlt },
        { name: 'Assigned Complaints', path: '/officer/complaints', icon: FaClipboardList },
        { name: 'Field Tasks', path: '/officer/tasks', icon: FaTasks },
        { name: 'Notifications', path: '/officer/notifications', icon: FaBell },
        { name: 'My Profile', path: '/officer/profile', icon: FaUser },
    ];

    return (
        <div className={`bg-white dark:bg-dark-card border-r border-gray-200 dark:border-gray-700 min-h-screen flex flex-col fixed left-0 top-0 h-full z-10 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
            <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                {!isCollapsed && (
                    <div>
                        <h1 className="text-2xl font-bold text-primary">CCRSMS</h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-1">Officer Portal</p>
                    </div>
                )}
                <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors duration-300">
                    {isCollapsed ? <FaBars /> : <FaTimes />}
                </button>
            </div>

            <nav className="flex-grow p-3 space-y-2 overflow-y-auto overflow-x-hidden">
                {links.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        title={isCollapsed ? link.name : ''}
                        className={clsx(
                            'flex items-center gap-3 px-3 py-3 rounded-lg transition-colors duration-300 font-medium whitespace-nowrap',
                            isActive(link.path)
                                ? 'bg-blue-50 dark:bg-dark-bg text-primary dark:text-accent shadow-sm'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-bg hover:text-gray-900 dark:hover:text-white',
                            isCollapsed && 'justify-center'
                        )}
                    >
                        <link.icon className="text-lg flex-shrink-0" />
                        {!isCollapsed && <span>{link.name}</span>}
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-100 dark:border-gray-700 space-y-2">
                <button
                    onClick={toggleTheme}
                    title={isCollapsed ? 'Toggle Theme' : ''}
                    className={clsx(
                        "flex items-center gap-3 px-3 py-3 w-full rounded-lg transition-colors duration-300 font-medium whitespace-nowrap",
                        theme === 'light'
                            ? "text-gray-600 hover:bg-gray-100"
                            : "text-yellow-400 hover:bg-gray-800",
                        isCollapsed && 'justify-center'
                    )}
                >
                    {theme === 'light' ? <FaMoon className="text-lg flex-shrink-0" /> : <FaSun className="text-lg flex-shrink-0" />}
                    {!isCollapsed && <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>}
                </button>
                <button
                    onClick={handleLogout}
                    title={isCollapsed ? 'Logout' : ''}
                    className={clsx(
                        "flex items-center gap-3 px-3 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 w-full font-medium transition-colors whitespace-nowrap",
                        isCollapsed && 'justify-center'
                    )}
                >
                    <FaSignOutAlt className="text-lg flex-shrink-0" />
                    {!isCollapsed && <span>Logout</span>}
                </button>
            </div>
        </div>
    );
};

export default SidebarOfficer;
