import { useState } from 'react';
import { FaUserPlus, FaSearch, FaFilter } from 'react-icons/fa';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Swal from 'sweetalert2';

const AssignStaff = () => {
    const [complaints, setComplaints] = useState([
        { id: 'CMP-2023-015', title: 'Blocked Drainage at PZ', category: 'Sanitation', status: 'Pending', location: 'PZ Roundabout' },
        { id: 'CMP-2023-018', title: 'Fallen Tree', category: 'Environment', status: 'Pending', location: 'Hill Station' },
        { id: 'CMP-2023-021', title: 'Broken Pipe', category: 'Water', status: 'High Priority', location: 'Lumley' },
    ]);

    const officers = [
        { id: 1, name: 'Officer John Doe', zone: 'Central' },
        { id: 2, name: 'Officer Jane Smith', zone: 'West End' },
        { id: 3, name: 'Officer Mike Brown', zone: 'East End' },
    ];

    const handleAssign = (complaintId) => {
        // Generate options for Swal
        const options = officers.map(o => `<option value="${o.id}">${o.name} (${o.zone})</option>`).join('');

        Swal.fire({
            title: 'Assign Officer',
            html: `
                <p class="mb-4 text-gray-600">Select an officer for Complaint <strong>${complaintId}</strong></p>
                <select id="officer-select" class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary focus:outline-none">
                    <option value="" disabled selected>Choose an officer...</option>
                    ${options}
                </select>
                <textarea id="assign-note" class="w-full border border-gray-300 rounded-lg p-2 mt-4 focus:ring-2 focus:ring-primary focus:outline-none" rows="3" placeholder="Add instructions for officer..."></textarea>
            `,
            showCancelButton: true,
            confirmButtonText: 'Assign Now',
            confirmButtonColor: '#0958d9',
            preConfirm: () => {
                const officerId = document.getElementById('officer-select').value;
                const note = document.getElementById('assign-note').value;
                if (!officerId) {
                    Swal.showValidationMessage('Please select an officer');
                }
                return { officerId, note };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Remove from pending list to simulate assignment
                setComplaints(complaints.filter(c => c.id !== complaintId));
                Swal.fire('Assigned!', 'The complaint has been assigned to the officer.', 'success');
            }
        });
    };

    return (
        <div className="p-8 ml-64">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Task Assignment</h1>
                <p className="text-gray-500">Assign pending complaints to field officers.</p>
            </header>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-4 flex gap-4 items-center">
                        <div className="relative flex-grow">
                            <FaSearch className="absolute left-3 top-3 text-gray-400" />
                            <input type="text" placeholder="Search unassigned complaints..." className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary" />
                        </div>
                        <Button variant="outline" className="flex items-center gap-2"><FaFilter /> Filter</Button>
                    </Card>

                    <div className="space-y-4">
                        {complaints.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-xl">
                                <p className="text-gray-500">No pending complaints to assign.</p>
                            </div>
                        ) : (
                            complaints.map(complaint => (
                                <Card key={complaint.id} className="p-6 flex justify-between items-center hover:shadow-md transition-shadow">
                                    <div>
                                        <div className="flex gap-2 mb-1">
                                            <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{complaint.id}</span>
                                            <span className="text-xs font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{complaint.category}</span>
                                        </div>
                                        <h3 className="font-bold text-gray-900 text-lg">{complaint.title}</h3>
                                        <p className="text-gray-500 text-sm">{complaint.location}</p>
                                    </div>
                                    <Button onClick={() => handleAssign(complaint.id)} className="flex items-center gap-2 shadow-sm">
                                        <FaUserPlus /> Assign
                                    </Button>
                                </Card>
                            ))
                        )}
                    </div>
                </div>

                <div>
                    <Card className="p-6">
                        <h3 className="font-bold text-gray-900 mb-4">Available Officers</h3>
                        <div className="space-y-4">
                            {officers.map(officer => (
                                <div key={officer.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-gray-100">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-sm">
                                        ON
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-gray-900">{officer.name}</p>
                                        <p className="text-xs text-gray-500">{officer.zone} &bull; 2 Active Tasks</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" className="w-full mt-6">View Staff Roster</Button>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AssignStaff;
