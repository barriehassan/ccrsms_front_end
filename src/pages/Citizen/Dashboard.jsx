import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaClipboardCheck, FaSpinner, FaCheckCircle, FaPlus, FaClock } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { getComplaints } from '../../services/complaintService';

const Dashboard = () => {
    const { user } = useAuth();
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const data = await getComplaints();
                // Basic de-duplication just to be safe as per previous rendering fix
                const uniqueData = Array.isArray(data)
                    ? Array.from(new Map(data.map(item => [item.id, item])).values())
                    : [];
                setComplaints(uniqueData);
            } catch (err) {
                console.error("Dashboard fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    const stats = [
        {
            label: 'Submitted',
            value: complaints.filter(c => c.status === 'SUBMITTED').length,
            icon: FaClipboardCheck,
            color: 'bg-blue-100 text-blue-600'
        },
        {
            label: 'In Progress',
            value: complaints.filter(c => ['ACKNOWLEDGED', 'IN_PROGRESS'].includes(c.status)).length,
            icon: FaSpinner,
            color: 'bg-yellow-100 text-yellow-600'
        },
        {
            label: 'Resolved',
            value: complaints.filter(c => c.status === 'RESOLVED').length,
            icon: FaCheckCircle,
            color: 'bg-green-100 text-green-600'
        },
    ];

    const recentComplaints = complaints.slice(0, 4);

    const getStatusColor = (status) => {
        switch (status) {
            case 'SUBMITTED': return 'bg-blue-100 text-blue-700';
            case 'ACKNOWLEDGED': return 'bg-purple-100 text-purple-700';
            case 'IN_PROGRESS': return 'bg-yellow-100 text-yellow-700';
            case 'RESOLVED': return 'bg-green-100 text-green-700';
            case 'REJECTED': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto transition-colors duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Welcome back, {user?.first_name} {user?.last_name || ''}!</h1>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-300">Here's an overview of your reported issues.</p>
                </div>
                <Link to="/citizen/complaints/create" className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 sm:py-2">
                        <FaPlus /> Submit New Complaint
                    </Button>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
                {stats.map((stat) => (
                    <Card key={stat.label} className="flex items-center p-6 hover:shadow-md transition-shadow">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl mr-4 ${stat.color}`}>
                            <stat.icon className={stat.label === 'In Progress' ? 'animate-spin-slow' : ''} />
                        </div>
                        <div>
                            <p className="text-gray-500 dark:text-gray-400 font-medium transition-colors duration-300">{stat.label}</p>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                                {loading ? '...' : stat.value}
                            </h3>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                <Card>
                    <div className="flex justify-between items-center mb-4 sm:mb-6">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Recent Complaints</h3>
                        <Link to="/citizen/complaints" className="text-primary hover:text-accent hover:underline text-xs sm:text-sm font-medium transition-colors duration-300">View All</Link>
                    </div>
                    <div className="space-y-4">
                        {loading ? (
                            <div className="flex justify-center p-8"><FaSpinner className="animate-spin text-2xl text-primary" /></div>
                        ) : recentComplaints.length > 0 ? (
                            recentComplaints.map((complaint) => (
                                <Link key={complaint.id} to={`/citizen/complaints/${complaint.id}`}>
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 cursor-pointer group gap-2 sm:gap-0 mt-3">
                                        <div className="flex items-center gap-3 sm:gap-4">
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white dark:bg-dark-card rounded-full flex items-center justify-center shadow-sm text-gray-400 group-hover:text-primary transition-colors shrink-0">
                                                <FaClipboardCheck className="text-sm sm:text-base" />
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="font-semibold text-gray-900 dark:text-white truncate text-sm sm:text-base transition-colors duration-300">{complaint.title}</h4>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 transition-colors duration-300">
                                                    <FaClock className="text-[10px]" />
                                                    {new Date(complaint.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="self-end sm:self-auto shrink-0">
                                            <span className={`px-2 sm:px-3 py-1 text-[9px] sm:text-[10px] font-bold rounded-full uppercase tracking-wider ${getStatusColor(complaint.status)} whitespace-nowrap`}>
                                                {complaint.status.replace('_', ' ')}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="text-center py-6 sm:py-8 text-sm sm:text-base text-gray-400 italic">No complaints reported yet.</div>
                        )}
                    </div>
                </Card>

                <Card>
                    <div className="flex justify-between items-center mb-4 sm:mb-6">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Quick Actions & Reminders</h3>
                        <Link to="/citizen/payments" className="text-primary hover:text-accent hover:underline text-xs sm:text-sm font-medium transition-colors duration-300">View All</Link>
                    </div>
                    <div className="space-y-3">
                        <Link to="/citizen/payments" className="block">
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-300 cursor-pointer">
                                <p className="text-sm font-semibold text-gray-900 dark:text-blue-100">💰 Check Your Payment Status</p>
                                <p className="text-xs text-gray-600 dark:text-blue-200/70 mt-1">View bills, make payments, and access receipt history</p>
                            </div>
                        </Link>

                        <Link to="/citizen/complaints/create" className="block">
                            <div className="p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-r-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors duration-300 cursor-pointer">
                                <p className="text-sm font-semibold text-gray-900 dark:text-green-100">📝 Submit a New Complaint</p>
                                <p className="text-xs text-gray-600 dark:text-green-200/70 mt-1">Report an issue to the city council</p>
                            </div>
                        </Link>

                        <Link to="/citizen/permits" className="block">
                            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded-r-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors duration-300 cursor-pointer">
                                <p className="text-sm font-semibold text-gray-900 dark:text-purple-100">📋 Manage Permits</p>
                                <p className="text-xs text-gray-600 dark:text-purple-200/70 mt-1">Apply for permits or check existing applications</p>
                            </div>
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
