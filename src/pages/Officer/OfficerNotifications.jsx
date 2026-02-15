import { FaBell, FaExclamationCircle, FaCommentAlt } from 'react-icons/fa';
import Card from '../../components/UI/Card';

const OfficerNotifications = () => {
    const notifications = [
        { id: 1, type: 'assignment', text: 'New complaint assigned: "Broken Street Light"', time: '10 mins ago', icon: FaBell, color: 'text-blue-500' },
        { id: 2, type: 'alert', text: 'Urgent: Heavy rain forecast, prioritize drainage checks.', time: '1 hour ago', icon: FaExclamationCircle, color: 'text-red-500' },
        { id: 3, type: 'comment', text: 'Admin added a note to case #1234', time: '2 hours ago', icon: FaCommentAlt, color: 'text-yellow-500' },
    ];

    return (
        <div className="p-8 ml-64">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            </header>

            <Card className="divide-y divide-gray-100">
                {notifications.map(note => (
                    <div key={note.id} className="p-6 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                        <div className={`mt-1 text-xl ${note.color}`}>
                            <note.icon />
                        </div>
                        <div>
                            <p className="text-gray-900 font-medium">{note.text}</p>
                            <p className="text-gray-500 text-sm mt-1">{note.time}</p>
                        </div>
                    </div>
                ))}
            </Card>
        </div>
    );
};

export default OfficerNotifications;
