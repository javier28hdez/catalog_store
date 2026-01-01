import { Link, useParams } from "react-router-dom";
import CardProduct from "../../components/CardProduct/CardProduct"
import { useAllProduct } from "../../hooks/useAllProduct";
import { useBusinessById } from "../../hooks/useBusinessById";
import FormProduct from "@/components/Forms/FormProduct";
import ButtonModal from "@/components/ButtonModal/ButtonModal";
import FormModal from "@/components/Modal/FormModal";
import { useState } from "react";
import { Plus } from "lucide-react"


function ProductByBusiness() {
  const { id_business } = useParams();
  const { products, error, loading, refetch } = useAllProduct(id_business);
  const { business } = useBusinessById(id_business);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleProductCreated = async () => {
    setIsOpen(false);
    refetch();
  }

  return (
    <>
      <main className="flex flex-col m-auto w-7/8 ">
        <section className="flex flex-col mt-8">
          <h1 className="font-bold text-3xl text-center">{business?.name}</h1>
          <span className="text-[var(--text-secondary)] mt-0.5 text-center">{business?.eslogan}</span>
          <p className="my-5 text-center">{business?.description}</p>
        </section>
        <section className="flex flex-col">
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Productos Disponibles:</h2>
            <ButtonModal isOpen={isOpen} setIsOpen={setIsOpen} icon={<Plus />} />
            <FormModal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Agregar Producto" size="md">
              <FormProduct onSuccess={handleProductCreated} id_business={id_business} mode="create"></FormProduct>
            </FormModal>
          </div>
          <div className="mt-6 grid grid-cols-4 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {(loading) ? <div>Cargando</div> : null}
            {(error) ? <div>{error.message}</div> : null}
            {(id_business === undefined) ? <Link to='/error' /> :
              products.map(value => {
                return <CardProduct key={value.id_product} id_product={value.id_product} id_business={id_business} name={value.name} description={value.description} img_product={value.img_product} price={value.price} stock={value.stock} moneda={value.moneda} />
              })}
          </div>
        </section>
      </main>
    </>
  )
}

export default ProductByBusiness
