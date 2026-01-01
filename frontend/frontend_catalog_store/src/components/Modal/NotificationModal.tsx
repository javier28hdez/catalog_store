import type { NotficationModalProps } from "@/interfaces/modalInterface"
import { TrashIcon } from "lucide-react"
import toast from "react-hot-toast"
import { productServices } from "@/services/productService"
import { useNavigate } from "react-router-dom"
//import type { MouseEventHandler } from "react"


function NotificationModal({ isOpen, onClose, id_product }: NotficationModalProps) {
    const navigate = useNavigate();
    if (!isOpen) return

    const handleToggleProduct = async () => {
        try {
            const loadingToast = toast.loading('Eliminando producto...');

            const response = await productServices.putToggleProduct(id_product);

            if (response) {
                toast.success('El producto fue eliminado...', {
                    id: loadingToast,
                    duration: 3000,
                });
                onClose();
                navigate(-1);

            }
        } catch (error) {
            toast.error('Ha ocurrido un error');
            console.log(`Ha ocurrido un error al eliminar el producto: ${error}`);
        }
    }

    return (
        <>
            <div className="fixed inset-0 z-50 bg-black/70 opacity-100 flex items-center justify-center p-4">
                <div className="relative w-full max-w-md bg-white opacity-100">
                    <div className="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
                        <div className="flex justify-center mb-4">
                            <div className="bg-red-100 rounded-full p-3">
                                <TrashIcon className="text-red-600" size={32} />
                            </div>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 text-center mb-2">
                            ¿Seguro que quiere eliminar el elemento?
                        </h2>
                        <p className="text-gray-600 text-center mb-6">
                            Esta acción no se puede deshacer.
                        </p>
                        <div className="flex gap-3">
                            <button
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors font-medium"
                                onClick={handleToggleProduct}
                            >
                                Aceptar
                            </button>
                            <button
                                onClick={onClose}
                                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition-colors font-medium"
                            >
                                Cancelar
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default NotificationModal
