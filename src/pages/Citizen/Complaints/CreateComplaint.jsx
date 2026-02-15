import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaCamera, FaMapMarkerAlt, FaSpinner, FaRedo, FaCheck } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Button from '../../../components/UI/Button';
import Input from '../../../components/UI/Input';
import Card from '../../../components/UI/Card';
import { createComplaint, getCategories } from '../../../services/complaintService';

const CreateComplaint = () => {
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [locationData, setLocationData] = useState({ lat: null, lng: null, address: '', accuracy: null });
    const [locationError, setLocationError] = useState(null);
    const [isLocating, setIsLocating] = useState(false);
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);

    // Fetch Categories on Mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (err) {
                console.error("Error fetching categories", err);
                Swal.fire('Error', 'Failed to load categories', 'error');
            } finally {
                setLoadingCategories(false);
            }
        };
        fetchCategories();
    }, []);

    // Geolocation Handling
    const watchId = useRef(null);

    const startLocationWatch = () => {
        setLocationError(null);
        setIsLocating(true); // START LOCATING

        if (!navigator.geolocation) {
            setLocationError("Geolocation is not supported.");
            setIsLocating(false);
            return;
        }

        const handlePosition = async (position) => {
            const { latitude, longitude, accuracy } = position.coords;
            console.log("Location fix:", latitude, longitude, accuracy); // Debug log

            setIsLocating(false); // STOP LOCATING (Success)

            // Logic: Update state with new coordinates
            setLocationData(prev => ({
                ...prev,
                lat: latitude,
                lng: longitude,
                accuracy: accuracy
            }));

            // Reverse Geo only if accurate enough (< 1000m)
            if (accuracy < 1000) {
                try {
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1&email=ccrsms_user@example.com`, {
                        headers: { 'Accept-Language': 'en-US,en;q=0.9' }
                    });
                    if (!response.ok) throw new Error("Addr lookup failed");
                    const data = await response.json();
                    setLocationData(prev => ({ ...prev, address: data.display_name }));
                } catch (error) {
                    console.error("Reverse geo error:", error);
                    setLocationData(prev => ({ ...prev, address: `Lat: ${latitude.toFixed(5)}, Lng: ${longitude.toFixed(5)}` }));
                }
            } else {
                setLocationData(prev => ({ ...prev, address: `Low accuracy (${Math.round(accuracy)}m). Try moving outside.` }));
            }
        };

        const handleError = (err) => {
            // If High Accuracy fails, try Low Accuracy automatically
            if (options.enableHighAccuracy) {
                console.warn("High Accuracy failed, falling back to Low Accuracy...");
                navigator.geolocation.getCurrentPosition(handlePosition, finalError, {
                    enableHighAccuracy: false, // Fallback to Wi-Fi/Cell
                    timeout: 10000,
                    maximumAge: 0
                });
            } else {
                finalError(err);
            }
        };

        const finalError = (err) => {
            console.error("Final Geo Error:", err);
            setIsLocating(false);
            let msg = `GPS Error: ${err.message}`;
            if (err.code === err.PERMISSION_DENIED) msg = "You denied location access. Please enable it in browser settings.";
            if (err.code === err.TIMEOUT) msg = "GPS unavailable. Please type location in description.";
            setLocationError(msg);
        };

        // STRATEGY: Try High Accuracy First
        const options = {
            enableHighAccuracy: true,
            timeout: 15000, // 15s to get a GPS lock
            maximumAge: 0
        };

        // We use getCurrentPosition for the initial "Click" action as it's more robust for fallbacks than watchPosition
        navigator.geolocation.getCurrentPosition(handlePosition, handleError, options);
    };

    useEffect(() => {
        // Removed auto-fetch on mount
        // return cleanup function remains to stop watcher on unmount
        return () => {
            if (watchId.current !== null) {
                navigator.geolocation.clearWatch(watchId.current);
            }
        };
    }, []);

    // Camera Handling
    const startCamera = async () => {
        setIsCameraOpen(true); // Show UI immediately so user sees "Waiting for camera..."

        if (!window.isSecureContext) {
            Swal.fire('Security Check', 'HTTPS required for camera.', 'warning');
            // proceed anyway to try on localhost
        }

        try {
            const constraints = { video: true, audio: false };
            const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);

            setStream(mediaStream);

            setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                    videoRef.current.onloadedmetadata = () => {
                        videoRef.current.play().catch(e => console.error("Play error:", e));
                    };
                }
            }, 100);

        } catch (err) {
            console.error("Cam Error:", err);
            Swal.fire('Camera Error', `Error: ${err.name}`, 'error');
            setIsCameraOpen(false);
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        setIsCameraOpen(false);
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');

            // Explicitly set dimensions from the actual video videoWidth/Height
            const width = videoRef.current.videoWidth;
            const height = videoRef.current.videoHeight;

            if (width === 0 || height === 0) {
                Swal.fire('Error', 'Video stream not ready. Please wait a moment.', 'warning');
                return;
            }

            canvasRef.current.width = width;
            canvasRef.current.height = height;
            context.drawImage(videoRef.current, 0, 0, width, height);

            canvasRef.current.toBlob((blob) => {
                if (blob) {
                    const file = new File([blob], "complaint_evidence.jpg", { type: "image/jpeg" });
                    formik.setFieldValue('image', file);
                    setCapturedImage(URL.createObjectURL(file));
                    stopCamera();
                } else {
                    Swal.fire('Error', 'Failed to capture image blob.', 'error');
                }
            }, 'image/jpeg', 0.9);
        }
    };

    const retakePhoto = () => {
        setCapturedImage(null);
        formik.setFieldValue('image', null);
        startCamera();
    };

    // Cleanup camera on unmount
    useEffect(() => {
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [stream]);


    const formik = useFormik({
        initialValues: {
            title: '',
            category: '',
            description: '',
            priority_level: 'LOW',
            image: null,
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            category: Yup.string().required('Category is required'),
            description: Yup.string().required('Description is required (min 20 chars)').min(20),
            priority_level: Yup.string().required('Required'),
            // Image is technically optional in backend, but let's encourage it or verify requirement
        }),
        onSubmit: async (values) => {
            if (!locationData.lat || !locationData.lng) {
                Swal.fire('Location Missing', 'Please click "Get Location" to tag your report.', 'warning');
                return;
            }

            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('category', values.category); // ID of category
            formData.append('description', values.description);
            formData.append('priority_level', values.priority_level);
            formData.append('latitude', locationData.lat);
            formData.append('longitude', locationData.lng);
            formData.append('street_name', locationData.address ? locationData.address.substring(0, 200) : '');

            if (values.image) {
                formData.append('evidence_image', values.image);
            }

            try {
                Swal.fire({ title: 'Submitting...', didOpen: () => Swal.showLoading() });
                await createComplaint(formData);
                Swal.fire('Success', 'Complaint submitted successfully!', 'success').then(() => {
                    navigate('/citizen/complaints');
                });
            } catch (err) {
                console.error("Submission Error Full Object:", err);
                if (err.response) {
                    console.error("Server Response Data:", err.response.data);
                    console.error("Server Status:", err.response.status);
                    console.error("Server Headers:", err.response.headers);

                    // Show specific error from backend if available
                    const serverMsg = err.response.data?.detail || err.response.data?.message || JSON.stringify(err.response.data);
                    Swal.fire('Error', `Failed: ${serverMsg}`, 'error');
                } else if (err.request) {
                    console.error("No response received:", err.request);
                    Swal.fire('Error', 'No response from server. Check connection.', 'error');
                } else {
                    console.error("Error setting up request:", err.message);
                    Swal.fire('Error', `Request Error: ${err.message}`, 'error');
                }
            }
        },
    });

    return (
        // CHANGED: Removed mx-auto, changed max-w-3xl to w-full max-w-5xl, reduced padding
        <div className="p-6 w-full max-w-5xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Report an Issue</h1>

            <Card>
                <form onSubmit={formik.handleSubmit} className="space-y-6">

                    {/* 1. Location Section (Manual Trigger) */}
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <div className="flex justify-between items-center">
                            <div className="flex-grow">
                                <h3 className="flex items-center gap-2 font-bold text-blue-800 mb-2">
                                    <FaMapMarkerAlt /> Location
                                </h3>

                                {!locationData.lat && !locationError && (
                                    <div className="text-gray-600 text-sm mb-2">
                                        Please tag the location of the issue.
                                    </div>
                                )}

                                {locationError ? (
                                    <p className="text-red-500 font-medium text-sm">{locationError}</p>
                                ) : locationData.lat ? (
                                    <div>
                                        <p className="text-gray-700 font-medium text-sm leading-tight mb-1">{locationData.address || "Fetching address..."}</p>
                                        <p className="text-xs text-gray-500 flex items-center gap-2">
                                            <span>{locationData.lat.toFixed(6)}, {locationData.lng.toFixed(6)}</span>
                                            {locationData.accuracy && (
                                                <span className={`px-2 py-0.5 rounded-full text-white text-[10px] ${locationData.accuracy < 30 ? 'bg-green-600' : 'bg-yellow-500'}`}>
                                                    ±{Math.round(locationData.accuracy)}m
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                ) : (
                                    /* Only show spinner if we are actively fetching (which isn't tracked by a separate state here, 
                                       but if lat is null and no error, and we clicked start, we want either a button or text.
                                       Let's keep it simple: Show button if no lat. */
                                    null
                                )}
                            </div>

                            {!locationData.lat ? (
                                <Button type="button" onClick={startLocationWatch} className="bg-blue-600 hover:bg-blue-700">
                                    <FaMapMarkerAlt className="mr-2" /> Get Location
                                </Button>
                            ) : (
                                <Button type="button" variant="ghost" size="sm" onClick={() => {
                                    if (watchId.current) navigator.geolocation.clearWatch(watchId.current);
                                    startLocationWatch();
                                }} className="text-blue-600 hover:bg-blue-100 text-xs ml-2">
                                    <FaRedo /> Refresh
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* 2. Text Fields */}
                    <Input
                        id="title"
                        name="title"
                        label="Title"
                        placeholder="e.g., Deep Pothole"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                        error={formik.touched.title && formik.errors.title}
                    />

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Category</label>
                        {loadingCategories ? (
                            <p className="text-sm text-gray-400">Loading categories...</p>
                        ) : (
                            <select
                                name="category"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.category}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                            >
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.category_name}</option>
                                ))}
                            </select>
                        )}
                        {formik.touched.category && formik.errors.category && (
                            <span className="text-xs text-red-500">{formik.errors.category}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Priority</label>
                        <select
                            name="priority_level"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.priority_level}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                        >
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            rows="4"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                            placeholder="Describe the issue in detail..."
                        />
                        {formik.touched.description && formik.errors.description && (
                            <span className="text-xs text-red-500">{formik.errors.description}</span>
                        )}
                    </div>

                    {/* 3. Camera Only Evidence */}
                    <div className="border-t border-gray-200 pt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Evidence (Camera Only)</label>

                        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center min-h-[250px]">
                            {!capturedImage && !isCameraOpen && (
                                <div className="text-center">
                                    <FaCamera className="text-5xl text-gray-400 mx-auto mb-3" />
                                    <Button type="button" onClick={startCamera}>
                                        Open Camera
                                    </Button>
                                    <p className="text-xs text-gray-500 mt-2">File upload is disabled. Please capture a live photo.</p>
                                </div>
                            )}

                            {isCameraOpen && (
                                <div className="relative w-full max-w-sm bg-black rounded-lg overflow-hidden">
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        playsInline
                                        muted
                                        className="w-full h-auto object-cover"
                                        style={{ minHeight: '200px' }}
                                    />
                                    {/* Debug overlay to ensure element is there */}
                                    <div className="absolute top-2 left-2 text-[10px] text-white opacity-50 pointer-events-none">
                                        Cam: {stream ? (videoRef.current?.videoWidth + 'x' + videoRef.current?.videoHeight) : 'Connecting...'}
                                    </div>
                                    <div className="flex justify-center gap-4">
                                        <Button type="button" onClick={capturePhoto} className="bg-green-600 hover:bg-green-700">
                                            Capture
                                        </Button>
                                        <Button type="button" variant="outline" onClick={stopCamera}>
                                            Cancel
                                        </Button>
                                    </div>
                                    <canvas ref={canvasRef} className="hidden" />
                                </div>
                            )}

                            {capturedImage && (
                                <div className="relative w-full max-w-sm text-center">
                                    <img src={capturedImage} alt="Captured Evidence" className="w-full rounded-lg shadow-md mb-4" />
                                    <div className="flex justify-center gap-4">
                                        <div className="flex items-center gap-2 text-green-600 font-bold">
                                            <FaCheck /> Image Captured
                                        </div>
                                        <Button type="button" variant="outline" onClick={retakePhoto} className="flex items-center gap-2">
                                            <FaRedo /> Retake
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end pt-6">
                        <Button
                            type="submit"
                            className="px-8"
                            disabled={formik.isSubmitting || !locationData.lat || locationError !== null}
                        >
                            {formik.isSubmitting ? 'Submitting...' : 'Submit Report'}
                        </Button>
                    </div>

                </form>
            </Card>
        </div>
    );
};

export default CreateComplaint;
