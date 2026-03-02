import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaStore, FaPlusCircle, FaSearch, FaEdit, FaTrash, FaSpinner } from 'react-icons/fa';
import Card from '../../../components/UI/Card';
import Button from '../../../components/UI/Button';
import Input from '../../../components/UI/Input';
import { getUserBusinesses, deleteBusiness } from '../../../services/paymentService';
import Swal from 'sweetalert2';

const BusinessDashboard = () => {
    const navigate = useNavigate();
    
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                setLoading(true);
                const data = await getUserBusinesses();
                setBusinesses(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error('Error fetching businesses:', err);
                Swal.fire({
                    icon: 'warning',
                    title: 'Info',
                    text: 'Failed to load your businesses. You can still create a new one.',
                    confirmButtonColor: '#0958d9'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchBusinesses();
    }, []);

    const filteredBusinesses = businesses.filter(b =>
        b.business_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (businessId) => {
        const result = await Swal.fire({
            title: 'Delete Business?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#0958d9',
            confirmButtonText: 'Yes, delete it'
        });

        if (result.isConfirmed) {
            try {
                await deleteBusiness(businessId);
                setBusinesses(businesses.filter(b => b.id !== businessId));
                Swal.fire('Deleted!', 'Business has been deleted.', 'success');
            } catch (err) {
                Swal.fire('Error', 'Failed to delete business.', 'error');
            }
        }
    };

    const getCategoryLabel = (category) => {
        const labels = {
            'CONSUMER_STAPLE': 'Consumer Staple',
            'INDUSTRY_SERVICES': 'Industry / Services',
            'FINANCIAL_SERVICES': 'Financial Services',
            'HEALTH_EDUCATION': 'Health / Education',
            'HOSPITALITY': 'Hospitality',
            'OTHER': 'Other'
        };
        return labels[category] || category;
    };

    return (
        <div className="p-8">
            <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">My Businesses</h1>
                    <p className="text-gray-500">Register and manage your businesses to apply for licenses.</p>
                </div>
                <Button onClick={() => navigate('/citizen/permits/business/create')} className="flex items-center gap-2">
                    <FaPlusCircle /> Register New Business
                </Button>
            </header>

            {loading ? (
                <Card className="p-8 text-center">
                    <FaSpinner className="text-4xl text-primary animate-spin mx-auto mb-3" />
                    <p className="text-gray-600">Loading your businesses...</p>
                </Card>
            ) : filteredBusinesses.length > 0 ? (
                <Card className="p-6">
                    <div className="mb-6">
                        <Input
                            placeholder="Search businesses..."
                            icon={FaSearch}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="p-3 text-xs font-medium text-gray-500 uppercase">Business Name</th>
                                    <th className="p-3 text-xs font-medium text-gray-500 uppercase">Category</th>
                                    <th className="p-3 text-xs font-medium text-gray-500 uppercase">Location</th>
                                    <th className="p-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="p-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredBusinesses.map((business) => (
                                    <tr key={business.id} className="hover:bg-gray-50">
                                        <td className="p-3 text-sm font-medium text-gray-900 flex items-center gap-2">
                                            <FaStore className="text-primary" />
                                            {business.business_name}
                                        </td>
                                        <td className="p-3 text-sm text-gray-600">{getCategoryLabel(business.category)}</td>
                                        <td className="p-3 text-sm text-gray-500">{business.address || 'Not specified'}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${business.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                                {business.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="p-3 flex gap-2">
                                            <Button 
                                                variant="outline" 
                                                size="sm"
                                                onClick={() => navigate(`/citizen/permits/business/${business.id}/edit`)}
                                            >
                                                <FaEdit /> Edit
                                            </Button>
                                            <Button 
                                                variant="outline" 
                                                size="sm"
                                                onClick={() => handleDelete(business.id)}
                                                className="text-red-600 border-red-200"
                                            >
                                                <FaTrash />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            ) : (
                <Card className="p-12 text-center">
                    <FaStore className="text-6xl text-gray-300 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-900 mb-2">No Businesses Registered</h2>
                    <p className="text-gray-600 mb-6">Register your first business to apply for licenses.</p>
                    <Button onClick={() => navigate('/citizen/permits/business/create')} className="inline-flex items-center gap-2">
                        <FaPlusCircle /> Register Business
                    </Button>
                </Card>
            )}
        </div>
    );
};

export default BusinessDashboard;
