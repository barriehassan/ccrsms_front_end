import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaEye } from 'react-icons/fa';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { STATUS } from '../../utils/constants';

const AdminComplaintList = () => {
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');

    // Mock data
    const complaints = [
        { id: 1001, title: 'Pothole on Main St', citizen: 'John Doe', date: '2025-12-01', status: STATUS.IN_PROGRESS, category: 'Roads' },
        { id: 1002, title: 'Street light broken', citizen: 'Jane Smith', date: '2025-11-28', status: STATUS.RESOLVED, category: 'Electricity' },
        { id: 1003, title: 'Garbage not collected', citizen: 'Mike Johnson', date: '2025-12-05', status: STATUS.SUBMITTED, category: 'Sanitation' },
        { id: 1004, title: 'Water pipe burst', citizen: 'Sarah Williams', date: '2025-12-06', status: STATUS.SUBMITTED, category: 'Water' },
        { id: 1005, title: 'Illegal parking', citizen: 'David Brown', date: '2025-12-04', status: STATUS.REJECTED, category: 'Traffic' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case STATUS.SUBMITTED: return 'bg-blue-100 text-blue-700';
            case STATUS.IN_PROGRESS: return 'bg-yellow-100 text-yellow-700';
            case STATUS.RESOLVED: return 'bg-green-100 text-green-700';
            case STATUS.REJECTED: return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const filteredComplaints = complaints.filter(c => {
        const matchesFilter = filter === 'All' || c.status === filter;
        const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
            c.citizen.toLowerCase().includes(search.toLowerCase()) ||
            c.id.toString().includes(search);
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Complaint Management</h1>

            <Card className="mb-8">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-1/3">
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by ID, title, or citizen..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
                        <FaFilter className="text-gray-500" />
                        <select
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="All">All Statuses</option>
                            <option value={STATUS.SUBMITTED}>{STATUS.SUBMITTED}</option>
                            <option value={STATUS.IN_PROGRESS}>{STATUS.IN_PROGRESS}</option>
                            <option value={STATUS.RESOLVED}>{STATUS.RESOLVED}</option>
                            <option value={STATUS.REJECTED}>{STATUS.REJECTED}</option>
                        </select>
                    </div>
                </div>
            </Card>

            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Citizen</th>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredComplaints.map((complaint) => (
                                <tr key={complaint.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{complaint.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{complaint.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{complaint.citizen}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{complaint.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{complaint.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(complaint.status)}`}>
                                            {complaint.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <Link to={`/admin/complaints/${complaint.id}`}>
                                            <Button variant="ghost" className="text-primary hover:text-blue-900 p-2">
                                                <FaEye />
                                            </Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredComplaints.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        No complaints found matching your criteria.
                    </div>
                )}
            </Card>
        </div>
    );
};

export default AdminComplaintList;
