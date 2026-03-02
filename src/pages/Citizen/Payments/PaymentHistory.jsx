import { useState, useEffect } from 'react';
import { FaSearch, FaDownload, FaSpinner, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Card from '../../../components/UI/Card';
import Button from '../../../components/UI/Button';
import { getUserPayments } from '../../../services/paymentService';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable"

const PaymentHistory = () => {
    const [allPayments, setAllPayments] = useState([]);
    const [filteredPayments, setFilteredPayments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                setLoading(true);
                const response = await getUserPayments();
                const payments = Array.isArray(response) ? response : response.results || [];

                // Transform and sort payments
                const transformed = payments
                    .map(p => ({
                        id: p.id,
                        referenceId: `TX-${String(p.id).padStart(5, '0')}`,
                        type: p.bill?.service_type || 'Payment',
                        amount: (parseFloat(p.amount) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                        date: new Date(p.created_at).toLocaleDateString(),
                        method: p.stripe_payment_intent_id ? 'Stripe Card' : 'Online Payment',
                        status: p.status,
                        paidAt: p.paid_at ? new Date(p.paid_at).toLocaleDateString() : null,
                        receiptUrl: p.receipt_pdf || null,
                    }))
                    .sort((a, b) => new Date(b.date) - new Date(a.date));

                setAllPayments(transformed);
                setFilteredPayments(transformed);
                setError('');
            } catch (err) {
                console.error('Error fetching payments:', err);
                setError('Failed to load payment history');
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Unable to load your payment history. Please try again.',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    // Apply filters and search
    useEffect(() => {
        let filtered = allPayments;

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(item =>
                item.referenceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.type.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply status filter
        if (filterStatus !== 'all') {
            filtered = filtered.filter(item => item.status === filterStatus);
        }

        setFilteredPayments(filtered);
        setCurrentPage(1); // Reset to first page when filters change
    }, [searchTerm, filterStatus, allPayments]);

    const handleExport = () => {
        if (filteredPayments.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'No Data',
                text: 'There are no payments to export.',
            });
            return;
        }

        try {
            // Create PDF document
            const doc = new jsPDF();
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            
            // Add header
            doc.setFontSize(18);
            doc.text('Payment Statement', pageWidth / 2, 20, { align: 'center' });
            
            // Add date
            doc.setFontSize(10);
            doc.text(`Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, pageWidth / 2, 28, { align: 'center' });
            
            // Prepare table data - ensure amounts are plain strings
            const tableData = filteredPayments.map(p => [
                p.referenceId,
                p.type,
                `Le ${p.amount.toString()}`,
                p.date,
                p.method,
                p.status,
            ]);

            // Add table with autoTable plugin
            autoTable(doc, {
                head: [['Reference ID', 'Payment Type', 'Amount', 'Date', 'Method', 'Status']],
                body: tableData,
                startY: 35,
                theme: 'grid',
                headerStyles: {
                    fillColor: [41, 88, 217],
                    textColor: 255,
                    fontStyle: 'bold',
                    halign: 'center',
                },
                bodyStyles: {
                    textColor: [45, 52, 54],
                },
                alternateRowStyles: {
                    fillColor: [240, 240, 240],
                },
                columnStyles: {
                    0: { halign: 'left', cellWidth: 30 },
                    1: { halign: 'left', cellWidth: 35 },
                    2: { halign: 'right', cellWidth: 25 },
                    3: { halign: 'center', cellWidth: 28 },
                    4: { halign: 'center', cellWidth: 30 },
                    5: { halign: 'center', cellWidth: 22 },
                },
                margin: { top: 35 },
                didDrawPage: (data) => {
                    // Add footer with page number using compatible method
                    const pageCount = doc.internal.pages.length - 1;
                    const pageNum = data.pageNumber;
                    doc.setFontSize(9);
                    doc.text(`Page ${pageNum} of ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
                },
            });

            // Add summary section - safely get Y position
            let finalY = 50;
            if (doc.lastAutoTable && doc.lastAutoTable.finalY) {
                finalY = doc.lastAutoTable.finalY + 15;
            }
            
            doc.setFontSize(11);
            doc.text('Summary', 20, finalY);
            
            doc.setFontSize(10);
            const totalAmount = filteredPayments
                .filter(p => p.status === 'PAID')
                .reduce((sum, p) => {
                    try {
                        const amount = typeof p.amount === 'string' ? parseFloat(p.amount.replace(/,/g, '')) : parseFloat(p.amount);
                        return sum + (isNaN(amount) ? 0 : amount);
                    } catch (e) {
                        return sum;
                    }
                }, 0);
            
            const paidCount = filteredPayments.filter(p => p.status === 'PAID').length;
            const failedCount = filteredPayments.filter(p => p.status === 'FAILED').length;
            
            doc.text(`• Total Payments: ${filteredPayments.length}`, 25, finalY + 8);
            doc.text(`• Paid: ${paidCount}`, 25, finalY + 14);
            doc.text(`• Failed: ${failedCount}`, 25, finalY + 20);
            doc.text(`• Total Amount: Le ${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 25, finalY + 26);

            // Save PDF with proper filename
            const fileName = `payment-statement-${new Date().toISOString().split('T')[0]}.pdf`;
            doc.save(fileName);

            Swal.fire({
                icon: 'success',
                title: 'Exported',
                text: 'Payment statement exported as PDF successfully!',
                timer: 2000,
            });
        } catch (err) {
            console.error('Error exporting PDF:', err);
            Swal.fire({
                icon: 'error',
                title: 'Export Failed',
                text: `Error: ${err.message || 'An error occurred while exporting the PDF.'}`,
            });
        }
    };

    const handleDownloadReceipt = (payment) => {
        if (payment.receiptUrl) {
            window.open(payment.receiptUrl, '_blank');
        } else {
            Swal.fire({
                icon: 'info',
                title: 'Receipt Not Available',
                text: 'The receipt for this payment is not available yet.',
            });
        }
    };

    // Pagination calculations
    const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = filteredPayments.slice(startIndex, endIndex);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo(0, 0);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            window.scrollTo(0, 0);
        }
    };

    const handlePageClick = (pageNum) => {
        setCurrentPage(pageNum);
        window.scrollTo(0, 0);
    };

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <FaSpinner className="animate-spin text-5xl text-primary mx-auto mb-4" />
                    <p className="text-gray-600">Loading your payment history...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Payment History</h1>
                    <p className="text-gray-500">Reference archive of all your municipal transactions.</p>
                </div>
                <Button variant="outline" onClick={handleExport} className="flex items-center gap-2">
                    <FaDownload /> Export Statement
                </Button>
            </header>

            <Card className="p-6">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-grow max-w-md">
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by ID or Type..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                    </div>

                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                        <option value="all">All Status</option>
                        <option value="PAID">Paid</option>
                        <option value="FAILED">Failed</option>
                        <option value="INITIATED">Initiated</option>
                    </select>
                </div>

                {filteredPayments.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-medium">
                                <tr>
                                    <th className="p-4">Reference ID</th>
                                    <th className="p-4">Payment Type</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Method</th>
                                    <th className="p-4">Amount (Le)</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {currentPageData.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-700 transition-colors">
                                        <td className="p-4 font-bold text-gray-900 dark:text-white font-mono">{item.referenceId}</td>
                                        <td className="p-4 text-gray-700 dark:text-white">{item.type}</td>
                                        <td className="p-4 text-gray-500">{item.date}</td>
                                        <td className="p-4 text-gray-500 text-sm">{item.method}</td>
                                        <td className="p-4 font-bold text-gray-900 dark:text-white">{item.amount}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                                item.status === 'PAID' ? 'bg-green-100 text-green-700' :
                                                item.status === 'FAILED' ? 'bg-red-100 text-red-700' :
                                                'bg-yellow-100 text-yellow-700'
                                            }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            {item.status === 'PAID' && (
                                                <button
                                                    onClick={() => handleDownloadReceipt(item)}
                                                    className="text-primary hover:underline text-sm font-medium"
                                                >
                                                    Receipt
                                                </button>
                                            )}
                                            {item.status !== 'PAID' && (
                                                <span className="text-gray-400 text-sm">-</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500">
                            {searchTerm || filterStatus !== 'all'
                                ? 'No payments match your search or filter.'
                                : 'No payment history yet. Make your first payment to get started.'}
                        </p>
                    </div>
                )}

                {/* Pagination Info */}
                {filteredPayments.length > 0 && (
                    <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-sm text-gray-600">
                            Showing <span className="font-bold">{startIndex + 1}</span> to <span className="font-bold">{Math.min(endIndex, filteredPayments.length)}</span> of <span className="font-bold">{filteredPayments.length}</span> payments
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                                className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                            >
                                <FaChevronLeft size={14} /> Previous
                            </button>

                            {/* Page Numbers */}
                            <div className="flex gap-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                    <button
                                        key={pageNum}
                                        onClick={() => handlePageClick(pageNum)}
                                        className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                                            currentPage === pageNum
                                                ? 'bg-primary text-white'
                                                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                            >
                                Next <FaChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default PaymentHistory;
