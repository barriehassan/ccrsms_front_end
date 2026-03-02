import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaFileAlt, FaBuilding } from 'react-icons/fa';
import Card from '../../../components/UI/Card';
import Button from '../../../components/UI/Button';
import Input from '../../../components/UI/Input';
import { getUserBusinesses, createBusinessLicenseNotice } from '../../../services/paymentService';
import Swal from 'sweetalert2';

const CreateLicenseRequest = () => {
    const navigate = useNavigate();
    
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        business: '',
        license_year: new Date().getFullYear(),
        amount_due: 0
    });

    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                setLoading(true);
                const data = await getUserBusinesses();
                setBusinesses(Array.isArray(data) ? data : []);
                if (data.length === 0) {
                    Swal.fire({
                        icon: 'info',
                        title: 'No Businesses Found',
                        text: 'Please register a business first before applying for a license.',
                        confirmButtonColor: '#0958d9'
                    }).then(() => {
                        navigate('/citizen/permits/businesses');
                    });
                }
            } catch (err) {
                Swal.fire('Error', 'Failed to load your businesses.', 'error');
                navigate('/citizen/permits/businesses');
            } finally {
                setLoading(false);
            }
        };

        fetchBusinesses();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'license_year' || name === 'amount_due' ? (value ? parseFloat(value) : 0) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.business) {
            Swal.fire('Validation Error', 'Please select a business.', 'warning');
            return;
        }

        if (!formData.license_year) {
            Swal.fire('Validation Error', 'Please enter a license year.', 'warning');
            return;
        }

        if (formData.amount_due <= 0) {
            Swal.fire('Validation Error', 'Please enter an amount due.', 'warning');
            return;
        }

        setSaving(true);
        try {
            const payload = {
                business: parseInt(formData.business),
                license_year: formData.license_year,
                amount_due: formData.amount_due
            };
            
            await createBusinessLicenseNotice(payload);
            
            Swal.fire({
                icon: 'success',
                title: 'License Request Submitted!',
                text: 'Your license demand notice has been submitted. You can view it in your Licenses & Permits dashboard.',
                confirmButtonColor: '#0958d9'
            }).then(() => {
                navigate('/citizen/permits');
            });
        } catch (err) {
            const errMsg = err.response?.data?.detail || err.response?.data?.error || 'Failed to submit license request.';
            Swal.fire('Error', errMsg, 'error');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center min-h-screen">
                <Card className="p-8 text-center">
                    <p className="text-gray-600">Loading your businesses...</p>
                </Card>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <Button 
                variant="ghost" 
                onClick={() => navigate('/citizen/permits')} 
                className="mb-6 pl-0 hover:bg-transparent hover:underline flex items-center gap-2"
            >
                <FaArrowLeft /> Back to Licenses & Permits
            </Button>

            <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                    <FaFileAlt className="text-3xl text-primary" />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Request Business License</h1>
                        <p className="text-gray-600">Submit your business for license verification</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Business *
                        </label>
                        <select
                            name="business"
                            value={formData.business}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        >
                            <option value="">Choose a business...</option>
                            {businesses.filter(b => b.is_active).map(business => (
                                <option key={business.id} value={business.id}>
                                    {business.business_name} ({business.category})
                                </option>
                            ))}
                        </select>
                        <p className="text-xs text-gray-500 mt-1">Only active businesses can apply for licenses</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            License Year *
                        </label>
                        <input
                            type="number"
                            name="license_year"
                            value={formData.license_year}
                            onChange={handleChange}
                            min={new Date().getFullYear()}
                            max={new Date().getFullYear() + 5}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">The year for which you are applying for the license</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Estimated Amount Due (Le) *
                        </label>
                        <input
                            type="number"
                            name="amount_due"
                            value={formData.amount_due}
                            onChange={handleChange}
                            placeholder="e.g. 500000"
                            min="0"
                            step="0.01"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">The estimated amount you expect to pay for the license</p>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-2">
                        <p className="text-sm font-medium text-yellow-900">
                            <FaBuilding className="inline mr-2" />
                            What happens next?
                        </p>
                        <ol className="text-sm text-yellow-800 space-y-1 list-decimal list-inside">
                            <li>Your request will be submitted for verification</li>
                            <li>FCC staff will review and verify your business details</li>
                            <li>Once verified, you'll be able to pay the license fee online</li>
                            <li>Your license will be issued after successful payment</li>
                        </ol>
                    </div>

                    <div className="flex gap-4">
                        <Button 
                            type="submit" 
                            className="flex-1"
                            disabled={saving || businesses.length === 0}
                        >
                            {saving ? 'Submitting...' : 'Submit License Request'}
                        </Button>
                        <Button 
                            type="button"
                            variant="outline"
                            className="flex-1"
                            onClick={() => navigate('/citizen/permits')}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default CreateLicenseRequest;
