import { FaClipboardList, FaSpinner, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/UI/Card';

const OfficerDashboard = () => {
    const navigate = useNavigate();
    // Mock Data
    const stats = [
        { label: "Assigned Complaints", value: 12, icon: FaClipboardList, color: "text-blue-600", bg: "bg-blue-100" },
        { label: "In Progress", value: 5, icon: FaSpinner, color: "text-yellow-600", bg: "bg-yellow-100" },
        { label: "Resolved", value: 45, icon: FaCheckCircle, color: "text-green-600", bg: "bg-green-100" },
        { label: "Pending", value: 3, icon: FaExclamationTriangle, color: "text-red-600", bg: "bg-red-100" },
    ];

    return (
        <div className='p-4 sm:p-6 lg:p-8 ml-0 lg:ml-64 mt-16 lg:mt-0 transition-colors duration-300'>
            <header className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Officer Dashboard</h1>
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-300">Welcome back, Officer. Here's your daily overview.</p>
            </header>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                {stats.map((stat, index) => (
                    <Card key={index} className="p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className={`p-4 rounded-full ${stat.bg} ${stat.color} dark:bg-opacity-20 text-2xl`}>
                            <stat.icon />
                        </div>
                        <div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium transition-colors duration-300">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">{stat.value}</h3>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Announcements</h3>
                        <div className="space-y-4">
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-primary transition-colors duration-300">
                                <h4 className="font-bold text-primary dark:text-blue-300">Heavy Rain Alert</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 transition-colors duration-300">Expect increased drainage complaints in Zone 4 due to forecasted heavy rains. Prioritize clearing blockage reports.</p>
                                <span className="text-xs text-gray-400 mt-2 block">2 hours ago</span>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border-l-4 border-gray-400 transition-colors duration-300">
                                <h4 className="font-bold text-gray-800 dark:text-gray-200">System Maintenance</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-300">The reporting system will undergo maintenance on Sunday from 2 AM to 4 AM.</p>
                                <span className="text-xs text-gray-400 mt-2 block">1 day ago</span>
                            </div>
                        </div>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="p-4 sm:p-6 mt-6 sm:mt-0">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Quick Actions</h3>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <button
                                onClick={() => navigate('/officer/tasks')}
                                className="flex-1 bg-primary text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                            >
                                Start Field Assignment
                            </button>
                            <button
                                onClick={() => navigate('/officer/tasks', { state: { filter: 'pending' } })}
                                className="flex-1 bg-white dark:bg-dark-card border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                View Pending Tasks
                            </button>
                        </div>
                    </Card>
                </div>

                {/* Profile Summary */}
                <div className="mt-8 lg:mt-0">
                    <Card className="p-4 sm:p-6 text-center">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 overflow-hidden transition-colors duration-300">
                            <img src="https://placehold.co/200x200/333/fff?text=Officer" alt="Officer" className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Officer John Doe</h3>
                        <p className="text-primary dark:text-accent font-medium mb-1 transition-colors duration-300">Senior Field Officer</p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 transition-colors duration-300">Zone 4 - East End</p>

                        <div className="flex justify-center gap-4 text-center border-t border-gray-100 dark:border-gray-700 pt-6 transition-colors duration-300">
                            <div>
                                <span className="block text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">125</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">Resolved</span>
                            </div>
                            <div>
                                <span className="block text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">4.8</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">Rating</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default OfficerDashboard;
