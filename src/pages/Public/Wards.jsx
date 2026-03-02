import { useState, useEffect } from 'react';
import { FaMapMarkedAlt, FaSearch, FaUsers, FaInfoCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { wardsData } from '../../data/publicData';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import ParallaxHero from '../../components/UI/ParallaxHero';

const Wards = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredWards = wardsData.filter(ward =>
        ward.id.toString().includes(searchTerm) ||
        ward.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ward.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Reset to page 1 when search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredWards.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredWards.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="min-h-screen font-sans bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
            {/* Hero Section */}
            <ParallaxHero
                title="Know Your Ward"
                subtitle="Discover the specific areas, boundaries, and demographics of your local ward. Verified information for informed citizens."
                image="https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?q=80&w=1974&auto=format&fit=crop"
                height="min-h-[50vh]"
            />

            {/* Search Section */}
            <section className="relative -mt-8 z-20 px-4">
                <div className="container mx-auto max-w-3xl bg-white dark:bg-dark-card p-4 rounded-full shadow-2xl flex items-center border border-gray-100 dark:border-gray-800 transition-colors duration-300">
                    <FaSearch className="text-gray-400 dark:text-gray-500 text-xl ml-4 mr-4" />
                    <input
                        type="text"
                        placeholder="Search by Ward Number (e.g., 401) or Area Name (e.g., Lumley)"
                        className="flex-grow text-lg py-3 px-2 outline-none text-gray-700 dark:text-gray-200 bg-transparent placeholder-gray-400 dark:placeholder-gray-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button className="rounded-full px-8 py-3 font-bold hidden md:block">Search Wards</Button>
                </div>
            </section>

            {/* Wards Grid */}
            <section className="py-20 container mx-auto px-4 lg:px-12">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                        {filteredWards.length === wardsData.length ? 'All Wards' : `Found ${filteredWards.length} Wards`}
                    </h2>
                    <span className="text-gray-500 dark:text-gray-400 font-medium transition-colors duration-300">Freetown Municipality</span>
                </div>

                {filteredWards.length > 0 ? (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {currentItems.map((ward) => (
                                <div key={ward.id} className="bg-white dark:bg-dark-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:-translate-y-1 group flex flex-col">
                                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-10">
                                            <FaMapMarkedAlt className="text-8xl" />
                                        </div>
                                        <div className="relative z-10">
                                            <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-white/30">
                                                Ward ID
                                            </span>
                                            <h3 className="text-5xl font-black">{ward.id}</h3>
                                        </div>
                                    </div>

                                    <div className="p-8 flex-grow flex flex-col">
                                        <div className="mb-6">
                                            <h4 className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-bold uppercase text-xs tracking-wide mb-2 transition-colors duration-300">
                                                <FaMapMarkedAlt /> Coverage Areas
                                            </h4>
                                            <p className="text-xl font-bold text-gray-900 dark:text-white leading-tight transition-colors duration-300">
                                                {ward.area}
                                            </p>
                                        </div>

                                        <div className="mb-6 flex-grow">
                                            <h4 className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-bold uppercase text-xs tracking-wide mb-2 transition-colors duration-300">
                                                <FaInfoCircle /> Description
                                            </h4>
                                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm transition-colors duration-300">
                                                {ward.desc}
                                            </p>
                                        </div>

                                        <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-gray-500 dark:text-gray-400 transition-colors duration-300">
                                            <div className="flex items-center gap-2 group-hover:text-primary dark:group-hover:text-accent transition-colors">
                                                <FaUsers />
                                                <span className="font-medium text-sm">Population</span>
                                            </div>
                                            <span className="font-bold text-gray-900 dark:text-white text-lg transition-colors duration-300">{ward.pop}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        {filteredWards.length > itemsPerPage && (
                            <div className="flex justify-center items-center gap-2">
                                <Button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    variant="outline"
                                    className="border-gray-300 dark:border-gray-600 dark:text-gray-300 disabled:opacity-50"
                                >
                                    Previous
                                </Button>

                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => paginate(i + 1)}
                                        className={`w-10 h-10 rounded-full font-bold transition-all ${currentPage === i + 1
                                            ? 'bg-primary dark:bg-accent text-white dark:text-dark shadow-lg scale-110'
                                            : 'bg-white dark:bg-dark-card text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700'
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}

                                <Button
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    variant="outline"
                                    className="border-gray-300 dark:border-gray-600 dark:text-gray-300 disabled:opacity-50"
                                >
                                    Next
                                </Button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-20 bg-white dark:bg-dark-card rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors duration-300">
                        <div className="text-6xl text-gray-300 dark:text-gray-600 mb-6 flex justify-center"><FaSearch /></div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Wards Found</h3>
                        <p className="text-gray-500 dark:text-gray-400">We couldn't find any wards matching "{searchTerm}". Try checking the number or spelling.</p>
                        <Button variant="outline" className="mt-6 dark:border-gray-600 dark:text-gray-300" onClick={() => setSearchTerm('')}>Clear Search</Button>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Wards;
