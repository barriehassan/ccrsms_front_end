import { useState, useEffect } from 'react';
import Card from '../../components/UI/Card';
import { FaClipboardCheck, FaCheckCircle, FaSpinner, FaClock, FaExclamationTriangle } from 'react-icons/fa';
import { getComplaints } from '../../services/complaintService';

const Notifications = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const data = await getComplaints();
                const uniqueData = Array.isArray(data)
                    ? Array.from(new Map(data.map(item => [item.id, item])).values())
                    : [];
                // Sort by created_at descending (most recent first)
                setComplaints(uniqueData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
            } catch (err) {
                console.error("Error fetching complaints:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchComplaints();
    }, []);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'RESOLVED': return <FaCheckCircle className="text-green-500" />;
            case 'IN_PROGRESS': return <FaSpinner className="text-yellow-500 animate-spin" />;
            case 'REJECTED': return <FaExclamationTriangle className="text-red-500" />;
            default: return <FaClipboardCheck className="text-blue-500" />;
        }
    };

    const getStatusMessage = (complaint) => {
        switch (complaint.status) {
            case 'SUBMITTED': return `Your complaint "${complaint.title}" has been submitted and is under review.`;
            case 'ACKNOWLEDGED': return `Your complaint "${complaint.title}" has been acknowledged by the team.`;
            case 'IN_PROGRESS': return `Your complaint "${complaint.title}" is currently being worked on.`;
            case 'RESOLVED': return `Your complaint "${complaint.title}" has been resolved.`;
            case 'REJECTED': return `Your complaint "${complaint.title}" was reviewed and rejected. Please contact support for details.`;
            default: return `Update on complaint "${complaint.title}": ${complaint.status}`;
        }
    };

    const getRowColor = (status) => {
        switch (status) {
            case 'RESOLVED': return 'bg-green-50 border-l-4 border-l-green-500';
            case 'IN_PROGRESS': return 'bg-yellow-50 border-l-4 border-l-yellow-500';
            case 'REJECTED': return 'bg-red-50 border-l-4 border-l-red-500';
            default: return 'bg-blue-50 border-l-4 border-l-blue-500';
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Complaint Updates & Activity</h1>
                    <p className="text-gray-600 mt-1">Track all updates and changes to your complaints</p>
                </div>
            </div>

            <div className="space-y-4">
                {loading ? (
                    <div className="flex justify-center p-8 dark:text-white">
                        <FaSpinner className="animate-spin text-4xl text-primary" />
                    </div>
                ) : complaints.length > 0 ? (
                    complaints.map((complaint) => (
                        <Card
                            key={complaint.id}
                            className={`flex items-start gap-4 p-4 transition-colors hover:shadow-md ${getRowColor(complaint.status)}`}
                        >
                            <div className="mt-1 text-xl flex-shrink-0">
                                {getStatusIcon(complaint.status)}
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-900 font-semibold dark:text-white">
                                    {getStatusMessage(complaint)}
                                </p>
                                <div className="flex gap-4 mt-2 text-xs text-gray-600 dark:text-gray-400 dark:text-white">
                                    <span className="flex items-center gap-1">
                                        <FaClock className="text-[10px]" />
                                        {new Date(complaint.created_at).toLocaleDateString()}
                                    </span>
                                    <span className="px-2 py-1 bg-white/50 dark:text-white rounded font-medium">
                                        ID: {complaint.id}
                                    </span>
                                    <span className="px-2 py-1 bg-white/50 dark:text-white rounded font-medium">
                                        {complaint.status.replace('_', ' ')}
                                    </span>
                                </div>
                            </div>
                        </Card>
                    ))
                ) : (
                    <div className="text-center py-12 text-gray-500">
                        <FaClipboardCheck className="mx-auto text-4xl mb-4 text-gray-300" />
                        <p>No complaints yet. Submit your first complaint to see updates here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notifications;
