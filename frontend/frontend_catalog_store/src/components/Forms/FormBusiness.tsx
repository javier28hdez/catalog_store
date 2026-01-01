import { useForm } from "react-hook-form";
import type { BusinessFormProps } from "../../interfaces/businessInterface";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { businessService } from "../../services/businessService";
import { useState } from "react";
import { UpFileIcons } from "../Icons/Icons";
import toast from "react-hot-toast";
import { type FormBusinessValue, schemaBusiness } from "@/utils/validation/businessValidation"
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function FormBusiness({ onSuccess }: BusinessFormProps) {

    const form = useForm<FormBusinessValue>({
        resolver: zodResolver(schemaBusiness),
        defaultValues: {
            name: "",
            eslogan: "",
            address: "",
            telephone: "",
            email_business: "",
            description: "",
        }
    });
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    const onSubmit = async (data: FormBusinessValue) => {
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
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre del Negocio</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Restaurante Conchita, Eternal ..." className="hover:border-sky-400" required {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                            }
                        />

                        <FormField
                            control={form.control}
                            name="eslogan"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Eslogan</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Comodidad y Confort..." className="hover:border-sky-400" required {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                            }
                        />

                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Dirección</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Garcia Roco entre Calle A y B #54..." className="hover:border-sky-400" required {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                            }
                        />

                        <FormField
                            control={form.control}
                            name="telephone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Teléfono</FormLabel>
                                    <FormControl>
                                        <Input placeholder="53987812..." className="hover:border-sky-400" required {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                            }
                        />
                        <FormField
                            control={form.control}
                            name="email_business"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Correo Electrónico</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Laptop, Hoja, Cama ..." className="hover:border-sky-400" required {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                            }
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel>Descripción</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Una empresa dedicada a la venta de materiales de construccion..." className="hover:border-sky-400" required {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                            }
                        />
                        <FormField
                            control={form.control}
                            name="img_business"
                            render={({ field: { value, onChange, ...fieldProps } }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel>Imagen del Negocio</FormLabel>
                                    <div className="flex items-center justify-center w-full">
                                        <label htmlFor="img_product" className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors hover:border-sky-400">
                                            {photoPreview ? (
                                                <img src={photoPreview} alt="Preview" className="mb-3 w-4/5 h-4/5 object-contain rounded" />
                                            ) : (
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <UpFileIcons />
                                                    <p className="mb-2 text-sm text-gray-500">
                                                        <span className="font-semibold">Click para subir</span> o arrastra y suelta
                                                    </p>
                                                    <p className="text-xs text-gray-500">PNG, JPG o JPEG (MAX. 5MB)</p>
                                                </div>
                                            )}
                                            <input
                                                id="img_product"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                required
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        onChange(file);
                                                    }
                                                    handleImagen(e);
                                                }}
                                                {...fieldProps}
                                            />
                                        </label>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="col-span-2">
                            <Button
                                type="submit"
                                variant="outline"
                                size="form"
                                className="w-full text-white bg-sky-500 box-border border border-transparent rounded-md hover:bg-sky-600 focus:ring-4 ">
                                Agregar
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </>
    )
}

export default FormBusiness
