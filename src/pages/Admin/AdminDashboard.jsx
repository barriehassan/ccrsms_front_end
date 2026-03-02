import { FaClipboardList, FaCheckCircle, FaExclamationCircle, FaUsers, FaArrowUp, FaArrowDown, FaBolt, FaServer, FaDatabase, FaPlus, FaFileExport, FaUserPlus } from 'react-icons/fa';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';


const AdminDashboard = () => {
    const stats = [
        { label: 'Total Complaints', value: "1,256", change: "+12.5%", isPositive: true, icon: FaClipboardList, color: 'bg-blue-100 text-blue-600' },
        { label: 'Pending Issues', value: "42", change: "-5.2%", isPositive: true, icon: FaExclamationCircle, color: 'bg-yellow-100 text-yellow-600' },
        { label: 'Resolved (This Month)', value: "318", change: "+8.1%", isPositive: true, icon: FaCheckCircle, color: 'bg-green-100 text-green-600' },
        { label: 'Active Citizens', value: "12,504", change: "+22.4%", isPositive: true, icon: FaUsers, color: 'bg-purple-100 text-purple-600' },
    ];

    const recentActivity = [
        { id: 1, user: "Mariama Sesay", action: "submitted a new complaint", target: "Broken Streetlight", time: "10 mins ago", type: "submission" },
        { id: 2, user: "Officer John Doe", action: "marked as resolved", target: "Pothole on Main St", time: "1 hour ago", type: "resolution" },
        { id: 3, user: "System", action: "generated monthly report", target: "February 2024", time: "2 hours ago", type: "system" },
        { id: 4, user: "Sarah Smith", action: "registered new account", target: "", time: "3 hours ago", type: "registration" },
        { id: 5, user: "Admin User", action: "updated system settings", target: "Security Policy", time: "5 hours ago", type: "admin" },
    ];

    return (
        <div className="p-4 sm:p-6 lg:p-8 ml-0 lg:ml-64 mt-16 lg:mt-0 transition-colors duration-300">
            <header className="mb-6 sm:mb-8 flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Admin Dashboard</h1>
                    <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 transition-colors duration-300">Overview of system performance and recent activities.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <Button variant="outline" className="flex items-center justify-center gap-2 w-full sm:w-auto">
                        <FaFileExport /> Export Data
                    </Button>
                    <Button className="flex items-center justify-center gap-2 w-full sm:w-auto">
                        <FaPlus /> New Announcement
                    </Button>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                {stats.map((stat, index) => (
                    <Card key={index} className="flex items-center p-6">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl mr-4 flex-shrink-0 ${stat.color} dark:bg-opacity-20`}>
                            <stat.icon />
                        </div>
                        <div className="flex-1">
                            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium transition-colors duration-300">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">{stat.value}</h3>
                            <div className={`flex items-center text-xs font-bold mt-1 ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                {stat.isPositive ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                                {stat.change}
                                <span className="text-gray-400 font-normal ml-1">vs last month</span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* Recent Activity Feed */}
                <div className="lg:col-span-2">
                    <Card className="h-full">
                        <div className="flex justify-between items-center mb-4 sm:mb-6">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Recent Activity</h3>
                            <button className="text-primary hover:text-accent hover:underline text-xs sm:text-sm font-medium transition-colors duration-300">View All History</button>
                        </div>
                        <div className="space-y-6">
                            {recentActivity.map((activity) => (
                                <div key={activity.id} className="flex gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-2 h-2 rounded-full mb-1 flex-shrink-0 
                                            ${activity.type === 'submission' ? 'bg-blue-500' :
                                                activity.type === 'resolution' ? 'bg-green-500' :
                                                    activity.type === 'system' ? 'bg-gray-400' :
                                                        activity.type === 'registration' ? 'bg-purple-500' : 'bg-red-500'}`}
                                        />
                                        <div className="w-0.5 h-full bg-gray-100 dark:bg-gray-700 transition-colors duration-300"></div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-800 dark:text-gray-300 transition-colors duration-300">
                                            <span className="font-bold">{activity.user}</span> {activity.action} <span className="font-medium text-gray-600 dark:text-gray-400 transition-colors duration-300"> {activity.target}</span>
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Right Column: System Health & Quick Actions */}
                <div className="space-y-8">
                    {/* System Health */}
                    <Card className="bg-gray-900 text-white">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold flex items-center gap-2">
                                <FaBolt className="text-yellow-400" /> System Health
                            </h3>
                            <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full border border-green-500/30 flex items-center gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div> All Systems Operational
                            </span>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1 text-gray-300">
                                    <span className="flex items-center gap-2"><FaServer /> Server Load</span>
                                    <span>24%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '24%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1 text-gray-300">
                                    <span className="flex items-center gap-2"><FaDatabase /> Database Usage</span>
                                    <span>68%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                                </div>
                            </div>
                            <div className="pt-4 mt-4 border-t border-gray-700 text-xs text-gray-400 flex justify-between">
                                <span>Version 2.4.0</span>
                                <span>Last Backup: 1 hour ago</span>
                            </div>
                        </div>
                    </Card>

                    {/* Quick Actions Grid */}
                    <Card>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Quick Management</h3>
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            <button className="p-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-xl flex flex-col items-center justify-center text-blue-700 dark:text-blue-300 transition-colors gap-2">
                                <FaUserPlus className="text-xl" />
                                <span className="text-xs font-bold">Add Staff</span>
                            </button>
                            <button className="p-4 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-xl flex flex-col items-center justify-center text-purple-700 dark:text-purple-300 transition-colors gap-2">
                                <FaUsers className="text-xl" />
                                <span className="text-xs font-bold">Manage Roles</span>
                            </button>
                            <button className="p-4 bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30 rounded-xl flex flex-col items-center justify-center text-orange-700 dark:text-orange-300 transition-colors gap-2">
                                <FaExclamationCircle className="text-xl" />
                                <span className="text-xs font-bold">Review Flags</span>
                            </button>
                            <button className="p-4 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-xl flex flex-col items-center justify-center text-green-700 dark:text-green-300 transition-colors gap-2">
                                <FaFileExport className="text-xl" />
                                <span className="text-xs font-bold">Audit Logs</span>
                            </button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
