import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaCamera, FaSpinner, FaRedo, FaCheck, FaSave, FaArrowLeft } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Button from '../../../components/UI/Button';
import Input from '../../../components/UI/Input';
import Card from '../../../components/UI/Card';
import { getComplaint, updateComplaint, getCategories } from '../../../services/complaintService';

const EditComplaint = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [initialImage, setInitialImage] = useState(null);
    const [canEdit, setCanEdit] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [complaintData, categoriesData] = await Promise.all([
                    getComplaint(id),
                    getCategories()
                ]);

                if (complaintData.status !== 'SUBMITTED') {
                    setCanEdit(false);
                    Swal.fire({
                        icon: 'warning',
                        title: 'Cannot Edit',
                        text: `This complaint is currently ${complaintData.status} and cannot be edited.`,
                        confirmButtonText: 'Go Back'
                    }).then(() => navigate('/citizen/complaints'));
                    return;
                }

                setCategories(categoriesData);
                setInitialImage(complaintData.evidence_image);

                formik.setValues({
                    title: complaintData.title,
                    category: complaintData.category,
                    description: complaintData.description,
                    priority_level: complaintData.priority_level,
                    image: null
                });
            } catch (err) {
                console.error("Error loading data:", err);
                Swal.fire('Error', 'Failed to load complaint data', 'error');
                navigate('/citizen/complaints');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, navigate]);

    // Camera Handlers
    const startCamera = async () => {
        if (!window.isSecureContext) {
            Swal.fire('Security Error', 'Camera access requires a secure connection (HTTPS or localhost).', 'error');
            return;
        }

        try {
            const constraints = { video: true };
            const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
                videoRef.current.play().catch(e => console.error("Video play error:", e));
            }
            setIsCameraOpen(true);
        } catch (err) {
            console.error("Camera Error:", err);
            Swal.fire('Camera Error', `Could not access camera: ${err.name} - ${err.message}`, 'error');
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
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            context.drawImage(videoRef.current, 0, 0);

            canvasRef.current.toBlob((blob) => {
                const file = new File([blob], "updated_evidence.jpg", { type: "image/jpeg" });
                formik.setFieldValue('image', file);
                setCapturedImage(URL.createObjectURL(file));
                stopCamera();
            }, 'image/jpeg', 0.8);
        }
    };

    const retakePhoto = () => {
        setCapturedImage(null);
        formik.setFieldValue('image', null);
        startCamera();
    };

    const formik = useFormik({
        initialValues: {
            title: '',
            category: '',
            description: '',
            priority_level: 'LOW',
            image: null,
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Required'),
            category: Yup.string().required('Required'),
            description: Yup.string().required('Required').min(20),
            priority_level: Yup.string().required('Required'),
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('category', values.category);
            formData.append('description', values.description);
            formData.append('priority_level', values.priority_level);

            if (values.image) {
                formData.append('evidence_image', values.image);
            }

            try {
                Swal.fire({ title: 'Updating...', didOpen: () => Swal.showLoading() });
                await updateComplaint(id, formData);
                Swal.fire('Success', 'Complaint updated successfully!', 'success').then(() => {
                    navigate('/citizen/complaints');
                });
            } catch (err) {
                Swal.fire('Error', 'Failed to update complaint', 'error');
            }
        },
    });

    if (loading || !canEdit) {
        return (
            <div className="flex justify-center items-center h-screen">
                <FaSpinner className="animate-spin text-4xl text-primary" />
            </div>
        );
    }

    return (
        <div className="p-8 max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Button variant="outline" onClick={() => navigate('/citizen/complaints')} className="p-2">
                    <FaArrowLeft />
                </Button>
                <h1 className="text-3xl font-bold text-gray-900">Edit Complaint</h1>
            </div>

            <Card>
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <Input
                        id="title"
                        name="title"
                        label="Title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.title && formik.errors.title}
                    />

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Category</label>
                        <select
                            name="category"
                            value={formik.values.category}
                            onChange={formik.handleChange}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                        >
                            <option value="">Select Category</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.category_name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Priority</label>
                        <select
                            name="priority_level"
                            value={formik.values.priority_level}
                            onChange={formik.handleChange}
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
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Update Evidence (Optional)</label>

                        {initialImage && !capturedImage && !isCameraOpen && (
                            <div className="mb-4">
                                <p className="text-xs text-gray-500 mb-2">Current Image:</p>
                                <img src={initialImage} alt="Current Evidence" className="h-32 rounded-lg object-cover" />
                            </div>
                        )}

                        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center min-h-[200px]">
                            {!capturedImage && !isCameraOpen && (
                                <div className="text-center">
                                    <FaCamera className="text-4xl text-gray-400 mx-auto mb-3" />
                                    <Button type="button" onClick={startCamera}>
                                        {initialImage ? "Change Photo" : "Add Photo"}
                                    </Button>
                                </div>
                            )}

                            {isCameraOpen && (
                                <div className="relative w-full max-w-sm">
                                    <video ref={videoRef} autoPlay playsInline muted className="w-full rounded-lg shadow-md mb-4" />
                                    <div className="flex justify-center gap-4">
                                        <Button type="button" onClick={capturePhoto} className="bg-green-600 hover:bg-green-700">Capture</Button>
                                        <Button type="button" variant="outline" onClick={stopCamera}>Cancel</Button>
                                    </div>
                                    <canvas ref={canvasRef} className="hidden" />
                                </div>
                            )}

                            {capturedImage && (
                                <div className="relative w-full max-w-sm text-center">
                                    <img src={capturedImage} alt="New Evidence" className="w-full rounded-lg shadow-md mb-4" />
                                    <div className="flex justify-center gap-4">
                                        <div className="flex items-center gap-2 text-green-600 font-bold"><FaCheck /> Ready to Upload</div>
                                        <Button type="button" variant="outline" onClick={retakePhoto}><FaRedo /> Retake</Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end pt-6">
                        <Button type="submit" className="px-8" disabled={formik.isSubmitting}>
                            <FaSave className="mr-2" /> Save Changes
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default EditComplaint;
