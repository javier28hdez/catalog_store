import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { schemaLogin, type FormLoginValue } from "@/utils/validation/loginValidation"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { authService } from "@/services/authSerivice"

function FormLogin() {
    const navigate = useNavigate()
    const form = useForm<FormLoginValue>({
        resolver: zodResolver(schemaLogin),
        defaultValues: {
            username: '',
            password: '',
        }
    })

    const onSubmit = async (data: FormLoginValue) => {
        let loadingToast;
        try {
            loadingToast = toast.loading('Iniciando sesión...')

            const formData = new FormData()
            Object.entries(data).forEach(([key, value]) => {
                if (value) {
                    formData.append(key, value.toString());
                }
            })
            const response = await authService.login(formData)

            if (response) {
                toast.success('Sesión iniciada exitosamente', {
                    id: loadingToast,
                    duration: 3000,
                })
                navigate('/negocios')
            }

        } catch (error) {
            console.log('Error:' + error)
            toast.error('Ha ocurrido un error al iniciar sesión')
        }

    }

    const handleRegister = () => {
        navigate('/register')
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 p-6 bg-white w-3/4 rounded-sm border-1 shadow-md">
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
                        name='password'
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel>Contraseña</FormLabel>
                                <FormControl>
                                    <Input placeholder="********" className="hover:border-sky-400" required {...field} type="password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}>
                    </FormField>

                    <Button
                        type="submit"
                        variant="outline"
                        size="form"
                        className="w-full text-white bg-sky-500 box-border border border-transparent rounded-md hover:bg-sky-600 focus:ring-4 ">
                        Entrar
                    </Button>

                    <div className="col-span-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="form"
                            onClick={handleRegister}
                            className="w-full text-white bg-sky-500 box-border border border-transparent rounded-md hover:bg-sky-600 focus:ring-4 ">
                            Registrarte
                        </Button>
                    </div>
                </form>
            </Form >
        </>
    )
}

export default FormLogin
