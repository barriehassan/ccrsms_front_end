import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { FaDownload, FaCalendarAlt, FaChartLine, FaChartPie, FaCity } from 'react-icons/fa';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler
);

const Analytics = () => {
    // Mock Data for Charts (Enhanced)
    const lineData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Complaints Received',
                data: [65, 59, 80, 81, 56, 55, 40, 75, 92, 110, 85, 90],
                borderColor: '#0958d9',
                backgroundColor: 'rgba(9, 88, 217, 0.1)',
                fill: true,
                tension: 0.4
            },
            {
                label: 'Resolved',
                data: [45, 50, 60, 70, 50, 52, 38, 70, 85, 100, 80, 88],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                fill: true,
                tension: 0.4
            }
        ],
    };

    const doughnutData = {
        labels: ['Roads', 'Waste', 'Lighting', 'Water', 'Permits', 'Others'],
        datasets: [
            {
                data: [30, 25, 15, 10, 15, 5],
                backgroundColor: [
                    '#0958d9', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#9ca3af'
                ],
                borderWidth: 0,
            },
        ],
    };

    const barData = {
        labels: ['Central', 'East End', 'West End', 'Aberdeen', 'Lumley'],
        datasets: [
            {
                label: 'Avg Resolution Time (Days)',
                data: [2.5, 3.2, 1.8, 2.1, 2.8],
                backgroundColor: '#f59e0b',
                borderRadius: 4,
            },
            {
                label: 'Satisfaction Score (1-5)',
                data: [4.2, 3.8, 4.5, 4.3, 4.0],
                backgroundColor: '#0958d9',
                borderRadius: 4,
            }
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'bottom' },
        },
        scales: {
            y: { grid: { color: '#f3f4f6' }, beginAtZero: true },
            x: { grid: { display: false } }
        }
    };


    return (
        <div className="p-8">
            <header className="mb-8 flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
                    <p className="text-gray-500">Deep insights into system performance and trends.</p>
                </div>
                <div className="flex flex-wrap gap-4">
                    <div className="relative">
                        <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                        <select className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary shadow-sm">
                            <option>Last 30 Days</option>
                            <option>Last Quarter</option>
                            <option>This Year</option>
                            <option>All Time</option>
                        </select>
                    </div>
                    <div className="relative">
                        <FaCity className="absolute left-3 top-3 text-gray-400" />
                        <select className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary shadow-sm">
                            <option>All Zones</option>
                            <option>Central</option>
                            <option>East End</option>
                            <option>West End</option>
                        </select>
                    </div>
                    <Button variant="outline" className="flex items-center gap-2">
                        <FaDownload /> Export PDF
                    </Button>
                </div>
            </header>

            {/* Summaries */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="p-6 text-center hover:shadow-lg transition-shadow border-t-4 border-blue-500">
                    <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Revenue</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-2">Le 50M</h3>
                    <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded-full text-xs font-bold mt-2 inline-block">
                        +12% vs last month
                    </span>
                </Card>
                <Card className="p-6 text-center hover:shadow-lg transition-shadow border-t-4 border-yellow-500">
                    <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Top Issue</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-2">Potholes</h3>
                    <span className="text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full text-xs font-bold mt-2 inline-block">
                        35% of all reports
                    </span>
                </Card>
                <Card className="p-6 text-center hover:shadow-lg transition-shadow border-t-4 border-purple-500">
                    <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Peak Day</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-2">Monday</h3>
                    <span className="text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full text-xs font-bold mt-2 inline-block">
                        150 avg reports
                    </span>
                </Card>
                <Card className="p-6 text-center hover:shadow-lg transition-shadow border-t-4 border-green-500">
                    <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Resolution Time</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-2">24 Hrs</h3>
                    <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded-full text-xs font-bold mt-2 inline-block">
                        -2hrs vs last month
                    </span>
                </Card>
            </div>

            {/* Main Charts Row 1 */}
            <div className="grid lg:grid-cols-3 gap-8 mb-8">
                <Card className="p-6 lg:col-span-2">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <FaChartLine className="text-primary" /> Complaint Volume Trends
                        </h3>
                    </div>
                    <div className="h-80">
                        <Line options={chartOptions} data={lineData} />
                    </div>
                </Card>
                <Card className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <FaChartPie className="text-primary" /> Issue Distribution
                    </h3>
                    <div className="h-64 flex justify-center">
                        <Doughnut options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} data={doughnutData} />
                    </div>
                </Card>
            </div>

            {/* Main Charts Row 2 */}
            <div className="grid lg:grid-cols-2 gap-8 pb-8">
                <Card className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Zone Performance Metrics</h3>
                    <div className="h-72">
                        <Bar options={chartOptions} data={barData} />
                    </div>
                </Card>
                <Card className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Top Performing Officers</h3>
                    <div className="space-y-4 overflow-y-auto h-72 pr-2">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 hover:bg-white hover:shadow-md border border-transparent hover:border-gray-100 rounded-xl transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
                                        JD
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">John Doe</p>
                                        <p className="text-xs text-gray-500">Zone: Central</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="block text-sm font-bold text-green-600">98%</span>
                                    <span className="text-xs text-gray-400">Resolution Rate</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Analytics;
