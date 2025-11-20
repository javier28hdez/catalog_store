import { useForm } from "react-hook-form";
import type { BusinessFormData, BusinessFormProps } from "../../interfaces/businessInterface";
import { businessService } from "../../services/businessService";
import { useState } from "react";
import { UpFileIcons } from "../Icons/Icons";
import toast from "react-hot-toast";

function FormBusiness({ onSuccess }: BusinessFormProps) {
    //hook para registrar inputs en formulario y poder utilizar el formData
    const { register, handleSubmit, formState: { errors } } = useForm<BusinessFormData>();
    //manego de la foto para el ingreso de negocios
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    const onSubmit = async (data: BusinessFormData) => {
        try {
            //libreria para manejar los toasts de carga y exito/error
            const loadingToast = toast.loading('Creando negocio...');
            //Crear formData para enviar la informacion al backend
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (value) {
                    formData.append(key, value.toString());
                }
            });

            if (photo) {
                formData.append('img_business', photo);
            }

            const response = await businessService.postBusiness(formData);


            if (response && response.ok) {
                toast.success(' Negocio creado exitosamente', {
                    id: loadingToast, // Reemplaza el loading
                    duration: 3000,
                });
                onSuccess();
            }


        } catch (error) {
            toast.error('Error al crear el negocio');
            console.error('Error al enviar el formulario:', error);
        }
    }

    const handleImagen = (e: React.ChangeEvent<HTMLInputElement>) => {
        const img = e.target.files?.[0] || null;
        setPhoto(img)
        setPhotoPreview(img ? URL.createObjectURL(img) : null)
    }


    return (
        <>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="name" className="block mb-2.5 text-sm font-medium text-heading">Nombre del Negocio</label>
                        <input type="text" className="bg-neutral-secondary-medium border rounded-md text-heading text-sm focus:border-2 focus:border-sky-400 focus:outline-none block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Peluqueria Josefa..." required {...register("name")} />
                    </div>
                    <div>
                        <label htmlFor="eslogan" className="block mb-2.5 text-sm font-medium text-heading">Eslogan</label>
                        <input type="text" className="bg-neutral-secondary-medium border rounded-md text-heading text-sm focus:border-2 focus:border-sky-400 focus:outline-none block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Innovación al alcance" required {...register("eslogan")} />
                    </div>
                    <div>
                        <label htmlFor="address" className="block mb-2.5 text-sm font-medium text-heading">Direccion de la Ubicacion del Negocio</label>
                        <input type="text" className="bg-neutral-secondary-medium border rounded-md text-heading text-sm focus:border-2 focus:border-sky-400 focus:outline-none block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Calle A Entre Garcia Roco y Emiliano ..." required {...register("address")} />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block mb-2.5 text-sm font-medium text-heading">Numero Telefonico del Negocio</label>
                        <input type="tel" className="bg-neutral-secondary-medium border rounded-md text-heading text-sm focus:border-2 focus:border-sky-400 focus:outline-none block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="53462581" pattern="[0-9]{8}" required {...register("telephone")} />
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2.5 text-sm font-medium text-heading">Correo Electronico del Negocio</label>
                    <input type="email" className="bg-neutral-secondary-medium border rounded-md text-heading text-sm  focus:border-2 focus:border-sky-400 focus:outline-none block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="peluqueria.doe@company.com" required {...register("email_business")} />
                </div>
                <div className="mb-6">
                    <label htmlFor="description" className="block mb-2.5 text-sm font-medium text-heading">Descripción del Negocio</label>
                    <textarea id="description" rows={4} className="bg-neutral-secondary-medium border rounded-md text-heading text-sm  focus:border-2 focus:border-sky-400 focus:outline-none block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Describe tu negocio, servicios que ofreces, horarios..." required {...register("description")}>
                    </textarea>
                </div>
                <div className="mb-6">
                    <label className="block mb-2.5 text-sm font-medium text-heading">Foto del Negocio</label>
                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="img_business" className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors hover:border-sky-400">
                            {(photoPreview) ? <img src={photoPreview} alt="Preview" className="mb-3 w-4/5 h-4/5 object-cover" />
                                :
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <UpFileIcons />
                                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click para subir</span> o arrastra y suelta</p>
                                    <p className="text-xs text-gray-500">PNG, JPG o JPEG (MAX. 5MB)</p>
                                </div>
                            }
                            <input id="img_business" type="file" accept="image/*" className="hidden" {...register("img_business")} onChange={handleImagen} />
                        </label>
                    </div>
                </div>
                <button type="submit" className="text-white bg-sky-500 box-border border border-transparent rounded-md hover:bg-sky-600 focus:ring-4 focus:ring-sky-300 shadow-xs font-medium leading-5  text-sm px-4 py-2.5 focus:outline-none">Agregar</button>
            </form>
            {errors && <span>{errors.root?.message}</span>}
        </>
    )
}

export default FormBusiness
