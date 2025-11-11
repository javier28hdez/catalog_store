import { Route, Routes } from 'react-router-dom'
import './App.css'
import Business from './pages/Business/Business'
import ProductByBusiness from './pages/ProductByBusiness/ProductByBusiness'
import NotFound from './pages/NotFound/NotFound'
import ProductDetailPage from './pages/ProductDetail/ProductDetailPage'
import BusinessLayout from './layouts/BusinessLayout/BusinessLayout'
import ProductByBusinessLayout from './layouts/ProductByBusinessLayout/ProductByBusinessLayout'

function App() {

  return (
    <Routes>
      <Route path='/negocios' element={<BusinessLayout />}>
        <Route index element={<Business />} />
        <Route path=':id_business/productos' element={<ProductByBusinessLayout />}>
          <Route index path='' element={<ProductByBusiness />} />
          <Route path=':id_product' element={<ProductDetailPage />} />
        </Route>
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
