import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaPlus, FaSpinner } from 'react-icons/fa';
import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import { STATUS } from '../../utils/constants'; // Ensure this matches backend choices if possible, or map them
import { getComplaints } from '../../services/complaintService';

const ComplaintList = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const data = await getComplaints();
                console.log("Raw Complaints from API:", data);

                // De-duplicate by ID in case backend returns duplicates
                const uniqueData = Array.isArray(data)
                    ? Array.from(new Map(data.map(item => [item.id, item])).values())
                    : [];

                setComplaints(uniqueData);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching complaints:", err);
                setError("Failed to load complaints. Please try again later.");
                setLoading(false);
            }
        };

        fetchComplaints();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'SUBMITTED': return 'bg-blue-100 text-blue-700';
            case 'ACKNOWLEDGED': return 'bg-purple-100 text-purple-700';
            case 'IN_PROGRESS': return 'bg-yellow-100 text-yellow-700';
            case 'RESOLVED': return 'bg-green-100 text-green-700';
            case 'REJECTED': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const filteredComplaints = complaints.filter(c => {
        const matchesFilter = filter === 'All' || c.status === filter;
        const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <FaSpinner className="animate-spin text-4xl text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 text-center text-red-500">
                <p>{error}</p>
                <Button onClick={() => window.location.reload()} className="mt-4">Retry</Button>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Complaints</h1>
                <Link to="/citizen/complaints/create">
                    <Button className="flex items-center gap-2">
                        <FaPlus /> Submit New Complaint
                    </Button>
                </Link>
            </div>

            <Card className="mb-8">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative w-full md:w-1/3">
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search complaints..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
                        <FaFilter className="text-gray-500 shrink-0" />
                        {['All', 'SUBMITTED', 'IN_PROGRESS', 'RESOLVED'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === status
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {status.replace('_', ' ')}
                            </button>
                        ))}
                    </div>
                </div>
            </Card>

            <div className="space-y-4">
                {filteredComplaints.length > 0 ? (
                    filteredComplaints.map((complaint) => (
                        <Link key={complaint.id} to={`/citizen/complaints/${complaint.id}`}>
                            <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-primary group">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors dark:text-white">
                                            <span className="text-gray-400 mr-2">#{complaint.id}</span>
                                            {complaint.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            <span className="font-medium text-gray-700">Category:</span> {complaint.category} •
                                            <span className="ml-1">Submitted on {new Date(complaint.created_at).toLocaleDateString()}</span>
                                        </p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(complaint.status)}`}>
                                        {complaint.status.replace('_', ' ')}
                                    </span>
                                </div>
                            </Card>
                        </Link>
                    ))
                ) : (
                    <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-300 text-gray-500">
                        <p className="text-xl font-medium mb-2">No complaints found</p>
                        <p className="text-sm">{search || filter !== 'All' ? 'Try adjusting your filters' : 'You haven\'t submitted any complaints yet.'}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ComplaintList;
