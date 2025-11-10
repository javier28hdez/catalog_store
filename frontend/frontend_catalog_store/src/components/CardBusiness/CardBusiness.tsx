import { Link } from 'react-router-dom'
import type { BusinessProps } from '../../interfaces/businessInterface'

export const CardBusiness = ({ name, img_url, description }: BusinessProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <Link to="/negocios/:id/productos">
        <img className='w-full h-45 rounded-sm object-cover' src={`http://localhost:8000/${img_url}`} title={name} alt={description} />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2" title={name}>
            {name}
          </h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-3" title={description}>
            {description}
          </p>
        </div>
      </Link>
    </div>
  )
}

export default CardBusiness
