import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';

const Profile = () => {
    const { user } = useAuth();

    const formik = useFormik({
        initialValues: {
            name: user?.name || 'Citizen Name',
            email: user?.email || 'citizen@example.com',
            phone: '123-456-7890',
            address: '123 Citizen Lane',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email').required('Required'),
            phone: Yup.string(),
            address: Yup.string(),
        }),
        onSubmit: (values) => {
            console.log('Updating profile:', values);
            // Mock update
            alert('Profile updated successfully!');
        },
    });

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <Card className="text-center">
                        <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl text-gray-400">
                            {user?.name?.charAt(0) || 'C'}
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
                        <p className="text-gray-500">{user?.role}</p>
                        <div className="mt-6">
                            <Button variant="secondary" className="w-full text-sm">Change Avatar</Button>
                        </div>
                    </Card>
                </div>

                <div className="md:col-span-2">
                    <Card>
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h3>
                        <form onSubmit={formik.handleSubmit} className="space-y-6">
                            <Input
                                id="name"
                                name="name"
                                label="Full Name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.name && formik.errors.name}
                            />
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                label="Email Address"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && formik.errors.email}
                                disabled // Email usually not editable directly
                            />
                            <Input
                                id="phone"
                                name="phone"
                                label="Phone Number"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.phone && formik.errors.phone}
                            />
                            <Input
                                id="address"
                                name="address"
                                label="Address"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.address && formik.errors.address}
                            />

                            <div className="flex justify-end pt-4">
                                <Button type="submit" disabled={formik.isSubmitting}>
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Profile;
