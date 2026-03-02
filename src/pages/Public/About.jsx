import { FaHandshake, FaLightbulb, FaShieldAlt } from 'react-icons/fa';
import { developersData } from '../../data/publicData';
import ParallaxHero from '../../components/UI/ParallaxHero';

import Comm from "../../assets/comm.jpg"
import Tech from "../../assets/tech.jpg"

const About = () => {
    return (
        <div className="min-h-screen">
            {/* Header */}
            <ParallaxHero
                title="About CCRSMS"
                subtitle="Dedicated to improving urban living through technology and community engagement."
                image="https://images.unsplash.com/photo-1517089152318-42ec560349c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                height="min-h-[50vh]"
            />

            {/* Mission & Vision */}
            <section className="py-16 bg-white dark:bg-dark-bg transition-colors duration-300" style={{
                paddingLeft: 70,
                paddingRight: 70
            }}>
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-dark dark:text-white mb-6">Our Mission</h2>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                                To provide a seamless, transparent, and efficient platform for citizens to report municipal issues, ensuring that every voice is heard and every problem is addressed promptly. We strive to bridge the gap between the public and local administration.
                            </p>
                            <h2 className="text-3xl font-bold text-dark dark:text-white mb-6">Our Vision</h2>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                                A smart, responsive, and well-maintained city where technology empowers citizens to be active participants in their community's development and maintenance.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <img src={Comm} alt="Community" className="rounded-lg shadow-lg w-full h-full object-cover" />
                            <img src={Tech} alt="Technology" className="rounded-lg shadow-lg w-full h-full object-cover mt-8" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-16 bg-secondary dark:bg-dark-card transition-colors duration-300" style={{
                paddingLeft: 70,
                paddingRight: 70
            }}>
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-dark dark:text-white mb-12">Our Core Values</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white dark:bg-dark-bg p-8 rounded-xl shadow-md text-center dark:border dark:border-gray-800">
                            <FaHandshake className="text-5xl text-primary dark:text-accent mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-3 dark:text-white">Transparency</h3>
                            <p className="text-gray-600 dark:text-gray-400">We believe in open communication and real-time updates for every report submitted.</p>
                        </div>
                        <div className="bg-white dark:bg-dark-bg p-8 rounded-xl shadow-md text-center dark:border dark:border-gray-800">
                            <FaLightbulb className="text-5xl text-yellow-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-3 dark:text-white">Innovation</h3>
                            <p className="text-gray-600 dark:text-gray-400">Leveraging modern technology to solve age-old urban challenges efficiently.</p>
                        </div>
                        <div className="bg-white dark:bg-dark-bg p-8 rounded-xl shadow-md text-center dark:border dark:border-gray-800">
                            <FaShieldAlt className="text-5xl text-green-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-3 dark:text-white">Integrity</h3>
                            <p className="text-gray-600 dark:text-gray-400">Handling every complaint with fairness, privacy, and dedication to resolution.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Meet the Developers */}
            <section className="py-20 bg-white dark:bg-dark-bg transition-colors duration-300" style={{
                paddingLeft: 70,
                paddingRight: 70
            }}>
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">Meet the Minds Behind MCRSMS</h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            A dedicated team of developers working tirelessly to build a smarter, better city for everyone.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {developersData.map((dev) => (
                            <div key={dev.id} className="glass2 dark:bg-dark-card rounded-xl overflow-hidden hover:shadow-lg transition-shadow text-center group dark:border dark:border-gray-700">
                                <div className="overflow-hidden h-64">
                                    <img
                                        src={dev.image}
                                        alt={dev.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{dev.name}</h3>
                                    <p className="text-primary dark:text-accent text-sm font-medium mb-3">{dev.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
