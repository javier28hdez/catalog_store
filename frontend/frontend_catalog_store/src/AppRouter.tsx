import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/dashboard/Home'
import Services from './pages/dashboard/Services'
import About from './pages/dashboard/About'
import Business from './pages/dashboard/Business'
import ProductByBusiness from './pages/ProductByBusiness/ProductByBusiness'
import ProductDetailPage from './pages/ProductDetail/ProductDetailPage'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import { Toaster } from 'react-hot-toast'
import Layout from './layouts/Layout'

function AppRouter() {

    return (
        <>
            <BrowserRouter>
                <Toaster position="top-center" />
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />

                    <Route element={<Layout />}>
                        <Route path='/' element={<Home />} />
                        <Route path='/home' element={<Home />} />
                        <Route path='/negocios'>
                            <Route index element={<Business />} />
                            <Route path=':id_business'>
                                <Route path='productos'>
                                    <Route index element={<ProductByBusiness />} />
                                    <Route path=':id_product' element={<ProductDetailPage />} />
                                </Route>
                            </Route>
                        </Route>
                        <Route path='/service' element={<Services />} />
                        <Route path='/about' element={<About />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default AppRouter
