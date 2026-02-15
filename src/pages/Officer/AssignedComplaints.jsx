import { FaFilter, FaSearch, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';

const AssignedComplaints = () => {
    // Mock Data
    const complaints = [
        { id: 'CMP-2023-001', title: 'Large Pothole on Main St', category: 'Roads', date: '2023-10-25', status: 'In Progress', priority: 'High', location: 'Central' },
        { id: 'CMP-2023-004', title: 'Broken Street Light', category: 'Lighting', date: '2023-10-24', status: 'Pending', priority: 'Medium', location: 'West End' },
        { id: 'CMP-2023-009', title: 'Garbage Pileup', category: 'Waste', date: '2023-10-20', status: 'Resolved', priority: 'Low', location: 'East End' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Resolved': return 'bg-green-100 text-green-800';
            case 'In Progress': return 'bg-yellow-100 text-yellow-800';
            case 'Pending': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return 'text-red-600 font-bold';
            case 'Medium': return 'text-yellow-600 font-medium';
            default: return 'text-green-600';
        }
    };

    return (
        <div className="p-8 ml-64">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Assigned Complaints</h1>
                    <p className="text-gray-500">Manage and track your assigned tasks.</p>
                </div>
            </header>

            <Card className="p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-1/3">
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by ID or Title..."
                            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                    </div>

                    <div className="flex gap-4 w-full md:w-auto">
                        <div className="relative">
                            <select className="appearance-none bg-white border border-gray-300 px-4 py-2 pr-8 rounded-lg focus:outline-none focus:border-primary cursor-pointer">
                                <option>All Categories</option>
                                <option>Roads</option>
                                <option>Waste</option>
                                <option>Lighting</option>
                            </select>
                            <FaFilter className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                        </div>
                        <div className="relative">
                            <select className="appearance-none bg-white border border-gray-300 px-4 py-2 pr-8 rounded-lg focus:outline-none focus:border-primary cursor-pointer">
                                <option>All Priorities</option>
                                <option>High</option>
                                <option>Medium</option>
                                <option>Low</option>
                            </select>
                            <FaFilter className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </Card>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold text-sm uppercase tracking-wider">
                        <tr>
                            <th className="p-6">ID</th>
                            <th className="p-6">Title</th>
                            <th className="p-6">Category</th>
                            <th className="p-6">Date Assigned</th>
                            <th className="p-6">Priority</th>
                            <th className="p-6">Status</th>
                            <th className="p-6 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {complaints.map((complaint) => (
                            <tr key={complaint.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-6 font-medium text-gray-900">{complaint.id}</td>
                                <td className="p-6 text-gray-700">{complaint.title}</td>
                                <td className="p-6 text-gray-600">{complaint.category}</td>
                                <td className="p-6 text-gray-500">{complaint.date}</td>
                                <td className={`p-6 ${getPriorityColor(complaint.priority)}`}>{complaint.priority}</td>
                                <td className="p-6">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(complaint.status)}`}>
                                        {complaint.status}
                                    </span>
                                </td>
                                <td className="p-6 text-right">
                                    <Link to={`/officer/complaints/${complaint.id}`}>
                                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                                            <FaEye /> View
                                        </Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignedComplaints;
