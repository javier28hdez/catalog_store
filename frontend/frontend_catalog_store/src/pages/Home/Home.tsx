import { useState } from "react"
import CardBusiness from "../../components/CardBusiness/CardBusiness"
import InputSearch from "../../components/InputSearch/InputSearch"
import NavBar from "../../components/NavBar/NavBar"
import { useBusiness } from "../../hooks/useBusiness"
import type { Business } from "../../interfaces/businessInterface"


function Home() {
  const {business, error, loading} = useBusiness()
  const [filteredBusiness, setFilteredBusiness] = useState<Business[]>(business);


  return (
    <>
      <NavBar/>
      <main className="flex flex-col m-auto w-6/8 mt-8 gap-6">
        <InputSearch arrayFilter={business} elementByFilter={"name"} setFilteredBusiness={setFilteredBusiness}/>
        <h1 className="text-2xl font-semibold font-sans">Negocios:</h1>
        <section className="grid grid-cols-6 gap-3 place-content-around">
          
          {(loading) ? <div>Cargando</div> : null}
          {(error) ? <div>{error.message}</div> : null}
          {filteredBusiness.length ===0 ? business.map((value)=>
            <CardBusiness key={value.id_business} name={value.name} img_url={value.img_business} description={value.description} />
          ) : filteredBusiness.map((value)=>
            <CardBusiness key={value.id_business} name={value.name} img_url={value.img_business} description={value.description} />
          )}
        </section>
      </main>
    </>
  )
}

export default Home
