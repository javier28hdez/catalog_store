import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { schemaCategory, type FormCategoryValue } from "@/utils/validation/categoryValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";
import type { FormCategoryModalProps } from "@/interfaces/categoryInterface";
import toast from "react-hot-toast";
import { categoryService } from "@/services/categoryService";

function FormCategoryModal({ showModal, setShowModal, refresh, setRefresh, id_business, onSuccesCategory }: FormCategoryModalProps) {
    const formCategory = useForm<FormCategoryValue>({
        resolver: zodResolver(schemaCategory),
        defaultValues: {
            category_name: '',
            description: '',
        }
    })

    const handleShowModal = () => {
        setShowModal(!showModal)

    }

    const onSubmitCategory = async (data: FormCategoryValue) => {
        let loadingToast
        try {
            loadingToast = toast.loading('Creando categoría...');

            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (value) {
                    formData.append(key, value.toString());
                }
            });

            if (id_business) {
                formData.append('id_business', id_business)
            }

            const response = await categoryService.postCategory(formData)

            if (response) {
                const newCategoryId = response.id_category_product;
                onSuccesCategory(newCategoryId);
                toast.success(' Categoría creada exitosamente', {
                    id: loadingToast,
                    duration: 3000,
                });
                setShowModal(!showModal)
                setRefresh(!refresh)
            }

        } catch (error) {
            toast.error('Ocurrió un error al crear la categoría')
            console.log(`Ocurrio un error:${error}`)
            if (loadingToast) {
                toast.dismiss(loadingToast);
            }

        }
    }

    return (
        <Dialog open={showModal} onOpenChange={handleShowModal}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Nueva Categoría</DialogTitle>
                </DialogHeader>
                <Form {...formCategory}>
                    <form onSubmit={formCategory.handleSubmit(onSubmitCategory)} className="flex flex-col gap-4">
                        <FormField
                            control={formCategory.control}
                            name="category_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Categoría</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Entrante, Bebidas, Maquillaje ..." className="hover:border-sky-400" required {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                            }
                        />
                        <FormField
                            control={formCategory.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descripción</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Descripción de la Categoría ..." className="hover:border-sky-400" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            variant="outline"
                            size="form"
                            className="w-full text-white bg-sky-500 box-border border border-transparent rounded-md hover:bg-sky-600 focus:ring-4 ">
                            Crear Categoría
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default FormCategoryModal
