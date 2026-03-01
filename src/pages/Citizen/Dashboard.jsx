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
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.first_name} {user?.last_name || ''}!</h1>
                    <p className="text-gray-600 mt-1">Here's an overview of your reported issues.</p>
                </div>
                <Link to="/citizen/complaints/create">
                    <Button className="flex items-center gap-2">
                        <FaPlus /> Create Complaint
                    </Button>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat) => (
                    <Card key={stat.label} className="flex items-center p-6 hover:shadow-md transition-shadow">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl mr-4 ${stat.color}`}>
                            <stat.icon className={stat.label === 'In Progress' ? 'animate-spin-slow' : ''} />
                        </div>
                        <div>
                            <p className="text-gray-500 font-medium">{stat.label}</p>
                            <h3 className="text-3xl font-bold text-gray-900">
                                {loading ? '...' : stat.value}
                            </h3>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Recent Complaints</h3>
                        <Link to="/citizen/complaints" className="text-primary hover:underline text-sm font-medium">View All</Link>
                    </div>
                    <div className="space-y-4">
                        {loading ? (
                            <div className="flex justify-center p-8"><FaSpinner className="animate-spin text-2xl text-primary" /></div>
                        ) : recentComplaints.length > 0 ? (
                            recentComplaints.map((complaint) => (
                                <Link key={complaint.id} to={`/citizen/complaints/${complaint.id}`}>
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 group-hover:text-primary transition-colors">
                                                <FaClipboardCheck />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 truncate max-w-[150px] sm:max-w-[250px]">{complaint.title}</h4>
                                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                                    <FaClock className="text-[10px]" />
                                                    {new Date(complaint.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${getStatusColor(complaint.status)}`}>
                                            {complaint.status.replace('_', ' ')}
                                        </span>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-400 italic">No complaints reported yet.</div>
                        )}
                    </div>
                </Card>

                <Card>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Quick Actions & Reminders</h3>
                        <Link to="/citizen/payments" className="text-primary hover:underline text-sm font-medium">View All</Link>
                    </div>
                    <div className="space-y-3">
                        <Link to="/citizen/payments" className="block">
                            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg hover:bg-blue-100 transition-colors cursor-pointer">
                                <p className="text-sm font-semibold text-gray-900">💰 Check Your Payment Status</p>
                                <p className="text-xs text-gray-600 mt-1">View bills, make payments, and access receipt history</p>
                            </div>
                        </Link>
                        
                        <Link to="/citizen/complaints/create" className="block">
                            <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg hover:bg-green-100 transition-colors cursor-pointer">
                                <p className="text-sm font-semibold text-gray-900">📝 Submit a New Complaint</p>
                                <p className="text-xs text-gray-600 mt-1">Report an issue to the city council</p>
                            </div>
                        </Link>

                        <Link to="/citizen/permits" className="block">
                            <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-lg hover:bg-purple-100 transition-colors cursor-pointer">
                                <p className="text-sm font-semibold text-gray-900">📋 Manage Permits</p>
                                <p className="text-xs text-gray-600 mt-1">Apply for permits or check existing applications</p>
                            </div>
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
