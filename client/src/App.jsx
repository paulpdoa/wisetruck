import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router-dom';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Verification from './pages/Verification';
import UpdatePassword from './pages/UpdatePassword';
import CustomerHome from './pages/customer/CustomerHome';
import CustomerNews from './pages/customer/CustomerNews';
import CustomerProfile from './pages/customer/CustomerProfile';
import CustomerAbout from './pages/customer/CustomerAbout';
import CustomerSupport from './pages/customer/CustomerSupport';
import CustomerContact from './pages/customer/CustomerContact';
import CustomerWasteInfo from './pages/customer/CustomerWasteInfo';
import GlassWaste from './pages/customer/GlassWaste';
import PlasticWaste from './pages/customer/PlasticWaste';
import MetalWaste from './pages/customer/MetalWaste';
import OrganicWaste from './pages/customer/OrganicWaste';
import PaperWaste from './pages/customer/PaperWaste';
import ElectronicWaste from './pages/customer/ElectronicWaste';
import WasteDetail from './pages/customer/WasteDetail';
import CustomerRecycleCenter from './pages/customer/CustomerRecycleCenter';
import NewsDetail from './pages/customer/NewsDetail';
import AdminSignup from './pages/admin/AdminSignup';
import AdminLogin from './pages/admin/AdminLogin';
import AdminHome from './pages/admin/AdminHome';
import AdminCollection from './pages/admin/AdminCollection';
import AdminNews from './pages/admin/AdminNews';
import AdminWaste from './pages/admin/AdminWaste';
import AdminUsers from './pages/admin/AdminUsers';

// Layouts
import CustomerLayout from './layouts/CustomerLayout';
import AdminLayout from './layouts/AdminLayout';
import ViewUserId from './components/ViewUserId';
import AdminFeedback from './pages/admin/AdminFeedback';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* For Customers */}
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/forgot/password' element={<ForgotPassword />} />
      <Route path='/verification/:id' element={<Verification />} />
      <Route path='/update/password/:id' element={<UpdatePassword />} />
      {/* For Admin */}
      <Route path='/admin/signup' element={<AdminSignup />} />
      <Route path='/admin/login' element={<AdminLogin />} />

      <Route element={<CustomerLayout />}>
        <Route path='/' element={<CustomerHome />} />
        <Route path='/news' element={<CustomerNews />} />
        <Route path='/news/:id' element={<NewsDetail />} />
        <Route path='/profile/:id' element={<CustomerProfile />} />
        <Route path='/about' element={<CustomerAbout />} />
        <Route path='/support' element={<CustomerSupport />} />
        <Route path='/contact' element={<CustomerContact />} />
        <Route path='/wasteinfo' element={<CustomerWasteInfo />} />
        <Route path='/wasteinfo/glasswaste' element={<GlassWaste />} />
        <Route path='/wasteinfo/plasticwaste' element={<PlasticWaste />} />
        <Route path='/wasteinfo/paperwaste' element={<PaperWaste />} />
        <Route path='/wasteinfo/metalwaste' element={<MetalWaste />} />
        <Route path='/wasteinfo/organicwaste' element={<OrganicWaste />} />
        <Route path='/wasteinfo/electronicwaste' element={<ElectronicWaste />} />
        <Route path='/wasteinfo/:id' element={<WasteDetail />} />
        <Route path='/recyclecenters' element={<CustomerRecycleCenter />} />
      </Route>

      <Route element={<AdminLayout />}>
        <Route path='/admin' element={<AdminHome />} />
        <Route path='/admin/collection' element={<AdminCollection />} />
        <Route path='/admin/news' element={<AdminNews />} />
        <Route path='/admin/waste' element={<AdminWaste />} />
        <Route path='/admin/users' element={<AdminUsers />} />
        <Route path='/admin/user/:id' element={<ViewUserId />} />
        <Route path='/admin/feedbacks' element={<AdminFeedback />} />
      </Route>

    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
