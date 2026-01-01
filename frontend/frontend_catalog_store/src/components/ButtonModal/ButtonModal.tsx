import type { ButtonModalProps } from "../../interfaces/buttonModalInterface";



function ButtonModal({ buttonText, isOpen, setIsOpen, icon }: ButtonModalProps) {

    return (
        <>
            <button className="flex flex-row bg-sky-500 w-8 h-8 place-items-center justify-center rounded-md cursor-pointer" onClick={() => setIsOpen(!isOpen)} >
                {icon}
                <span className="text-color-white pb-1">{buttonText}</span>
            </button>
        </>
    )
}

export default ButtonModal
