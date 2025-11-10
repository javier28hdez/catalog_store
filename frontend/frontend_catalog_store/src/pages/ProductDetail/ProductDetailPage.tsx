import download from '../../components/CardProduct/download.png'
import { AddShopCarIcons } from "../../components/Icons/Icons";

function ProductDetailPage() {
  return (
    <div className="m-auto w-2/3 mt-5">
      <span>Productos / Producto</span>
      <div className="grid grid-cols-2 mt-2 gap-x-7">
        <div className="w-full">
          <img className="aspect-3/2 w-full rounded-lg" src={download} alt="" title="" />
        </div>
        <div className="flex flex-col gap-4 w-2/3">
          <h2 className="text-2xl font-bold">Nombre del producto</h2>
          <h3 className="text-base text-gray-600">descripcion del producto</h3>
          <div className="bg-sky-100 min-h-5 w-1/3 text-xs text-center rounded-4xl text-sky-500 font-medium content-center">Categoria</div>
          <div className="flex flex-col border border-gray-200 rounded-lg border-solid">
            <div className="flex flex-row m-1.5">
              <span className="w-1/2 text-left">Precio:</span>
              <span className="w-1/2 text-right text-sky-500">$</span>
            </div>
            <div className="flex flex-row m-1.5">
              <span className="w-1/2 text-left">Stock</span>
              <span className="w-1/2 text-right">Unidades</span>
            </div>
          </div>
          <button className="flex justify-center items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg cursor-pointer">
            <AddShopCarIcons />
            <span>Agregar al carrito</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
