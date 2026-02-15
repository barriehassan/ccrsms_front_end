import { useState } from 'react';
import { FaMapMarkerAlt, FaClock, FaCheckCircle, FaPlay } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';

const FieldTasks = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Inspect Drainage Blockage', location: 'Zone 4, Market area', time: '10:00 AM', status: 'Pending' },
        { id: 2, title: 'Verify Pothole Repair', location: 'Main Street', time: '02:00 PM', status: 'In Progress' },
    ]);

    const handleStartTask = (taskId) => {
        Swal.fire({
            title: 'Start Task?',
            text: "Are you ready to begin this assignment?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#0958d9',
            confirmButtonText: 'Yes, Start Now'
        }).then((result) => {
            if (result.isConfirmed) {
                setTasks(tasks.map(t => t.id === taskId ? { ...t, status: 'In Progress' } : t));
                Swal.fire('Started!', 'You have clocked in for this task.', 'success');
            }
        });
    };

    const handleCompleteTask = (taskId) => {
        Swal.fire({
            title: 'Complete Task?',
            text: "Have you finished all required work?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#10b981',
            confirmButtonText: 'Yes, Mark Complete'
        }).then((result) => {
            if (result.isConfirmed) {
                setTasks(tasks.map(t => t.id === taskId ? { ...t, status: 'Completed' } : t));
                Swal.fire('Completed!', 'Task marked as done. Good job!', 'success');
            }
        });
    };

    return (
        <div className="p-8 ml-64">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Field Tasks</h1>
                <p className="text-gray-500">Track and manage your daily field assignments.</p>
            </header>

            <div className="grid md:grid-cols-2 gap-6">
                {tasks.map(task => (
                    <Card key={task.id} className={`p-6 border-l-4 ${task.status === 'Completed' ? 'border-green-500 opacity-75' : 'border-primary'}`}>
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-bold text-xl text-gray-900">{task.title}</h3>
                            <span className={`px-2 py-1 rounded text-xs font-bold ${task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                                task.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                }`}>
                                {task.status}
                            </span>
                        </div>
                        <div className="space-y-2 mb-6">
                            <p className="text-gray-600 flex items-center gap-2"><FaMapMarkerAlt className="text-primary" /> {task.location}</p>
                            <p className="text-gray-600 flex items-center gap-2"><FaClock className="text-primary" /> {task.time}</p>
                        </div>
                        <div className="flex gap-3">
                            {task.status !== 'Completed' && (
                                <>
                                    {task.status === 'Pending' && (
                                        <Button
                                            size="sm"
                                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                                            onClick={() => handleStartTask(task.id)}
                                        >
                                            <FaPlay /> Start
                                        </Button>
                                    )}
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="flex items-center gap-2"
                                        onClick={() => handleCompleteTask(task.id)}
                                    >
                                        <FaCheckCircle /> Complete
                                    </Button>
                                </>
                            )}
                            {task.status === 'Completed' && (
                                <span className="text-green-600 font-bold flex items-center gap-2"><FaCheckCircle /> Completed</span>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default FieldTasks;
