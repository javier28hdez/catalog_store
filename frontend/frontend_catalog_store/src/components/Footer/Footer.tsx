import { FacebookIcons, InstagramIcons, XIcons } from '../Icons/Icons';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16 py-10 w-full border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-semibold text-white mb-2">Catálogo de Tiendas</h2>
            <p className="text-sm text-gray-400">Descubre los mejores negocios locales</p>
          </div>
          <div className="flex gap-4">
            <button
              className="bg-white hover:bg-blue-600 hover:text-white transition-colors duration-300 p-3 rounded-full shadow-md border border-gray-300"
              aria-label="Facebook"
            >
              <FacebookIcons />
            </button>
            <button
              className="bg-white hover:bg-pink-600 hover:text-white transition-colors duration-300 p-3 rounded-full shadow-md border border-gray-300"
              aria-label="Instagram"
            >
              <InstagramIcons />
            </button>
            <button
              className="bg-white hover:bg-gray-800 hover:text-white transition-colors duration-300 p-3 rounded-full shadow-md border border-gray-300"
              aria-label="X (Twitter)"
            >
              <XIcons />
            </button>
          </div>
        </div>
        <div className="border-t border-gray-800 mb-6"></div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row gap-4 text-center md:text-left">
            <span>📍 Dirección: Calle Principal, Ciudad</span>
            <span>📧 Email: contacto@ejemplo.com</span>
            <span>📞 Teléfono: +34 123 456 789</span>
          </div>
        </div>
        <div className="text-center mt-6 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Catálogo de Tiendas. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
