import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router-dom';
// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Verification from './pages/Verification';
import UpdatePassword from './pages/UpdatePassword';
import CustomerHome from './pages/customer/CustomerHome';

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
        <Route path='/customer' element={<CustomerHome />} />
      </Route>
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
