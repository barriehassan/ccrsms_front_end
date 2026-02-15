import { useState } from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { FaUserCog, FaShieldAlt, FaBell, FaGlobe } from 'react-icons/fa';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('general');

    const tabs = [
        { id: 'general', label: 'General', icon: FaGlobe },
        { id: 'accounts', label: 'Accounts & Roles', icon: FaUserCog },
        { id: 'security', label: 'Security', icon: FaShieldAlt },
        { id: 'notifications', label: 'Notifications', icon: FaBell },
    ];

    return (
        <div className="p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
                <p className="text-gray-500">Configure system parameters and preferences.</p>
            </header>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Navigation */}
                <Card className="lg:w-1/4 h-fit p-4">
                    <nav className="space-y-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition-colors ${activeTab === tab.id
                                    ? 'bg-blue-50 text-primary'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <tab.icon />
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </Card>

                {/* Content Area */}
                <div className="lg:w-3/4">
                    {activeTab === 'general' && (
                        <div className="space-y-6">
                            <Card className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><FaGlobe className="text-primary" /> General Information</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <Input label="System Name" value="CCRSMS" />
                                    <Input label="Organization" value="Freetown City Council" />
                                    <Input label="Support Email" value="support@fcc.gov.sl" type="email" />
                                    <Input label="Contact Phone" value="+232 76 000 000" />
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Organization Address</label>
                                        <textarea className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary focus:outline-none" rows="3">12 Wallace Johnson Street, Freetown, Sierra Leone</textarea>
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end">
                                    <Button>Save Changes</Button>
                                </div>
                            </Card>
                            <Card className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Localization</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                                        <select className="w-full border border-gray-300 rounded-lg p-2 bg-white"><option>GMT (Greenwich Mean Time)</option></select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                                        <select className="w-full border border-gray-300 rounded-lg p-2 bg-white"><option>SLE (Sierra Leonean Leone)</option></select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                                        <select className="w-full border border-gray-300 rounded-lg p-2 bg-white"><option>English (UK)</option><option>Krio</option></select>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'accounts' && (
                        <div className="space-y-6">
                            <Card className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><FaUserCog className="text-primary" /> User Policies</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
                                        <div>
                                            <p className="font-bold text-gray-900">Citizen Auto-Registration</p>
                                            <p className="text-sm text-gray-500">Allow users to sign up without admin approval.</p>
                                        </div>
                                        <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out bg-green-500 rounded-full cursor-pointer">
                                            <span className="absolute left-6 top-1 w-4 h-4 bg-white rounded-full transition-all"></span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
                                        <div>
                                            <p className="font-bold text-gray-900">Officer Auto-Assignment (Beta)</p>
                                            <p className="text-sm text-gray-500">AI automatically assigns complaints to nearest officer.</p>
                                        </div>
                                        <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out bg-gray-300 rounded-full cursor-pointer">
                                            <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all"></span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
                                        <div>
                                            <p className="font-bold text-gray-900">Allow Profile Picture Uploads</p>
                                            <p className="text-sm text-gray-500">Users can update their own avatars.</p>
                                        </div>
                                        <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out bg-green-500 rounded-full cursor-pointer">
                                            <span className="absolute left-6 top-1 w-4 h-4 bg-white rounded-full transition-all"></span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="space-y-6">
                            <Card className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><FaShieldAlt className="text-primary" /> Security Policies</h3>
                                <div className="grid gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Password Length</label>
                                        <select className="w-full md:w-1/2 border border-gray-300 rounded-lg p-2 bg-white"><option>8 Characters</option><option>12 Characters</option></select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Session Timeout</label>
                                        <select className="w-full md:w-1/2 border border-gray-300 rounded-lg p-2 bg-white"><option>30 Minutes</option><option>1 Hour</option><option>4 Hours</option></select>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
                                        <Button variant="outline" className="w-full md:w-auto text-red-600 border-red-200 hover:bg-red-50 flex justify-center">Reset All User Passwords</Button>
                                        <Button variant="outline" className="w-full md:w-auto flex justify-center">Enable Two-Factor Authentication (Global)</Button>
                                    </div>
                                </div>
                            </Card>
                            <Card className="p-6 border-l-4 border-red-500 bg-red-50">
                                <h3 className="text-lg font-bold text-red-800 mb-2">Danger Zone</h3>
                                <p className="text-sm text-red-600 mb-4">Actions here can cause irreversible data loss.</p>
                                <Button className="bg-red-600 hover:bg-red-700 text-white border-transparent">Purge Deleted Records</Button>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <Card className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><FaBell className="text-primary" /> Email Notifications</h3>
                            <div className="space-y-4">
                                <label className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                                    <input type="checkbox" checked className="w-5 h-5 text-primary rounded focus:ring-primary" />
                                    <div>
                                        <span className="block font-medium text-gray-900">New Complaint Alerts</span>
                                        <span className="text-xs text-gray-500">Notify admins when a new complaint is filed.</span>
                                    </div>
                                </label>
                                <label className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                                    <input type="checkbox" checked className="w-5 h-5 text-primary rounded focus:ring-primary" />
                                    <div>
                                        <span className="block font-medium text-gray-900">Status Change Updates</span>
                                        <span className="text-xs text-gray-500">Email citizens when their complaint status changes.</span>
                                    </div>
                                </label>
                                <label className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                                    <input type="checkbox" className="w-5 h-5 text-primary rounded focus:ring-primary" />
                                    <div>
                                        <span className="block font-medium text-gray-900">Weekly Summary Reports</span>
                                        <span className="text-xs text-gray-500">Send a weekly summary of analytics to admins.</span>
                                    </div>
                                </label>
                                <label className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                                    <input type="checkbox" checked className="w-5 h-5 text-primary rounded focus:ring-primary" />
                                    <div>
                                        <span className="block font-medium text-gray-900">System Maintenance Alerts</span>
                                        <span className="text-xs text-gray-500">Notify all users about upcoming downtime.</span>
                                    </div>
                                </label>
                            </div>
                            <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end">
                                <Button>Save Notification Preferences</Button>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;
