import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaFileContract, FaPlusCircle, FaSearch, FaHistory, FaCheckCircle, FaClock, FaTimesCircle, FaEye, FaSpinner } from 'react-icons/fa';
import Card from '../../../components/UI/Card';
import Button from '../../../components/UI/Button';
import Input from '../../../components/UI/Input';
import { getUserBusinessLicenseNotices } from '../../../services/paymentService';
import Swal from 'sweetalert2';

const PermitDashboard = () => {
    const navigate = useNavigate();
    
    const [demandNotices, setDemandNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                setLoading(true);
                const notices = await getUserBusinessLicenseNotices();
                const noticesArray = Array.isArray(notices) ? notices : [];
                setDemandNotices(noticesArray);
                setError('');
            } catch (err) {
                console.error('Error fetching business license notices:', err);
                setError('Failed to load business licenses');
                Swal.fire({
                    icon: 'warning',
                    title: 'Info',
                    text: 'You do not have any business licenses yet. Register a business to get started.',
                    confirmButtonColor: '#0958d9'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchNotices();
    }, []);

    // Calculate stats
    const verifiedNotices = demandNotices.filter(n => n.status === 'VERIFIED');
    const paidNotices = demandNotices.filter(n => n.status === 'PAID');
    const submittedNotices = demandNotices.filter(n => n.status === 'SUBMITTED');

    const stats = [
        { label: "Active Licenses", value: paidNotices.length, icon: FaFileContract, color: "text-green-600", bg: "bg-green-100" },
        { label: "Pending Verification", value: submittedNotices.length, icon: FaClock, color: "text-yellow-600", bg: "bg-yellow-100" },
        { label: "Verified & Ready", value: verifiedNotices.length, icon: FaCheckCircle, color: "text-blue-600", bg: "bg-blue-100" },
    ];

    // Filter notices based on search
    const filteredNotices = demandNotices.filter(notice =>
        notice.business_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notice.notice_number?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'PAID': return 'bg-green-100 text-green-700';
            case 'VERIFIED': return 'bg-blue-100 text-blue-700';
            case 'SUBMITTED': return 'bg-yellow-100 text-yellow-700';
            case 'REJECTED': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusLabel = (status) => {
        const labels = {
            'PAID': 'Active',
            'VERIFIED': 'Verified & Ready',
            'SUBMITTED': 'Under Review',
            'REJECTED': 'Rejected'
        };
        return labels[status] || status;
    };

    const handlePayment = (notice) => {
        if (notice.status !== 'VERIFIED') {
            Swal.fire({
                icon: 'warning',
                title: 'Cannot Pay',
                text: 'Your demand notice must be verified before payment.',
                confirmButtonColor: '#0958d9'
            });
            return;
        }
        
        navigate('/citizen/payments/checkout', {
            state: {
                type: 'BUSINESS_LICENSE',
                title: 'Business License',
                noticeId: notice.id
            }
        });
    };

    return (
        <div className="p-8">
            <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Licenses & Permits</h1>
                    <p className="text-gray-500">Manage your business licenses and municipal permits.</p>
                </div>
                <div className="flex gap-3 flex-wrap">
                    <Button onClick={() => navigate('/citizen/permits/business/create')} variant="outline" className="flex items-center gap-2">
                        <FaPlusCircle /> Register Business
                    </Button>
                    <Button onClick={() => navigate('/citizen/permits/license-request')} className="flex items-center gap-2">
                        <FaFileContract /> Request License
                    </Button>
                </div>
            </header>

            {/* Stats Overview */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <Card key={index} className="p-6 flex items-center gap-4">
                        <div className={`p-4 rounded-full ${stat.bg} ${stat.color} text-2xl`}>
                            <stat.icon />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Active Permits List */}
                <div className="lg:col-span-2 space-y-8">
                    <Card className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <FaFileContract className="text-primary" /> My Business Licenses
                            </h3>
                            <div className="md:w-64">
                                <Input 
                                    placeholder="Search licenses..." 
                                    icon={FaSearch}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {loading ? (
                            <div className="text-center py-8 text-gray-500">
                                <FaSpinner className="inline text-3xl animate-spin mb-3" />
                                <p>Loading your business licenses...</p>
                            </div>
                        ) : filteredNotices.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="p-3 text-xs font-medium text-gray-500 uppercase">Notice ID</th>
                                            <th className="p-3 text-xs font-medium text-gray-500 uppercase">Business</th>
                                            <th className="p-3 text-xs font-medium text-gray-500 uppercase">Year</th>
                                            <th className="p-3 text-xs font-medium text-gray-500 uppercase">Amount Due</th>
                                            <th className="p-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                                            <th className="p-3 text-xs font-medium text-gray-500 uppercase">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {filteredNotices.map((notice) => (
                                            <tr key={notice.id} className="hover:bg-gray-50">
                                                <td className="p-3 text-sm font-medium text-gray-900">{notice.notice_number}</td>
                                                <td className="p-3 text-sm text-gray-600">{notice.business_name}</td>
                                                <td className="p-3 text-sm text-gray-500">{notice.license_year}</td>
                                                <td className="p-3 text-sm font-medium text-gray-900">Le {Number(notice.amount_due).toLocaleString()}</td>
                                                <td className="p-3">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(notice.status)}`}>
                                                        {getStatusLabel(notice.status)}
                                                    </span>
                                                </td>
                                                <td className="p-3">
                                                    {notice.status === 'VERIFIED' ? (
                                                        <Button 
                                                            variant="outline" 
                                                            size="sm"
                                                            onClick={() => handlePayment(notice)}
                                                        >
                                                            Pay Now
                                                        </Button>
                                                    ) : (
                                                        <Button 
                                                            variant="outline" 
                                                            size="sm"
                                                            onClick={() => navigate(`/citizen/permits/license/${notice.id}`)}
                                                        >
                                                            View
                                                        </Button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-8 bg-gray-50 rounded-lg">
                                <FaFileContract className="text-4xl text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-600 mb-4">No business licenses found</p>
                                <Button onClick={() => navigate('/citizen/permits/business/create')}>Register a Business</Button>
                            </div>
                        )}
                    </Card>

                    {/* Recent Applications */}
                    {demandNotices.length > 0 && (
                        <Card className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <FaHistory className="text-gray-400" /> License Status Overview
                            </h3>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="p-4 bg-blue-50 rounded-lg">
                                    <p className="text-2xl font-bold text-blue-600">{submittedNotices.length}</p>
                                    <p className="text-xs text-gray-600 mt-1">Pending Verification</p>
                                </div>
                                <div className="p-4 bg-yellow-50 rounded-lg">
                                    <p className="text-2xl font-bold text-yellow-600">{verifiedNotices.length}</p>
                                    <p className="text-xs text-gray-600 mt-1">Ready to Pay</p>
                                </div>
                                <div className="p-4 bg-green-50 rounded-lg">
                                    <p className="text-2xl font-bold text-green-600">{paidNotices.length}</p>
                                    <p className="text-xs text-gray-600 mt-1">Licenses Paid</p>
                                </div>
                            </div>
                        </Card>
                    )}
                </div>

                {/* Requirements Sidebar */}
                <div className="space-y-6">
                    <Card className="p-6 bg-blue-50 border-l-4 border-blue-500">
                        <h3 className="font-bold text-lg text-blue-900 mb-2">Need Help?</h3>
                        <p className="text-sm text-blue-700 mb-4">
                            Ensure you have all required documents scanned before applying.
                        </p>
                        <ul className="text-sm text-blue-800 space-y-2 mb-4">
                            <li className="flex items-center gap-2"><FaCheckCircle /> Valid ID Card</li>
                            <li className="flex items-center gap-2"><FaCheckCircle /> Business Registration</li>
                            <li className="flex items-center gap-2"><FaCheckCircle /> Tax Clearance</li>
                            <li className="flex items-center gap-2"><FaCheckCircle /> Property Deeds/Lease</li>
                        </ul>
                        <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-100">
                            Download Checklist
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PermitDashboard;
