import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router-dom';
// Pages
import Signup from './pages/Signup';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/signup' element={<Signup />} />
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
