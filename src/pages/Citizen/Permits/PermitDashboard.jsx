import { useNavigate } from 'react-router-dom';
import { FaFileContract, FaPlusCircle, FaSearch, FaHistory, FaCheckCircle, FaClock, FaTimesCircle, FaEye } from 'react-icons/fa';
import Card from '../../../components/UI/Card';
import Button from '../../../components/UI/Button';
import Input from '../../../components/UI/Input';

const PermitDashboard = () => {
    const navigate = useNavigate();

    const stats = [
        { label: "Active Permits", value: "2", icon: FaFileContract, color: "text-green-600", bg: "bg-green-100" },
        { label: "Pending Applications", value: "1", icon: FaClock, color: "text-yellow-600", bg: "bg-yellow-100" },
        { label: "Expiring Soon", value: "0", icon: FaHistory, color: "text-red-600", bg: "bg-red-100" },
    ];

    const permits = [
        { id: "PMT-2023-001", type: "Business License", businessName: "Krio Kitchen", status: "Active", expiry: "31 Dec 2024" },
        { id: "PMT-2023-089", type: "Market Stall Permit", businessName: "Stall #45 - Central Market", status: "Expiring Soon", expiry: "15 Jan 2024" },
    ];

    const applications = [
        { id: "APP-2023-112", type: "Construction Permit", date: "10 Dec 2023", status: "Under Review" },
        { id: "APP-2023-055", type: "Liquor License", date: "01 Nov 2023", status: "Rejected" },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-700';
            case 'Expiring Soon': return 'bg-yellow-100 text-yellow-700';
            case 'Under Review': return 'bg-blue-100 text-blue-700';
            case 'Rejected': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="p-8">
            <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Licenses & Permits</h1>
                    <p className="text-gray-500">Manage your business licenses and municipal permits.</p>
                </div>
                <Button onClick={() => navigate('/citizen/permits/apply')} className="flex items-center gap-2">
                    <FaPlusCircle /> Apply for New Permit
                </Button>
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
                                <FaFileContract className="text-primary" /> My Active Permits
                            </h3>
                            <div className="md:w-64">
                                <Input placeholder="Search permits..." icon={FaSearch} />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="p-3 text-xs font-medium text-gray-500 uppercase">Permit ID</th>
                                        <th className="p-3 text-xs font-medium text-gray-500 uppercase">Type</th>
                                        <th className="p-3 text-xs font-medium text-gray-500 uppercase">Entity</th>
                                        <th className="p-3 text-xs font-medium text-gray-500 uppercase">Expiry</th>
                                        <th className="p-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="p-3 text-xs font-medium text-gray-500 uppercase">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {permits.map((permit) => (
                                        <tr key={permit.id} className="hover:bg-gray-50">
                                            <td className="p-3 text-sm font-medium text-gray-900">{permit.id}</td>
                                            <td className="p-3 text-sm text-gray-600">{permit.type}</td>
                                            <td className="p-3 text-sm text-gray-500">{permit.businessName}</td>
                                            <td className="p-3 text-sm text-gray-500">{permit.expiry}</td>
                                            <td className="p-3">
                                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(permit.status)}`}>
                                                    {permit.status}
                                                </span>
                                            </td>
                                            <td className="p-3">
                                                <Button variant="outline" size="sm" onClick={() => navigate(`/citizen/permits/${permit.id}`)}>
                                                    View
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>

                    {/* Recent Applications */}
                    <Card className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <FaHistory className="text-gray-400" /> Recent Applications
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="p-3 text-xs font-medium text-gray-500 uppercase">App ID</th>
                                        <th className="p-3 text-xs font-medium text-gray-500 uppercase">Type</th>
                                        <th className="p-3 text-xs font-medium text-gray-500 uppercase">Date Submitted</th>
                                        <th className="p-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {applications.map((app) => (
                                        <tr key={app.id} className="hover:bg-gray-50">
                                            <td className="p-3 text-sm font-medium text-gray-900">{app.id}</td>
                                            <td className="p-3 text-sm text-gray-600">{app.type}</td>
                                            <td className="p-3 text-sm text-gray-500">{app.date}</td>
                                            <td className="p-3">
                                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(app.status)}`}>
                                                    {app.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
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
