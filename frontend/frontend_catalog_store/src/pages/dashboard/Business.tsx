import { useState } from "react"
import CardBusiness from "../../components/CardBusiness/CardBusiness"
import InputSearch from "../../components/InputSearch/InputSearch"
import { useBusiness } from "../../hooks/useBusiness"
import type { BusinessData } from "../../interfaces/businessInterface"
import ButtonModal from "../../components/ButtonModal/ButtonModal"
import { Plus } from "lucide-react"
import FormModal from "@/components/Modal/FormModal"
import FormBusiness from "@/components/Forms/FormBusiness"


function Business() {
  const { business, error, loading, refetch } = useBusiness()
  const [filteredBusiness, setFilteredBusiness] = useState<BusinessData[]>(business);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleBusinessCreated = () => {
    setIsOpen(!isOpen);
    refetch()
  }


  return (
    <>
      <main className="flex flex-col m-auto w-7/8 mt-8 gap-6">
        <div className="flex flex-row gap-x-4">
          <InputSearch arrayFilter={business} elementByFilter={"name"} setFilteredBusiness={setFilteredBusiness} />
          <ButtonModal icon={<Plus />} isOpen={isOpen} setIsOpen={setIsOpen} />
          <FormModal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Agregar Negocio" size="md">
            <FormBusiness onSuccess={handleBusinessCreated}></FormBusiness>
          </FormModal>
        </div>
        <h1 className="text-2xl font-semibold font-sans">Negocios:</h1>
        <section className="grid grid-cols-5 gap-3 place-content-around">

          {(loading) ? <div>Cargando</div> : null}
          {(error) ? <div>{error.message}</div> : null}
          {filteredBusiness.length === 0 ? business.map((value) =>
            <CardBusiness key={value.id_business} id_business={value.id_business} name={value.name} eslogan={value.eslogan} img_url={value.img_business} description={value.description} />
          ) : filteredBusiness.map((value) =>
            <CardBusiness key={value.id_business} id_business={value.id_business} name={value.name} eslogan={value.eslogan} img_url={value.img_business} description={value.description} />
          )}
        </section>
      </main>
    </>
  )
}

export default Business
