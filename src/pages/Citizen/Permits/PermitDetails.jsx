import { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPrint, FaDownload, FaCheckCircle, FaBuilding, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import Button from '../../../components/UI/Button';
import Card from '../../../components/UI/Card';

const PermitDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const certificateRef = useRef();

    // Mock data
    const permit = {
        id: id || "PMT-2023-001",
        type: "Business License",
        businessName: "Krio Kitchen",
        owner: "Mariama Sesay",
        address: "12 Campbell Street, Freetown",
        issueDate: "01 Jan 2024",
        expiryDate: "31 Dec 2024",
        status: "Active",
        qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=CCRSMS-PMT-2023-001"
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <Button variant="ghost" onClick={() => navigate('/citizen/permits')} className="mb-6 pl-0 hover:bg-transparent hover:underline flex items-center gap-2 print:hidden">
                <FaArrowLeft /> Back to Permits
            </Button>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Certificate Preview */}
                <div className="flex-1 bg-white p-8 shadow-2xl border-8 border-double border-gray-200 relative print:shadow-none print:border-4 print:w-full" ref={certificateRef}>
                    {/* Watermark */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none overflow-hidden">
                        <span className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-500 -rotate-45 transform scale-150">
                            VALID
                        </span>
                    </div>

                    {/* Header */}
                    <div className="text-center border-b-2 border-primary pb-6 mb-6">
                        <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                            SL
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-widest">Freetown City Council</h1>
                        <h2 className="text-xl font-bold text-primary mt-2 uppercase">{permit.type}</h2>
                        <p className="text-sm text-gray-500 mt-1">Pursuant to the Local Government Act of Sierra Leone</p>
                    </div>

                    {/* Content */}
                    <div className="space-y-6 text-center">
                        <div className="bg-green-50 inline-block px-4 py-1 rounded-full text-green-700 font-bold border border-green-200">
                            Status: {permit.status}
                        </div>

                        <p className="text-gray-600">This is to certify that</p>
                        <h3 className="text-3xl font-serif font-bold text-gray-900">{permit.businessName}</h3>
                        <p className="text-gray-600">Owned by <strong>{permit.owner}</strong></p>

                        <div className="grid grid-cols-2 gap-4 text-left bg-gray-50 p-6 rounded-lg border border-gray-100 mt-6">
                            <div>
                                <p className="text-xs text-gray-500 uppercase">License Number</p>
                                <p className="font-mono font-bold text-lg">{permit.id}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase">Location</p>
                                <p className="font-medium flex items-center gap-1"><FaMapMarkerAlt className="text-gray-400" /> {permit.address}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase">Issue Date</p>
                                <p className="font-medium">{permit.issueDate}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase">Expiry Date</p>
                                <p className="font-bold text-red-600">{permit.expiryDate}</p>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-12 flex justify-between items-end border-t border-gray-200 pt-6">
                        <div className="text-center">
                            <img src={permit.qrCode} alt="QR Code" className="w-24 h-24 mb-2 border p-1" />
                            <p className="text-xs text-gray-400">Scan to Verify</p>
                        </div>
                        <div className="text-center w-40">
                            <div className="border-b border-gray-400 mb-2 h-10"></div>
                            <p className="text-xs font-bold uppercase text-gray-900">Chief Administrator</p>
                        </div>
                    </div>
                </div>

                {/* Sidebar Actions */}
                <div className="w-full md:w-64 space-y-6 print:hidden">
                    <Card className="p-6">
                        <h3 className="font-bold text-lg mb-4">Actions</h3>
                        <div className="space-y-3">
                            <Button className="w-full flex items-center justify-center gap-2" onClick={handlePrint}>
                                <FaPrint /> Print Permit
                            </Button>
                            <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                                <FaDownload /> Download PDF
                            </Button>
                        </div>
                    </Card>

                    <Card className="p-6 bg-yellow-50 border-l-4 border-yellow-400">
                        <h3 className="font-bold text-yellow-800 mb-2">Renewal Notice</h3>
                        <p className="text-sm text-yellow-700">
                            This permit expires in <strong>25 days</strong>. You can renew it now to avoid penalties.
                        </p>
                        <Button size="sm" className="mt-4 w-full bg-yellow-600 hover:bg-yellow-700 border-transparent text-white">
                            Renew Now
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PermitDetails;
