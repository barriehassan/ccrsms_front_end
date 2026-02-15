import { FaHandshake, FaLightbulb, FaShieldAlt } from 'react-icons/fa';
import { developersData } from '../../data/publicData';

const About = () => {
    return (
        <div className="min-h-screen font-sans">
            {/* Header */}
            {/* Header */}
            <section className="relative bg-primary text-white py-32 lg:py-40 text-center overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg">About CCRSMS</h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto text-blue-100 font-light drop-shadow-md">
                        Dedicated to improving urban living through technology and community engagement in Freetown.
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 lg:px-12">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="order-2 md:order-1">
                            <h2 className="text-3xl font-bold text-dark mb-6">Our Mission</h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8 border-l-4 border-primary pl-4">
                                To provide a seamless, transparent, and efficient platform for citizens to report municipal issues, ensuring that every voice is heard and every problem is addressed promptly. We strive to bridge the gap between the public and the Freetown City Council.
                            </p>
                            <h2 className="text-3xl font-bold text-dark mb-6">Our Vision</h2>
                            <p className="text-gray-600 text-lg leading-relaxed border-l-4 border-accent pl-4">
                                A smart, responsive, and well-maintained city where technology empowers citizens to be active participants in their community's development towards the #TransformFreetown agenda.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 order-1 md:order-2">
                            <img
                                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop"
                                alt="Freetown Community"
                                className="rounded-2xl shadow-xl w-full h-64 object-cover transform translate-y-8"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop"
                                alt="Modern Technology"
                                className="rounded-2xl shadow-xl w-full h-64 object-cover transform -translate-y-8"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 bg-secondary">
                <div className="container mx-auto px-4 lg:px-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-dark mb-16">Our Core Values</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow group">
                            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <FaHandshake className="text-4xl text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900">Transparency</h3>
                            <p className="text-gray-600 leading-relaxed">We believe in open communication and real-time updates for every report submitted, fostering trust.</p>
                        </div>
                        <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow group">
                            <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <FaLightbulb className="text-4xl text-yellow-500" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900">Innovation</h3>
                            <p className="text-gray-600 leading-relaxed">Leveraging state-of-the-art technology to solve age-old urban challenges efficiently and sustainably.</p>
                        </div>
                        <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow group">
                            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <FaShieldAlt className="text-4xl text-green-500" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900">Integrity</h3>
                            <p className="text-gray-600 leading-relaxed">Handling every complaint with fairness, privacy, and dedication to resolution without bias.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Meet the Developers */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 lg:px-12">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Meet the Minds Behind CCRSMS</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            A dedicated team of developers working tirelessly to build a smarter, better city for everyone.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                        {developersData.map((dev) => (
                            <div key={dev.id} className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group">
                                <div className="overflow-hidden h-64 relative bg-gray-100">
                                    <img
                                        src={dev.image}
                                        alt={dev.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="font-bold text-lg text-gray-900 mb-1">{dev.name}</h3>
                                    <p className="text-primary text-sm font-semibold uppercase tracking-wide">{dev.role}</p>
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

