import axiosInstance from "../components/Axios";

// ===== LOCAL TAX PAYMENT FLOW =====

// Initiate Local Tax checkout session with Django back-end
export const checkoutLocalTax = async () => {
    // We send an empty object as specified by LocalTaxCheckoutSerializer
    const response = await axiosInstance.post('billing/local-tax/checkout/', {});
    return response.data; // { checkout_url, session_id }
};

// Verify the payment session after redirect from Stripe
export const verifyLocalTaxPayment = async (sessionId) => {
    const response = await axiosInstance.get(`billing/local-tax/verify/?session_id=${sessionId}`);
    return response.data; // The Payment data object from backend
};

// ===== CITY RATE PAYMENT FLOW =====

// Initiate City Rate checkout session
// amount_due: optional (required on first payment if bill doesn't exist)
// pay_amount: required (amount to pay in this installment)
export const checkoutCityRate = async (payAmount, amountDue = null) => {
    const payload = {
        pay_amount: payAmount,
    };
    
    if (amountDue) {
        payload.amount_due = amountDue;
    }
    
    const response = await axiosInstance.post('billing/city-rate/checkout/', payload);
    return response.data; // { checkout_url, session_id }
};

// Verify City Rate payment session after Stripe redirect
export const verifyCityRatePayment = async (sessionId) => {
    const response = await axiosInstance.get(`billing/city-rate/verify/?session_id=${sessionId}`);
    return response.data; // The Payment data object from backend
};

// Get all bills for current user
export const getUserBills = async () => {
    const response = await axiosInstance.get('billing/payments/bills/');
    return response.data; // List of Bill objects
};

// Get all payments for current user
export const getUserPayments = async () => {
    const response = await axiosInstance.get('billing/payments/');
    return response.data; // List of Payment objects with related Bill data
};

// Get payment statistics for dashboard
export const getPaymentStats = async () => {
    const response = await axiosInstance.get('billing/payments/stats/');
    return response.data; // { total_paid_ytd, pending_bills_total, last_payment, etc. }
};

// Get recent transactions for dashboard widget
export const getRecentPayments = async () => {
    const response = await axiosInstance.get('billing/payments/recent/');
    return response.data; // List of recent payments
};

// Get specific bill details
export const getBillDetail = async (billId) => {
    const response = await axiosInstance.get(`billing/payments/bills/?bill_id=${billId}`);
    return response.data;
};

// Get specific payment details
export const getPaymentDetail = async (paymentId) => {
    const response = await axiosInstance.get(`billing/payments/${paymentId}/`);
    return response.data;
};

// Filter payments by service type
export const getPaymentsByService = async (serviceType) => {
    const response = await axiosInstance.get(`billing/payments/?service_type=${serviceType}`);
    return response.data;
};

// Filter payments by status
export const getPaymentsByStatus = async (status) => {
    const response = await axiosInstance.get(`billing/payments/?status=${status}`);
    return response.data;
};

// ===== WASTE COLLECTION PAYMENT FLOW =====

// Fetch available waste collection plans
export const getWastePlans = async () => {
    const response = await axiosInstance.get('billing/waste-collection/plans/');
    return response.data; // List of WastePlan objects: [{ id, name, interval, price, is_active }]
};

// Initiate Waste Collection checkout session
export const checkoutWasteCollection = async (planId) => {
    const payload = { plan_id: planId };
    const response = await axiosInstance.post('billing/waste-collection/checkout/', payload);
    return response.data; // { checkout_url, session_id }
};

// Verify Waste Collection payment session after Stripe redirect
export const verifyWasteCollectionPayment = async (sessionId) => {
    const response = await axiosInstance.get(`billing/waste-collection/verify/?session_id=${sessionId}`);
    return response.data; // { payment, coverage }
};
