import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStore, FaBuilding, FaGlassCheers, FaArrowLeft, FaCheck, FaFileUpload, FaTrash } from 'react-icons/fa';
import Card from '../../../components/UI/Card';
import Button from '../../../components/UI/Button';
import Input from '../../../components/UI/Input';
import Swal from 'sweetalert2';

const ApplyPermit = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [selectedType, setSelectedType] = useState(null);
    const [files, setFiles] = useState({});

    const permitTypes = [
        { id: 'business', label: 'Business License', icon: FaStore, desc: 'General license for retail and services.' },
        { id: 'construction', label: 'Construction Permit', icon: FaBuilding, desc: 'For new builds and major renovations.' },
        { id: 'liquor', label: 'Liquor License', icon: FaGlassCheers, desc: 'For selling alcohol in any establishment.' },
    ];

    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        if (file) {
            setFiles(prev => ({ ...prev, [field]: file.name }));
        }
    };

    const handleSubmit = () => {
        Swal.fire({
            title: 'Submitting Application...',
            text: 'Please wait while we process your documents.',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });

        setTimeout(() => {
            Swal.fire({
                icon: 'success',
                title: 'Application Submitted!',
                text: 'Your application ID is APP-2023-NEW. You can track status on the dashboard.',
                confirmButtonColor: '#0958d9'
            }).then(() => {
                navigate('/citizen/permits');
            });
        }, 2000);
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <Button variant="ghost" onClick={() => navigate('/citizen/permits')} className="mb-6 pl-0 hover:bg-transparent hover:underline flex items-center gap-2">
                <FaArrowLeft /> Back to Permits
            </Button>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Apply for a Permit</h1>
                <p className="text-gray-500">Complete the steps below to submit your application.</p>
            </div>

            {/* Stepper */}
            <div className="flex items-center mb-10 w-full">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-colors ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
                <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-colors ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
                <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-colors ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
            </div>

            <Card className="p-8">
                {/* Step 1: Select Type */}
                {step === 1 && (
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Select Permit Type</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {permitTypes.map((type) => (
                                <div
                                    key={type.id}
                                    onClick={() => setSelectedType(type.id)}
                                    className={`cursor-pointer border-2 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-all ${selectedType === type.id ? 'border-primary bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                                >
                                    <type.icon className={`text-4xl mb-4 ${selectedType === type.id ? 'text-primary' : 'text-gray-400'}`} />
                                    <h3 className="font-bold text-gray-900">{type.label}</h3>
                                    <p className="text-sm text-gray-500 mt-2">{type.desc}</p>
                                    {selectedType === type.id && <FaCheck className="mt-4 text-green-500" />}
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 flex justify-end">
                            <Button disabled={!selectedType} onClick={() => setStep(2)}>Next Step</Button>
                        </div>
                    </div>
                )}

                {/* Step 2: Business Info */}
                {step === 2 && (
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Business Information</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <Input label="Business Name" placeholder="e.g. Krio Kitchen" />
                            <Input label="Registration Number" placeholder="REG-123456" />
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Business Address</label>
                                <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" rows="3" placeholder="Enter full address..."></textarea>
                            </div>
                            <Input label="Business Phone" placeholder="+232..." />
                            <Input label="Email Address" type="email" placeholder="contact@business.com" />
                        </div>
                        <div className="mt-8 flex justify-between">
                            <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                            <Button onClick={() => setStep(3)}>Next Step</Button>
                        </div>
                    </div>
                )}

                {/* Step 3: Documents */}
                {step === 3 && (
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Upload Documents</h2>
                        <div className="space-y-6">
                            {['Business Registration Certificate', 'Tax Clearance Certificate', 'Identification Document (NIN/Passport)'].map((doc, i) => (
                                <div key={i} className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-gray-100 p-3 rounded-full text-gray-500">
                                            <FaFileUpload />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800">{doc}</h4>
                                            <p className="text-xs text-gray-500">PDF, JPG or PNG (Max 5MB)</p>
                                        </div>
                                    </div>
                                    {files[`doc_${i}`] ? (
                                        <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm">
                                            <FaCheck /> {files[`doc_${i}`]}
                                        </div>
                                    ) : (
                                        <label className="cursor-pointer">
                                            <span className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 shadow-sm">
                                                Select File
                                            </span>
                                            <input type="file" className="hidden" onChange={(e) => handleFileChange(e, `doc_${i}`)} />
                                        </label>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 flex justify-between">
                            <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                            <Button onClick={handleSubmit}>Submit Application</Button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default ApplyPermit;
