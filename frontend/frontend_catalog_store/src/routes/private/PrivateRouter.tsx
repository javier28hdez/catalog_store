import AboutUsLayout from "@/layouts/AboutUs/AboutUsLayout"
import BusinessLayout from "@/layouts/Business/BusinessLayout"
import HomeLayout from "@/layouts/Home/HomeLayout"
import ProductByBusinessLayout from "@/layouts/ProductByBusiness/ProductByBusinessLayout"
import SubscriptionLayout from "@/layouts/Subscription/SubscriptionLayout"
import Business from "@/pages/dashboard/Business"
import ProductByBusiness from "@/pages/ProductByBusiness/ProductByBusiness"
import ProductDetailPage from "@/pages/ProductDetail/ProductDetailPage"
import { Route, Routes } from "react-router-dom"

function PrivateRouter() {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/home' element={<HomeLayout />}>
                <Route index element={<Home />} />
            </Route>

            <Route path='/login' element={<LoginLayout />} >
                <Route index element={<Login />} />
            </Route>
            <Route path='/register' element={<RegisterLayout />}>
                <Route index element={<Register />} />
            </Route>
            <Route path='/negocios' element={<BusinessLayout />}>
                <Route index element={<Business />} />
                <Route path=':id_business/productos' element={<ProductByBusinessLayout />}>
                    <Route index path='' element={<ProductByBusiness />} />
                    <Route path=':id_product' element={<ProductDetailPage />} />
                </Route>
            </Route>
            <Route path='/services' element={<SubscriptionLayout />} />
            <Route path='/about' element={<AboutUsLayout />} />

            <Route path='*' element={<Navigate to='/404' />} />
            <Route path='/404' element={<NotFound />} />
        </Routes>
    )
}

export default PrivateRouter
