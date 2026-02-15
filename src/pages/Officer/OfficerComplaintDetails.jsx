import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaMapMarkerAlt, FaCalendarAlt, FaUser, FaCamera, FaStickyNote } from 'react-icons/fa';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Swal from 'sweetalert2';

const OfficerComplaintDetails = () => {
    const { id } = useParams();

    // Mock Data
    const complaint = {
        id: id,
        title: 'Large Pothole on Main St',
        description: 'A very deep pothole causing traffic issues near the market entrance. Several cars have been damaged.',
        category: 'Roads',
        status: 'In Progress',
        priority: 'High',
        date: '2023-10-25',
        location: '123 Main Street, Central Freetown',
        citizen: {
            name: 'Alice Johnson',
            phone: '+232 76 123 456'
        },
        image: 'https://placehold.co/600x400/999/fff?text=Evidence+Photo',
        timeline: [
            { date: '2023-10-25 10:00 AM', text: 'Complaint Submitted' },
            { date: '2023-10-26 09:00 AM', text: 'Assigned to Officer John Doe' },
            { date: '2023-10-26 02:00 PM', text: 'Status changed to In Progress' },
        ]
    };

    const handleStatusUpdate = (newStatus) => {
        Swal.fire({
            title: `Mark as ${newStatus}?`,
            text: "You can add a note for this status change.",
            input: 'textarea',
            inputPlaceholder: 'Enter internal note...',
            showCancelButton: true,
            confirmButtonText: 'Update Status',
            confirmButtonColor: '#0958d9'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Updated!', `Complaint marked as ${newStatus}`, 'success');
            }
        });
    };

    const handleUploadPhoto = () => {
        Swal.fire({
            title: 'Upload Resolution Photo',
            html: '<input type="file" class="swal2-file" accept="image/*">',
            showCancelButton: true,
            confirmButtonText: 'Upload',
            confirmButtonColor: '#0958d9'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Uploaded!', 'Resolution photo has been added.', 'success');
            }
        })
    };

    return (
        <div className="p-8 ml-64">
            <Link to="/officer/complaints" className="flex items-center text-gray-500 hover:text-primary mb-6 transition-colors">
                <FaArrowLeft className="mr-2" /> Back to Assigned Complaints
            </Link>

            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{complaint.title}</h1>
                    <div className="flex gap-4 text-sm">
                        <span className="px-3 py-1 bg-blue-100 text-primary rounded-full font-medium">{complaint.category}</span>
                        <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full font-medium">Priority: {complaint.priority}</span>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full font-medium">Status: {complaint.status}</span>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button onClick={() => handleStatusUpdate('Resolved')} className="bg-green-600 hover:bg-green-700 border-none">Mark Resolved</Button>
                    <Button onClick={() => handleStatusUpdate('On Hold')} className="bg-gray-500 hover:bg-gray-600 border-none">Put On Hold</Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <Card className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Complaint Details</h3>
                        <p className="text-gray-700 leading-relaxed mb-6">{complaint.description}</p>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-primary mt-1" />
                                <div>
                                    <span className="block text-sm font-bold text-gray-900">Location</span>
                                    <span className="text-gray-600">{complaint.location}</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <FaCalendarAlt className="text-primary mt-1" />
                                <div>
                                    <span className="block text-sm font-bold text-gray-900">Date Reported</span>
                                    <span className="text-gray-600">{complaint.date}</span>
                                </div>
                            </div>
                        </div>

                        <div className="border border-gray-200 rounded-xl overflow-hidden">
                            <img src={complaint.image} alt="Evidence" className="w-full h-80 object-cover" />
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Action & Resolution</h3>
                        <div className="flex flex-col gap-4">
                            <Button variant="outline" onClick={handleUploadPhoto} className="flex items-center justify-center gap-2 py-4 border-dashed border-2">
                                <FaCamera /> Upload Resolution Photo
                            </Button>
                            <textarea
                                className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Add internal notes about the work done..."
                                rows="4"
                            ></textarea>
                            <div className="flex justify-end">
                                <Button size="sm">Save Notes</Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-8">
                    <Card className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Citizen Details</h3>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                                <FaUser />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">{complaint.citizen.name}</p>
                                <p className="text-sm text-gray-500">Citizen</p>
                            </div>
                        </div>
                        <div className="text-sm text-gray-600">
                            PHONE: {complaint.citizen.phone}
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Timeline</h3>
                        <div className="relative border-l-2 border-gray-200 ml-3 space-y-6">
                            {complaint.timeline.map((event, index) => (
                                <div key={index} className="pl-6 relative">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-white"></div>
                                    <p className="text-sm text-gray-500">{event.date}</p>
                                    <p className="text-gray-900 font-medium">{event.text}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default OfficerComplaintDetails;
