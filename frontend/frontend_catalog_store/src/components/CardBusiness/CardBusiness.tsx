import { Link } from 'react-router-dom'
import type { BusinessProps } from '../../interfaces/businessInterface'

export const CardBusiness = ({ id_business, name, eslogan, img_url, description }: BusinessProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <Link to={`/negocios/${id_business}/productos`}>
        <img className='w-full h-45 rounded-sm object-cover' src={`http://localhost:8000/${img_url}`} title={name} alt={description} />
        <div className="p-4">
          <h3 className="text-lg font-semibold text[var(--text-primary)] line-clamp-2" title={name}>
            {name}
          </h3>
          <span className='text-[var(--text-secondary)] text-sm'>{eslogan}</span>
          <p className="text-xs text-gray-400 mt-1 line-clamp-3" title={description}>
            {description}
          </p>
        </div>
      </Link>
    </div>
  )
}

export default CardBusiness
