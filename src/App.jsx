import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SidebarCitizen from './components/SidebarCitizen';
import SidebarAdmin from './components/SidebarAdmin';
import ProtectedRoute from './components/ProtectedRoute';
import { ROLES } from './utils/constants';

// Import Pages (Public)
// Import Pages (Public)
import Home from './pages/Public/Home';
import About from './pages/Public/About';
import Services from './pages/Public/Services';
import ServiceDetails from './pages/Public/ServiceDetails';
import Wards from './pages/Public/Wards';
import Contact from './pages/Public/Contact';

// Import Pages (Auth)
import CitizenLogin from './pages/Auth/CitizenLogin';
import CitizenRegister from './pages/Auth/CitizenRegister';
import StaffLogin from './pages/Auth/StaffLogin';

// Import Pages (Citizen)
// Import Pages (Citizen)
import Dashboard from './pages/Citizen/Dashboard';
import ComplaintList from './pages/Citizen/ComplaintList';
import CreateComplaint from './pages/Citizen/Complaints/CreateComplaint';
import EditComplaint from './pages/Citizen/Complaints/EditComplaint';
import ComplaintDetails from './pages/Citizen/ComplaintDetails';
import Profile from './pages/Citizen/Profile';
import PaymentDashboard from './pages/Citizen/Payments/PaymentDashboard';
import PaymentSelection from './pages/Citizen/Payments/PaymentSelection';
import PaymentCheckout from './pages/Citizen/Payments/PaymentCheckout';
import PaymentHistory from './pages/Citizen/Payments/PaymentHistory';
import PaymentSuccess from './pages/Citizen/Payments/PaymentSuccess';
import PermitDashboard from './pages/Citizen/Permits/PermitDashboard';
import ApplyPermit from './pages/Citizen/Permits/ApplyPermit';
import PermitDetails from './pages/Citizen/Permits/PermitDetails';
import LicenseDetails from './pages/Citizen/Permits/LicenseDetails';
import BusinessDashboard from './pages/Citizen/Permits/BusinessDashboard';
import CreateBusiness from './pages/Citizen/Permits/CreateBusiness';
import CreateLicenseRequest from './pages/Citizen/Permits/CreateLicenseRequest';
import Notifications from './pages/Citizen/Notifications';

// Import Pages (Payments - Global Callbacks)
import LocalTaxSuccess from './pages/Citizen/Payments/LocalTaxSuccess';
import LocalTaxCancel from './pages/Citizen/Payments/LocalTaxCancel';
import CityRateSuccess from './pages/Citizen/Payments/CityRateSuccess';
import WasteCollectionSuccess from './pages/Citizen/Payments/WasteCollectionSuccess';
import WasteCollectionCancel from './pages/Citizen/Payments/WasteCollectionCancel';
import BusinessLicenseSuccess from './pages/Citizen/Payments/BusinessLicenseSuccess';

// Import Pages (Admin)
import AdminDashboard from './pages/Admin/AdminDashboard';
import Complaints from './pages/Admin/AdminComplaintList';
import ComplaintDetailsAdmin from './pages/Admin/AdminComplaintDetails';
import PermitManagement from './pages/Admin/Permits/PermitManagement';
import AssignStaff from './pages/Admin/AssignStaff';
import Analytics from './pages/Admin/Analytics';
import ManageUsers from './pages/Admin/UserManagement';
import Settings from './pages/Admin/Settings';

// Import Pages (Officer)
import OfficerDashboard from './pages/Officer/OfficerDashboard';
import AssignedComplaints from './pages/Officer/AssignedComplaints';
import OfficerComplaintDetails from './pages/Officer/OfficerComplaintDetails';
import FieldTasks from './pages/Officer/FieldTasks';
import OfficerNotifications from './pages/Officer/OfficerNotifications';
import OfficerProfile from './pages/Officer/OfficerProfile';
import SidebarOfficer from './components/SidebarOfficer';

const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <main className="flex-grow">{children}</main>
    <Footer />
  </>
);

import { useState } from 'react';

const CitizenLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className="flex">
      <SidebarCitizen isCollapsed={isCollapsed} toggleSidebar={() => setIsCollapsed(!isCollapsed)} />
      <main className={`flex-grow bg-secondary min-h-screen transition-all duration-300 ${isCollapsed ? 'ml-8' : 'ml-10'}`}>
        <Outlet />
      </main>
    </div>
  );
};

const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className="flex">
      <SidebarAdmin isCollapsed={isCollapsed} toggleSidebar={() => setIsCollapsed(!isCollapsed)} />
      <main className={`flex-grow bg-gray-100 min-h-screen transition-all duration-300 ${isCollapsed ? 'ml-10' : 'ml-10'}`}>
        <Outlet />
      </main>
    </div>
  );
};

const OfficerLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className="flex">
      <SidebarOfficer isCollapsed={isCollapsed} toggleSidebar={() => setIsCollapsed(!isCollapsed)} />
      <main className={`flex-grow bg-secondary min-h-screen transition-all duration-300 ${isCollapsed ? 'ml-4 mr-20' : 'ml-10'}`}>
        <Outlet />
      </main>
    </div>
  );
};

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
        <Route path="/services/:id" element={<PublicLayout><ServiceDetails /></PublicLayout>} />
        <Route path="/wards" element={<PublicLayout><Wards /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

        {/* Auth Routes */}
        <Route path="/auth/login" element={<CitizenLogin />} />
        <Route path="/auth/register" element={<CitizenRegister />} />
        <Route path="/auth/staff-login" element={<PublicLayout><StaffLogin /></PublicLayout>} />

        {/* Global Payment Callbacks */}
        <Route path="/payments/local-tax/success" element={<LocalTaxSuccess />} />
        <Route path="/payments/local-tax/cancel" element={<LocalTaxCancel />} />
        <Route path="/payments/city-rate/success" element={<CityRateSuccess />} />
        <Route path="/payments/waste/success" element={<WasteCollectionSuccess />} />
        <Route path="/payments/waste/cancel" element={<WasteCollectionCancel />} />
        <Route path="/payments/business-license/success" element={<BusinessLicenseSuccess />} />

        {/* Citizen Routes */}
        <Route path="/citizen/*" element={
          <ProtectedRoute allowedRoles={[ROLES.CITIZEN]}>
            <CitizenLayout />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="complaints" element={<ComplaintList />} />
          <Route path="complaints/create" element={<CreateComplaint />} />
          <Route path="complaints/edit/:id" element={<EditComplaint />} />
          <Route path="complaints/:id" element={<ComplaintDetails />} />
          <Route path="payments" element={<PaymentDashboard />} />
          <Route path="payments/new" element={<PaymentSelection />} />
          <Route path="payments/checkout" element={<PaymentCheckout />} />
          <Route path="payments/history" element={<PaymentHistory />} />
          <Route path="payments/success" element={<PaymentSuccess />} />
          <Route path="permits" element={<PermitDashboard />} />
          <Route path="permits/apply" element={<ApplyPermit />} />
          <Route path="permits/license/:noticeId" element={<LicenseDetails />} />
          <Route path="permits/license-request" element={<CreateLicenseRequest />} />
          <Route path="permits/businesses" element={<BusinessDashboard />} />
          <Route path="permits/business/create" element={<CreateBusiness />} />
          <Route path="permits/business/:businessId/edit" element={<CreateBusiness />} />
          <Route path="permits/:id" element={<PermitDetails />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>

        {/* Officer Routes */}
        <Route path="/officer/*" element={
          <ProtectedRoute allowedRoles={[ROLES.STAFF]}>
            <OfficerLayout />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<OfficerDashboard />} />
          <Route path="complaints" element={<AssignedComplaints />} />
          <Route path="complaints/:id" element={<OfficerComplaintDetails />} />
          <Route path="tasks" element={<FieldTasks />} />
          <Route path="notifications" element={<OfficerNotifications />} />
          <Route path="profile" element={<OfficerProfile />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/*" element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="complaints/:id" element={<ComplaintDetailsAdmin />} />
          <Route path="permits" element={<PermitManagement />} />
          <Route path="assign" element={<AssignStaff />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
