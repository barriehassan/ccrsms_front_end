import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaLock, FaCreditCard, FaPaypal } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Card from '../../../components/UI/Card';
import Button from '../../../components/UI/Button';
import Input from '../../../components/UI/Input';

const PaymentCheckout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { type, amount: initialAmount } = location.state || { type: 'General Payment', amount: 0 };

    const [amount, setAmount] = useState(initialAmount || '');
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (!location.state) {
            // If accessed directly without state, redirect or show generic
        }
    }, [location]);

    const handlePay = (e) => {
        e.preventDefault();
        setProcessing(true);

        Swal.fire({
            title: 'Processing Payment...',
            html: 'Contacting secure gateway...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        setTimeout(() => {
            setProcessing(false);
            Swal.fire({
                icon: 'success',
                title: 'Payment Successful!',
                text: `You have successfully paid Le ${Number(amount).toLocaleString()} for ${type}.`,
                confirmButtonColor: '#0958d9'
            }).then(() => {
                navigate('/citizen/payments/success', { state: { type, amount, date: new Date().toLocaleDateString() } });
            });
        }, 2000);
    };

    return (
        <div className="p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
                <p className="text-gray-500">Securely complete your payment for {type}.</p>
            </header>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Payment Form */}
                <div className="lg:col-span-2">
                    <Card className="p-8">
                        <div className="flex items-center gap-2 mb-6 text-green-600 bg-green-50 p-3 rounded-lg">
                            <FaLock />
                            <span className="text-sm font-medium">All transactions are secure and encrypted.</span>
                        </div>

                        <form onSubmit={handlePay} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Amount (Le)</label>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full text-2xl font-bold border-b-2 border-gray-300 focus:border-primary outline-none py-2 text-gray-900"
                                    placeholder="0.00"
                                    required
                                />
                            </div>

                            <div>
                                <h4 className="font-medium text-gray-900 mb-4">Select Method</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="border-2 border-primary bg-blue-50 p-4 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all">
                                        <FaCreditCard className="text-primary" />
                                        <span className="font-bold text-gray-700">Card</span>
                                    </div>
                                    <div className="border border-gray-200 p-4 rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-all opacity-60">
                                        <FaPaypal />
                                        <span>Mobile Money</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Input label="Name on Card" placeholder="JOHN DOE" />
                                <Input label="Card Number" placeholder="0000 0000 0000 0000" />
                                <div className="grid grid-cols-2 gap-6">
                                    <Input label="Expiry Date" placeholder="MM/YY" />
                                    <Input label="CVC" placeholder="123" />
                                </div>
                            </div>

                            <Button type="submit" className="w-full py-4 text-lg" disabled={processing || !amount}>
                                Pay Le {Number(amount || 0).toLocaleString()}
                            </Button>
                        </form>
                    </Card>
                </div>

                {/* Summary */}
                <div>
                    <Card className="p-6 bg-gray-50">
                        <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
                        <div className="space-y-3 pb-4 border-b border-gray-200">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Service Fee</span>
                                <span className="font-medium">Le {Number(amount || 0).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Processing</span>
                                <span className="font-medium">Le 0.00</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center pt-4">
                            <span className="font-bold text-lg text-gray-900">Total</span>
                            <span className="font-bold text-xl text-primary">Le {Number(amount || 0).toLocaleString()}</span>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PaymentCheckout;
