import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaMapMarkerAlt, FaCalendarAlt, FaTag, FaUser, FaEnvelope } from 'react-icons/fa';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { STATUS } from '../../utils/constants';

const AdminComplaintDetails = () => {
    const { id } = useParams();
    const [status, setStatus] = useState(STATUS.IN_PROGRESS);

    // Mock data
    const complaint = {
        id: id,
        title: 'Pothole on Main St',
        description: 'There is a large pothole in the middle of the road near the park entrance. It is causing traffic slowdowns and is dangerous for cyclists.',
        category: 'Roads & Transport',
        location: '123 Main St, near Central Park',
        date: '2025-12-01',
        citizen: {
            name: 'John Doe',
            email: 'john@example.com',
            phone: '123-456-7890'
        },
        image: 'https://placehold.co/600x400/e2e8f0/64748b?text=Evidence+Photo',
        updates: [
            { date: '2025-12-02', message: 'Complaint received and assigned to Road Maintenance Team.' },
            { date: '2025-12-03', message: 'Inspection scheduled for tomorrow.' },
        ]
    };

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        // Mock API call to update status
        console.log(`Updating status to ${newStatus}`);
    };

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <Link to="/admin/complaints" className="inline-flex items-center text-gray-600 hover:text-primary mb-6 transition-colors">
                <FaArrowLeft className="mr-2" /> Back to Complaints List
            </Link>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-1">#{complaint.id}: {complaint.title}</h1>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-1"><FaCalendarAlt /> {complaint.date}</span>
                                    <span className="flex items-center gap-1"><FaTag /> {complaint.category}</span>
                                </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-bold ${status === STATUS.RESOLVED ? 'bg-green-100 text-green-700' :
                                    status === STATUS.REJECTED ? 'bg-red-100 text-red-700' :
                                        'bg-yellow-100 text-yellow-700'
                                }`}>
                                {status}
                            </span>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                            <p className="text-gray-600 leading-relaxed">{complaint.description}</p>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                            <p className="text-gray-600 flex items-center gap-2"><FaMapMarkerAlt /> {complaint.location}</p>
                        </div>

                        {complaint.image && (
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Attached Evidence</h3>
                                <img src={complaint.image} alt="Complaint Evidence" className="rounded-lg w-full object-cover max-h-96" />
                            </div>
                        )}
                    </Card>

                    <Card>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Activity Log</h3>
                        <div className="space-y-6 border-l-2 border-gray-200 ml-3 pl-6 relative">
                            {complaint.updates.map((update, index) => (
                                <div key={index} className="relative">
                                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm"></div>
                                    <p className="text-sm text-gray-500 mb-1">{update.date}</p>
                                    <p className="text-gray-800">{update.message}</p>
                                </div>
                            ))}
                            <div className="relative">
                                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-gray-300 border-4 border-white shadow-sm"></div>
                                <p className="text-sm text-gray-500 mb-1">{complaint.date}</p>
                                <p className="text-gray-800">Complaint submitted.</p>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Update Status</h3>
                        <div className="space-y-3">
                            <Button
                                className={`w-full justify-start ${status === STATUS.IN_PROGRESS ? 'ring-2 ring-offset-2 ring-primary' : ''}`}
                                variant={status === STATUS.IN_PROGRESS ? 'primary' : 'outline'}
                                onClick={() => handleStatusChange(STATUS.IN_PROGRESS)}
                            >
                                In Progress
                            </Button>
                            <Button
                                className={`w-full justify-start ${status === STATUS.RESOLVED ? 'ring-2 ring-offset-2 ring-green-500' : ''}`}
                                variant={status === STATUS.RESOLVED ? 'primary' : 'outline'}
                                onClick={() => handleStatusChange(STATUS.RESOLVED)}
                            >
                                Mark as Resolved
                            </Button>
                            <Button
                                className={`w-full justify-start ${status === STATUS.REJECTED ? 'ring-2 ring-offset-2 ring-red-500' : ''}`}
                                variant={status === STATUS.REJECTED ? 'primary' : 'outline'}
                                onClick={() => handleStatusChange(STATUS.REJECTED)}
                            >
                                Reject Complaint
                            </Button>
                        </div>
                    </Card>

                    <Card>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Citizen Details</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                                    <FaUser />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{complaint.citizen.name}</p>
                                    <p className="text-xs text-gray-500">Citizen</p>
                                </div>
                            </div>
                            <div className="pt-3 border-t border-gray-100 space-y-2">
                                <p className="text-sm text-gray-600 flex items-center gap-2">
                                    <FaEnvelope className="text-gray-400" /> {complaint.citizen.email}
                                </p>
                                <p className="text-sm text-gray-600 flex items-center gap-2">
                                    <span className="text-gray-400">📞</span> {complaint.citizen.phone}
                                </p>
                            </div>
                            <Button variant="secondary" className="w-full text-sm mt-2">Contact Citizen</Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AdminComplaintDetails;
