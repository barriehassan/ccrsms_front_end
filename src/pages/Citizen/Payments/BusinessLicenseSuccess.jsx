import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import Card from '../../../components/UI/Card';
import Button from '../../../components/UI/Button';
import { verifyBusinessLicensePayment } from '../../../services/paymentService';
import Swal from 'sweetalert2';

const BusinessLicenseSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const navigate = useNavigate();

    const [status, setStatus] = useState('verifying'); // verifying, success, failed
    const [paymentData, setPaymentData] = useState(null);
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
                // Use the verifyBusinessLicensePayment service function
                const data = await verifyBusinessLicensePayment(sessionId);

                // If the backend says the payment wasn't actually paid on Stripe's end
                if (data.status === 'NOT_PAID') {
                    setStatus('failed');
                    setErrorMsg(`Payment not yet confirmed by Stripe. Status: ${data.payment_status}`);
                    return;
                }

                // Otherwise it's the valid payment response
                setPaymentData(data);
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
            // Retrieve the notice ID from sessionStorage
            const noticeId = sessionStorage.getItem('businessLicenseNoticeId');
            
            // Clear the stored value
            sessionStorage.removeItem('businessLicenseNoticeId');
            
            if (noticeId) {
                // Navigate to the license details page with the notice ID
                navigate(`/citizen/permits/license/${noticeId}`, { replace: true });
            } else {
                // Fallback to permits dashboard if notice ID not found
                navigate('/citizen/permits', { replace: true });
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md p-8 text-center">
                {status === 'verifying' && (
                    <>
                        <FaSpinner className="text-5xl text-primary mx-auto mb-4 animate-spin" />
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Verifying Payment</h1>
                        <p className="text-gray-600 mb-6">Please wait while we confirm your business license payment with Stripe...</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <FaCheckCircle className="text-5xl text-green-500 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Payment Successful!</h1>
                        <p className="text-gray-600 mb-4">Your business license payment has been confirmed.</p>
                        
                        {paymentData && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left mb-6">
                                <p className="text-sm text-gray-700 mb-2">
                                    <span className="font-medium">Amount Paid:</span> Le {Number(paymentData.amount).toLocaleString()}
                                </p>
                                <p className="text-sm text-gray-700 mb-2">
                                    <span className="font-medium">Transaction ID:</span> {paymentData.id}
                                </p>
                                <p className="text-sm text-gray-700">
                                    <span className="font-medium">Date:</span> {paymentData.paid_at ? new Date(paymentData.paid_at).toLocaleDateString() : new Date(paymentData.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        )}

                        <p className="text-sm text-gray-600 mb-6">A receipt has been sent to your email address.</p>
                        <Button onClick={handleContinue} className="w-full mb-3">Continue to Dashboard</Button>
                    </>
                )}

                {status === 'failed' && (
                    <>
                        <FaExclamationTriangle className="text-5xl text-red-500 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h1>
                        <p className="text-gray-600 mb-4">{errorMsg}</p>
                        <div className="space-y-3">
                            <Button variant="outline" onClick={handleRetry} className="w-full">Retry Verification</Button>
                            <Button variant="ghost" onClick={() => navigate('/citizen/permits')} className="w-full">Go Back to Permits</Button>
                        </div>
                    </>
                )}
            </Card>
        </div>
    );
};

export default BusinessLicenseSuccess;
