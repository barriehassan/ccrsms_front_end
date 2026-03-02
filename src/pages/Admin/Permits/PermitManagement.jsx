import { useState } from 'react';
import { FaCheck, FaTimes, FaEye, FaSearch, FaClipboardList } from 'react-icons/fa';
import Card from '../../../components/UI/Card';
import Input from '../../../components/UI/Input';
import Swal from 'sweetalert2';

const PermitManagement = () => {
    const [filter, setFilter] = useState('All');

    const applications = [
        { id: "APP-2023-112", applicant: "John Doe", type: "Construction Permit", date: "10 Dec 2023", status: "Pending" },
        { id: "APP-2023-115", applicant: "Sarah Smith", type: "Business License", date: "11 Dec 2023", status: "Pending" },
        { id: "APP-2023-090", applicant: "Krio Kitchen", type: "Liquor License", date: "05 Dec 2023", status: "Approved" },
    ];

    const handleAction = (id, action) => {
        Swal.fire({
            title: `${action} Application?`,
            text: `Are you sure you want to ${action.toLowerCase()} application #${id}?`,
            icon: action === 'Approve' ? 'success' : 'warning',
            showCancelButton: true,
            confirmButtonColor: action === 'Approve' ? '#16a34a' : '#dc2626',
            confirmButtonText: `Yes, ${action}`
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Success', `Application has been ${action.toLowerCase()}d.`, 'success');
            }
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'Rejected': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
        }
    };

    const statuses = ['All', 'Pending', 'Approved', 'Rejected'];
    const filtered = filter === 'All' ? applications : applications.filter(a => a.status === filter);

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto transition-colors duration-300">
            <header className="mb-6 sm:mb-8">
                <div className="flex items-center gap-3 mb-1">
                    <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary">
                        <FaClipboardList />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Permit Management</h1>
                </div>
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1 ml-1 transition-colors duration-300">Review and approve citizen license applications.</p>
            </header>

            <Card className="p-4 sm:p-6">
                {/* Filters & Search */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div className="flex flex-wrap gap-2">
                        {statuses.map(status => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-200 ${filter === status
                                        ? 'bg-primary text-white shadow-sm'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                    <div className="w-full sm:w-64">
                        <Input placeholder="Search applicant..." icon={FaSearch} />
                    </div>
                </div>

                {/* Table – scrolls horizontally on small screens */}
                <div className="overflow-x-auto rounded-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead className="bg-gray-50 dark:bg-gray-800/60 text-gray-500 dark:text-gray-400 uppercase text-xs transition-colors duration-300">
                            <tr>
                                <th className="p-4">App ID</th>
                                <th className="p-4">Applicant</th>
                                <th className="p-4">Type</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-sm transition-colors duration-300">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-gray-400 dark:text-gray-500 italic">No applications match this filter.</td>
                                </tr>
                            ) : filtered.map((app) => (
                                <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors duration-200">
                                    <td className="p-4 font-mono font-medium text-gray-900 dark:text-white transition-colors duration-300">{app.id}</td>
                                    <td className="p-4 text-gray-700 dark:text-gray-300 transition-colors duration-300">{app.applicant}</td>
                                    <td className="p-4 text-gray-600 dark:text-gray-400 transition-colors duration-300">{app.type}</td>
                                    <td className="p-4 text-gray-500 dark:text-gray-400 transition-colors duration-300">{app.date}</td>
                                    <td className="p-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusColor(app.status)}`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex justify-end gap-1">
                                            <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors" title="View Details">
                                                <FaEye />
                                            </button>
                                            {app.status === 'Pending' && (
                                                <>
                                                    <button onClick={() => handleAction(app.id, 'Approve')} className="p-2 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-full transition-colors" title="Approve">
                                                        <FaCheck />
                                                    </button>
                                                    <button onClick={() => handleAction(app.id, 'Reject')} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors" title="Reject">
                                                        <FaTimes />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default PermitManagement;
