import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaFileContract, FaPlusCircle, FaSearch, FaHistory, FaCheckCircle, FaClock, FaSpinner } from 'react-icons/fa';
import Card from '../../../components/UI/Card';
import Button from '../../../components/UI/Button';
import Input from '../../../components/UI/Input';
import { getUserBusinessLicenseNotices } from '../../../services/paymentService';
import Swal from 'sweetalert2';

const PermitDashboard = () => {
    const navigate = useNavigate();

    const [demandNotices, setDemandNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                setLoading(true);
                const notices = await getUserBusinessLicenseNotices();
                setDemandNotices(Array.isArray(notices) ? notices : []);
            } catch (err) {
                console.error('Error fetching business license notices:', err);
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

    const verifiedNotices = demandNotices.filter(n => n.status === 'VERIFIED');
    const paidNotices = demandNotices.filter(n => n.status === 'PAID');
    const submittedNotices = demandNotices.filter(n => n.status === 'SUBMITTED');

    const stats = [
        { label: "Active Licenses", value: paidNotices.length, icon: FaFileContract, color: "text-green-600", bg: "bg-green-100 dark:bg-green-900/30" },
        { label: "Pending Verification", value: submittedNotices.length, icon: FaClock, color: "text-yellow-600", bg: "bg-yellow-100 dark:bg-yellow-900/30" },
        { label: "Verified & Ready", value: verifiedNotices.length, icon: FaCheckCircle, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/30" },
    ];

    const filteredNotices = demandNotices.filter(notice =>
        notice.business_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notice.notice_number?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'PAID': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'VERIFIED': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            case 'SUBMITTED': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'REJECTED': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    const getStatusLabel = (status) => {
        const labels = { 'PAID': 'Active', 'VERIFIED': 'Verified & Ready', 'SUBMITTED': 'Under Review', 'REJECTED': 'Rejected' };
        return labels[status] || status;
    };

    const handlePayment = (notice) => {
        if (notice.status !== 'VERIFIED') {
            Swal.fire({ icon: 'warning', title: 'Cannot Pay', text: 'Your demand notice must be verified before payment.', confirmButtonColor: '#0958d9' });
            return;
        }
        navigate('/citizen/payments/checkout', { state: { type: 'BUSINESS_LICENSE', title: 'Business License', noticeId: notice.id } });
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto transition-colors duration-300">
            {/* Header */}
            <header className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Licenses & Permits</h1>
                    <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-300">Manage your business licenses and municipal permits.</p>
                </div>
                <div className="flex flex-col xs:flex-row gap-3">
                    <Button onClick={() => navigate('/citizen/permits/business/create')} variant="outline" className="flex items-center justify-center gap-2">
                        <FaPlusCircle /> Register Business
                    </Button>
                    <Button onClick={() => navigate('/citizen/permits/license-request')} className="flex items-center justify-center gap-2">
                        <FaFileContract /> Request License
                    </Button>
                </div>
            </header>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
                {stats.map((stat, index) => (
                    <Card key={index} className="p-5 sm:p-6 flex items-center gap-4 hover:shadow-md transition-shadow duration-200">
                        <div className={`p-3 sm:p-4 rounded-full ${stat.bg} ${stat.color} text-xl sm:text-2xl shrink-0 transition-colors duration-300`}>
                            <stat.icon />
                        </div>
                        <div>
                            <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-medium transition-colors duration-300">{stat.label}</p>
                            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">{stat.value}</h3>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* Left: Licenses */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 transition-colors duration-300">
                                <FaFileContract className="text-primary" /> My Business Licenses
                            </h3>
                            <div className="sm:w-64">
                                <Input
                                    placeholder="Search licenses..."
                                    icon={FaSearch}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {loading ? (
                            <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                                <FaSpinner className="inline text-3xl animate-spin mb-3 text-primary" />
                                <p className="text-sm">Loading your business licenses...</p>
                            </div>
                        ) : filteredNotices.length > 0 ? (
                            <div className="overflow-x-auto rounded-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                                <table className="w-full text-left min-w-[500px]">
                                    <thead className="bg-gray-50 dark:bg-gray-800/60 transition-colors duration-300">
                                        <tr>
                                            {['Notice ID', 'Business', 'Year', 'Amount Due', 'Status', 'Action'].map(col => (
                                                <th key={col} className="p-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{col}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700 transition-colors duration-300">
                                        {filteredNotices.map((notice) => (
                                            <tr key={notice.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors duration-200">
                                                <td className="p-3 text-sm font-mono font-medium text-gray-900 dark:text-white transition-colors duration-300">{notice.notice_number}</td>
                                                <td className="p-3 text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">{notice.business_name}</td>
                                                <td className="p-3 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">{notice.license_year}</td>
                                                <td className="p-3 text-sm font-semibold text-gray-900 dark:text-white transition-colors duration-300">Le {Number(notice.amount_due).toLocaleString()}</td>
                                                <td className="p-3">
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusColor(notice.status)}`}>
                                                        {getStatusLabel(notice.status)}
                                                    </span>
                                                </td>
                                                <td className="p-3">
                                                    {notice.status === 'VERIFIED' ? (
                                                        <Button variant="outline" size="sm" onClick={() => handlePayment(notice)}>Pay Now</Button>
                                                    ) : (
                                                        <Button variant="outline" size="sm" onClick={() => navigate(`/citizen/permits/license/${notice.id}`)}>View</Button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-10 bg-gray-50 dark:bg-gray-800/30 rounded-xl transition-colors duration-300">
                                <FaFileContract className="text-4xl text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                                <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">No business licenses found</p>
                                <Button onClick={() => navigate('/citizen/permits/business/create')}>Register a Business</Button>
                            </div>
                        )}
                    </Card>

                    {/* Status Overview */}
                    {demandNotices.length > 0 && (
                        <Card className="p-4 sm:p-6">
                            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2 transition-colors duration-300">
                                <FaHistory className="text-gray-400 dark:text-gray-500" /> License Status Overview
                            </h3>
                            <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
                                <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl transition-colors duration-300">
                                    <p className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">{submittedNotices.length}</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-300">Pending Verification</p>
                                </div>
                                <div className="p-3 sm:p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl transition-colors duration-300">
                                    <p className="text-xl sm:text-2xl font-bold text-yellow-600 dark:text-yellow-400">{verifiedNotices.length}</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-300">Ready to Pay</p>
                                </div>
                                <div className="p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 rounded-xl transition-colors duration-300">
                                    <p className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">{paidNotices.length}</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-300">Licenses Paid</p>
                                </div>
                            </div>
                        </Card>
                    )}
                </div>

                {/* Right: Help Sidebar */}
                <div className="space-y-6">
                    <Card className="p-5 sm:p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 transition-colors duration-300">
                        <h3 className="font-bold text-base sm:text-lg text-blue-900 dark:text-blue-200 mb-2 transition-colors duration-300">Need Help?</h3>
                        <p className="text-sm text-blue-700 dark:text-blue-300 mb-4 transition-colors duration-300">
                            Ensure you have all required documents scanned before applying.
                        </p>
                        <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-2 mb-5 transition-colors duration-300">
                            {['Valid ID Card', 'Business Registration', 'Tax Clearance', 'Property Deeds/Lease'].map(item => (
                                <li key={item} className="flex items-center gap-2">
                                    <FaCheckCircle className="shrink-0 text-blue-500 dark:text-blue-400" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Button variant="outline" className="w-full border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-colors duration-200">
                            Download Checklist
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PermitDashboard;
