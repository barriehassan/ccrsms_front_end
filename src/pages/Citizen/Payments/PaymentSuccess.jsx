import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaDownload, FaHome } from 'react-icons/fa';
import Card from '../../../components/UI/Card';
import Button from '../../../components/UI/Button';

const PaymentSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { type, amount, date } = location.state || { type: 'Service', amount: 0, date: 'Today' };
    const receiptId = "RCP-" + Math.floor(100000 + Math.random() * 900000);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Card className="max-w-md w-full text-center p-8 border-t-8 border-green-500">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-500 text-4xl mx-auto mb-6">
                    <FaCheckCircle />
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
                <p className="text-gray-500 mb-8">Thank you. Your transaction has been completed.</p>

                <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left space-y-3">
                    <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Receipt ID</span>
                        <span className="font-mono font-bold text-gray-900">{receiptId}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Payment Type</span>
                        <span className="font-medium text-gray-900">{type}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Date</span>
                        <span className="font-medium text-gray-900">{date}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                        <span className="text-gray-500 text-sm">Amount Paid</span>
                        <span className="font-bold text-xl text-primary">Le {Number(amount).toLocaleString()}</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                        <FaDownload /> Download Receipt
                    </Button>
                    <Button onClick={() => navigate('/citizen/payments')} className="w-full flex items-center justify-center gap-2">
                        <FaHome /> Return to Dashboard
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default PaymentSuccess;
