import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { servicesData } from '../../data/publicData';
import Button from '../../components/UI/Button';

const Services = () => {
    return (
        <div className="min-h-screen bg-secondary font-sans">
            {/* Header */}
            {/* Header */}
            <section className="relative bg-primary text-white py-32 lg:py-40 text-center overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Freetown_Sierra_Leone_2.jpg/1280px-Freetown_Sierra_Leone_2.jpg')] bg-cover bg-center"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg">Our Services</h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto text-blue-100 font-light drop-shadow-md">
                        Efficient, transparent, and digital. Delivering municipal services directly to the people of Freetown.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-24 container mx-auto px-4 lg:px-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
                    {servicesData.map((service) => (
                        <div key={service.id} className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col group">
                            <div className="flex items-center gap-6 mb-8">
                                <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center text-primary text-4xl shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-sm">
                                    <service.icon />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors">{service.title}</h3>
                                    <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mt-2 bg-gray-100 inline-block px-2 py-1 rounded">{service.price}</p>
                                </div>
                            </div>

                            <p className="text-gray-600 text-lg leading-relaxed mb-10 flex-grow border-l-2 border-gray-100 pl-4">
                                {service.shortDesc}
                            </p>

                            <Link to={`/services/${service.id}`}>
                                <Button className="w-full justify-between group h-14 text-lg font-semibold bg-gray-50 text-gray-800 hover:bg-primary hover:text-white border-0">
                                    View Service Details
                                    <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                                </Button>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-white text-center border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Need help with a service?</h2>
                    <p className="text-gray-600 mb-10 text-lg max-w-2xl mx-auto">Our support team is available to assist you with any inquiries regarding the application process.</p>
                    <Link to="/contact">
                        <Button variant="outline" size="lg" className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-10 py-4 font-bold rounded-full transition-all">Contact Support</Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Services;
