import { schemaRegister, type FormRegisterValue } from "@/utils/validation/registerValidation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast";
import { authService } from "@/services/authSerivice"

function FormRegister() {
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(schemaRegister),
        defaultValues: {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            telephone: '',
            ci: '',
            password: '',
            confirmPassword: '',
        }
    })

    const onSucces = () => {
        navigate('/negocios')
    }

    const onSubmit = async (data: FormRegisterValue) => {
        let loadingToast;
        try {
            loadingToast = toast.loading('Creando cuenta...')

            const formData = new FormData()
            Object.entries(data).forEach(([key, value]) => {
                if (value) {
                    formData.append(key, value.toString());
                }
            });

            const response = await authService.register(formData)
            if (response) {

                toast.success('Cuenta creada exitosamente', {
                    id: loadingToast,
                    duration: 3000,
                })
                onSucces();

            }
        } catch (error) {
            console.log('Error:' + error)
            toast.error('Ha ocurrido un error al crear la cuenta')
        } finally {
            if (loadingToast) {
                toast.dismiss(loadingToast);
            }
        }
    }

    const handleLogin = () => {
        navigate('/login');
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 p-6 ">
                    <FormField
                        control={form.control}
                        name='first_name'
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel >Nombre</FormLabel>
                                <FormControl>
                                    <Input placeholder="Amanda" className=" hover:border-sky-400" required {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}>
                    </FormField>

                    <FormField
                        control={form.control}
                        name='last_name'
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel >Apellido</FormLabel>
                                <FormControl>
                                    <Input placeholder="Fonseca" className=" hover:border-sky-400" required {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}>
                    </FormField>

                    <FormField
                        control={form.control}
                        name='username'
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel >Nombre de Usuario</FormLabel>
                                <FormControl>
                                    <Input placeholder="javierhdez" className=" hover:border-sky-400" required {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}>
                    </FormField>

                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel >Correo Electrónico</FormLabel>
                                <FormControl>
                                    <Input placeholder="javierhdez@gmail.com" className=" hover:border-sky-400" required {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}>
                    </FormField>

                    <FormField
                        control={form.control}
                        name='telephone'
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel >Número de Teléfono</FormLabel>
                                <FormControl>
                                    <Input placeholder="59633684" className=" hover:border-sky-400" required {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}>
                    </FormField>

                    <FormField
                        control={form.control}
                        name='ci'
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel >Carnet de Identidad</FormLabel>
                                <FormControl>
                                    <Input placeholder="030528693255" className=" hover:border-sky-400" required {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}>
                    </FormField>

                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel >Contraseña</FormLabel>
                                <FormControl>
                                    <Input placeholder="******" className=" hover:border-sky-400" required {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}>
                    </FormField>

                    <FormField
                        control={form.control}
                        name='confirm_password'
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel >Confirmación de la Contraseña</FormLabel>
                                <FormControl>
                                    <Input placeholder="******" className=" hover:border-sky-400" required {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}>
                    </FormField>
                    <Button
                        type="submit"
                        variant="outline"
                        size="form"
                        className="col-span-2 w-full text-white bg-sky-500 box-border border border-transparent rounded-md hover:bg-sky-600 focus:ring-4 ">
                        Regístrate
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        size="form"
                        onClick={handleLogin}
                        className="col-span-2 w-full text-white bg-sky-500 box-border border border-transparent rounded-md hover:bg-sky-600 focus:ring-4 ">
                        Login
                    </Button>
                </form>
            </Form>
        </>
    )
}

export default FormRegister
