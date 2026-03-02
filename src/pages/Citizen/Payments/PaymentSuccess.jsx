import { useLocation, useNavigate } from 'react-router-dom';
import { FaDownload, FaHome, FaPrint } from 'react-icons/fa';
import Card from '../../../components/UI/Card';
import Button from '../../../components/UI/Button';
import { useAuth } from '../../../context/AuthContext';
import { useRef } from 'react';

const PaymentSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const receiptRef = useRef();

    // Fallback data if location state is missing
    const { type, amount, date, billId } = location.state || {
        type: type,
        amount: 5000,
        date: new Date().toLocaleDateString(),
        billId: '0009939'
    };

    const receiptId = billId || "FCC " + Math.floor(1000000 + Math.random() * 9000000);
    const servicetype = type || "Local Tax";
    const year = new Date().getFullYear();

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 py-12">
            {/* Custom Styles for Receipt and Print */}
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&family=Cormorant+Garamond:wght@600;700&display=swap');
                
                .receipt-container {
                    background-color: #fdfbf7;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                    position: relative;
                    color: #2d3436;
                    font-family: 'Cormorant Garamond', serif;
                    border: 1px solid #e0dcd0;
                }

                .receipt-handwritten {
                    font-family: 'Dancing Script', cursive;
                    color: #0c2461;
                    font-size: 1.25rem;
                    border-bottom: 2px dotted #a4b0be;
                    padding-left: 10px;
                    display: inline-block;
                    min-width: 150px;
                    vertical-align: bottom;
                    line-height: 1;
                }

                .receipt-label {
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: #2d3436;
                }

                .dotted-line-field {
                    border-bottom: 1px dotted #2d3436;
                    flex-grow: 1;
                    margin-left: 5px;
                    height: 1.2rem;
                }

                .receipt-header-logo {
                    filter: grayscale(100%) contrast(150%);
                }

                @media print {
                    body * {
                        visibility: hidden;
                    }
                    .receipt-container, .receipt-container * {
                        visibility: visible;
                    }
                    .receipt-container {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100% !important;
                        box-shadow: none !important;
                        border: none !important;
                    }
                    .no-print {
                        display: none !important;
                    }
                }
                `}
            </style>

            <div ref={receiptRef} className="receipt-container max-w-2xl w-full p-8 md:p-12 mb-8 relative overflow-hidden">
                {/* Subtle Paper Texture Overlay */}
                <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }}></div>

                {/* Receipt Header */}
                <div className="flex justify-between items-start mb-6">
                    <div className="w-20 h-20 opacity-80">
                        {/* Placeholder for FCC Coat of Arms - Using a stylized SVG or text */}
                        <div className="border-4 border-double border-gray-800 p-1 flex items-center justify-center h-full w-full">
                            <span className="text-xs font-bold text-center leading-none">FCC<br />SEAL</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-xs font-bold tracking-widest uppercase opacity-60">ORIGINAL</span>
                    </div>
                </div>

                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold italic mb-1 leading-tight tracking-wide">
                        {servicetype} {year}
                    </h2>
                    <h1 className="text-xl md:text-2xl font-bold tracking-widest uppercase border-b-2 border-gray-800 inline-block pb-1">
                        FREETOWN CITY COUNCIL
                    </h1>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-baseline mb-8 gap-4">
                    <div className="flex items-baseline">
                        <span className="text-2xl font-bold mr-2">LE</span>
                        <span className="text-4xl font-bold tracking-tighter border-b-4 border-double border-gray-800">
                            {Number(amount).toLocaleString()}
                        </span>
                    </div>
                    <div className="text-xl font-bold bg-gray-100 px-4 py-1 border border-gray-300">
                        FCC {receiptId.toString().split(' ').pop()}
                    </div>
                </div>

                {/* Receipt Fields */}
                <div className="space-y-6">
                    <div className="flex items-end">
                        <span className="receipt-label whitespace-nowrap">Holder's Name:</span>
                        <span className="receipt-handwritten flex-grow">
                            {user ? `${user.first_name} ${user.last_name}` : 'N/A'}
                        </span>
                    </div>

                    <div className="flex items-end">
                        <span className="receipt-label whitespace-nowrap">Address:</span>
                        <span className="receipt-handwritten flex-grow">
                            {user?.address || 'Freetown, Sierra Leone'}
                        </span>
                    </div>

                    <div className="flex items-end">
                        <span className="receipt-label whitespace-nowrap">Issuing Officer:</span>
                        <span className="receipt-handwritten flex-grow">
                            System Generated
                        </span>
                    </div>

                    <div className="flex items-end">
                        <span className="receipt-label whitespace-nowrap">Designation:</span>
                        <span className="receipt-handwritten flex-grow">
                            CCRSMS Digital Service
                        </span>
                    </div>
                </div>

                {/* Footer Micro-text */}
                <div className="mt-12 pt-8 text-center text-[10px] opacity-40 font-sans tracking-widest">
                    S/10/18/200bks/5.18.
                </div>

                {/* Official Stamp Look (Optional CSS Trick) */}
                <div className="absolute bottom-16 right-16 w-32 h-32 border-4 border-red-700/20 rounded-full flex items-center justify-center rotate-12 pointer-events-none">
                    <div className="border-2 border-red-700/20 rounded-full w-[90%] h-[90%] flex flex-col items-center justify-center leading-none text-red-700/20 font-bold text-center">
                        <span className="text-[10px]">PAID</span>
                        <span className="text-sm underline">SUCCESS</span>
                        <span className="text-[8px] uppercase">{date}</span>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="no-print flex flex-col md:flex-row gap-4 w-full max-w-md">
                <Button
                    onClick={handlePrint}
                    variant="primary"
                    className="flex-1 flex items-center justify-center gap-2 py-4 text-lg shadow-xl hover:scale-105 transition-transform"
                >
                    <FaPrint /> Print Receipt
                </Button>
                <Button
                    variant="outline"
                    onClick={() => navigate('/citizen/payments')}
                    className="flex-1 flex items-center justify-center gap-2 py-4"
                >
                    <FaHome /> Return Home
                </Button>
            </div>

            <p className="no-print mt-8 text-gray-500 text-sm italic">
                A copy of this receipt has also been sent to your registered email.
            </p>
        </div>
    );
};

export default PaymentSuccess;
