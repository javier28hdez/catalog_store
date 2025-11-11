import { useParams } from 'react-router-dom';
import { AddShopCarIcons } from "../../components/Icons/Icons";
import { useProductById } from '../../hooks/useProductById';
import { useCategoryById } from '../../hooks/useCategoryById';


function ProductDetailPage() {
  const { id_product } = useParams()
  const { product, error, loading } = useProductById(id_product)
  const { category } = useCategoryById(product?.category.id_category_product);

  return (
    <>
      {(loading) ? <div>Cargando</div> : null}
      {(error) ? <div>{error.message}</div> :
        <div className="m-auto w-2/3 mt-10">
          <div className="grid grid-cols-2 mt-2 gap-x-7">
            <div className="w-full">
              <img className="aspect-3/2 w-full rounded-lg" src={`http://localhost:8000/${product?.img_product}`} alt={`${product?.name}`} title={`${product?.description}`} />
            </div>
            <div className="flex flex-col gap-4 w-2/3">
              <h2 className="text-2xl font-bold">{product?.name}</h2>
              <h3 className="text-base text-gray-600">{product?.description}</h3>
              <div className="bg-sky-100 min-h-5 w-1/3 text-xs text-center rounded-4xl text-sky-500 font-medium content-center">{category?.category_name}</div>
              <div className="grid grid-cols-2 gap-8 p-4 border border-gray-200 rounded-lg">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 mb-1">Precio</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold">{product?.price}</span>
                    <span className="text-sm text-sky-500 font-medium">{product?.moneda}</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 mb-1">Disponibilidad</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold">{product?.stock}</span>
                    <span className="text-sm text-gray-500">unidades</span>
                  </div>
                </div>
              </div>
              <button className="flex justify-center items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg cursor-pointer">
                <AddShopCarIcons />
                <span>Agregar al carrito</span>
              </button>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default ProductDetailPage
