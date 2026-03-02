import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStore, FaBuilding, FaGlassCheers, FaArrowLeft, FaCheck, FaFileUpload } from 'react-icons/fa';
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
        if (file) setFiles(prev => ({ ...prev, [field]: file.name }));
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
            }).then(() => navigate('/citizen/permits'));
        }, 2000);
    };

    const stepLabels = ['Select Type', 'Business Info', 'Documents'];

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto transition-colors duration-300">
            {/* Back Button */}
            <Button
                variant="ghost"
                onClick={() => navigate('/citizen/permits')}
                className="mb-6 pl-0 hover:bg-transparent hover:underline flex items-center gap-2 text-gray-600 dark:text-gray-400 transition-colors duration-300"
            >
                <FaArrowLeft /> Back to Permits
            </Button>

            <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-300">Apply for a Permit</h1>
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 transition-colors duration-300">Complete the steps below to submit your application.</p>
            </div>

            {/* Stepper */}
            <div className="flex items-center mb-8 sm:mb-10 w-full">
                {stepLabels.map((label, i) => {
                    const stepNum = i + 1;
                    const isActive = step >= stepNum;
                    const isCompleted = step > stepNum;
                    return (
                        <div key={label} className="flex items-center flex-1">
                            <div className="flex flex-col items-center">
                                <div className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full font-bold text-sm transition-all duration-300 ${isActive ? 'bg-primary text-white shadow-md shadow-primary/30' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                                    }`}>
                                    {isCompleted ? <FaCheck className="text-xs" /> : stepNum}
                                </div>
                                <span className={`text-[10px] sm:text-xs mt-1 font-medium whitespace-nowrap transition-colors duration-300 ${isActive ? 'text-primary' : 'text-gray-400 dark:text-gray-500'}`}>
                                    {label}
                                </span>
                            </div>
                            {i < stepLabels.length - 1 && (
                                <div className={`flex-1 h-1 mx-2 mb-4 rounded-full transition-all duration-300 ${step > stepNum ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`} />
                            )}
                        </div>
                    );
                })}
            </div>

            <Card className="p-5 sm:p-8">
                {/* Step 1: Select Type */}
                {step === 1 && (
                    <div>
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">Select Permit Type</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                            {permitTypes.map((type) => (
                                <div
                                    key={type.id}
                                    onClick={() => setSelectedType(type.id)}
                                    className={`cursor-pointer border-2 rounded-xl p-5 sm:p-6 flex flex-col items-center text-center hover:shadow-lg transition-all duration-200 ${selectedType === type.id
                                            ? 'border-primary bg-blue-50 dark:bg-blue-900/20 shadow-md shadow-primary/20'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 bg-white dark:bg-dark-card'
                                        }`}
                                >
                                    <type.icon className={`text-3xl sm:text-4xl mb-3 sm:mb-4 transition-colors duration-200 ${selectedType === type.id ? 'text-primary' : 'text-gray-400 dark:text-gray-500'}`} />
                                    <h3 className={`font-bold text-sm sm:text-base transition-colors duration-200 ${selectedType === type.id ? 'text-primary' : 'text-gray-900 dark:text-white'}`}>{type.label}</h3>
                                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2 transition-colors duration-300">{type.desc}</p>
                                    {selectedType === type.id && <FaCheck className="mt-3 sm:mt-4 text-green-500" />}
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 sm:mt-8 flex justify-end">
                            <Button disabled={!selectedType} onClick={() => setStep(2)}>Next Step →</Button>
                        </div>
                    </div>
                )}

                {/* Step 2: Business Info */}
                {step === 2 && (
                    <div>
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">Business Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                            <Input label="Business Name" placeholder="e.g. Krio Kitchen" />
                            <Input label="Registration Number" placeholder="REG-123456" />
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 transition-colors duration-300">Business Address</label>
                                <textarea
                                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                                    rows="3"
                                    placeholder="Enter full business address..."
                                />
                            </div>
                            <Input label="Business Phone" placeholder="+232..." />
                            <Input label="Email Address" type="email" placeholder="contact@business.com" />
                        </div>
                        <div className="mt-6 sm:mt-8 flex justify-between">
                            <Button variant="outline" onClick={() => setStep(1)}>← Back</Button>
                            <Button onClick={() => setStep(3)}>Next Step →</Button>
                        </div>
                    </div>
                )}

                {/* Step 3: Documents */}
                {step === 3 && (
                    <div>
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">Upload Documents</h2>
                        <div className="space-y-4 sm:space-y-5">
                            {['Business Registration Certificate', 'Tax Clearance Certificate', 'Identification Document (NIN/Passport)'].map((doc, i) => (
                                <div
                                    key={i}
                                    className="border border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/40 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors duration-300"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="bg-white dark:bg-gray-700 p-3 rounded-full text-gray-400 dark:text-gray-500 shadow-sm shrink-0">
                                            <FaFileUpload />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base transition-colors duration-300">{doc}</h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">PDF, JPG or PNG (Max 5MB)</p>
                                        </div>
                                    </div>
                                    {files[`doc_${i}`] ? (
                                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-full text-sm font-medium self-end sm:self-auto whitespace-nowrap">
                                            <FaCheck className="shrink-0" /> {files[`doc_${i}`]}
                                        </div>
                                    ) : (
                                        <label className="cursor-pointer self-end sm:self-auto">
                                            <span className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600 shadow-sm transition-colors duration-200 whitespace-nowrap">
                                                Select File
                                            </span>
                                            <input type="file" className="hidden" onChange={(e) => handleFileChange(e, `doc_${i}`)} />
                                        </label>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 sm:mt-8 flex justify-between">
                            <Button variant="outline" onClick={() => setStep(2)}>← Back</Button>
                            <Button onClick={handleSubmit}>Submit Application</Button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default ApplyPermit;
