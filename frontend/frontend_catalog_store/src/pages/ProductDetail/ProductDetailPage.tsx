import { useParams } from 'react-router-dom';
import { TrashIcon, FilePenLine, ShoppingCart } from "lucide-react"
import { useProductById } from '../../hooks/useProductById';
import { useCategoryById } from '../../hooks/useCategoryById';
import ButtonModal from '@/components/ButtonModal/ButtonModal';
import { useState } from 'react';
import FormModal from '@/components/Modal/FormModal';
import FormProduct from '@/components/Forms/FormProduct';
import NotificationModal from '@/components/Modal/NotificationModal';


function ProductDetailPage() {
  const { id_business, id_product } = useParams()
  const { product, error, loading, refetch } = useProductById(id_product)
  const { category } = useCategoryById(product?.category.id_category_product);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenNotification, setIsOpenNotification] = useState<boolean>(false);

  const handleProductCreated = async () => {
    setIsOpen(false);
    refetch();
  }

  /*const handleToggleProduct = () => {
    return
  }*/

  return (
    <>
      {(loading) ? <div>Cargando</div> : null}
      {(error) ? <div>{error.message}</div> :
        <div className="m-auto w-2/3 mt-10">
          <div className="grid grid-cols-2 mt-2 gap-x-7">
            <div className="w-full">
              <img className="aspect-square w-full rounded-lg" src={`http://localhost:8000/${product?.img_product}`} alt={`${product?.name}`} title={`${product?.description}`} />
            </div>
            <div className="relative flex flex-col gap-5 w-full items-center justify-center">
              <div className='absolute top-0 right-0 flex flex-row gap-1'>
                <ButtonModal isOpen={isOpen} setIsOpen={setIsOpen} icon={<FilePenLine />} />
                <FormModal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Agregar Producto" size="md">
                  <FormProduct onSuccess={handleProductCreated} id_business={id_business} mode='edit' product={product}></FormProduct>
                </FormModal>
                <ButtonModal isOpen={isOpenNotification} setIsOpen={setIsOpenNotification} icon={<TrashIcon />} />
                {id_product &&
                  <NotificationModal isOpen={isOpenNotification} onClose={() => setIsOpenNotification(false)} id_product={id_product} />
                }
              </div>
              <h2 className="text-2xl font-bold">{product?.name}</h2>
              <h3 className="text-base text-gray-600">{product?.description}</h3>
              <div className="bg-sky-100 min-h-5 w-1/3 text-xs text-center rounded-4xl text-sky-500 font-medium content-center">{category?.category_name}</div>
              <div className="grid grid-cols-2 gap-8 p-4 border border-gray-200 rounded-lg">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 mb-1">Precio</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold">{product?.price}</span>
                    <span className="text-base text-sky-500 font-medium">{product?.moneda}</span>
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
                <ShoppingCart className='text-black' />
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
