import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaTimes, FaEye, FaEyeSlash, FaSun, FaMoon } from 'react-icons/fa';
import Swal from 'sweetalert2';
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { ROLES } from '../../utils/constants';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import AxiosInstance from '../../components/Axios';

const CitizenRegister = () => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [wards, setWards] = useState([]);

    useEffect(() => {
        const fetchWards = async () => {
            try {
                const response = await AxiosInstance.get('api/wards/');
                setWards(response.data);
            } catch (error) {
                console.error("Error fetching wards:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to load wards. Please refresh the page.',
                    confirmButtonColor: '#EF4444',
                });
            }
        };

        fetchWards();
    }, []);

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            identity_number: '',
            phone_number: '',
            email: '',
            ward: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            first_name: Yup.string().required('First Name is required'),
            last_name: Yup.string().required('Last Name is required'),
            identity_number: Yup.string()
                .required('NIN / Passport Number is required')
                .test('is-valid-id', 'Enter a valid Sierra Leone NIN (e.g., 00F7STR2) or Passport number (e.g., SLR124311)', (value) => {
                    const ninPattern = /^\d{2}[A-Z]\d[A-Z]{3}\d$/;
                    const passportPattern = /^[A-Z]{2,3}\d{6}$/;
                    return ninPattern.test(value) || passportPattern.test(value);
                }),
            phone_number: Yup.string()
                .required('Phone number is required')
                .matches(/^\+232\d{8}$/, 'Phone number must start with +232 and follow format +232XXXXXXXX'),
            email: Yup.string().email('Invalid email address').required('Required'),
            ward: Yup.string().required('Ward is required'),
            password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Required'),
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                const response = await AxiosInstance.post('api/citizens/register/', {
                    first_name: values.first_name,
                    last_name: values.last_name,
                    email: values.email,
                    phone_number: values.phone_number,
                    password: values.password,
                    ward: values.ward,
                    identity_number: values.identity_number
                });

                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful',
                    text: 'Your account has been created successfully. Please login.',
                    confirmButtonColor: '#3B82F6',
                }).then(() => {
                    navigate('/auth/login');
                });

            } catch (error) {
                console.error("Registration error:", error);

                let errorMessage = 'An error occurred during registration. Please try again.';

                if (error.response && error.response.data) {
                    const errorData = error.response.data;

                    // Handle field-specific errors
                    if (typeof errorData === 'object') {
                        // Map backend errors to formik errors
                        // Note: Backend might return arrays for errors, Formik expects strings usually
                        const formErrors = {};
                        let errorText = "";

                        for (const key in errorData) {
                            if (Array.isArray(errorData[key])) {
                                formErrors[key] = errorData[key][0];
                                errorText += `${errorData[key][0]}\n`;
                            } else {
                                formErrors[key] = errorData[key];
                                errorText += `${errorData[key]}\n`;
                            }
                        }
                        setErrors(formErrors);
                        errorMessage = errorText || errorMessage;
                    }
                }

                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: errorMessage,
                    confirmButtonColor: '#EF4444',
                });
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-dark-bg dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative">
            <button
                onClick={toggleTheme}
                className="absolute top-4 left-4 md:top-8 md:left-8 p-3 rounded-full transition-all bg-white dark:bg-dark-card text-gray-800 dark:text-yellow-300 hover:bg-gray-100 dark:hover:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 z-10"
                aria-label="Toggle Theme"
            >
                {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
            </button>
            <Card className="max-w-2xl w-full space-y-8 shadow-2xl border-t-4 border-primary relative z-20">
                <Link to="/" className="absolute top-4 right-4 p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300">
                    <FaTimes size={24} />
                </Link>
                <div className="text-center mt-8">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white transition-colors duration-300">Citizen Registration</h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                        Join the CCRSMS community to report issues and track services.
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-6">
                        <Input
                            id="first_name"
                            name="first_name"
                            type="text"
                            label="First Name"
                            placeholder="Enter first name"
                            value={formik.values.first_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.first_name && formik.errors.first_name}
                        />
                        <Input
                            id="last_name"
                            name="last_name"
                            type="text"
                            label="Last Name"
                            placeholder="Enter last name"
                            value={formik.values.last_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.last_name && formik.errors.last_name}
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Input
                            id="identity_number"
                            name="identity_number"
                            type="text"
                            label="National ID / Passport Number"
                            placeholder="Enter ID number"
                            value={formik.values.identity_number}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.identity_number && formik.errors.identity_number}
                        />
                        <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">SL Contact Number</label>
                            <div className={formik.touched.phone_number && formik.errors.phone_number ? 'border border-red-500 rounded' : ''}>
                                <IntlTelInput
                                    containerClassName="intl-tel-input"
                                    inputClassName="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:border-accent dark:focus:ring-accent/20 transition-colors bg-white dark:bg-dark-card text-gray-900 dark:text-white"
                                    defaultCountry={'sl'}
                                    preferredCountries={['sl']}
                                    onPhoneNumberChange={(status, value, countryData, number, id) => {
                                        // Enforce +232 prefix if missing or handle it
                                        // IntlTelInput returns number with + usually if formatted correctly
                                        formik.setFieldValue('phone_number', number);
                                    }}
                                    value={formik.values.phone_number}
                                />
                            </div>
                            {formik.touched.phone_number && formik.errors.phone_number && (
                                <span className="text-xs text-red-500">{formik.errors.phone_number}</span>
                            )}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            label="Email Address"
                            placeholder="john@example.com"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && formik.errors.email}
                        />
                        <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="ward" className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">Ward</label>
                            <select
                                id="ward"
                                name="ward"
                                value={formik.values.ward}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors appearance-none bg-white dark:bg-dark-card text-gray-900 dark:text-white ${formik.touched.ward && formik.errors.ward
                                    ? 'border-red-500 focus:ring-red-200'
                                    : 'border-gray-300 dark:border-gray-700 focus:border-primary dark:focus:border-accent focus:ring-blue-100 dark:focus:ring-accent/20'
                                    }`}
                            >
                                <option value="">Select Ward</option>
                                {wards.map((ward) => (
                                    <option key={ward.id} value={ward.id}>
                                        {ward.name}
                                    </option>
                                ))}
                            </select>
                            {formik.touched.ward && formik.errors.ward && (
                                <span className="text-xs text-red-500">{formik.errors.ward}</span>
                            )}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            label="Password"
                            placeholder="••••••••"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && formik.errors.password}
                            rightElement={
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none flex items-center justify-center p-1 transition-colors duration-300"
                                >
                                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                </button>
                            }
                        />
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            label="Confirm Password"
                            placeholder="••••••••"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.confirmPassword && formik.errors.confirmPassword}
                            rightElement={
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none flex items-center justify-center p-1 transition-colors duration-300"
                                >
                                    {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                </button>
                            }
                        />
                    </div>

                    <div>
                        <Button type="submit" className="w-full text-lg py-3" disabled={formik.isSubmitting}>
                            Create Account
                        </Button>
                    </div>

                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                            Already have an account? <Link to="/auth/login" className="font-medium text-primary hover:text-blue-500 dark:hover:text-accent transition-colors duration-300">Sign in</Link>
                        </p>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default CitizenRegister;
