import type { BusinessProps } from '../../interfaces/businessInterface'

export const CardBusiness = ({name, img_url, description}: BusinessProps) => {
  return (
    <div className='flex flex-col w-full h-full text-wrap'>
      <img className='w-full h-30 rounded-sm' src={`http://localhost:8000/${img_url}`} title={name} alt={description}/>
      <h3 className='text-sm mt-1.5 text-pretty wrap-anywhere'>{name}</h3>
      <p className='text-xs text-gray-400 '>{description}</p>
    </div>
  )
}

export default CardBusiness
