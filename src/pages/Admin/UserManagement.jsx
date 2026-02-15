import { useState } from 'react';
import { FaSearch, FaUserEdit, FaTrash, FaUserPlus } from 'react-icons/fa';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { ROLES } from '../../utils/constants';
import Swal from 'sweetalert2';

const UserManagement = () => {
    const [search, setSearch] = useState('');

    // Mock users
    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: ROLES.CITIZEN, status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: ROLES.STAFF, status: 'Active' },
        { id: 3, name: 'Admin User', email: 'admin@mcrsms.local', role: ROLES.ADMIN, status: 'Active' },
        { id: 4, name: 'Mike Johnson', email: 'mike@example.com', role: ROLES.CITIZEN, status: 'Inactive' },
    ]);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = (id) => {
        const user = users.find(u => u.id === id);
        Swal.fire({
            title: `Delete ${user.name}?`,
            text: "This action cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete user'
        }).then((result) => {
            if (result.isConfirmed) {
                setUsers(users.filter(u => u.id !== id));
                Swal.fire(
                    'Deleted!',
                    'User has been removed.',
                    'success'
                )
            }
        })
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                <Button className="flex items-center gap-2">
                    <FaUserPlus /> Add New User
                </Button>
            </div>

            <Card>
                <div className="mb-6 relative max-w-md">
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mr-3">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === ROLES.ADMIN ? 'bg-purple-100 text-purple-800' :
                                            user.role === ROLES.STAFF ? 'bg-blue-100 text-blue-800' :
                                                'bg-green-100 text-green-800'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        <button className="text-blue-600 hover:text-blue-900"><FaUserEdit /></button>
                                        <button
                                            className="text-red-600 hover:text-red-900"
                                            onClick={() => handleDelete(user.id)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default UserManagement;
