import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input";
import type { ProductFormComponentProps } from "@/interfaces/productInterface";
import { Textarea } from "../ui/textarea";
import { UpFileIcons } from "../Icons/Icons";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { productServices } from "@/services/productService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useAllCategory } from "@/hooks/useAllCategory";
import { STATIC_MONEDA_CHOICES, STATIC_TAGS_CHOICES } from "@/utils/choices";
import { schemaProduct, type FormProductValue } from "@/utils/validation/productValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import FormCategoryModal from "../Modal/FormCategoryModal";

function FormProduct({ onSuccess, id_business, mode, product }: ProductFormComponentProps) {

    const form = useForm<FormProductValue>({
        resolver: zodResolver(schemaProduct),
        defaultValues: {
            name: '',
            stock: 0,
            price: 0,
            moneda: '',
            tags: '',
            category: '',
            description: '',
        }
    });
    const [refreshCategory, setRefreshCategory] = useState<boolean>(false)
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null); // Placeholder for photo preview state
    const [showCategoryModal, setShowCategoryModal] = useState<boolean>(false)
    const { category } = useAllCategory(id_business, refreshCategory);

    useEffect(() => {
        if (mode === 'edit' && product && category.length > 0) {
            form.reset({
                name: product.name || '',
                stock: Number(product.stock) || 0,
                price: Number(product.price) || 0,
                moneda: product.moneda || '',
                tags: product.tags || '',
                category: String(product.category.id_category_product) || '',
                description: product.description || '',
            });
            if (product.img_product) {
                setPhotoPreview(`http://localhost:8000/${product.img_product}`);
            }
        }
    }, [form, product, category, mode])

    const handleImagen = (e: React.ChangeEvent<HTMLInputElement>) => {
        const img = e.target.files?.[0] || null;

        if (img) {
            if (img.size > 5 * 1024 * 1024) {
                toast.error('La imagen no puede superar los 5MB');
                return
            }
        }

        setPhoto(img);
        setPhotoPreview(img ? URL.createObjectURL(img) : null);
    }
    const onSuccesCategory = (newCategoryId: string) => {
        form.setValue('category', String(newCategoryId));
    }

    const onSubmit = async (data: FormProductValue) => {
        let loadingToast
        try {
            //libreria para manejar los toasts de carga y exito/error
            loadingToast = toast.loading(mode === "create" ? 'Creando producto...' : 'Actualizando producto...');

            //Crear formData para enviar la informacion al backend
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (value && key !== 'img_product' && key !== 'category') {
                    formData.append(key, value.toString());
                }
            });

            if (data.category) {
                formData.append('id_category_product', data.category);
            }

            if (photo) {
                formData.append('img_product', photo);
            }
            if (mode === 'edit' && id_business) {
                formData.append('id_business', id_business)
            }

            if (mode === 'edit' && product) {
                const response = await productServices.putProduct(formData, product.id_product);

                if (response) {
                    toast.success(' Producto modificado exitosamente', {
                        id: loadingToast,
                        duration: 3000,
                    });
                    onSuccess();
                }

            } else {
                const response = await productServices.postProduct(formData, id_business);
                if (response) {
                    toast.success(' Producto creado exitosamente', {
                        id: loadingToast,
                        duration: 3000,
                    });
                    onSuccess();
                }
            }


        } catch (error) {
            toast.error(mode === "create" ? 'Error al crear el producto' : 'Error al modificar el producto');
            console.error('Error al enviar el formulario:', error);
        } finally {
            if (loadingToast) {
                toast.dismiss(loadingToast);
            }
        }
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
                                    <FormLabel>Nombre del Producto</FormLabel>
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
                            name="stock"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Stock</FormLabel>
                                    <FormControl>
                                        <Input placeholder="10, 20, 30 ..." className="hover:border-sky-400" type="number" required {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Precio de Venta</FormLabel>
                                    <FormControl>
                                        <Input placeholder="2, 4.6, 10.99 ..." className="hover:border-sky-400" type="number" required {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                            }
                        />

                        <FormField
                            control={form.control}
                            name="moneda"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Moneda</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="hover:border-sky-400">
                                                <SelectValue placeholder="Selecciona la moneda a pagar" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="hover:border-sky-400 z-[9999]">
                                            {STATIC_MONEDA_CHOICES.map(element => (
                                                <SelectItem key={element.label} value={String(element.value)}>
                                                    {element.value}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="tags"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tags</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="hover:border-sky-400">
                                                <SelectValue placeholder="Selecciona la etiqueta" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="hover:border-sky-400 z-[9999]">
                                            {STATIC_TAGS_CHOICES.map(element => (
                                                <SelectItem key={element.label} value={String(element.value)}>
                                                    {element.value}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Categoría</FormLabel>
                                    <Select onValueChange={(value) => {
                                        if (value === "add") {
                                            setShowCategoryModal(true);
                                        } else {
                                            field.onChange(value);
                                        }
                                    }} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="hover:border-sky-400">
                                                <SelectValue placeholder="Selecciona una categoría" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="hover:border-sky-400 z-[9999]">
                                            <SelectItem value={'add'}>
                                                Agregar Categoría
                                            </SelectItem>
                                            {category.map(element => (
                                                <SelectItem key={element.id_category_product} value={String(element.id_category_product)}>
                                                    {element.category_name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel>Descripción</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Descripción del producto ..." className="hover:border-sky-400" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="img_product"
                            render={({ field: { value, onChange, ...fieldProps } }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel>Imagen del Producto</FormLabel>
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
                                                required={mode === 'create'}
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
                                {(mode === 'create') ? 'Agregar' : 'Modificar'}
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>

            {showCategoryModal && <FormCategoryModal showModal={showCategoryModal} setShowModal={setShowCategoryModal} refresh={refreshCategory} setRefresh={setRefreshCategory} id_business={id_business} onSuccesCategory={onSuccesCategory} />}
        </>
    )
}

export default FormProduct
