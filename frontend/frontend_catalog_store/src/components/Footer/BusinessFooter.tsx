//import { FacebookIcons, InstagramIcons, XIcons } from '../Icons/Icons';
import type { Business } from '../../interfaces/businessInterface';

interface BusinessFooterProps {
  business: Business;
}

function BusinessFooter({ business }: BusinessFooterProps) {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-200 mt-12 py-8 w-full">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Nombre del negocio */}
        <div className="text-center mb-6">
          <h3 className="text-3xl font-bold text-white mb-2">{business.name}</h3>
          <p className="text-gray-400 text-sm">{business.description}</p>
        </div>

        {/* Información de contacto */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-6">
          <div className="flex flex-col items-center">
            <span className="text-2xl mb-1">📍</span>
            <p className="text-sm">{/*business.address || */'Dirección no disponible'}</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl mb-1">📧</span>
            <p className="text-sm">{/*business.email ||*/ 'Email no disponible'}</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl mb-1">📞</span>
            <p className="text-sm">{/*business.phone || */'Teléfono no disponible'}</p>
          </div>
        </div>

        {/* Redes sociales */}
        {/*(business.facebook || business.instagram || business.twitter) && (
          <div className="flex justify-center gap-4 mb-6">
            {business.facebook && (
              <a 
                href={business.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-blue-600 transition-colors duration-300 p-3 rounded-full"
              >
                <FacebookIcons/>
              </a>
            )}
            {business.instagram && (
              <a 
                href={business.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-pink-600 transition-colors duration-300 p-3 rounded-full"
              >
                <InstagramIcons/>
              </a>
            )}
            {business.twitter && (
              <a 
                href={business.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-gray-600 transition-colors duration-300 p-3 rounded-full"
              >
                <XIcons/>
              </a>
            )}
          </div>
        )*/}

        {/* Copyright del negocio */}
        <div className="border-t border-gray-700 pt-4 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} {business.name}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default BusinessFooter