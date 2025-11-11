import type { ProductProps } from '../../interfaces/productInterface'
import { Link } from 'react-router-dom'

function CardProduct({ id_product, id_business, name, description, img_product, price, stock, moneda }: ProductProps) {
  return (
    <div className="flex flex-col gap-1">
      <Link to={`/negocios/${id_business}/productos/${id_product}`}>
        <div className='group relative'>
          <img src={`http://localhost:8000/${img_product}`} alt={name} title={description} className='aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80' />
        </div>
        <div className='grid grid-cols-2 justify-center items-center'>
          <h3 className='mt-1 text-sm text-gray-500'>{name}</h3>
          <span className='text-sm font-medium text-gray-900 text-right'>
            {price} {moneda}
          </span>
          <span className='col-span-2 text-xs font-extralight'>Cantidad: {stock}</span>
        </div>
      </Link>
    </div>
  )
}

export default CardProduct
