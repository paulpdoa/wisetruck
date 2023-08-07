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
// Layouts
import CustomerLayout from './layouts/CustomerLayout';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/forgot/password' element={<ForgotPassword />} />
      <Route path='/verification/:id' element={<Verification />} />
      <Route path='/update/password/:id' element={<UpdatePassword />} />

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
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
