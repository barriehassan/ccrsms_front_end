import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaMoneyBillWave, FaHistory, FaFileInvoiceDollar, FaExclamationCircle, FaArrowRight, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import Card from '../../../components/UI/Card';
import Button from '../../../components/UI/Button';
import { getUserBills, getUserPayments, getPaymentStats } from '../../../services/paymentService';
import Swal from 'sweetalert2';

const PaymentDashboard = () => {
    const navigate = useNavigate();
    
    const [stats, setStats] = useState({
        totalPaid: 0,
        pendingAmount: 0,
        lastPaymentAmount: 0,
    });
    
    const [pendingBills, setPendingBills] = useState([]);
    const [recentPayments, setRecentPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                
                // Fetch stats and payments data in parallel
                const [statsResponse, paymentsResponse, billsResponse] = await Promise.all([
                    getPaymentStats(),
                    getUserPayments(),
                    getUserBills()
                ]);

                // Process stats data from backend
                const totalPaid = statsResponse.total_paid_ytd || 0;
                const pendingAmount = statsResponse.pending_bills_total || 0;
                const lastPaymentAmount = statsResponse.last_payment?.amount || 0;

                setStats({
                    totalPaid: parseFloat(totalPaid).toFixed(2),
                    pendingAmount: parseFloat(pendingAmount).toFixed(2),
                    lastPaymentAmount: parseFloat(lastPaymentAmount).toFixed(2),
                });

                // Process bills data
                let bills = Array.isArray(billsResponse) ? billsResponse : billsResponse.results || [];
                let payments = Array.isArray(paymentsResponse) ? paymentsResponse : paymentsResponse.results || [];

                // Format recent payments
                const sortedPayments = payments
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    .slice(0, 5)
                    .map(p => ({
                        id: p.id,
                        transactionId: `TX-${String(p.id).padStart(5, '0')}`,
                        type: p.bill?.service_type || p.bill?.service_type || 'Payment',
                        amount: parseFloat(p.amount || 0).toLocaleString(),
                        date: new Date(p.created_at).toLocaleDateString(),
                        status: p.status,
                        paidAt: p.paid_at ? new Date(p.paid_at).toLocaleDateString() : null,
                    }));
                setRecentPayments(sortedPayments);

                // Format pending bills
                const pendingBillsData = bills.filter(b => b.status !== 'PAID');
                const formattedPendingBills = pendingBillsData.slice(0, 3).map(b => ({
                    id: b.id,
                    serviceType: b.service_type || 'Bill',
                    amountDue: parseFloat(b.amount_due || 0),
                    amountPaid: parseFloat(b.amount_paid || 0),
                    dueDate: b.due_date ? new Date(b.due_date).toLocaleDateString() : 'No due date',
                    status: b.status,
                }));
                setPendingBills(formattedPendingBills);

                setError('');
            } catch (err) {
                console.error('Error fetching payment data:', err);
                setError('Failed to load payment data');
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Unable to load your payment information. Please try again.',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handlePayBill = (bill) => {
        const remaining = bill.amountDue - bill.amountPaid;
        navigate('/citizen/payments/checkout', {
            state: {
                type: bill.serviceType,
                amount: remaining,
                billId: bill.id,
            }
        });
    };

    const handleViewAll = () => {
        navigate('/citizen/payments/history');
    };

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <FaSpinner className="animate-spin text-5xl text-primary mx-auto mb-4" />
                    <p className="text-gray-600">Loading your payment information...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Payments & Bills</h1>
                    <p className="text-gray-500">Manage your municipal fees and view transaction history.</p>
                </div>
                <Button onClick={() => navigate('/citizen/payments/new')} className="flex items-center gap-2">
                    <FaFileInvoiceDollar /> Make a New Payment
                </Button>
            </header>

            {/* KPI Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6 flex items-center gap-4">
                    <div className="p-4 rounded-full bg-green-100 text-green-600 text-2xl">
                        <FaMoneyBillWave />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Total Paid (YTD)</p>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Le {stats.totalPaid}</h3>
                    </div>
                </Card>

                <Card className="p-6 flex items-center gap-4">
                    <div className="p-4 rounded-full bg-red-100 text-red-600 text-2xl">
                        <FaExclamationCircle />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Pending Bills</p>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Le {stats.pendingAmount}</h3>
                    </div>
                </Card>

                <Card className="p-6 flex items-center gap-4">
                    <div className="p-4 rounded-full bg-blue-100 text-blue-600 text-2xl">
                        <FaHistory />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Last Payment</p>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Le {stats.lastPaymentAmount}</h3>
                    </div>
                </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Quick Actions */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Pending Bills */}
                    {pendingBills.length > 0 && (
                        <Card className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Pending Bills</h3>
                            <div className="space-y-3">
                                {pendingBills.map((bill) => (
                                    <div key={bill.id} className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg flex justify-between items-center">
                                        <div>
                                            <h4 className="font-bold text-yellow-800">{bill.serviceType}</h4>
                                            <p className="text-sm text-yellow-700">Due: {bill.dueDate}</p>
                                            <p className="text-xs text-yellow-600 mt-1">Remaining: Le {(bill.amountDue - bill.amountPaid).toLocaleString()}</p>
                                        </div>
                                        <Button size="sm" onClick={() => handlePayBill(bill)}>
                                            Pay Now
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )}

                    <Card className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Transactions</h3>
                            <button onClick={handleViewAll} className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
                                View All <FaArrowRight />
                            </button>
                        </div>
                        {recentPayments.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="p-3 text-xs font-medium text-gray-500 uppercase">ID</th>
                                            <th className="p-3 text-xs font-medium text-gray-500 uppercase">Service</th>
                                            <th className="p-3 text-xs font-medium text-gray-500 uppercase">Amount</th>
                                            <th className="p-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                                            <th className="p-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {recentPayments.map((tx) => (
                                            <tr key={tx.id} className="dark:hover:bg-gray-700 hover:bg-gray-50">
                                                <td className="p-3 text-sm dark:text-white font-medium text-gray-900">#{tx.transactionId}</td>
                                                <td className="p-3 text-sm dark:text-white text-gray-600">{tx.type}</td>
                                                <td className="p-3 text-sm dark:text-white font-bold text-gray-900">Le {tx.amount}</td>
                                                <td className="p-3 text-sm dark:text-white text-gray-500">{tx.date}</td>
                                                <td className="p-3">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                                        tx.status === 'PAID' ? 'bg-green-100 text-green-700' : 
                                                        tx.status === 'FAILED' ? 'bg-red-100 text-red-700' : 
                                                        'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                        {tx.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-8">No recent transactions yet.</p>
                        )}
                    </Card>
                </div>

                {/* Info Sidebar */}
                <div className="space-y-6">
                    <Card className="p-6 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
                        <h3 className="font-bold text-xl mb-2">Why Pay Online?</h3>
                        <ul className="space-y-2 text-blue-100 text-sm mb-6">
                            <li className="flex gap-2"><FaCheckCircle className="mt-1" /> Instant Receipts</li>
                            <li className="flex gap-2"><FaCheckCircle className="mt-1" /> Secure Transactions</li>
                            <li className="flex gap-2"><FaCheckCircle className="mt-1" /> Avoid Queues</li>
                        </ul>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PaymentDashboard;
