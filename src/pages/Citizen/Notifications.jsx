import Card from '../../components/UI/Card';
import { FaBell, FaInfoCircle, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const Notifications = () => {
    // Mock notifications
    const notifications = [
        { id: 1, type: 'info', message: 'Your complaint #1234 has been assigned to a staff member.', date: '2 hours ago', read: false },
        { id: 2, type: 'success', message: 'Complaint #1230 has been resolved. Please rate the service.', date: 'Yesterday', read: true },
        { id: 3, type: 'warning', message: 'Additional information is required for complaint #1225.', date: '2 days ago', read: true },
    ];

    const getIcon = (type) => {
        switch (type) {
            case 'success': return <FaCheckCircle className="text-green-500" />;
            case 'warning': return <FaExclamationTriangle className="text-yellow-500" />;
            default: return <FaInfoCircle className="text-blue-500" />;
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
                <button className="text-primary hover:underline text-sm font-medium">Mark all as read</button>
            </div>

            <div className="space-y-4">
                {notifications.map((notification) => (
                    <Card
                        key={notification.id}
                        className={`flex items-start gap-4 p-4 transition-colors ${!notification.read ? 'bg-blue-50 border-l-4 border-l-primary' : 'hover:bg-gray-50'}`}
                    >
                        <div className="mt-1 text-xl">
                            {getIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                            <p className={`text-gray-900 ${!notification.read ? 'font-semibold' : ''}`}>
                                {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{notification.date}</p>
                        </div>
                        {!notification.read && (
                            <div className="w-3 h-3 bg-primary rounded-full mt-2"></div>
                        )}
                    </Card>
                ))}

                {notifications.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        <FaBell className="mx-auto text-4xl mb-4 text-gray-300" />
                        <p>No notifications yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notifications;
