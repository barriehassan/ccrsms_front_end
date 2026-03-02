import { useNavigate } from 'react-router-dom';
import { FaHome, FaTrashAlt, FaStore, FaBriefcase, FaArrowRight } from 'react-icons/fa';
import Card from '../../../components/UI/Card';
import Button from '../../../components/UI/Button';

const PaymentSelection = () => {
    const navigate = useNavigate();

    const paymentTypes = [
        {
            id: 'local-tax',
            title: 'Local Tax',
            icon: FaHome,
            desc: 'Annual local tax for residents in freetown over the age of 18.',
            color: 'blue',
            type: 'LOCAL_TAX'
        },
        {
            id: 'city-rate',
            title: 'City Rate',
            icon: FaStore,
            desc: 'Property or business city rate fees with flexible installment payment options.',
            color: 'orange',
            type: 'CITY_RATE'
        },
        {
            id: 'waste',
            title: 'Waste Collection',
            icon: FaTrashAlt,
            desc: 'Subscription fees for municipal waste collection services.',
            color: 'green',
            type: 'WASTE_COLLECTION'
        },
        {
            id: 'license',
            title: 'Business License',
            icon: FaBriefcase,
            desc: 'Annual operating license fees for local businesses.',
            color: 'purple',
            type: 'BUSINESS_LICENSE'
        },
    ];

    const handleSelect = (type) => {
        navigate('/citizen/payments/checkout', { state: { type: type.type, title: type.title } });
    };

    return (
        <div className="p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Select Service Type</h1>
                <p className="text-gray-500">Choose a category to proceed with your payment.</p>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl">
                {paymentTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                        <Card key={type.id} className="p-6 hover:shadow-lg transition-shadow border border-transparent hover:border-primary cursor-pointer group" onClick={() => handleSelect(type)}>
                            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white mb-4" style={{ backgroundColor: `var(--color-${type.color}-600, ${type.color === 'blue' ? '#2563eb' : type.color === 'green' ? '#16a34a' : type.color === 'orange' ? '#f97316' : '#9333ea'})` }}>
                                <Icon className="text-xl" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{type.title}</h3>
                            <p className="text-gray-600 mb-6 min-h-[48px]">{type.desc}</p>

                            <div className="flex justify-end">
                                <span className="text-primary font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                                    Proceed <FaArrowRight />
                                </span>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default PaymentSelection;
