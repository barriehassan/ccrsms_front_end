import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle, FaCreditCard, FaLock } from 'react-icons/fa';
import { servicesData } from '../../data/publicData';
import Button from '../../components/UI/Button';
import Swal from 'sweetalert2';
// import PaymentModal from '../../components/UI/PaymentModal';

const ServiceDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

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

    const handlePaymentSuccess = (paymentMethod) => {
        setIsPaymentModalOpen(false);
        Swal.fire({
            icon: 'success',
            title: 'Payment Successful!',
            html: `Transaction ID: <strong>${paymentMethod.id}</strong><br/>Receipt sent to email.`,
            confirmButtonColor: '#0958d9'
        });
    };

    return (
        <div className="min-h-screen bg-secondary dark:bg-dark-bg transition-colors duration-300 py-16" style={{
            paddingLeft: 70,
            paddingRight: 70
        }}>
            <div className="container mx-auto px-4">
                <Link to="/services" className="inline-flex items-center text-primary dark:text-accent font-medium hover:underline mb-8">
                    <FaArrowLeft className="mr-2" /> Back to Services
                </Link>

                <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl overflow-hidden mb-12 dark:border dark:border-gray-700">
                    <div className="md:flex">
                        <div className="md:w-1/3 bg-primary dark:bg-blue-900 text-white p-12 flex flex-col items-center justify-center text-center">
                            <Icon className="text-8xl mb-6 opacity-90" />
                            <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
                            <div className="bg-white/10 px-6 py-2 rounded-full backdrop-blur-sm">
                                <span className="font-semibold">{service.price}</span>
                            </div>
                        </div>

                        <div className="md:w-2/3 p-12">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Service Overview</h2>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                                {service.fullDesc}
                            </p>

                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Features</h3>
                            <ul className="grid md:grid-cols-2 gap-4 mb-10">
                                {service.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                        <FaCheckCircle className="text-green-500 flex-shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <div className="flex gap-4">
                                <Button size="lg" onClick={() => setIsPaymentModalOpen(true)} className="shadow-lg hover:translate-y-[-2px] transition-transform flex items-center gap-2 dark:bg-primary dark:text-white">
                                    <FaLock /> Proceed to Payment
                                </Button>
                                <Button variant="outline" size="lg" className="dark:border-white dark:text-white dark:hover:bg-white/10">
                                    Download Guide
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step-by-Step Guide */}
                <div className="bg-white dark:bg-dark-card rounded-2xl shadow-lg p-12 dark:border dark:border-gray-700">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">How It Works</h2>
                    <div className="relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 z-0"></div>

                        <div className="grid md:grid-cols-5 gap-8 relative z-10">
                            {service.steps && service.steps.map((step) => (
                                <div key={step.num} className="text-center group">
                                    <div className="w-16 h-16 bg-white dark:bg-dark-bg border-4 border-primary dark:border-accent text-primary dark:text-accent rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 relative z-10">
                                        {step.num}
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{step.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Stripe Payment Modal
            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                serviceName={service.title}
                amount={service.price}
                onSuccess={handlePaymentSuccess}
            /> */}
        </div>
    );
};

export default ServiceDetails;
