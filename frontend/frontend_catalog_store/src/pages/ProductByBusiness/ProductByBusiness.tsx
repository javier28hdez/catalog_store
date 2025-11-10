import CardProduct from "../../components/CardProduct/CardProduct"
import { useAllProduct } from "../../hooks/useAllProduct";

function ProductByBusiness() {
  const {products, error, loading} = useAllProduct();

  return (
    <>
      <main className="flex flex-col m-auto w-6/8 ">
        <section className="flex flex-col mt-8">
            <h1 className="font-bold text-3xl">Crafted Creations</h1>
            <p className="my-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem mollitia aspernatur dolorum velit numquam debitis quos ut molestias quam aut, blanditiis dignissimos illum voluptate reprehenderit! Perferendis repellendus voluptate iste? Ipsam.</p>
        </section>
        <section className="flex flex-col">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products:</h2>
            <div className="mt-6 grid grid-cols-4 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {(loading) ? <div>Cargando</div> : null}
                {(error) ? <div>{error.message}</div> : null}
                {products.map(value=>{
                  return <CardProduct key={value.id_product} name={value.name} description={value.description} img_product={value.img_product} price={value.price} stock={value.stock} moneda={value.moneda}/>
                })}
            </div>
        </section>  
      </main>
    </>
  )
}

export default ProductByBusiness
