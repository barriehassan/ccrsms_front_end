import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaCamera, FaMapMarkerAlt, FaSpinner, FaRedo, FaCheck, FaCrosshairs, FaWhatsapp } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, useMapEvents, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Swal from 'sweetalert2';
import Button from '../../../components/UI/Button';
import Input from '../../../components/UI/Input';
import Card from '../../../components/UI/Card';
import { createComplaint, getCategories } from '../../../services/complaintService';

// Fix for default marker icon issue in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationMarker = ({ position, setPosition, onAddressUpdate }) => {
    useMapEvents({
        click(e) {
            setPosition(e.latlng);
        },
    });

    return position === null ? null : (
        <Marker
            position={position}
            draggable={true}
            eventHandlers={{
                dragend: (e) => {
                    const marker = e.target;
                    const newPos = marker.getLatLng();
                    setPosition(newPos);
                    onAddressUpdate(newPos.lat, newPos.lng);
                },
            }}
        />
    );
};

const MapView = ({ center }) => {
    const map = useMapEvents({});
    if (center && center[0] !== null && center[1] !== null) {
        map.setView(center, map.getZoom());
    }
    return null;
};

const CreateComplaint = () => {
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [locationData, setLocationData] = useState({ lat: null, lng: null, address: '', accuracy: null, addressFound: true });
    const [locationError, setLocationError] = useState(null);
    const [isLocating, setIsLocating] = useState(false);
    const [mapCenter, setMapCenter] = useState([8.4871, -13.2355]); // Freetown center default
    const [markerPosition, setMarkerPosition] = useState(null);
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

            let resolvedAddress = '';
            let isAddressFound = false;

            // Reverse Geo only if accurate enough (< 1000m)
            if (accuracy < 1000) {
                try {
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1&email=ccrsms_user@example.com`, {
                        headers: { 'Accept-Language': 'en-US,en;q=0.9' }
                    });
                    if (!response.ok) throw new Error("Addr lookup failed");
                    const data = await response.json();

                    if (data && data.display_name) {
                        resolvedAddress = data.display_name;
                        isAddressFound = true;
                    } else {
                        resolvedAddress = "Address not found for these coordinates.";
                    }
                } catch (error) {
                    console.error("Reverse geo error:", error);
                    resolvedAddress = "Failed to retrieve street name. Network error.";
                }
            } else {
                resolvedAddress = `Low accuracy (${Math.round(accuracy)}m). Try moving outside.`;
            }

            // Logic: Update state with new coordinates and address status
            setLocationData(prev => ({
                ...prev,
                lat: latitude,
                lng: longitude,
                accuracy: accuracy,
                address: resolvedAddress,
                addressFound: isAddressFound
            }));

            // Update Map Center and Marker
            setMapCenter([latitude, longitude]);
            setMarkerPosition({ lat: latitude, lng: longitude });
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

    const updateAddressFromCoords = async (lat, lng) => {
        setLocationData(prev => ({ ...prev, lat, lng }));
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
                { headers: { 'Accept-Language': 'en-US,en;q=0.9', 'Accept': 'application/json' } }
            );
            const data = await response.json();

            if (data && data.display_name) {
                setLocationData(prev => ({ ...prev, address: data.display_name, addressFound: true }));
                formik.setFieldValue('manual_address', ''); // Clear manual if found
            } else {
                setLocationData(prev => ({ ...prev, address: `Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`, addressFound: false }));
            }
        } catch (error) {
            setLocationData(prev => ({ ...prev, address: `Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`, addressFound: false }));
        }
    };

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
            manual_address: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            category: Yup.string().required('Category is required'),
            description: Yup.string().required('Description is required (min 20 chars)').min(20),
            priority_level: Yup.string().required('Required'),
            // Image is technically optional in backend, but let's encourage it or verify requirement
        }),
        onSubmit: async (values) => {
            if (!locationData.lat && !formik.values.manual_address.trim()) {
                Swal.fire('Location Missing', 'Please tag the location on the map or enter the street name manually.', 'warning');
                return;
            }

            if (locationData.lat && !locationData.addressFound && !formik.values.manual_address.trim()) {
                Swal.fire('Street Name Required', 'Automatic address resolution failed. Please enter the street name manually.', 'warning');
                return;
            }

            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('category', values.category); // ID of category
            formData.append('description', values.description);
            formData.append('priority_level', values.priority_level);
            formData.append('latitude', locationData.lat || mapCenter[0]);
            formData.append('longitude', locationData.lng || mapCenter[1]);

            const finalStreetName = (locationData.lat && locationData.addressFound) ? locationData.address : values.manual_address;
            formData.append('street_name', finalStreetName ? finalStreetName.substring(0, 200) : '');

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
        <div className="p-4 sm:p-6 w-full max-w-5xl mx-auto transition-colors duration-300">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">Report an Issue</h1>

            <Card className="dark:bg-dark-card dark:border-gray-800 transition-colors duration-300">
                <form onSubmit={formik.handleSubmit} className="space-y-6">

                    {/* 1. Location Section (Manual Trigger & Map) */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800 transition-colors duration-300">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                            <div className="flex-grow">
                                <h3 className="flex items-center gap-2 font-bold text-blue-800 dark:text-blue-300 mb-2 transition-colors duration-300">
                                    <FaMapMarkerAlt /> Location
                                </h3>

                                {!locationData.lat && !locationError && (
                                    <div className="text-gray-600 dark:text-gray-400 text-sm mb-2 transition-colors duration-300">
                                        Please tag the location of the issue. Use the button or the map below.
                                    </div>
                                )}

                                {locationError ? (
                                    <p className="text-red-500 dark:text-red-400 font-medium text-sm transition-colors duration-300">{locationError}</p>
                                ) : locationData.lat ? (
                                    <div>
                                        <p className="text-gray-700 dark:text-gray-300 font-medium text-sm leading-tight mb-1 transition-colors duration-300">{locationData.address || "Fetching address..."}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2 transition-colors duration-300">
                                            <span>{locationData.lat.toFixed(6)}, {locationData.lng.toFixed(6)}</span>
                                            {locationData.accuracy && (
                                                <span className={`px-2 py-0.5 rounded-full text-white text-[10px] ${locationData.accuracy < 30 ? 'bg-green-600 dark:bg-green-700' : 'bg-yellow-500 dark:bg-yellow-600'}`}>
                                                    ±{Math.round(locationData.accuracy)}m
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                ) : null}

                                {(locationError || (!locationData.addressFound && locationData.lat)) && (
                                    <div className="mt-4 pt-3 border-t border-blue-200 dark:border-blue-800 transition-colors duration-300">
                                        <label className="text-sm font-medium text-gray-800 dark:text-gray-200 transition-colors duration-300">Please enter street name manually <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            name="manual_address"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.manual_address}
                                            placeholder="e.g., 123 Main St near Central Park"
                                            className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-colors duration-300"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="flex-shrink-0 self-start sm:self-center">
                                {!locationData.lat ? (
                                    <Button type="button" onClick={startLocationWatch} disabled={isLocating} className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 w-full sm:w-auto">
                                        {isLocating ? <FaSpinner className="animate-spin mr-2" /> : <FaCrosshairs className="mr-2" />}
                                        {isLocating ? 'Locating...' : 'Get Location'}
                                    </Button>
                                ) : (
                                    <Button type="button" variant="ghost" size="sm" onClick={() => {
                                        if (watchId.current) navigator.geolocation.clearWatch(watchId.current);
                                        startLocationWatch();
                                    }} className="text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-xs w-full sm:w-auto mt-2 sm:mt-0">
                                        <FaRedo className="mr-1" /> Refresh
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Map Integration */}
                        <div className="mt-4 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600 shadow-inner z-0" style={{ height: '300px' }}>
                            <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }} className="z-0">
                                <LayersControl position="topright">
                                    <LayersControl.BaseLayer checked name="Google Maps">
                                        <TileLayer
                                            attribution='&copy; Google Maps'
                                            url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                                        />
                                    </LayersControl.BaseLayer>
                                    <LayersControl.BaseLayer name="Satellite View">
                                        <TileLayer
                                            attribution='&copy; Google Maps'
                                            url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
                                        />
                                    </LayersControl.BaseLayer>
                                </LayersControl>
                                <MapView center={mapCenter} />
                                <LocationMarker
                                    position={markerPosition}
                                    setPosition={(pos) => {
                                        setMarkerPosition(pos);
                                        setMapCenter([pos.lat, pos.lng]); // Optional: pan map on marker drag
                                        updateAddressFromCoords(pos.lat, pos.lng);
                                    }}
                                    onAddressUpdate={updateAddressFromCoords}
                                />
                            </MapContainer>
                            <div className="bg-gray-50 dark:bg-gray-800/80 p-2 text-xs text-gray-500 dark:text-gray-400 text-center italic transition-colors duration-300">
                                Tip: Drag the marker or click on the map to pinpoint the exact location.
                            </div>
                        </div>
                    </div>

                    {/* 2. Text Fields */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <Input
                            id="title"
                            name="title"
                            label="Title"
                            placeholder="e.g., Deep Pothole"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.title}
                            error={formik.touched.title && formik.errors.title}
                            className="bg-white dark:bg-dark-bg text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-accent"
                            labelClassName="text-gray-700 dark:text-gray-300"
                        />

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">Category</label>
                            {loadingCategories ? (
                                <p className="text-sm text-gray-400 dark:text-gray-500 py-2">Loading categories...</p>
                            ) : (
                                <select
                                    name="category"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.category}
                                    className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors bg-white dark:bg-dark-bg text-gray-900 dark:text-white ${formik.touched.category && formik.errors.category
                                        ? 'border-red-500 focus:ring-red-200 dark:focus:ring-red-900/30'
                                        : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-blue-100 dark:focus:ring-blue-900/30'
                                        }`}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.category_name}</option>
                                    ))}
                                </select>
                            )}
                            {formik.touched.category && formik.errors.category && (
                                <span className="text-xs text-red-500 dark:text-red-400">{formik.errors.category}</span>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">Priority</label>
                        <select
                            name="priority_level"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.priority_level}
                            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors bg-white dark:bg-dark-bg text-gray-900 dark:text-white ${formik.touched.priority_level && formik.errors.priority_level
                                ? 'border-red-500 focus:ring-red-200 dark:focus:ring-red-900/30'
                                : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-blue-100 dark:focus:ring-blue-900/30'
                                }`}
                        >
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">Description</label>
                        <textarea
                            name="description"
                            rows="4"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors bg-white dark:bg-dark-bg text-gray-900 dark:text-white ${formik.touched.description && formik.errors.description
                                ? 'border-red-500 focus:ring-red-200 dark:focus:ring-red-900/30'
                                : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-blue-100 dark:focus:ring-blue-900/30'
                                }`}
                            placeholder="Describe the issue in detail..."
                        />
                        {formik.touched.description && formik.errors.description && (
                            <span className="text-xs text-red-500 dark:text-red-400">{formik.errors.description}</span>
                        )}
                    </div>

                    {/* 3. Camera Only Evidence */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6 transition-colors duration-300">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">Evidence (Camera Only)</label>

                        <div className="bg-gray-50 dark:bg-gray-800/50 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 flex flex-col items-center justify-center min-h-[250px] transition-colors duration-300">
                            {!capturedImage && !isCameraOpen && (
                                <div className="text-center">
                                    <FaCamera className="text-5xl text-gray-400 dark:text-gray-500 mx-auto mb-3 transition-colors duration-300" />
                                    <Button type="button" onClick={startCamera}>
                                        Open Camera
                                    </Button>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 transition-colors duration-300">File upload is disabled. Please capture a live photo.</p>
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
                                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 px-4 bg-gradient-to-t from-black/80 to-transparent py-2">
                                        <Button type="button" onClick={capturePhoto} className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
                                            Capture
                                        </Button>
                                        <Button type="button" variant="outline" onClick={stopCamera} className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm w-full sm:w-auto">
                                            Cancel
                                        </Button>
                                    </div>
                                    <canvas ref={canvasRef} className="hidden" />
                                </div>
                            )}

                            {capturedImage && (
                                <div className="relative w-full max-w-sm text-center">
                                    <img src={capturedImage} alt="Captured Evidence" className="w-full rounded-lg shadow-md mb-4" />
                                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold transition-colors duration-300">
                                            <FaCheck /> Captured
                                        </div>
                                        <Button type="button" variant="outline" onClick={retakePhoto} className="flex items-center gap-2 w-full sm:w-auto">
                                            <FaRedo /> Retake
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                        <Button
                            type="submit"
                            className="flex-1 py-3 text-lg font-bold"
                            disabled={formik.isSubmitting || (!locationData.lat && !formik.values.manual_address.trim())}
                        >
                            {formik.isSubmitting ? 'Submitting...' : 'Submit Report'}
                        </Button>

                        <button
                            type="button"
                            onClick={() => {
                                const mapsLink = locationData.lat && locationData.lng
                                    ? `\n*Map Link:* https://www.google.com/maps?q=${locationData.lat},${locationData.lng}`
                                    : '';

                                const catName = categories.find(c => c.id === formik.values.category)?.category_name || formik.values.category;

                                const text = encodeURIComponent(
                                    `*COUNCIL COMPLAINT REPORT*\n\n` +
                                    `*Title:* ${formik.values.title || 'N/A'}\n` +
                                    `*Category:* ${catName || 'N/A'}\n` +
                                    `*Priority:* ${formik.values.priority_level}\n` +
                                    `*Location:* ${locationData.address || formik.values.manual_address || 'N/A'}${mapsLink}\n` +
                                    `*Description:* ${formik.values.description || 'N/A'}\n\n` +
                                    `_Submitted via CCRSMS Portal_`
                                );
                                window.open(`https://wa.me/23276107333?text=${text}`, '_blank');
                            }}
                            className="flex-1 py-3 text-lg font-bold border-2 border-green-500 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors flex items-center justify-center gap-2"
                        >
                            <FaWhatsapp className="text-2xl" />
                            Submit via WhatsApp
                        </button>
                    </div>

                </form>
            </Card>
        </div>
    );
};

export default CreateComplaint;
