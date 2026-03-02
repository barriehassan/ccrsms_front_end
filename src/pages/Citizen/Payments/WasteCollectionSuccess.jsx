import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import Card from '../../../components/UI/Card';
import Button from '../../../components/UI/Button';
import { verifyWasteCollectionPayment } from '../../../services/paymentService';
import Swal from 'sweetalert2';

const WasteCollectionSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const navigate = useNavigate();

    const [status, setStatus] = useState('verifying'); // verifying, success, failed
    const [paymentData, setPaymentData] = useState(null);
    const [coverageData, setCoverageData] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');

    // Prevent double calling
    const verificationAttempted = useRef(false);

    useEffect(() => {
        if (!sessionId) {
            setStatus('failed');
            setErrorMsg('No session ID found in the URL. Cannot verify payment.');
            return;
        }

        const verifyPayment = async () => {
            if (verificationAttempted.current) return;
            verificationAttempted.current = true;

            try {
                // Use the verifyWasteCollectionPayment service function
                const data = await verifyWasteCollectionPayment(sessionId);

                // If the backend says the payment wasn't actually paid on Stripe's end
                if (data.status === 'NOT_PAID') {
                    setStatus('failed');
                    setErrorMsg(`Payment not yet confirmed by Stripe. Status: ${data.payment_status}`);
                    return;
                }

                // Otherwise it's the valid payment response with payment and coverage
                setPaymentData(data.payment);
                setCoverageData(data.coverage);
                setStatus('success');

            } catch (error) {
                console.error("Verification failed:", error);

                // Check if error response indicates it was already processed
                const apiError = error.response?.data?.error;
                const statusCode = error.response?.status;

                // SPECIAL CASE: If backend returned error but payment is actually done
                if (statusCode === 400 && apiError?.toLowerCase().includes('already')) {
                   setStatus('success');
                   return;
                }

                const defErrMsg = apiError || "An error occurred while verifying the payment. If you received an email confirmation, your payment was successful.";

                setStatus('failed');
                setErrorMsg(defErrMsg);
            }
        };

        verifyPayment();
    }, [sessionId]);

    const handleRetry = () => {
        verificationAttempted.current = false;
        setStatus('verifying');
        setErrorMsg('');
    };

    const handleContinue = () => {
        if (status === 'success') {
            // Retrieve the service type title from sessionStorage (set during checkout)
            const serviceTypeTitle = sessionStorage.getItem('serviceTypeTitle') || 'Waste Collection';
            // Clear the stored data after use
            sessionStorage.removeItem('serviceTypeTitle');
            
            // Navigate to the existing success UI
            navigate('/citizen/payments/success', {
                state: {
                    type: serviceTypeTitle,
                    amount: paymentData?.amount || 0,
                    date: paymentData ? new Date(paymentData.paid_at || paymentData.created_at).toLocaleDateString() : new Date().toLocaleDateString(),
                    serviceType: 'WASTE_COLLECTION',
                    coverage: coverageData
                },
                replace: true
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Card className="max-w-md w-full text-center p-8">
                {status === 'verifying' && (
                    <div className="flex flex-col items-center justify-center py-8">
                        <FaSpinner className="animate-spin text-5xl text-primary mb-6" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Verifying Payment...</h2>
                        <p className="text-gray-500">Please do not close this window.</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="flex flex-col items-center justify-center py-4">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-500 text-4xl mb-6">
                            <FaCheckCircle />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Coverage Activated!</h2>
                        <p className="text-gray-500 mb-2">Your waste collection coverage has been activated.</p>
                        {coverageData && (
                            <div className="bg-blue-50 p-3 rounded-lg w-full mb-6 text-left text-sm">
                                <p className="font-semibold text-gray-900 mb-2">{coverageData.plan?.name || 'Waste Collection'}</p>
                                <p className="text-gray-600"><span className="font-medium">Valid from:</span> {new Date(coverageData.start_date).toLocaleDateString()}</p>
                                <p className="text-gray-600"><span className="font-medium">Valid until:</span> {new Date(coverageData.end_date).toLocaleDateString()}</p>
                                <p className="text-gray-600 capitalize"><span className="font-medium">Frequency:</span> {coverageData.plan?.interval?.toLowerCase() || 'Weekly'}</p>
                                {coverageData.provider && (
                                    <p className="text-gray-600"><span className="font-medium">Provider:</span> {coverageData.provider?.name}</p>
                                )}
                            </div>
                        )}

                        <Button onClick={handleContinue} className="w-full">
                            View Receipt
                        </Button>
                    </div>
                )}

                {status === 'failed' && (
                    <div className="flex flex-col items-center justify-center py-4">
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center text-red-500 text-4xl mb-6">
                            <FaExclamationTriangle />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h2>
                        <p className="text-gray-500 mb-6">{errorMsg}</p>

                        <div className="flex flex-col gap-3 w-full">
                            <Button
                                onClick={handleRetry}
                                className="w-full"
                            >
                                Try Verification Again
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => navigate('/citizen/payments')}
                                className="w-full border-gray-300"
                            >
                                Return to Payments
                            </Button>
                        </div>
                        <p className="mt-6 text-xs text-gray-400 italic">
                            If you have received an email confirmation, your payment has been processed. 
                            You can check your payment history in a few minutes.
                        </p>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default WasteCollectionSuccess;
