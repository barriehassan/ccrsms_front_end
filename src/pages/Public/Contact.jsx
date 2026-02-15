import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaQuestionCircle } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import { faqs } from '../../data/publicData';

// Fix for default marker icon issue in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Contact = () => {
    // Freetown City Council coordinates
    const position = [8.484, -13.229]; // Corrected Approx coordinates for FCC

    return (
        <div className="min-h-screen bg-secondary font-sans">
            {/* Header */}
            {/* Header */}
            <section className="relative bg-primary text-white py-32 lg:py-40 text-center overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Freetown_Sierra_Leone_Street_Scene.jpg/1280px-Freetown_Sierra_Leone_Street_Scene.jpg')] bg-cover bg-center"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg">Contact Us</h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto text-blue-100 font-light drop-shadow-md">
                        Have questions or need assistance? We're here to help you navigate our city services.
                    </p>
                </div>
            </section>

            <section className="py-24 container mx-auto px-4 lg:px-12 relative -mt-20 z-20">
                <div className="grid md:grid-cols-2 gap-10">
                    {/* Contact Info */}
                    <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100 h-full">
                        <h2 className="text-3xl font-bold text-dark mb-8">Get in Touch</h2>
                        <p className="text-gray-600 text-lg mb-12 leading-relaxed">
                            Whether you have a question about a report, need technical support, or want to provide feedback, our team is ready to assist you.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-6 group">
                                <div className="w-14 h-14 bg-blue-50 group-hover:bg-primary transition-colors rounded-full flex items-center justify-center text-primary group-hover:text-white text-2xl shrink-0">
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl text-gray-900">Visit Us</h3>
                                    <p className="text-gray-600 leading-relaxed mt-1">17 Wallace Johnson Street<br />Freetown, Sierra Leone</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="w-14 h-14 bg-blue-50 group-hover:bg-primary transition-colors rounded-full flex items-center justify-center text-primary group-hover:text-white text-2xl shrink-0">
                                    <FaPhone />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl text-gray-900">Call Us</h3>
                                    <p className="text-gray-600 leading-relaxed mt-1">+232 76 107 333<br />+232 31 107 795<br /><span className="text-sm text-gray-400">Mon - Fri, 8am - 5pm</span></p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="w-14 h-14 bg-blue-50 group-hover:bg-primary transition-colors rounded-full flex items-center justify-center text-primary group-hover:text-white text-2xl shrink-0">
                                    <FaEnvelope />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl text-gray-900">Email Us</h3>
                                    <p className="text-gray-600 leading-relaxed mt-1">support@fcc.gov.sl<br />info@fcc.gov.sl</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100 h-full">
                        <h3 className="text-3xl font-bold text-gray-900 mb-8">Send a Message</h3>
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <Input label="Name" placeholder="Your Name" className="bg-gray-50 border-gray-200 focus:bg-white" />
                                <Input label="Email" type="email" placeholder="Your Email" className="bg-gray-50 border-gray-200 focus:bg-white" />
                            </div>
                            <Input label="Subject" placeholder="How can we help?" className="bg-gray-50 border-gray-200 focus:bg-white" />
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">Message</label>
                                <textarea
                                    rows="5"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-gray-50 focus:bg-white resize-none"
                                    placeholder="Write your message here..."
                                ></textarea>
                            </div>
                            <Button className="w-full py-4 text-lg font-bold shadow-lg mt-4">Send Message</Button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-0 pb-20">
                <div className="container mx-auto px-4 lg:px-12">
                    <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100">
                        <div className="rounded-xl overflow-hidden h-[450px] z-0 relative">
                            <MapContainer center={position} zoom={15} style={{ height: '100%', width: '100%' }}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={position}>
                                    <Popup>
                                        <strong>Freetown City Council</strong><br />
                                        17 Wallace Johnson Street<br />
                                        Freetown, Sierra Leone
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 lg:px-12 max-w-5xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-dark mb-16">Frequently Asked Questions</h2>
                    <div className="grid gap-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <h3 className="font-bold text-xl text-gray-900 flex items-start gap-4 mb-4">
                                    <FaQuestionCircle className="text-primary mt-1 shrink-0 text-2xl" />
                                    {faq.question}
                                </h3>
                                <p className="text-gray-600 ml-10 text-lg leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Social Media */}
            <section className="py-16 bg-dark text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold mb-8">Connect With Us</h2>
                    <div className="flex justify-center gap-8">
                        <a href="#" className="hover:text-primary transition-all hover:scale-110 text-4xl"><FaFacebook /></a>
                        <a href="#" className="hover:text-primary transition-all hover:scale-110 text-4xl"><FaTwitter /></a>
                        <a href="#" className="hover:text-primary transition-all hover:scale-110 text-4xl"><FaLinkedin /></a>
                        <a href="#" className="hover:text-primary transition-all hover:scale-110 text-4xl"><FaInstagram /></a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
