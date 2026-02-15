import { useState } from 'react';
import { FaCheck, FaTimes, FaEye, FaSearch, FaFilter } from 'react-icons/fa';
import Card from '../../../components/UI/Card';
import Button from '../../../components/UI/Button';
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

    return (
        <div className="p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Permit Management</h1>
                <p className="text-gray-500">Review and approve citizen license applications.</p>
            </header>

            <Card className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <div className="flex gap-2">
                        {['All', 'Pending', 'Approved', 'Rejected'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === status ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                    <div className="w-full md:w-64">
                        <Input placeholder="Search applicant..." icon={FaSearch} />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                            <tr>
                                <th className="p-4 rounded-tl-lg">App ID</th>
                                <th className="p-4">Applicant</th>
                                <th className="p-4">Type</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 rounded-tr-lg text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                            {applications.map((app) => (
                                <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-medium text-gray-900">{app.id}</td>
                                    <td className="p-4 text-gray-600">{app.applicant}</td>
                                    <td className="p-4 text-gray-600">{app.type}</td>
                                    <td className="p-4 text-gray-500">{app.date}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold 
                                            ${app.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                                app.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right flex justify-end gap-2">
                                        <button className="p-2 text-gray-500 hover:text-primary hover:bg-blue-50 rounded-full" title="View Details">
                                            <FaEye />
                                        </button>
                                        {app.status === 'Pending' && (
                                            <>
                                                <button onClick={() => handleAction(app.id, 'Approve')} className="p-2 text-green-600 hover:bg-green-50 rounded-full" title="Approve">
                                                    <FaCheck />
                                                </button>
                                                <button onClick={() => handleAction(app.id, 'Reject')} className="p-2 text-red-600 hover:bg-red-50 rounded-full" title="Reject">
                                                    <FaTimes />
                                                </button>
                                            </>
                                        )}
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
