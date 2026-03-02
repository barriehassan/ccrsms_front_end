import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaLock, FaCreditCard, FaPaypal, FaCheck } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Card from '../../../components/UI/Card';
import Button from '../../../components/UI/Button';
import Input from '../../../components/UI/Input';
import { checkoutLocalTax, checkoutCityRate, getWastePlans, checkoutWasteCollection, getUserBusinessLicenseNotices, checkoutBusinessLicense } from '../../../services/paymentService';

const PaymentCheckout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { type, title = 'General Payment', amount: initialAmount, noticeId: initialNoticeId } = location.state || { type: 'General Payment', amount: 0 };

    const [amount, setAmount] = useState(initialAmount || '');
    const [processing, setProcessing] = useState(false);
    const [totalAmount, setTotalAmount] = useState(''); // For City Rate total bill amount
    const [wastePlans, setWastePlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [plansLoading, setPlansLoading] = useState(false);
    
    // Business License states
    const [businessLicenseNotices, setBusinessLicenseNotices] = useState([]);
    const [selectedNotice, setSelectedNotice] = useState(null);
    const [noticesLoading, setNoticesLoading] = useState(false);

    useEffect(() => {
        if (!location.state) {
            // If accessed directly without state, redirect or show generic
        }

        // Fetch waste plans if waste collection is selected
        if (type === 'WASTE_COLLECTION') {
            const fetchPlans = async () => {
                setPlansLoading(true);
                try {
                    const plans = await getWastePlans();
                    setWastePlans(plans);
                    // Auto-select first active plan
                    const activePlan = plans.find(p => p.is_active);
                    if (activePlan) {
                        setSelectedPlan(activePlan);
                    }
                } catch (error) {
                    console.error("Error fetching waste plans:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to load waste collection plans.',
                        confirmButtonColor: '#0958d9'
                    });
                } finally {
                    setPlansLoading(false);
                }
            };
            fetchPlans();
        }

        // Fetch business license demand notices if business license is selected
        if (type === 'BUSINESS_LICENSE') {
            const fetchNotices = async () => {
                setNoticesLoading(true);
                try {
                    const notices = await getUserBusinessLicenseNotices();
                    const verifiedNotices = Array.isArray(notices) 
                        ? notices.filter(n => n.status === 'VERIFIED')
                        : [];
                    setBusinessLicenseNotices(verifiedNotices);
                    
                    // Auto-select if only one notice or if initialNoticeId was provided
                    if (initialNoticeId) {
                        const notice = verifiedNotices.find(n => n.id === initialNoticeId);
                        if (notice) {
                            setSelectedNotice(notice);
                            setAmount(notice.amount_due);
                        }
                    } else if (verifiedNotices.length === 1) {
                        setSelectedNotice(verifiedNotices[0]);
                        setAmount(verifiedNotices[0].amount_due);
                    }
                } catch (error) {
                    console.error("Error fetching business license notices:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to load business license demand notices. Please ensure you have verified notices.',
                        confirmButtonColor: '#0958d9'
                    });
                } finally {
                    setNoticesLoading(false);
                }
            };
            fetchNotices();
        }
    }, [location, type, initialNoticeId]);

    const handlePay = async (e) => {
        e.preventDefault();

        if (type === 'LOCAL_TAX' || type === 'CITY_RATE' || type === 'WASTE_COLLECTION' || type === 'BUSINESS_LICENSE') {
            return handleStripeCheckout();
        }

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

    const handleStripeCheckout = async () => {
        setProcessing(true);
        Swal.fire({
            title: 'Initializing Payment...',
            html: 'Connecting to Stripe...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            let result;
            
            if (type === 'LOCAL_TAX') {
                result = await checkoutLocalTax();
            } else if (type === 'CITY_RATE') {
                const payAmount = parseFloat(amount);
                const billAmount = totalAmount ? parseFloat(totalAmount) : null;
                result = await checkoutCityRate(payAmount, billAmount);
            } else if (type === 'WASTE_COLLECTION') {
                if (!selectedPlan) {
                    throw new Error("Please select a waste collection plan.");
                }
                result = await checkoutWasteCollection(selectedPlan.id);
            } else if (type === 'BUSINESS_LICENSE') {
                if (!selectedNotice) {
                    throw new Error("Please select a demand notice to pay.");
                }
                // Store notice ID for later retrieval on success page
                sessionStorage.setItem('businessLicenseNoticeId', selectedNotice.id);
                result = await checkoutBusinessLicense(selectedNotice.id);
            }
            
            if (result.checkout_url) {
                Swal.close();
                // Redirect user to Stripe Checkout
                window.location.href = result.checkout_url;
            } else {
                throw new Error("No checkout URL returned.");
            }
        } catch (error) {
            console.error("Checkout Error:", error);

            const defErrMsg = error.response?.data?.error || "Error initiating the payment. Please try again.";

            Swal.fire({
                icon: 'error',
                title: 'Payment Initialization Failed',
                text: defErrMsg,
                confirmButtonColor: '#0958d9'
            });
            setProcessing(false);
        }
    };

    return (
        <div className="p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
                <p className="text-gray-500">Securely complete your payment for {title}.</p>
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
                            {type === 'LOCAL_TAX' && (
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-2">Fixed Local Tax Amount</h4>
                                    <div className="text-3xl font-bold text-primary bg-blue-50 p-4 rounded-lg inline-block">
                                        Le 10.00
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">The standard rate set by the Freetown City Council.</p>
                                </div>
                            )}

                            {type === 'CITY_RATE' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Total Bill Amount (Le)</label>
                                        <input
                                            type="number"
                                            value={totalAmount}
                                            onChange={(e) => setTotalAmount(e.target.value)}
                                            className="w-full text-2xl font-bold border-b-2 border-gray-300 focus:border-primary outline-none py-2 text-gray-900"
                                            placeholder="0.00"
                                            min="0"
                                            step="0.01"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Leave blank if paying an existing bill</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Payment Amount (Le)</label>
                                        <input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            className="w-full text-2xl font-bold border-b-2 border-gray-300 focus:border-primary outline-none py-2 text-gray-900"
                                            placeholder="0.00"
                                            required
                                            min="0"
                                            step="0.01"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Amount for this installment payment</p>
                                    </div>
                                </div>
                            )}

                            {type === 'WASTE_COLLECTION' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">Select Waste Collection Plan</label>
                                        {plansLoading ? (
                                            <div className="text-center py-6 text-gray-500">Loading plans...</div>
                                        ) : wastePlans.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {wastePlans.filter(p => p.is_active).map((plan) => (
                                                    <div
                                                        key={plan.id}
                                                        onClick={() => setSelectedPlan(plan)}
                                                        className={`border-2 p-4 rounded-lg cursor-pointer transition-all ${
                                                            selectedPlan?.id === plan.id
                                                                ? 'border-primary bg-blue-50'
                                                                : 'border-gray-200 hover:border-primary'
                                                        }`}
                                                    >
                                                        <div className="flex items-start justify-between mb-2">
                                                            <div>
                                                                <h4 className="font-bold text-gray-900">{plan.name}</h4>
                                                                <p className="text-xs text-gray-500 mt-1">Every {plan.interval.toLowerCase()}</p>
                                                            </div>
                                                            {selectedPlan?.id === plan.id && (
                                                                <FaCheck className="text-primary mt-1" />
                                                            )}
                                                        </div>
                                                        <div className="text-2xl font-bold text-primary">
                                                            Le {Number(plan.price).toLocaleString()}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-6 text-gray-500">No active plans available</div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {type === 'BUSINESS_LICENSE' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">Select Demand Notice to Pay</label>
                                        {noticesLoading ? (
                                            <div className="text-center py-6 text-gray-500">Loading your demand notices...</div>
                                        ) : businessLicenseNotices.length > 0 ? (
                                            <div className="space-y-2">
                                                {businessLicenseNotices.map((notice) => (
                                                    <div
                                                        key={notice.id}
                                                        onClick={() => {
                                                            setSelectedNotice(notice);
                                                            setAmount(notice.amount_due);
                                                        }}
                                                        className={`border-2 p-4 rounded-lg cursor-pointer transition-all ${
                                                            selectedNotice?.id === notice.id
                                                                ? 'border-primary bg-blue-50'
                                                                : 'border-gray-200 hover:border-primary'
                                                        }`}
                                                    >
                                                        <div className="flex items-start justify-between mb-2">
                                                            <div className="flex-1">
                                                                <h4 className="font-bold text-gray-900">{notice.business_name}</h4>
                                                                <p className="text-xs text-gray-500 mt-1">Notice: {notice.notice_number} | Year: {notice.license_year}</p>
                                                            </div>
                                                            {selectedNotice?.id === notice.id && (
                                                                <FaCheck className="text-primary mt-1 ml-2" />
                                                            )}
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-gray-600">Amount Due:</span>
                                                            <span className="text-2xl font-bold text-primary">
                                                                Le {Number(notice.amount_due).toLocaleString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                                                <p className="text-sm text-yellow-700">No verified demand notices found.</p>
                                                <p className="text-xs text-yellow-600 mt-1">Please register a business and submit your details for verification first.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {type !== 'LOCAL_TAX' && type !== 'CITY_RATE' && type !== 'WASTE_COLLECTION' && (
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
                            )}

                            {type !== 'LOCAL_TAX' && type !== 'CITY_RATE' && type !== 'WASTE_COLLECTION' && type !== 'BUSINESS_LICENSE' && (
                                <>
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
                                </>
                            )}

                            <Button type="submit" className="w-full py-4 text-lg" disabled={processing || (type === 'CITY_RATE' && !amount) || (type === 'WASTE_COLLECTION' && !selectedPlan) || (type === 'BUSINESS_LICENSE' && !selectedNotice) || (type !== 'LOCAL_TAX' && type !== 'CITY_RATE' && type !== 'WASTE_COLLECTION' && type !== 'BUSINESS_LICENSE' && !amount)}>
                                {(type === 'LOCAL_TAX' || type === 'CITY_RATE' || type === 'WASTE_COLLECTION' || type === 'BUSINESS_LICENSE') ? 'Proceed to Secure Stripe Checkout' : `Pay Le ${Number(amount || 0).toLocaleString()}`}
                            </Button>
                        </form>
                    </Card>
                </div>

                {/* Summary */}
                <div>
                    <Card className="p-6 bg-gray-50">
                        <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
                        <div className="space-y-3 pb-4 border-b border-gray-200">
                            {type === 'LOCAL_TAX' && (
                                <>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Service Fee</span>
                                        <span className="font-medium">Le 10</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Processing</span>
                                        <span className="font-medium">Le 0.00</span>
                                    </div>
                                </>
                            )}
                            {type === 'CITY_RATE' && (
                                <>
                                    {totalAmount && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Total Bill Amount</span>
                                            <span className="font-medium">Le {Number(totalAmount || 0).toLocaleString()}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Installment Payment</span>
                                        <span className="font-medium">Le {Number(amount || 0).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Processing</span>
                                        <span className="font-medium">Le 0.00</span>
                                    </div>
                                </>
                            )}
                            {type === 'WASTE_COLLECTION' && selectedPlan && (
                                <>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Plan</span>
                                        <span className="font-medium">{selectedPlan.name}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Frequency</span>
                                        <span className="font-medium capitalize">{selectedPlan.interval.toLowerCase()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Service Fee</span>
                                        <span className="font-medium">Le {Number(selectedPlan.price).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Processing</span>
                                        <span className="font-medium">Le 0.00</span>
                                    </div>
                                </>
                            )}
                            {type === 'BUSINESS_LICENSE' && selectedNotice && (
                                <>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Business</span>
                                        <span className="font-medium">{selectedNotice.business_name}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">License Year</span>
                                        <span className="font-medium">{selectedNotice.license_year}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Notice Number</span>
                                        <span className="font-medium">{selectedNotice.notice_number}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">License Fee</span>
                                        <span className="font-medium">Le {Number(selectedNotice.amount_due).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Processing</span>
                                        <span className="font-medium">Le 0.00</span>
                                    </div>
                                </>
                            )}
                            {type !== 'LOCAL_TAX' && type !== 'CITY_RATE' && type !== 'WASTE_COLLECTION' && (
                                <>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Service Fee</span>
                                        <span className="font-medium">Le {Number(amount || 0).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Processing</span>
                                        <span className="font-medium">Le 0.00</span>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="flex justify-between items-center pt-4">
                            <span className="font-bold text-lg text-gray-900">Total Payment</span>
                            <span className="font-bold text-xl text-primary">
                                Le {type === 'LOCAL_TAX' ? '10.00' : type === 'WASTE_COLLECTION' && selectedPlan ? Number(selectedPlan.price).toLocaleString() : type === 'BUSINESS_LICENSE' && selectedNotice ? Number(selectedNotice.amount_due).toLocaleString() : Number(amount || 0).toLocaleString()}
                            </span>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PaymentCheckout;
