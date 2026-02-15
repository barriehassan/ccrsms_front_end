import axiosInstance from "../components/Axios";

// Fetch all complaints for the logged-in citizen
export const getComplaints = async () => {
    const response = await axiosInstance.get('core/citizens/complaints/');
    return response.data;
};

// Fetch a single complaint by ID
export const getComplaint = async (id) => {
    const response = await axiosInstance.get(`core/citizens/complaints/${id}/`);
    return response.data;
};

// Create a new complaint (Multipart form data for image)
export const createComplaint = async (formData) => {
    const response = await axiosInstance.post('core/citizens/complaints/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        timeout: 60000, // Extend timeout to 60s for image uploads
    });
    return response.data;
};

// Update an existing complaint (Multipart form data if image is updated)
export const updateComplaint = async (id, formData) => {
    const response = await axiosInstance.put(`core/citizens/complaints/${id}/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// Delete a complaint
export const deleteComplaint = async (id) => {
    await axiosInstance.delete(`core/citizens/complaints/${id}/`);
};

// Fetch complaint categories
export const getCategories = async () => {
    const response = await axiosInstance.get('core/complaint-categories/');
    return response.data;
};
