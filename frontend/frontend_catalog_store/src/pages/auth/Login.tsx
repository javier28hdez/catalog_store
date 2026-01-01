import FormLogin from "@/components/Forms/FormLogin"

function Login() {
    return (
        <main className="fixed inset-0 items-center justify-center m-auto h-3/4 w-1/3">
            <div className="grid grid-row-2 bg-sky-400 justify-items-center items-center w-full h-full rounded-xl">
                <div className="row-span-1 text-white text-3xl">Login</div>
                <div className="row-span-1 flex flex-col items-center h-full w-full">
                    <FormLogin />
                </div>
            </div>
        </main>
    )
}

export default Login
