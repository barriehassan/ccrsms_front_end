import { useRef, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPrint, FaDownload, FaCheckCircle, FaBuilding, FaMapMarkerAlt, FaCalendarAlt, FaSpinner } from 'react-icons/fa';
import Button from '../../../components/UI/Button';
import Card from '../../../components/UI/Card';
import { getBusinessLicenseNoticeDetail, getBusinessDetail } from '../../../services/paymentService';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';

const LicenseDetails = () => {
    const { noticeId } = useParams();
    const navigate = useNavigate();
    const certificateRef = useRef();

    const [loading, setLoading] = useState(true);
    const [notice, setNotice] = useState(null);
    const [business, setBusiness] = useState(null);

    useEffect(() => {
        const fetchLicense = async () => {
            try {
                setLoading(true);
                const data = await getBusinessLicenseNoticeDetail(noticeId);
                console.log('License Notice Data:', data);
                setNotice(data);
                
                // Fetch business details to get address
                if (data.business) {
                    try {
                        const businessData = await getBusinessDetail(data.business);
                        console.log('Business Detail Data:', businessData);
                        
                        // Get owner name from logged-in user since they own this license
                        let ownerName = 'Not specified';
                        const storedUser = localStorage.getItem('user');
                        if (storedUser) {
                            const user = JSON.parse(storedUser);
                            if (user.first_name && user.last_name) {
                                ownerName = `${user.first_name} ${user.last_name}`;
                            } else if (user.first_name) {
                                ownerName = user.first_name;
                            } else if (user.username) {
                                ownerName = user.username;
                            }
                        }
                        
                        const address = businessData.address || 'Not specified';
                        
                        setBusiness({
                            name: businessData.business_name || data.business_name,
                            owner: ownerName,
                            address: address,
                            category: businessData.category || 'General'
                        });
                        console.log('Business State Set:', {
                            name: businessData.business_name || data.business_name,
                            owner: ownerName,
                            address: address,
                            category: businessData.category || 'General'
                        });
                    } catch (businessErr) {
                        console.error('Error fetching business details:', businessErr);
                        // Fallback if business details fail
                        setBusiness({
                            name: data.business_name,
                            owner: 'Not specified',
                            address: 'Not specified',
                            category: data.category || 'General'
                        });
                    }
                } else {
                    // No business ID available
                    setBusiness({
                        name: data.business_name,
                        owner: 'Not specified',
                        address: 'Not specified',
                        category: data.category || 'General'
                    });
                }
            } catch (err) {
                console.error('Error fetching license details:', err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to load license details.',
                    confirmButtonColor: '#0958d9'
                }).then(() => {
                    navigate('/citizen/permits');
                });
            } finally {
                setLoading(false);
            }
        };

        fetchLicense();
    }, [noticeId, navigate]);

    const handlePrint = () => {
        window.print();
    };

    const handleDownloadPDF = () => {
        try {
            const pdf = new jsPDF('portrait', 'mm', 'a4');
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const margin = 20;
            const contentWidth = pageWidth - 2 * margin;
            let yPosition = margin;

            // Background color
            pdf.setFillColor(255, 255, 255);
            pdf.rect(0, 0, pageWidth, pageHeight, 'F');

            // Add border
            pdf.setDrawColor(0, 89, 217);
            pdf.setLineWidth(2);
            pdf.rect(margin - 5, margin - 5, contentWidth + 10, pageHeight - 2 * margin + 10);

            // Header
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(16);
            pdf.text('FREETOWN CITY COUNCIL', pageWidth / 2, yPosition, { align: 'center' });
            yPosition += 8;

            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(11);
            pdf.text('Business License Certificate', pageWidth / 2, yPosition, { align: 'center' });
            yPosition += 15;

            // Status
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(10);
            pdf.setTextColor(34, 139, 34);
            pdf.text(`✓ License Active - ${notice.status}`, pageWidth / 2, yPosition, { align: 'center' });
            pdf.setTextColor(0, 0, 0);
            yPosition += 15;

            // Content
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(10);

            // Business Name
            pdf.text('Business Name:', margin, yPosition);
            pdf.setFont('helvetica', 'normal');
            pdf.text(notice.business_name || 'Not specified', margin + 50, yPosition);
            yPosition += 8;

            // Owner
            pdf.setFont('helvetica', 'bold');
            pdf.text('Owner:', margin, yPosition);
            pdf.setFont('helvetica', 'normal');
            pdf.text(business?.owner || 'Not specified', margin + 50, yPosition);
            yPosition += 8;

            // Address
            pdf.setFont('helvetica', 'bold');
            pdf.text('Business Location:', margin, yPosition);
            pdf.setFont('helvetica', 'normal');
            const addressText = pdf.splitTextToSize(business?.address || 'Not specified', contentWidth - 50);
            pdf.text(addressText, margin + 50, yPosition);
            yPosition += (addressText.length * 5) + 3;

            // License Year
            pdf.setFont('helvetica', 'bold');
            pdf.text('License Year:', margin, yPosition);
            pdf.setFont('helvetica', 'normal');
            pdf.text(notice.license_year.toString(), margin + 50, yPosition);
            yPosition += 8;

            // Issue Date
            pdf.setFont('helvetica', 'bold');
            pdf.text('Issue Date:', margin, yPosition);
            pdf.setFont('helvetica', 'normal');
            pdf.text(issueDate, margin + 50, yPosition);
            yPosition += 8;

            // Due Date
            pdf.setFont('helvetica', 'bold');
            pdf.text('Due Date:', margin, yPosition);
            pdf.setFont('helvetica', 'normal');
            pdf.text(expiryDate, margin + 50, yPosition);
            yPosition += 8;

            // Amount Paid
            pdf.setFont('helvetica', 'bold');
            pdf.text('Amount Paid:', margin, yPosition);
            pdf.setFont('helvetica', 'normal');
            pdf.text(`Le ${Number(notice.amount_due).toLocaleString()}`, margin + 50, yPosition);
            yPosition += 8;

            // Notice Number
            pdf.setFont('helvetica', 'bold');
            pdf.text('Notice Number:', margin, yPosition);
            pdf.setFont('helvetica', 'normal');
            pdf.text(notice.notice_number, margin + 50, yPosition);
            yPosition += 15;

            // Footer
            pdf.setFont('helvetica', 'italic');
            pdf.setFontSize(9);
            pdf.text('This certificate is valid for the license year mentioned above.', pageWidth / 2, pageHeight - 12, { align: 'center' });
            pdf.text(`Certificate ID: ${notice.id}`, pageWidth / 2, pageHeight - 8, { align: 'center' });

            // Save PDF
            pdf.save(`business-license-${notice.notice_number}.pdf`);
            Swal.fire({
                icon: 'success',
                title: 'Downloaded',
                text: 'License certificate PDF downloaded successfully.',
                timer: 2000,
                confirmButtonColor: '#0958d9'
            });
        } catch (err) {
            console.error('Error generating PDF:', err);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to generate PDF. Please try again.',
                confirmButtonColor: '#0958d9'
            });
        }
    };

    if (loading) {
        return (
            <div className="p-8 max-w-4xl mx-auto">
                <Card className="p-12 text-center">
                    <FaSpinner className="text-4xl text-primary animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading license details...</p>
                </Card>
            </div>
        );
    }

    if (!notice) {
        return (
            <div className="p-8 max-w-4xl mx-auto">
                <Button variant="ghost" onClick={() => navigate('/citizen/permits')} className="mb-6 pl-0 hover:bg-transparent hover:underline flex items-center gap-2">
                    <FaArrowLeft /> Back to Licenses & Permits
                </Button>
                <Card className="p-8 text-center">
                    <p className="text-gray-600">License not found.</p>
                </Card>
            </div>
        );
    }

    const issueDate = notice.created_at ? new Date(notice.created_at).toLocaleDateString() : new Date().toLocaleDateString();
    const expiryDate = notice.due_date ? new Date(notice.due_date).toLocaleDateString() : 'Not specified';

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <Button variant="ghost" onClick={() => navigate('/citizen/permits')} className="mb-6 pl-0 hover:bg-transparent hover:underline flex items-center gap-2 print:hidden">
                <FaArrowLeft /> Back to Licenses & Permits
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
                        <p className="text-sm text-gray-600 mt-2 uppercase tracking-wide">Business License Certificate</p>
                    </div>

                    {/* Status Badge */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full font-bold">
                            <FaCheckCircle /> License Active
                        </div>
                    </div>

                    {/* License Details - 3 columns layout */}
                    <div className="grid grid-cols-3 gap-6 mb-8">
                        {/* ROW 1 */}
                        {/* Business Name */}
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Business Name</p>
                            <p className="text-sm font-semibold text-gray-800 mt-1">{notice.business_name}</p>
                        </div>

                        {/* License Year */}
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-bold flex items-center gap-2 mb-1">
                                <FaCalendarAlt className="text-primary" /> License Year
                            </p>
                            <p className="text-sm font-semibold text-gray-800">{notice.license_year}</p>
                        </div>

                        {/* Issue Date */}
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Issue Date</p>
                            <p className="text-sm font-semibold text-gray-800 mt-1">{issueDate}</p>
                        </div>

                        {/* ROW 2 */}
                        {/* Owner */}
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-bold flex items-center gap-2 mb-1">
                                <FaBuilding className="text-primary" /> Owner
                            </p>
                            <p className="text-sm font-semibold text-gray-800">{business?.owner || 'Not specified'}</p>
                        </div>

                        {/* Notice Number */}
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Notice Number</p>
                            <p className="text-sm font-semibold text-gray-800 mt-1">{notice.notice_number}</p>
                        </div>

                        {/* Empty space for alignment */}
                        <div></div>

                        {/* FULL WIDTH: Address */}
                        <div className="col-span-3">
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-bold flex items-center gap-2 mb-1">
                                <FaMapMarkerAlt className="text-primary" /> Business Location
                            </p>
                            <p className="text-sm text-gray-800">{business?.address || 'Not specified'}</p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center border-t-2 border-primary pt-6 mt-8">
                        <p className="text-xs text-gray-600 mb-2">This certificate is valid for the license year mentioned above.</p>
                        <p className="text-xs text-gray-500">Certificate ID: {notice.id}</p>
                    </div>
                </div>

                {/* Sidebar Actions */}
                <div className="md:w-64 print:hidden space-y-4">
                    <Card className="p-6 bg-green-50 border-l-4 border-green-500">
                        <h3 className="font-bold text-green-900 mb-2">License Active</h3>
                        <p className="text-sm text-green-700">Your business license is valid and active. Ensure renewal before expiry date.</p>
                    </Card>

                    <Button onClick={handlePrint} className="w-full flex items-center justify-center gap-2" title="Print this certificate">
                        <FaPrint /> Print Certificate
                    </Button>

                    <Button onClick={handleDownloadPDF} variant="outline" className="w-full flex items-center justify-center gap-2">
                        <FaDownload /> Download PDF
                    </Button>

                    <Card className="p-4 bg-gray-50">
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm">License Info</h4>
                        <div className="space-y-2 text-xs text-gray-600">
                            <p><span className="font-medium text-gray-900">Status:</span> {notice.status}</p>
                            <p><span className="font-medium text-gray-900">Category:</span> {business?.category || 'N/A'}</p>
                            <p><span className="font-medium text-gray-900">Valid For:</span> {notice.license_year}</p>
                        </div>
                    </Card>

                    <Button variant="ghost" onClick={() => navigate('/citizen/permits')} className="w-full">
                        Back to Licenses
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LicenseDetails;
