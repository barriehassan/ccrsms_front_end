import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBullhorn, FaCheckCircle, FaCity, FaUsers, FaMobileAlt, FaChartLine, FaLeaf, FaBuilding } from 'react-icons/fa';
import Button from '../../components/UI/Button';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative text-white py-32 lg:py-48 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Freetown_from_harbour.jpg/1280px-Freetown_from_harbour.jpg"
            alt="Freetown Cityscape from Harbour"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Freetown_Sierra_Leone.jpg/1280px-Freetown_Sierra_Leone.jpg";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/60 mix-blend-multiply"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-lg">
              Transform <span className="text-accent">Freetown</span> <br />
              <span className="text-3xl md:text-5xl font-semibold text-blue-200">Building a Better Community, Together.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-blue-100 font-light leading-relaxed drop-shadow-md">
              The Official Council Complaint Reporting System. Empowering citizens to report issues, track progress, and improve our city's infrastructure and services.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link to="/auth/register">
              <Button size="lg" className="w-full sm:w-auto text-lg px-10 py-4 shadow-2xl hover:scale-105 hover:shadow-blue-500/50 transition-all duration-300 bg-accent hover:bg-yellow-500 text-slate-900 font-bold border-none">
                Report an Issue
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-10 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold backdrop-blur-sm transition-all duration-300">
                Explore Services
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white shadow-lg -mt-10 relative z-20 container mx-auto rounded-2xl max-w-6xl border border-gray-100 transform hover:-translate-y-1 transition-transform duration-300">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
          <div className="p-4 group">
            <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">15k+</h3>
            <p className="text-gray-500 font-medium uppercase tracking-wide text-sm">Citizens Registered</p>
          </div>
          <div className="p-4 group">
            <h3 className="text-4xl md:text-5xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">98%</h3>
            <p className="text-gray-500 font-medium uppercase tracking-wide text-sm">Resolution Rate</p>
          </div>
          <div className="p-4 group">
            <h3 className="text-4xl md:text-5xl font-bold text-blue-500 mb-2 group-hover:scale-110 transition-transform duration-300">24h</h3>
            <p className="text-gray-500 font-medium uppercase tracking-wide text-sm">Avg. Response Time</p>
          </div>
          <div className="p-4 group">
            <h3 className="text-4xl md:text-5xl font-bold text-purple-500 mb-2 group-hover:scale-110 transition-transform duration-300">50+</h3>
            <p className="text-gray-500 font-medium uppercase tracking-wide text-sm">Communities Served</p>
          </div>
        </div>
      </section>

      {/* Mayor's Message */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-5/12 relative">
              <div className="absolute -inset-4 bg-accent/20 rounded-3xl rotate-3 blur-lg"></div>
              <img
                src="/images/mayor_aki_sawyerr.jpg"
                alt="Hon. Yvonne Aki-Sawyerr"
                className="rounded-3xl shadow-2xl w-full relative z-10 object-cover aspect-[4/5] hover:scale-[1.01] transition-transform duration-500"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/400x500/0958d9/ffffff?text=Mayor+Aki-Sawyerr";
                }}
              />
              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg z-20 border border-gray-100">
                <p className="font-bold text-gray-900">#TransformFreetown</p>
                <p className="text-xs text-primary">Official Initiative</p>
              </div>
            </div>
            <div className="lg:w-7/12">
              <div className="inline-block bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full font-semibold text-sm mb-6 border border-blue-100">
                Leadership
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                A Message from <br /> <span className="text-primary">Her Worship the Mayor</span>
              </h2>
              <blockquote className="text-xl md:text-2xl text-gray-600 italic mb-8 border-l-4 border-accent pl-6 py-2 leading-relaxed font-serif">
                "Our 'Transform Freetown' agenda is built on the belief that together, we can overcome our challenges. This digital portal is a major step towards transparency and efficiency. I urge every Freetownian to use this tool to help us keep our city clean, safe, and thriving."
              </blockquote>

              <div className="flex items-center gap-6 mt-10 border-t border-gray-100 pt-8">
                <div>
                  <h4 className="font-bold text-xl text-gray-900">Hon. Yvonne Aki-Sawyerr OBE</h4>
                  <p className="text-primary font-medium mt-1">Mayor, Freetown Municipality</p>
                </div>
                {/* Simulated Signature */}
                <div className="text-4xl font-cursive text-gray-400 font-bold ml-auto opacity-70" style={{ fontFamily: 'cursive' }}>
                  Yvonne Aki-Sawyerr
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-24 bg-secondary relative">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <FaLeaf className="text-9xl text-primary" />
        </div>

        <div className="container mx-auto px-4 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-dark mb-6">How It Works</h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
              We've streamlined the process for you to contribute to your city's well-being. Three simple steps to make a difference.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: FaBullhorn,
                title: "1. Report an Issue",
                desc: "Spot a problem? Take a photo, describe the issue (Sanitation, Roads, etc.), and submit it instantly via our portal."
              },
              {
                icon: FaCity,
                title: "2. Council Action",
                desc: "Our dedicated officers receive your report, verify the details, and assign it to the relevant department for rapid resolution."
              },
              {
                icon: FaCheckCircle,
                title: "3. Resolution & Feedback",
                desc: "Receive real-time notifications when the work is done. Verify the fix and rate our service to help us improve."
              }
            ].map((step, idx) => (
              <div key={idx} className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-gray-50 w-24 h-24 rounded-bl-full -mr-4 -mt-4 z-0 group-hover:bg-blue-50 transition-colors"></div>
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-blue-50 text-primary rounded-2xl flex items-center justify-center text-3xl mx-auto mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                    <step.icon />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-dark mb-4">Latest News & Updates</h2>
              <p className="text-gray-600 text-lg">Stay informed about development projects and council announcements.</p>
            </div>
            <Button variant="outline" className="border-gray-300 hover:border-primary hover:bg-primary hover:text-white transition-all">
              View All Announcements
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
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
              <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors leading-tight">
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
              <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors leading-tight">
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
              <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors leading-tight">
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
      <section className="py-24 bg-dark text-white text-center relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full blur-3xl mix-blend-screen"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent rounded-full blur-3xl mix-blend-screen"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Make a Difference?</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of Freetownians who are actively contributing to a cleaner, safer, and better city. Your voice matters.
          </p>
          <Link to="/auth/register">
            <Button size="lg" className="bg-accent text-dark hover:bg-white hover:text-primary font-bold text-lg px-12 py-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
