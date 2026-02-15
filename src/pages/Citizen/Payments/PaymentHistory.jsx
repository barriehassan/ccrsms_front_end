import { useState } from 'react';
import { FaSearch, FaFilter, FaDownload } from 'react-icons/fa';
import Card from '../../../components/UI/Card';
import Button from '../../../components/UI/Button';

const PaymentHistory = () => {
    const [history, setHistory] = useState([
        { id: "TX-9981", type: "City Rates", amount: "500,000", date: "2023-12-12", method: "Visa **** 4242", status: "Paid" },
        { id: "TX-9980", type: "Waste Collection", amount: "50,000", date: "2023-11-10", method: "Mobile Money", status: "Paid" },
        { id: "TX-9979", type: "Market Dues", amount: "25,000", date: "2023-11-01", method: "Cash Agent", status: "Failed" },
        { id: "TX-9975", type: "Business License", amount: "1,200,000", date: "2023-01-15", method: "Bank Transfer", status: "Paid" },
    ]);

    return (
        <div className="p-8">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Payment History</h1>
                    <p className="text-gray-500">Reference archive of all your municipal transactions.</p>
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                    <FaDownload /> Export Statement
                </Button>
            </header>

            <Card className="p-6">
                <div className="flex gap-4 mb-6">
                    <div className="relative flex-grow max-w-md">
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                        <input type="text" placeholder="Search by ID or Type..." className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary" />
                    </div>
                    <Button variant="outline"><FaFilter /> Filter</Button>
                </div>

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
                            {history.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-bold text-gray-900 font-mono">{item.id}</td>
                                    <td className="p-4 text-gray-700">{item.type}</td>
                                    <td className="p-4 text-gray-500">{item.date}</td>
                                    <td className="p-4 text-gray-500 text-sm">{item.method}</td>
                                    <td className="p-4 font-bold text-gray-900">{item.amount}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${item.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="text-primary hover:underline text-sm font-medium">Receipt</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default PaymentHistory;
