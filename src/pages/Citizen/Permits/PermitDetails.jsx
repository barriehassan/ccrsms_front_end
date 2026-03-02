import { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPrint, FaDownload, FaCheckCircle, FaMapMarkerAlt } from 'react-icons/fa';
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

    const handlePrint = () => window.print();

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto transition-colors duration-300">
            {/* Back button */}
            <Button
                variant="ghost"
                onClick={() => navigate('/citizen/permits')}
                className="mb-6 pl-0 hover:bg-transparent hover:underline flex items-center gap-2 text-gray-600 dark:text-gray-400 transition-colors duration-300 print:hidden"
            >
                <FaArrowLeft /> Back to Permits
            </Button>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* ─── Certificate Card ─── */}
                <div
                    ref={certificateRef}
                    className="flex-1 relative bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-2xl border-4 border-double border-gray-200 dark:border-gray-700 transition-colors duration-300 print:shadow-none print:border-4"
                >
                    {/* Watermark */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none select-none overflow-hidden">
                        <span className="text-9xl font-black text-gray-800 dark:text-gray-200 -rotate-45 scale-150">VALID</span>
                    </div>

                    {/* Header */}
                    <div className="text-center border-b-2 border-primary pb-6 mb-6">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary text-white rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-4 shadow-md">
                            SL
                        </div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-widest transition-colors duration-300">
                            Freetown City Council
                        </h1>
                        <h2 className="text-lg sm:text-xl font-bold text-primary mt-2 uppercase">{permit.type}</h2>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-300">
                            Pursuant to the Local Government Act of Sierra Leone
                        </p>
                    </div>

                    {/* Body */}
                    <div className="space-y-5 text-center">
                        <div className="inline-block bg-green-50 dark:bg-green-900/20 px-4 py-1.5 rounded-full text-green-700 dark:text-green-400 font-bold border border-green-200 dark:border-green-700 text-sm transition-colors duration-300">
                            Status: {permit.status}
                        </div>

                        <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors duration-300">This is to certify that</p>
                        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white transition-colors duration-300">
                            {permit.businessName}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300">
                            Owned by <strong className="text-gray-800 dark:text-gray-200">{permit.owner}</strong>
                        </p>

                        {/* Details grid */}
                        <div className="grid grid-cols-2 gap-4 text-left bg-gray-50 dark:bg-gray-800/50 p-4 sm:p-6 rounded-xl border border-gray-100 dark:border-gray-700 mt-4 transition-colors duration-300">
                            <div>
                                <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">License Number</p>
                                <p className="font-mono font-bold text-sm sm:text-base text-gray-900 dark:text-white transition-colors duration-300">{permit.id}</p>
                            </div>
                            <div>
                                <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">Location</p>
                                <p className="font-medium text-sm flex items-start gap-1 text-gray-700 dark:text-gray-300 transition-colors duration-300">
                                    <FaMapMarkerAlt className="text-gray-400 dark:text-gray-500 shrink-0 mt-0.5" />
                                    {permit.address}
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">Issue Date</p>
                                <p className="font-medium text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">{permit.issueDate}</p>
                            </div>
                            <div>
                                <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">Expiry Date</p>
                                <p className="font-bold text-sm text-red-500 dark:text-red-400">{permit.expiryDate}</p>
                            </div>
                        </div>
                    </div>

                    {/* Certificate Footer */}
                    <div className="mt-10 flex items-end justify-between border-t border-gray-200 dark:border-gray-700 pt-6 transition-colors duration-300">
                        <div className="text-center">
                            <img src={permit.qrCode} alt="QR Code" className="w-20 h-20 sm:w-24 sm:h-24 mb-2 border border-gray-200 dark:border-gray-600 p-1 rounded" />
                            <p className="text-xs text-gray-400 dark:text-gray-500 transition-colors duration-300">Scan to Verify</p>
                        </div>
                        <div className="text-center w-36 sm:w-40">
                            <div className="border-b border-gray-400 dark:border-gray-600 mb-2 h-10 transition-colors duration-300" />
                            <p className="text-xs font-bold uppercase text-gray-700 dark:text-gray-300 tracking-wider transition-colors duration-300">Chief Administrator</p>
                        </div>
                    </div>
                </div>

                {/* ─── Sidebar ─── */}
                <div className="w-full lg:w-64 space-y-4 print:hidden">
                    {/* Actions */}
                    <Card className="p-4 sm:p-6">
                        <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white mb-4 transition-colors duration-300">Actions</h3>
                        <div className="space-y-3">
                            <Button className="w-full flex items-center justify-center gap-2" onClick={handlePrint}>
                                <FaPrint /> Print Permit
                            </Button>
                            <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                                <FaDownload /> Download PDF
                            </Button>
                        </div>
                    </Card>

                    {/* Renewal Notice */}
                    <Card className="p-4 sm:p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 transition-colors duration-300">
                        <h3 className="font-bold text-yellow-800 dark:text-yellow-300 mb-2 transition-colors duration-300">Renewal Notice</h3>
                        <p className="text-sm text-yellow-700 dark:text-yellow-400 transition-colors duration-300">
                            This permit expires in <strong>25 days</strong>. Renew now to avoid penalties.
                        </p>
                        <Button
                            size="sm"
                            className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 border-transparent text-white"
                        >
                            Renew Now
                        </Button>
                    </Card>

                    {/* Verification status */}
                    <Card className="p-4 sm:p-6 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 transition-colors duration-300">
                        <div className="flex items-center gap-3">
                            <FaCheckCircle className="text-green-500 dark:text-green-400 text-xl shrink-0" />
                            <div>
                                <p className="text-sm font-bold text-green-800 dark:text-green-300 transition-colors duration-300">Verified License</p>
                                <p className="text-xs text-green-700 dark:text-green-400 transition-colors duration-300">This license has been officially verified by the FCC registry.</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PermitDetails;
