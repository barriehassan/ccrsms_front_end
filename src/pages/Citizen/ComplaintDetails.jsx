import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMapMarkerAlt, FaCalendarAlt, FaTag, FaSpinner, FaEdit, FaTrash } from 'react-icons/fa';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Swal from 'sweetalert2';
import { getComplaint, deleteComplaint } from '../../services/complaintService';

const ComplaintDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [complaint, setComplaint] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComplaint = async () => {
            try {
                const data = await getComplaint(id);
                setComplaint(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching complaint:", err);
                setError("Failed to load complaint details.");
                setLoading(false);
            }
        };

        fetchComplaint();
    }, [id]);

    const handleDelete = async () => {
        Swal.fire({
            title: 'Delete Complaint?',
            text: "Are you sure? This action cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteComplaint(id);
                    Swal.fire('Deleted!', 'Your complaint has been deleted.', 'success').then(() => {
                        navigate('/citizen/complaints');
                    });
                } catch (err) {
                    Swal.fire('Error', 'Failed to delete complaint.', 'error');
                }
            }
        });
    };

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

    if (loading) return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <FaSpinner className="animate-spin text-4xl text-primary" />
        </div>
    );

    if (error || !complaint) return (
        <div className="p-8 text-center text-red-500">
            <p>{error || "Complaint not found."}</p>
            <Link to="/citizen/complaints">
                <Button className="mt-4">Back to List</Button>
            </Link>
        </div>
    );

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <Link to="/citizen/complaints" className="inline-flex items-center text-gray-600 hover:text-primary transition-colors">
                    <FaArrowLeft className="mr-2" /> Back to Complaints
                </Link>

                {complaint.status === 'SUBMITTED' && (
                    <div className="flex gap-2">
                        <Link to={`/citizen/complaints/edit/${id}`}>
                            <Button variant="outline" className="flex items-center gap-2">
                                <FaEdit /> Edit
                            </Button>
                        </Link>
                        <Button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2">
                            <FaTrash /> Delete
                        </Button>
                    </div>
                )}
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <div className="flex justify-between items-start mb-4">
                            <h1 className="text-2xl font-bold text-gray-900">{complaint.title}</h1>
                            <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(complaint.status)}`}>
                                {complaint.status.replace('_', ' ')}
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
                            <div className="flex items-center gap-1">
                                <FaTag /> {complaint.category || 'Category'}
                            </div>
                            <div className="flex items-center gap-1">
                                <FaCalendarAlt /> {new Date(complaint.created_at).toLocaleDateString()}
                            </div>
                            {complaint.street_name && (
                                <div className="flex items-center gap-1">
                                    <FaMapMarkerAlt /> {complaint.location} - {complaint.street_name}
                                </div>
                            )}
                        </div>

                        <div className="mb-6">
                            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{complaint.description}</p>
                        </div>

                        {complaint.evidence_image && (
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Attached Evidence</h3>
                                <img src={complaint.evidence_image} alt="Complaint Evidence" className="rounded-lg w-full object-cover max-h-96" />
                            </div>
                        )}
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="bg-blue-50 border-blue-100">
                        <h3 className="font-bold text-blue-900 mb-2">Need Help?</h3>
                        <p className="text-sm text-blue-800 mb-4">
                            If you have further questions about this complaint, please contact our support team.
                        </p>
                        <Button variant="secondary" className="w-full text-sm">Contact Support</Button>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ComplaintDetails;
