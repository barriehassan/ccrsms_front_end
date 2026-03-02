import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaQuestionCircle, FaWhatsapp } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import { faqs } from '../../data/publicData';
import ParallaxHero from '../../components/UI/ParallaxHero';

// Fix for default marker icon issue in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Contact = () => {
    // Freetown City Council coordinates
    const position = [8.484, -13.229];

    return (
        <div className="min-h-screen bg-secondary dark:bg-dark-bg transition-colors duration-300">
            {/* Header */}
            <ParallaxHero
                title="Contact Us"
                subtitle="Have questions or need assistance? We're here to help."
                image="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
                height="min-h-[50vh]"
            />

            <section className="py-16 container mx-auto px-4" style={{
                paddingLeft: 70,
                paddingRight: 70
            }}>
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-dark dark:text-white mb-6">Get in Touch</h2>
                            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
                                Whether you have a question about a report, need technical support, or want to provide feedback, our team is ready to assist you.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white dark:bg-dark-card shadow-sm rounded-full flex items-center justify-center text-primary dark:text-accent text-xl shrink-0 dark:border dark:border-gray-700">
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">Visit Us</h3>
                                    <p className="text-gray-600 dark:text-gray-400">17 Wallace Johnson Street<br />Freetown, Sierra Leone</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white dark:bg-dark-card shadow-sm rounded-full flex items-center justify-center text-primary dark:text-accent text-xl shrink-0 dark:border dark:border-gray-700">
                                    <FaPhone />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">Call Us</h3>
                                    <p className="text-gray-600 dark:text-gray-400">+232 76 107 333 /+232 31 107 795<br />Mon - Fri, 8am - 5pm</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white dark:bg-dark-card shadow-sm rounded-full flex items-center justify-center text-primary dark:text-accent text-xl shrink-0 dark:border dark:border-gray-700">
                                    <FaEnvelope />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">Email Us</h3>
                                    <p className="text-gray-600 dark:text-gray-400">support@mcrsms.gov.sl<br />info@mcrsms.gov.sl</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white dark:bg-dark-card shadow-sm rounded-full flex items-center justify-center text-green-600 text-xl shrink-0 dark:border dark:border-gray-700">
                                    <FaWhatsapp />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">WhatsApp Support</h3>
                                    <p className="text-gray-600 dark:text-gray-400">+232 76 107 333<br />Available for instant alerts</p>
                                    <a
                                        href="https://wa.me/23276107333"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-green-600 font-medium hover:underline text-sm"
                                    >
                                        Start Chat
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <Card className="p-8 glass2 dark:bg-dark-card dark:border-gray-700 text-gray-800 dark:text-gray-200">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h3>
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <Input label="Name" placeholder="Your Name" />
                                <Input label="Email" type="email" placeholder="Your Email" />
                            </div>
                            <Input label="Subject" placeholder="How can we help?" />
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-gray-700 dark:text-white">Message</label>
                                <textarea
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all dark:bg-dark"
                                    placeholder="Write your message here..."
                                ></textarea>
                            </div>
                            <Button className="w-full py-3 text-lg">Send Message</Button>
                        </form>
                    </Card>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-16 bg-white dark:bg-dark-card transition-colors duration-300">
                <div className="container mx-auto px-4" style={{ paddingLeft: 70, paddingRight: 70 }}>
                    <h2 className="text-3xl font-bold text-center text-dark dark:text-white mb-8">Find Us on the Map</h2>
                    <div className="rounded-xl overflow-hidden shadow-lg border-2 border-white dark:border-gray-700" style={{ height: '400px' }}>
                        <MapContainer center={position} zoom={15} style={{ height: '100%', width: '100%' }}>
                            <LayersControl position="topright">
                                <LayersControl.BaseLayer checked name="Google Maps">
                                    <TileLayer
                                        attribution='&copy; Google Maps'
                                        url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                                    />
                                </LayersControl.BaseLayer>
                                <LayersControl.BaseLayer name="Satellite View">
                                    <TileLayer
                                        attribution='&copy; Google Maps'
                                        url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
                                    />
                                </LayersControl.BaseLayer>
                            </LayersControl>
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
            </section>

            {/* WhatsApp QR Section */}
            <section className="py-16 bg-green-50 dark:bg-green-900/10">
                <div className="container mx-auto px-4 text-center" style={{ paddingLeft: 70, paddingRight: 70 }}>
                    <FaWhatsapp className="text-6xl text-green-500 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-dark dark:text-white mb-4">Scan to Report via WhatsApp</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto">
                        Quickly report any issue by scanning the QR code below. It opens an instant chat with our municipal support team.
                    </p>
                    <div className="bg-white p-4 rounded-3xl shadow-2xl inline-block border-8 border-green-500/20 transform hover:scale-105 transition-transform">
                        <img
                            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://wa.me/23231107795?text=Hello%20Freetown%20City%20Council,%20I%20would%20like%20to%20report%20a%20complaint."
                            alt="WhatsApp QR Code"
                            className="w-48 h-48"
                        />
                        <div className="mt-4 text-xs font-bold text-green-600 uppercase tracking-widest">Official Support Channel</div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center text-dark dark:text-white mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-sm dark:border dark:border-gray-700">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-start gap-3">
                                    <FaQuestionCircle className="text-primary dark:text-accent mt-1 shrink-0" />
                                    {faq.question}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mt-2 ml-8">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Social Media */}
            <section className="py-12 bg-dark text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold mb-8">Connect With Us</h2>
                    <div className="flex justify-center gap-8">
                        <a href="https://www.facebook.com/FreetownCityCouncil" className="hover:text-primary transition-colors text-3xl"><FaFacebook /></a>
                        <a href="https://wa.me/23276107333" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors text-3xl"><FaWhatsapp /></a>
                        <a href="https://x.com/FCC_Freetown" className="hover:text-primary transition-colors text-3xl"><FaTwitter /></a>
                        <a href="#" className="hover:text-primary transition-colors text-3xl"><FaLinkedin /></a>
                        <a href="#" className="hover:text-primary transition-colors text-3xl"><FaInstagram /></a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
