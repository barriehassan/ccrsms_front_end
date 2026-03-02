import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaPlusCircle, FaList, FaUser, FaBell, FaSignOutAlt, FaMoneyBillWave, FaBars, FaTimes, FaFileContract, FaSun, FaMoon } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Swal from 'sweetalert2';
import clsx from 'clsx';

const SidebarCitizen = ({ isCollapsed, toggleSidebar }) => {
    const location = useLocation();
    const { logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const navItems = [
        { path: '/citizen/dashboard', label: 'Dashboard', icon: FaHome },
        { path: '/citizen/complaints/create', label: 'Submit Complaint', icon: FaPlusCircle },
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
            }
        });
    }

    return (
        <aside className={`glass2 dark:bg-dark-card shadow-lg h-screen flex flex-col sticky top-0 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
            <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                {!isCollapsed && (
                    <h2 className="text-xl font-bold text-primary flex items-center gap-2 whitespace-nowrap overflow-hidden">
                        <span className="bg-primary text-white p-1 rounded text-sm">CP</span>
                        Citizen Portal
                    </h2>
                )}
                <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400">
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
                                'flex items-center gap-3 px-3 py-3 rounded-lg transition-colors duration-300 font-medium whitespace-nowrap',
                                isActive
                                    ? 'bg-primary text-white shadow-md'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-secondary dark:hover:bg-dark-bg hover:text-primary dark:hover:text-accent',
                                isCollapsed && 'justify-center'
                            )}
                        >
                            <Icon className={clsx("text-xl flex-shrink-0", isActive ? 'text-white' : 'text-gray-400 dark:text-gray-500 group-hover:text-primary dark:group-hover:text-accent')} />
                            {!isCollapsed && <span>{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-100 dark:border-gray-700 space-y-2">
                <button
                    onClick={toggleTheme}
                    title={isCollapsed ? 'Toggle Theme' : ''}
                    className={clsx(
                        "flex items-center gap-3 px-3 py-3 w-full rounded-lg transition-colors font-medium whitespace-nowrap",
                        theme === 'light'
                            ? "text-gray-600 hover:bg-gray-100"
                            : "text-yellow-400 hover:bg-gray-800",
                        isCollapsed && 'justify-center'
                    )}
                >
                    {theme === 'light' ? <FaMoon className="text-xl flex-shrink-0" /> : <FaSun className="text-xl flex-shrink-0" />}
                    {!isCollapsed && <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>}
                </button>

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
