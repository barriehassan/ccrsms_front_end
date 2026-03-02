import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaTimes, FaEye, FaEyeSlash, FaSun, FaMoon } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { ROLES } from '../../utils/constants';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import AxiosInstance from '../../components/Axios';

import axios from 'axios';
import Swal from 'sweetalert2';

const CitizenLogin = () => {
    const { login } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            identifier: '',
            password: '',
        },
        validationSchema: Yup.object({
            identifier: Yup.string().required('Email or Phone Number is required'),
            password: Yup.string().required('Required'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await AxiosInstance.post('api/citizens/login/', {
                    identifier: values.identifier.trim(),
                    password: values.password
                });

                const { user, token } = response.data;

                await login(user, token);

                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: `Welcome back, ${user.first_name}!`,
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    navigate('/citizen/dashboard');
                });

            } catch (error) {
                console.error("Login error:", error);
                const errorMessage = error.response?.data?.error || 'Invalid credentials or server error';

                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
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
            <Card className="max-w-md w-full space-y-8 shadow-2xl border-t-4 border-primary relative z-20">
                <Link to="/" className="absolute top-4 right-4 p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <FaTimes size={24} />
                </Link>
                <div className="text-center mt-8">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white transition-colors duration-300">Login</h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                        Or <Link to="/auth/register" className="font-medium text-primary hover:text-blue-500 dark:hover:text-accent transition-colors">create a new account</Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
                    <div className="space-y-4">
                        <Input
                            id="identifier"
                            name="identifier"
                            type="text"
                            label="Email Address or Phone Number"
                            placeholder="Enter email or phone number"
                            value={formik.values.identifier}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.identifier && formik.errors.identifier}
                        />
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
                    </div>

                    <div>
                        <Button type="submit" className="w-full text-lg py-3" disabled={formik.isSubmitting}>
                            Sign in
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default CitizenLogin;
