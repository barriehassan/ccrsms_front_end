import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle, FaCreditCard, FaLock } from 'react-icons/fa';
import { servicesData } from '../../data/publicData';
import Button from '../../components/UI/Button';
import Swal from 'sweetalert2';

const ServiceDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const service = servicesData.find(s => s.id === id);

    if (!service) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-secondary">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Service Not Found</h2>
                <Button onClick={() => navigate('/services')} variant="outline">Back to Services</Button>
            </div>
        );
    }

    const Icon = service.icon;

    const handlePayment = () => {
        Swal.fire({
            title: `<div class="flex items-center gap-2 justify-center text-primary"><span class="text-2xl"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM57.6 224h181.6v216H54.1c-3.1 0-5.6-2.5-5.6-5.6V227.6c0-1.8 1.4-3.6 3.1-3.6zM286.4 224h232v210.4c0 3.1-2.5 5.6-5.6 5.6H286.4V224zm-48-152h280v104H54.1c-3.1 0-5.6-2.5-5.6-5.6V77.6c0-1.8 1.4-3.6 3.1-3.6h186.8zm280 0v104h-280V72h280z"></path></svg></span> Secure Payment</div>`,
            html: `
                <div class="text-left">
                    <p class="text-sm text-gray-500 mb-4 text-center">Complete your payment for <strong>${service.title}</strong></p>
                    
                    <label class="block text-sm font-medium text-gray-700 mb-1">Card Holder Name</label>
                    <input id="swal-input1" class="swal2-input w-full mx-0 mb-4" placeholder="John Doe">
                    
                    <label class="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <div class="relative">
                        <input id="swal-input2" class="swal2-input w-full mx-0 mb-4 pl-10" placeholder="0000 0000 0000 0000">
                        <span class="absolute left-3 top-3.5 text-gray-400">💳</span>
                    </div>

                    <div class="flex gap-4">
                        <div class="w-1/2">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                            <input id="swal-input3" class="swal2-input w-full mx-0" placeholder="MM/YY">
                        </div>
                        <div class="w-1/2">
                             <label class="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                            <input id="swal-input4" class="swal2-input w-full mx-0" placeholder="123">
                        </div>
                    </div>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Pay Now',
            confirmButtonColor: '#0958d9',
            cancelButtonText: 'Cancel',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                const name = document.getElementById('swal-input1').value;
                const card = document.getElementById('swal-input2').value;

                if (!name || !card) {
                    Swal.showValidationMessage('Please fill in all fields');
                    return false
                }

                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve();
                    }, 2000);
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: 'success',
                    title: 'Payment Successful!',
                    text: 'Your transaction was approved. You will receive a receipt shortly.',
                    confirmButtonColor: '#0958d9'
                });
            }
        });
    };

    return (
        <div className="min-h-screen bg-secondary py-16" style={{
            paddingLeft: 70,
            paddingRight: 70
        }}>
            <div className="container mx-auto px-4">
                <Link to="/services" className="inline-flex items-center text-primary font-medium hover:underline mb-8">
                    <FaArrowLeft className="mr-2" /> Back to Services
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
                    <div className="md:flex">
                        <div className="md:w-1/3 bg-primary text-white p-12 flex flex-col items-center justify-center text-center">
                            <Icon className="text-8xl mb-6 opacity-90" />
                            <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
                            <div className="bg-white/10 px-6 py-2 rounded-full backdrop-blur-sm">
                                <span className="font-semibold">{service.price}</span>
                            </div>
                        </div>

                        <div className="md:w-2/3 p-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Overview</h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                {service.fullDesc}
                            </p>

                            <h3 className="text-xl font-bold text-gray-900 mb-4">Key Features</h3>
                            <ul className="grid md:grid-cols-2 gap-4 mb-10">
                                {service.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-3 text-gray-700">
                                        <FaCheckCircle className="text-green-500 flex-shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <div className="flex gap-4">
                                <Button size="lg" onClick={handlePayment} className="shadow-lg hover:translate-y-[-2px] transition-transform flex items-center gap-2">
                                    <FaLock /> Proceed to Payment
                                </Button>
                                <Button variant="outline" size="lg">
                                    Download Guide
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step-by-Step Guide */}
                <div className="bg-white rounded-2xl shadow-lg p-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How It Works</h2>
                    <div className="relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0"></div>

                        <div className="grid md:grid-cols-5 gap-8 relative z-10">
                            {service.steps && service.steps.map((step) => (
                                <div key={step.num} className="text-center group">
                                    <div className="w-16 h-16 bg-white border-4 border-primary text-primary rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                        {step.num}
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-900 mb-2">{step.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;
