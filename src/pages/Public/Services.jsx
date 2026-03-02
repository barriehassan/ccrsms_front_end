import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { servicesData } from '../../data/publicData';
import Button from '../../components/UI/Button';
import ParallaxHero from '../../components/UI/ParallaxHero';

const Services = () => {
    return (
        <div className="min-h-screen bg-secondary dark:bg-dark-bg transition-colors duration-300">
            {/* Header */}
            <ParallaxHero
                title="Our Services"
                subtitle="Efficient, transparent, and digital. We bring municipal services directly to your fingertips."
                image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                height="min-h-[50vh]"
            />

            {/* Services Grid */}
            <section className="py-20 container mx-auto px-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {servicesData.map((service) => (
                        <div key={service.id} className="bg-white dark:bg-dark-card p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col dark:border dark:border-gray-800">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-primary dark:text-accent text-3xl shrink-0">
                                    <service.icon />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">{service.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">{service.price}</p>
                                </div>
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 flex-grow">
                                {service.shortDesc}
                            </p>

                            <Link to={`/services/${service.id}`}>
                                <Button className="w-full justify-between group dark:bg-primary dark:text-white">
                                    View Details
                                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-white dark:bg-dark-card text-center dark:border-t dark:border-gray-800">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Need help with a service?</h2>
                    <Link to="/contact">
                        <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white dark:border-accent dark:text-accent dark:hover:bg-accent dark:hover:text-dark">Contact Support</Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Services;
