import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../utils/constants';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';

const StaffLogin = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required'),
        }),
        onSubmit: async (values) => {
            // Mock staff login logic
            // For demo purposes, if email contains 'admin', role is ADMIN, else STAFF
            const role = values.email.includes('admin') ? ROLES.ADMIN : ROLES.STAFF;
            await login({ name: 'Staff Member', email: values.email, role: role });

            if (role === ROLES.ADMIN) {
                navigate('/admin/dashboard');
            } else {
                navigate('/officer/dashboard');
            }
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="max-w-md w-full space-y-8 border-t-4 border-primary">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Officer & Admin Portal</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Secure login for Municipal Officers and Administrators.
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
                    <div className="space-y-4">
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            label="Staff Email"
                            placeholder="staff@mcrsms.local"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && formik.errors.email}
                        />
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            placeholder="••••••••"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && formik.errors.password}
                        />
                    </div>

                    <div>
                        <Button type="submit" className="w-full" disabled={formik.isSubmitting}>
                            Login to Dashboard
                        </Button>
                    </div>

                    <div className="text-center mt-4">
                        <Link to="/auth/login" className="text-sm text-gray-500 hover:text-primary">Back to Citizen Login</Link>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default StaffLogin;
