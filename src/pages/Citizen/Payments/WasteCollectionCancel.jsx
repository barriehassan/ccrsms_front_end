import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const WasteCollectionCancel = () => {
    const navigate = useNavigate();

    useEffect(() => {
        Swal.fire({
            icon: 'warning',
            title: 'Payment Cancelled',
            text: 'You have cancelled the Stripe checkout process for Waste Collection.',
            confirmButtonColor: '#0958d9'
        }).then(() => {
            navigate('/citizen/payments', { replace: true });
        });
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <p className="text-gray-500">Cancelling payment and redirecting...</p>
        </div>
    );
};

export default WasteCollectionCancel;
