import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaBullhorn, FaCheckCircle, FaCity, FaUsers, FaMobileAlt, FaChartLine, FaWhatsapp, FaArrowRight } from 'react-icons/fa';
import Button from '../../components/UI/Button';

import Hero_bg from "../../assets/fccfull.jpg"
import Mayor from "../../assets/yas2.jpeg"
import Why_Bg from "../../assets/why.jpg"

const Home = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden pt-16 p-10">
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-900 to-dark opacity-90 dark:opacity-95 z-10" />
          <img
            src={Hero_bg}
            alt="City Skyline"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Floating Shapes */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-20 -left-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-20 text-center md:text-left grid md:grid-cols-2 gap-12 items-center">
          <motion.div style={{ y: textY }}>
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-black mb-6 leading-tight text-white tracking-tight"
            >
              Better Cities, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-300">
                Brighter Futures.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-2xl mb-10 text-blue-50 max-w-xl leading-relaxed"
            >
              Join the digital revolution. Report issues, track fixes, and connect with your council in real-time.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <Link to="/auth/register">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-4 shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all hover:-translate-y-1">
                  Get Started <FaArrowRight className="ml-2 inline" />
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
                  Our Services
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Glass Card Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden md:block relative perspective-1000"
          >
            <div className="p-8 rounded-3xl transform rotate-y-12 hover:rotate-y-0 transition-transform duration-500 ease-out border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white text-xl">
                  <FaCheckCircle />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Pothole Reported</h3>
                  <p className="text-blue-200 text-sm">Just now • 32 Wilkinson Rd</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-2 bg-white/20 rounded-full w-3/4"></div>
                <div className="h-2 bg-white/20 rounded-full w-1/2"></div>
              </div>
              <div className="mt-8 flex justify-between items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-transparent" />
                  ))}
                </div>
                <div className="text-white font-bold text-sm bg-white/20 px-3 py-1 rounded-full">In Progress</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-30 -mt-10 px-4">
        <div className="container mx-auto">
          <div className="glass dark:glass rounded-2xl p-8 shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-200 dark:divide-gray-700">
              {[
                { label: "Citizens Registered", value: "15k+", color: "text-primary dark:text-blue-400" },
                { label: "Resolution Rate", value: "98%", color: "text-green-600 dark:text-green-400" },
                { label: "Avg. Response Time", value: "24h", color: "text-blue-500 dark:text-blue-300" },
                { label: "Communities Served", value: "50+", color: "text-purple-500 dark:text-purple-400" }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <h3 className={`text-4xl font-bold mb-2 ${stat.color}`}>{stat.value}</h3>
                  <p className="text-gray-900 dark:text-gray-300 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mayor's Message */}
      <section className="py-24 dark:bg-dark-bg transition-colors duration-300" style={{ paddingLeft: '5%', paddingRight: '5%' }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              className="md:w-1/3"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 rounded-2xl transform rotate-3 transition-transform group-hover:rotate-6"></div>
                <img src={Mayor} alt="City Mayor" className="relative rounded-2xl shadow-2xl w-full" />
              </div>
            </motion.div>
            <motion.div
              className="md:w-2/3"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">A Message from the Mayor</h2>
              <p className="text-xl text-gray-800 dark:text-gray-300 italic mb-6">"Together, we build the future."</p>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                "Welcome to our new digital council portal. This platform is a testament to our commitment to transparency, efficiency, and citizen engagement. By leveraging technology, we are ensuring that your voice is heard and that our city services are more accessible than ever before."
              </p>

              <div className="flex items-center gap-4 mt-8">
                <div>
                  <h4 className="font-bold text-lg text-dark dark:text-white">Hon. Yvonne Aki-Sawyerr OBE</h4>
                  <p className="text-primary dark:text-accent">Mayor, Freetown Municipality</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-24 bg-secondary dark:bg-dark-card transition-colors duration-300" style={{ paddingLeft: '5%', paddingRight: '5%' }}>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">How It Works</h2>
            <p className="dark:text-gray-200 max-w-2xl mx-auto">We've made it simple for you to contribute to your city's well-being. Here is how the process works from start to finish.</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-10">
            {[
              { icon: <FaBullhorn />, title: "1. Report an Issue", desc: "Spot a problem? Take a photo, describe the issue, and submit it through our easy-to-use portal.", color: "bg-blue-100 text-primary", hover: "group-hover:bg-primary group-hover:text-white" },
              { icon: <FaWhatsapp />, title: "2. WhatsApp Chat", desc: "Prefer social media? Send your complaint directly via WhatsApp for a quick interaction.", color: "bg-green-100 text-green-600", hover: "group-hover:bg-green-600 group-hover:text-white", link: true },
              { icon: <FaChartLine />, title: "3. Track Progress", desc: "Get real-time updates as our teams assess and assign your complaint. You'll never be left in the dark.", color: "bg-purple-100 text-purple-600", hover: "group-hover:bg-purple-600 group-hover:text-white" },
              { icon: <FaCheckCircle />, title: "4. Problem Solved", desc: "Receive a notification when the work is done. Rate the service and help us maintain high standards.", color: "bg-teal-100 text-teal-600", hover: "group-hover:bg-teal-600 group-hover:text-white" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass2 dark:glass-dark p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 text-center group dark:border dark:border-black-800"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-6 transition-colors ${item.color} ${item.hover}`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {item.desc}
                </p>
                {item.link && (
                  <a
                    href="https://wa.me/23231107795?text=Hello%20Freetown%20City%20Council,%20I%20would%20like%20to%20report%20a%20complaint."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-green-600 font-bold hover:underline"
                  >
                    Chat Now
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white dark:bg-dark-bg transition-colors duration-300 relative overflow-hidden" style={{ paddingLeft: '5%', paddingRight: '5%' }}>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Empowering Citizens, <br /> Transforming Cities</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                CCRSMS is more than just a reporting tool; it's a bridge between the municipal council and the community. We believe in transparency, accountability, and rapid action.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: <FaCity />, text: "Direct line to city departments" },
                  { icon: <FaMobileAlt />, text: "Mobile-first design for on-the-go reporting" },
                  { icon: <FaUsers />, text: "Community-driven prioritization" }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-primary/10 text-primary dark:text-accent dark:bg-accent/10 text-xl">{item.icon}</span>
                    <span className="text-gray-900 dark:text-gray-300 font-medium">{item.text}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link to="/about">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white dark:border-accent dark:text-accent dark:hover:bg-accent dark:hover:text-dark">Learn More About Us</Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute -inset-4 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
              <img
                src={Why_Bg}
                alt="City Infrastructure"
                className="rounded-2xl shadow-2xl relative z-10 w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>
      {/* Latest News */}
      <section className="py-24 bg-gray-50 dark:bg-dark-card transition-colors duration-300" style={{ paddingLeft: '5%', paddingRight: '5%' }}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-white mb-2">Latest News & Updates</h2>
              <p className="dark:text-gray-200">Stay informed about what is happening in your city.</p>
            </div>
            <Button variant="outline" className="dark:border-gray-600 dark:hover:bg-gray-700">View All News</Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            
            {/* News Item 1 */}
            <div className="group cursor-pointer">
              <div className="rounded-2xl overflow-hidden shadow-lg mb-6 relative">
                <img
                  src="/images/news_infrastructure.jpg"
                  alt="Upgrade of City Infrastructure"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-accent text-dark text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Infrastructure
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors leading-tight dark:text-white">
                Upgrade of City Infrastructure
              </h3>
              <p className="text-gray-500 mb-4 line-clamp-2">
                The Council is embarking on major road maintenance and drainage clearing projects across the central district...
              </p>
              <span className="text-primary font-bold text-sm uppercase tracking-wide group-hover:underline">Read Full Story</span>
            </div>

            {/* News Item 2 */}
            <div className="group cursor-pointer">
              <div className="rounded-2xl overflow-hidden shadow-lg mb-6 relative">
                <img
                  src="/images/news_sanitation.jpg"
                  alt="Community Clean-up Initiative"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Sanitation
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors leading-tight dark:text-white">
                Community Clean-up Initiative
              </h3>
              <p className="text-gray-500 mb-4 line-clamp-2">
                Join us this Saturday for the city-wide cleaning exercise. Trucks will be available for waste collection...
              </p>
              <span className="text-primary font-bold text-sm uppercase tracking-wide group-hover:underline">Read Full Story</span>
            </div>

            {/* News Item 3 */}
            <div className="group cursor-pointer">
              <div className="rounded-2xl overflow-hidden shadow-lg mb-6 relative">
                <img
                  src="/images/news_community.jpg"
                  alt="Engaging Local Communities"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Community
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors leading-tight dark:text-white">
                Engaging Local Communities
              </h3>
              <p className="text-gray-500 mb-4 line-clamp-2">
                FCC officials met with community leaders to discuss the rollout of the new digital property rate collection system...
              </p>
              <span className="text-primary font-bold text-sm uppercase tracking-wide group-hover:underline">Read Full Story</span>
            </div>

              
          
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-dark to-gray-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <motion.div
          className="container mx-auto px-4 relative z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of other citizens who are actively contributing to a cleaner, safer, and better city.
          </p>
          <Link to="/auth/register">
            <Button size="lg" className="bg-accent text-dark hover:bg-white hover:text-primary font-bold text-lg px-10 py-5 shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all hover:-translate-y-1">
              Get Started Now
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
