import Business from "@/pages/dashboard/Business"
import ProductByBusiness from "@/pages/ProductByBusiness/ProductByBusiness"
import ProductDetailPage from "@/pages/ProductDetail/ProductDetailPage"
import { Navigate, Route, Routes } from "react-router-dom"

function BusinessRouter() {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/' />} />
            <Route path='/' element={<Business />} />
            <Route path='/:id_business/productos' element={<ProductByBusiness />}>
                <Route path='/:id_product' element={<ProductDetailPage />} />
            </Route>
        </Routes>
    )
}

export default BusinessRouter
