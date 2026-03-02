import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import Card from '../../../components/UI/Card';
import Button from '../../../components/UI/Button';
import Input from '../../../components/UI/Input';
import { createBusiness, getBusinessDetail, updateBusiness } from '../../../services/paymentService';
import Swal from 'sweetalert2';

const CreateBusiness = () => {
    const navigate = useNavigate();
    const { businessId } = useParams();
    
    const [loading, setLoading] = useState(!!businessId);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        business_name: '',
        category: '',
        address: '',
        national_reg_number: ''
    });

    const categories = [
        { value: 'CONSUMER_STAPLE', label: 'Consumer Staple' },
        { value: 'INDUSTRY_SERVICES', label: 'Industry / Services' },
        { value: 'FINANCIAL_SERVICES', label: 'Financial Services' },
        { value: 'HEALTH_EDUCATION', label: 'Health / Education' },
        { value: 'HOSPITALITY', label: 'Hospitality' },
        { value: 'OTHER', label: 'Other' }
    ];

    useEffect(() => {
        if (businessId) {
            const fetchBusiness = async () => {
                try {
                    const data = await getBusinessDetail(businessId);
                    setFormData({
                        business_name: data.business_name || '',
                        category: data.category || '',
                        address: data.address || '',
                        national_reg_number: data.national_reg_number || ''
                    });
                } catch (err) {
                    Swal.fire('Error', 'Failed to load business details.', 'error');
                    navigate('/citizen/permits/businesses');
                } finally {
                    setLoading(false);
                }
            };
            fetchBusiness();
        }
    }, [businessId, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.business_name.trim()) {
            Swal.fire('Validation Error', 'Please enter a business name.', 'warning');
            return;
        }

        if (!formData.category) {
            Swal.fire('Validation Error', 'Please select a business category.', 'warning');
            return;
        }

        setSaving(true);
        try {
            if (businessId) {
                await updateBusiness(businessId, formData);
                Swal.fire('Success', 'Business updated successfully.', 'success');
            } else {
                await createBusiness(formData);
                Swal.fire({
                    icon: 'success',
                    title: 'Business Registered!',
                    text: 'Your business has been registered. You can now apply for licenses.',
                    confirmButtonColor: '#0958d9'
                });
            }
            navigate('/citizen/permits/businesses');
        } catch (err) {
            const errMsg = err.response?.data?.detail || err.response?.data?.error || 'Failed to save business.';
            Swal.fire('Error', errMsg, 'error');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center min-h-screen">
                <Card className="p-8 text-center">
                    <div className="spinner"></div>
                    <p className="text-gray-600 mt-4">Loading business details...</p>
                </Card>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <Button 
                variant="ghost" 
                onClick={() => navigate('/citizen/permits/businesses')} 
                className="mb-6 pl-0 hover:bg-transparent hover:underline flex items-center gap-2"
            >
                <FaArrowLeft /> Back to Businesses
            </Button>

            <Card className="p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                    {businessId ? 'Edit Business' : 'Register New Business'}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Business Name *
                        </label>
                        <input
                            type="text"
                            name="business_name"
                            value={formData.business_name}
                            onChange={handleChange}
                            placeholder="e.g. Krio Kitchen Restaurant"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Business Category *
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        >
                            <option value="">Select a category...</option>
                            {categories.map(cat => (
                                <option key={cat.value} value={cat.value}>
                                    {cat.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Business Address
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="e.g. 123 Main Street, Freetown"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            National Registration Number (OARG)
                        </label>
                        <input
                            type="text"
                            name="national_reg_number"
                            value={formData.national_reg_number}
                            onChange={handleChange}
                            placeholder="e.g. SLE-2024-001234"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <p className="text-xs text-gray-500 mt-1">Optional: You can add this later</p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-700">
                            <strong>Note:</strong> After registering this business, you'll be able to apply for a business license for it.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <Button 
                            type="submit" 
                            className="flex-1 flex items-center justify-center gap-2"
                            disabled={saving}
                        >
                            <FaSave /> {saving ? 'Saving...' : 'Save Business'}
                        </Button>
                        <Button 
                            type="button"
                            variant="outline"
                            className="flex-1"
                            onClick={() => navigate('/citizen/permits/businesses')}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default CreateBusiness;
