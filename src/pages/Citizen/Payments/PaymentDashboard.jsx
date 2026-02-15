import { useNavigate } from 'react-router-dom';
import { FaMoneyBillWave, FaHistory, FaFileInvoiceDollar, FaExclamationCircle, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import Card from '../../../components/UI/Card';
import Button from '../../../components/UI/Button';

const PaymentDashboard = () => {
    const navigate = useNavigate();

    const stats = [
        { label: "Total Paid (YTD)", value: "Le 4,500,000", icon: FaMoneyBillWave, color: "text-green-600", bg: "bg-green-100" },
        { label: "Pending Bills", value: "Le 250,000", icon: FaExclamationCircle, color: "text-red-600", bg: "bg-red-100" },
        { label: "Last Payment", value: "Le 500,000", icon: FaHistory, color: "text-blue-600", bg: "bg-blue-100" },
    ];

    const recentPayments = [
        { id: "TX-9981", type: "City Rates", amount: "Le 500,000", date: "12 Dec 2023", status: "Paid" },
        { id: "TX-9980", type: "Waste Collection", amount: "Le 50,000", date: "10 Nov 2023", status: "Paid" },
        { id: "TX-9979", type: "Market Dues", amount: "Le 25,000", date: "01 Nov 2023", status: "Failed" },
    ];

    return (
        <div className="p-8">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Payments & Bills</h1>
                    <p className="text-gray-500">Manage your municipal fees and view transaction history.</p>
                </div>
                <Button onClick={() => navigate('/citizen/payments/new')} className="flex items-center gap-2">
                    <FaFileInvoiceDollar /> Make a New Payment
                </Button>
            </header>

            {/* KPI Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <Card key={index} className="p-6 flex items-center gap-4">
                        <div className={`p-4 rounded-full ${stat.bg} ${stat.color} text-2xl`}>
                            <stat.icon />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Quick Actions */}
                <div className="lg:col-span-2 space-y-8">
                    <Card className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Pending Bills</h3>
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg flex justify-between items-center">
                            <div>
                                <h4 className="font-bold text-yellow-800">Property Tax - Q4 2023</h4>
                                <p className="text-sm text-yellow-700">Due: 31st Dec 2023</p>
                            </div>
                            <Button size="sm" onClick={() => navigate('/citizen/payments/checkout', { state: { type: 'Property Tax', amount: 250000 } })}>Pay Now (Le 250k)</Button>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
                            <button onClick={() => navigate('/citizen/payments/history')} className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
                                View All <FaArrowRight />
                            </button>
                        </div>
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
                                    {recentPayments.map((tx, i) => (
                                        <tr key={i} className="hover:bg-gray-50">
                                            <td className="p-3 text-sm font-medium text-gray-900">#{tx.id}</td>
                                            <td className="p-3 text-sm text-gray-600">{tx.type}</td>
                                            <td className="p-3 text-sm font-bold text-gray-900">{tx.amount}</td>
                                            <td className="p-3 text-sm text-gray-500">{tx.date}</td>
                                            <td className="p-3">
                                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${tx.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                    }`}>
                                                    {tx.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
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
