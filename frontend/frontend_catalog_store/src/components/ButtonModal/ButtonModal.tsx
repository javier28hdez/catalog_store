import { useState } from "react";
import { PlusAdd } from "../Icons/Icons"
import Modal from "../Modal/Modal";
import FormBusiness from "../Forms/FormBusiness";

function ButtonModal() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onSuccess = () => {
        setIsOpen(false);
    }

    return (
        <>
            <button className="bg-sky-500 w-9 h-8.5 place-items-center rounded-md cursor-pointer absolute top-24 right-22" onClick={() => setIsOpen(!isOpen)} >
                <PlusAdd />
            </button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Agregar Negocio" size="md">
                <FormBusiness onSuccess={onSuccess} />
            </Modal>
        </>
    )
}

export default ButtonModal
