import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaUser, FaEnvelope, FaPhone, FaMapPin, FaCheckCircle, FaClock } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';

const Profile = () => {
    const { user } = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const fullName = `${user?.first_name || ''} ${user?.last_name || ''}`.trim();
    const initials = `${user?.first_name?.charAt(0) || 'C'}${user?.last_name?.charAt(0) || 'C'}`.toUpperCase();

    const formik = useFormik({
        initialValues: {
            firstName: user?.first_name || '',
            lastName: user?.last_name || '',
            email: user?.email || '',
            phone: user?.phone || '',
            address: user?.address || '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('First name is required'),
            lastName: Yup.string().required('Last name is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            phone: Yup.string(),
            address: Yup.string(),
        }),
        onSubmit: (values) => {
            console.log('Updating profile:', values);
            // Mock update
            setSuccessMessage('Profile updated successfully!');
            setEditMode(false);
            setTimeout(() => setSuccessMessage(''), 3000);
        },
    });

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Profile</h1>
                    <p className="text-gray-600 mt-1">Manage your account information and settings</p>
                </div>
                {!editMode && (
                    <Button onClick={() => setEditMode(true)} className="flex items-center gap-2">
                        Edit Profile
                    </Button>
                )}
            </div>

            {successMessage && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 flex items-center gap-2">
                    <FaCheckCircle className="text-green-600" />
                    {successMessage}
                </div>
            )}

            <div className="grid md:grid-cols-3 gap-8">
                {/* Sidebar - Avatar & Status */}
                <div className="md:col-span-1 space-y-6">
                    <Card className="text-center">
                        <div className="w-40 h-40 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center text-5xl font-bold text-white shadow-lg">
                            {initials}
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-200">{fullName || 'Citizen'}</h2>
                        <p className="text-sm text-gray-500 mt-1 uppercase tracking-wider font-semibold capitalize">{user?.role || 'Citizen'}</p>
                        
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <div className="text-left space-y-3 text-sm">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <FaCheckCircle className="text-green-600 flex-shrink-0" />
                                    <span>Account Active</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    {/* <FaShield className="text-blue-600 flex-shrink-0" /> */}
                                    <span>Verified Citizen</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-200 mb-4 flex items-center gap-2">
                            <FaClock className="text-gray-400" />
                            Account Info
                        </h3>
                        <div className="space-y-3 text-sm">
                            <div>
                                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Member Since</p>
                                <p className="text-gray-900 dark:text-gray-200 font-semibold">{user?.date_joined ? new Date(user.date_joined).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Not available'}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">User ID</p>
                                <p className="text-gray-900 dark:text-gray-200   font-semibold text-xs break-all">{user?.id || 'N/A'}</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Main Content - Edit Form */}
                <div className="md:col-span-2">
                    <Card>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-8 flex items-center gap-2">
                            <FaUser className="text-blue-600" />
                            Personal Information
                        </h3>

                        {editMode ? (
                            <form onSubmit={formik.handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        label="First Name"
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.firstName && formik.errors.firstName}
                                        icon={FaUser}
                                    />
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        label="Last Name"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.lastName && formik.errors.lastName}
                                        icon={FaUser}
                                    />
                                </div>

                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    label="Email Address"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && formik.errors.email}
                                    icon={FaEnvelope}
                                    disabled
                                />

                                <Input
                                    id="phone"
                                    name="phone"
                                    label="Phone Number"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.phone && formik.errors.phone}
                                    icon={FaPhone}
                                    placeholder="+1 (555) 000-0000"
                                />

                                <Input
                                    id="address"
                                    name="address"
                                    label="Address"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.address && formik.errors.address}
                                    icon={FaMapPin}
                                    placeholder="123 Main Street, City, State"
                                />

                                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                                    <Button 
                                        type="button" 
                                        variant="secondary"
                                        onClick={() => setEditMode(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={formik.isSubmitting}>
                                        Save Changes
                                    </Button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">First Name</p>
                                        <p className="text-lg font-semibold text-gray-900">{user?.first_name || 'Not set'}</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Last Name</p>
                                        <p className="text-lg font-semibold text-gray-900">{user?.last_name || 'Not set'}</p>
                                    </div>
                                </div>

                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Email Address</p>
                                    <p className="text-lg font-semibold text-gray-900 break-all">{user?.email || 'Not set'}</p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Phone Number</p>
                                        <p className="text-lg font-semibold text-gray-900">{user?.phone || 'Not provided'}</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Address</p>
                                        <p className="text-lg font-semibold text-gray-900">{user?.address || 'Not provided'}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Card>

                    {/* Additional Info Card */}
                    <Card className="mt-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-200 mb-6 flex items-center gap-2">
                            {/* <FaShield className="text-blue-600" /> */}
                            Account Security
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                                <div>
                                    <p className="font-semibold text-gray-900">Email Verification</p>
                                    <p className="text-sm text-gray-600">Your email is verified and secure</p>
                                </div>
                                <FaCheckCircle className="text-green-600 text-2xl" />
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-semibold text-gray-900">Password</p>
                                    <p className="text-sm text-gray-600">Last changed 3 months ago</p>
                                </div>
                                <Button variant="secondary" className="text-sm">Change Password</Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Profile;
