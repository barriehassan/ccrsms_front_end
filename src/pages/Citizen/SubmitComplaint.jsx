import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaCloudUploadAlt, FaMapMarkerAlt, FaCrosshairs, FaSpinner } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';

const SubmitComplaint = () => {
    const navigate = useNavigate();
    const [previewImage, setPreviewImage] = useState(null);
    const [isGettingLocation, setIsGettingLocation] = useState(false);

    const formik = useFormik({
        initialValues: {
            title: '',
            category: '',
            description: '',
            location: '',
            image: null,
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Required'),
            category: Yup.string().required('Required'),
            description: Yup.string().required('Required').min(20, 'Please provide more details'),
            location: Yup.string().required('Required'),
        }),
        onSubmit: async (values) => {
            // Mock submission
            console.log('Submitting complaint:', values);

            Swal.fire({
                title: 'Submitting...',
                text: 'Please wait while we process your complaint.',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            // Simulate API call
            setTimeout(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Complaint Submitted!',
                    text: 'Your complaint has been received and ID #CMP-2023-XYZ generated.',
                    confirmButtonColor: '#0958d9'
                }).then(() => {
                    navigate('/citizen/complaints');
                });
            }, 1500);
        },
    });

    const handleImageChange = (event) => {
        const file = event.currentTarget.files[0];
        if (file) {
            formik.setFieldValue('image', file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleGetLocation = () => {
        // Check if geolocation is supported
        if (!navigator.geolocation) {
            Swal.fire({
                icon: 'error',
                title: 'Geolocation Not Supported',
                text: 'Your browser does not support geolocation.',
            });
            return;
        }

        // Check if we're in a secure context (HTTPS or localhost)
        if (!window.isSecureContext) {
            Swal.fire({
                icon: 'warning',
                title: 'Secure Connection Required',
                html: 'Location access requires HTTPS.<br><br>Please access the app via <strong>localhost</strong> or deploy to an HTTPS server.',
            });
            return;
        }

        setIsGettingLocation(true);

        // Show loading indicator
        Swal.fire({
            title: 'Getting Your Location...',
            html: 'Please allow location access when prompted by your browser.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                // Use reverse geocoding to get a readable address
                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
                        {
                            headers: {
                                'Accept': 'application/json',
                            }
                        }
                    );

                    if (!response.ok) {
                        throw new Error('Geocoding failed');
                    }

                    const data = await response.json();

                    const address = data.display_name || `Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`;
                    formik.setFieldValue('location', address);

                    Swal.fire({
                        icon: 'success',
                        title: 'Location Found!',
                        text: 'Your current location has been added.',
                        timer: 1500,
                        showConfirmButton: false
                    });
                } catch (error) {
                    // Fallback to coordinates if reverse geocoding fails
                    formik.setFieldValue('location', `Coordinates: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
                    Swal.fire({
                        icon: 'success',
                        title: 'Location Found!',
                        text: 'Coordinates have been added (address lookup failed).',
                        timer: 2000,
                        showConfirmButton: false
                    });
                }

                setIsGettingLocation(false);
            },
            (error) => {
                setIsGettingLocation(false);
                let title = 'Location Error';
                let message = 'Unable to retrieve your location.';

                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        title = 'Permission Denied';
                        message = 'Location access was denied. Please click the lock icon in your browser\'s address bar and allow location access, then try again.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        title = 'Location Unavailable';
                        message = 'Your location could not be determined. Please check if location services are enabled on your device.';
                        break;
                    case error.TIMEOUT:
                        title = 'Request Timeout';
                        message = 'The request took too long. Please check your internet connection and try again.';
                        break;
                    default:
                        message = `An unknown error occurred: ${error.message || 'Unknown'}`;
                }

                Swal.fire({
                    icon: 'error',
                    title: title,
                    text: message,
                });
            },
            {
                enableHighAccuracy: false, // Set to false for faster response
                timeout: 30000, // 30 seconds timeout
                maximumAge: 60000 // Accept cached position up to 1 minute old
            }
        );
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Submit a Complaint</h1>

            <Card>
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <Input
                            id="title"
                            name="title"
                            label="Complaint Title"
                            placeholder="e.g., Pothole on Main St"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.title && formik.errors.title}
                        />

                        <div className="flex flex-col gap-1 w-full">
                            <label className="text-sm font-medium text-gray-700">Category</label>
                            <select
                                id="category"
                                name="category"
                                className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${formik.touched.category && formik.errors.category
                                    ? 'border-red-500 focus:ring-red-200'
                                    : 'border-gray-300 focus:border-primary focus:ring-blue-100'
                                    }`}
                                value={formik.values.category}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="">Select a category</option>
                                <option value="roads">Roads & Transport</option>
                                <option value="sanitation">Sanitation & Waste</option>
                                <option value="water">Water & Sewage</option>
                                <option value="electricity">Electricity</option>
                                <option value="other">Other</option>
                            </select>
                            {formik.touched.category && formik.errors.category && (
                                <span className="text-xs text-red-500">{formik.errors.category}</span>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                        <label className="text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            rows="4"
                            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${formik.touched.description && formik.errors.description
                                ? 'border-red-500 focus:ring-red-200'
                                : 'border-gray-300 focus:border-primary focus:ring-blue-100'
                                }`}
                            placeholder="Describe the issue in detail..."
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.description && formik.errors.description && (
                            <span className="text-xs text-red-500">{formik.errors.description}</span>
                        )}
                    </div>

                    {/* Location Field with Get Location Button */}
                    <div className="flex flex-col gap-1 w-full">
                        <label className="text-sm font-medium text-gray-700">Location</label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    id="location"
                                    name="location"
                                    type="text"
                                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${formik.touched.location && formik.errors.location
                                        ? 'border-red-500 focus:ring-red-200'
                                        : 'border-gray-300 focus:border-primary focus:ring-blue-100'
                                        }`}
                                    placeholder="e.g., 123 Main St, near the park"
                                    value={formik.values.location}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handleGetLocation}
                                disabled={isGettingLocation}
                                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isGettingLocation ? (
                                    <FaSpinner className="animate-spin" />
                                ) : (
                                    <FaCrosshairs />
                                )}
                                <span className="hidden sm:inline">{isGettingLocation ? 'Getting...' : 'Get My Location'}</span>
                            </button>
                        </div>
                        {formik.touched.location && formik.errors.location && (
                            <span className="text-xs text-red-500">{formik.errors.location}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                        <label className="text-sm font-medium text-gray-700">Upload Image (Optional)</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors relative">
                            <input
                                id="image"
                                name="image"
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={handleImageChange}
                            />
                            {previewImage ? (
                                <div className="relative w-full h-48">
                                    <img src={previewImage} alt="Preview" className="w-full h-full object-contain rounded-lg" />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-lg text-white font-medium">
                                        Change Image
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <FaCloudUploadAlt className="text-4xl text-gray-400 mb-2" />
                                    <p className="text-gray-500 text-sm">Click or drag to upload an image</p>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit" className="px-8" disabled={formik.isSubmitting}>
                            {formik.isSubmitting ? 'Submitting...' : 'Submit Complaint'}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default SubmitComplaint;
